import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NumberParam, StringParam, withDefault } from 'serialize-query-params'
import { useQueryParam, useQueryParams } from 'use-query-params'

import type { Row } from '~dnp/entities/dictionary-table'
import { SYSNAME, api } from '~dnp/entities/dictionary-table'
import Container from '~dnp/shared/container'
import { TICK_MS, cssAnimations } from '~dnp/shared/css-animations'
import { RenderCounter } from '~dnp/shared/debug'
import { ConfirmDialog, type ConfirmDialogTypes } from '~dnp/shared/dialog'
import { type Item, Viewer } from '~dnp/shared/explorer'
import Flex from '~dnp/shared/flex'
import { notify } from '~dnp/shared/notification-list-store'
import { Pagination } from '~dnp/shared/page'
import { FetcherStatus } from '~dnp/shared/query'
import ScrollArea from '~dnp/shared/scroll-area'
import { useSearch } from '~dnp/shared/search'
import Section from '~dnp/shared/section'
import { type ToSort, useSort } from '~dnp/shared/sort'
import { type Controller, createController } from '~dnp/shared/store'
import {
  Column,
  type ColumnTypes,
  ListTable,
  type ListTableTypes,
  SearchColumn,
  type SearchColumnTypes,
} from '~dnp/shared/table'
import '~dnp/shared/table'
import TextField from '~dnp/shared/text-field'
import { JSONParam } from '~dnp/shared/use-query-params'
import { createActionColumn } from '~dnp/shared/working-table'
import { createSelectionColumn } from '~dnp/shared/working-table/lib/selection-action-column'
import type { Any } from '~dnp/utils/core'
import { c, isEmpty } from '~dnp/utils/core'
import { type Dictionary } from '~dnp/utils/core'
import { useRenderDelay } from '~dnp/utils/core-hooks/render-delay'
import { get } from '~dnp/utils/dictionary'

import _Heading from '../widgets/heading'
import _RowFormDialog, { useCreateRowForm } from '../widgets/row-form-dialog'
import _SelectedcolumnsDialog from '../widgets/selected-items-dialog'
import _SelectionActions from '../widgets/selection-actions'

type TableContext = SearchColumnTypes.Context<Item['data']> &
  ListTableTypes.SortTypes.Context<Item['data']> & { idKey: string } & {
    selectedItemsController: Controller<Dictionary<Dictionary>>
  }

export interface Props {
  className?: string | undefined
}

const NAME = `${SYSNAME}-Page_id_explorer`

export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()
  const [nameQueryParam] = useQueryParam('name', withDefault(StringParam, ''))
  const [searchQueryParam, searchValue, setSearchValue] = useSearch()

  const sortController = useMemo(() => createController<ToSort<Dictionary> | undefined>(undefined), [])
  const [sortParam, , setSort] = useSort([sortController.set])
  sortController.subscribe((value, prev) => prev !== value && setSort(value))

  const confirmDialogController = useMemo(
    () => createController<Pick<ConfirmDialogTypes.BaseProps, 'open'>>({ open: false }),
    [],
  )

  const selectedItemsController = useMemo(() => createController<Dictionary<Dictionary>>({}), [])
  const selectedListDialogController = useMemo(() => createController(false), [])

  const [itemToRemove, setItemToRemove] = useState<Dictionary | null>(null)
  const [removingcolumns, setRemovingcolumns] = useState<Dictionary<Dictionary>>({})

  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      take: withDefault(NumberParam, 10),
    },
    { removeDefaultsFromUrl: true },
  )

  const tableRenderDelay = useRenderDelay(TICK_MS * 4)
  const [columnSearchParams, setColumnSearchParams] = useQueryParam<
    string,
    SearchColumnTypes.ReplaceValueByFilter<Item['data']>
  >('columnSearch', JSONParam as Any)

  const requestParams = {
    kn,
    where: { ...columnSearchParams },
    skip: (page - 1) * take,
    take,
    sort: sortParam,
    searchQuery: { startsWith: searchQueryParam || null },
  }

  const explorerListFetcher = api.explorer.findManyAndCountRows.useCache(requestParams, {
    keepPreviousData: true,
    staleTime: 10_000,
  })
  const { dictionaryTable, explorer } = explorerListFetcher.data || {}

  const uiColumns = useMemo(buildUiColumns, [dictionaryTable])

  const explorerCreateMutator = api.explorer.createRow.useCache({
    onSuccess: () => {
      notify({ title: 'Создано', type: 'success' })
      explorerListFetcher.refetch()
      formToCreate.initialize({})
      setFormToCreateOpen(false)
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerRemoveMutator = api.explorer.deleteRow.useCache({
    onSuccess: () => {
      notify({ title: 'Удалено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const explorerUpdateMutator = api.explorer.updateRow.useCache({
    onSuccess: () => {
      notify({ title: 'Обновлено', type: 'success' })
      explorerListFetcher.refetch()
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const formToCreate = useCreateRowForm({
    onSubmit: (values) => explorerCreateMutator.mutateAsync({ kn, input: values }).then((res) => res.data),
  })
  const [formToCreateOpen, setFormToCreateOpen] = useState(false)

  const formToUpdate = useCreateRowForm({
    onSubmit: (values) =>
      explorerUpdateMutator
        .mutateAsync({ kn, input: values, where: { [explorer!.idKey!]: values[explorer!.idKey!] as string } })
        .then((res) => res.data),
  })
  const [formToUpdateOpen, setFormToUpdateOpen] = useState(false)

  const indexedColumns = dictionaryTable?.columns.filter((item) => item.index || item.primary)

  return (
    <>
      <main className={NAME} style={{ position: 'relative' }}>
        <RenderCounter name='main' style={{ top: 0, transform: 'translateY(0)' }} />

        <Container p='var(--space-4)'>
          <Section size='1' className={c(cssAnimations.Appear)}>
            <_Heading
              formToCreate={formToCreate}
              setFormToCreateOpen={setFormToCreateOpen}
              name={explorerListFetcher.data?.dictionaryTable.name || nameQueryParam}
            />
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 2}ms` }}>
            <Flex width='50%' direction='column'>
              <TextField.Root
                placeholder={`Индексы: ${indexedColumns?.map((item) => item.name).join(', ') || '∞'}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size='3'
                type='search'
              />
            </Flex>
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
            <Pagination
              currentPage={page}
              limit={take}
              loading={!explorer ? false : explorerListFetcher.isFetching}
              totalElements={explorer?.total}
              onChange={(page) => setPaginationParams({ page })}
            />
          </Section>

          {tableRenderDelay.isRender && (
            <Section size='1'>
              <Flex style={{ position: 'relative' }}>
                <_SelectionActions
                  selectedItemsController={selectedItemsController}
                  onCounterClick={() => selectedListDialogController.set(true)}
                  onRemoveClick={() => confirmDialogController.set({ open: true })}
                  style={{ position: 'absolute', top: '-1.5rem', left: '0' }}
                />
                <FetcherStatus
                  isChildrenOnFetchingVisible={true}
                  isLoading={explorerListFetcher.isLoading}
                  isFetching={explorerListFetcher.isFetching}
                  isError={explorerListFetcher.isError}
                  error={explorerListFetcher.error?.response?.data}
                  refetch={explorerListFetcher.refetch}
                >
                  <ScrollArea scrollbars='horizontal'>
                    <Viewer.Root paths={explorer?.paths || []} explorer={explorer}>
                      <Viewer.ListTable<Item, TableContext>
                        className={c(cssAnimations.Appear)}
                        columns={uiColumns}
                        getRowProps={getTableRowProps}
                        context={{
                          idKey: explorer?.idKey as string,
                          selectedItemsController,
                          sortController: sortController,
                          searchFilter: columnSearchParams,
                          setSearchFilter: (value) => {
                            const newValue = typeof value === 'function' ? value(columnSearchParams) : value
                            setColumnSearchParams(newValue)
                          },
                        }}
                      />
                    </Viewer.Root>
                  </ScrollArea>
                </FetcherStatus>
              </Flex>
            </Section>
          )}
        </Container>
      </main>

      {/* dialogs */}

      <_RowFormDialog
        form={formToCreate}
        open={formToCreateOpen}
        setOpen={setFormToCreateOpen}
        mutator={explorerCreateMutator}
        columns={dictionaryTable?.columns}
      />
      <_RowFormDialog
        form={formToUpdate}
        open={formToUpdateOpen}
        setOpen={setFormToUpdateOpen}
        mutator={explorerUpdateMutator}
        columns={dictionaryTable?.columns}
      />

      <_SelectedcolumnsDialog
        dialogController={selectedListDialogController}
        selectedItemsController={selectedItemsController}
        dictionaryTable={dictionaryTable}
        idKey={explorer?.idKey as string}
      />

      <ConfirmDialog
        controller={confirmDialogController}
        title='Удалить запись?'
        description='Вы уверены, что хотите удалить запись?'
        onConfirm={confirmDelete}
        onClose={() => {
          setItemToRemove(null)
          confirmDialogController.set({ open: false })
        }}
      />
    </>
  )

  /**
   * private
   */

  function getTableRowProps({ item, rowIndex }: ListTableTypes.RowProps<Row, TableContext>) {
    const value = get(item, explorer?.idKey) as string
    const isRemoving = Boolean(removingcolumns[value])
    return {
      className: c(cssAnimations.Appear),
      style: {
        animationDelay: `${TICK_MS * Math.pow(rowIndex, 0.5)}ms`,
        backgroundColor: isRemoving ? 'var(--red-9)' : undefined,
        transition: isRemoving ? 'background-color 300ms' : undefined,
      },
      onDoubleClick: () => {
        formToUpdate.initialize(item)
        setFormToUpdateOpen(true)
      },
    }
  }

  function confirmDelete() {
    if (itemToRemove) {
      const id = itemToRemove?.[explorer!.idKey] as string
      removeRows({ [id]: itemToRemove as Dictionary })
      setItemToRemove(null)
      setRemovingcolumns((removingcolumns) => ({
        ...removingcolumns,
        [get(itemToRemove, explorer?.idKey) as string]: itemToRemove,
      }))
    }
    if (!isEmpty(selectedItemsController.get())) {
      removeRows(selectedItemsController.get())
      setRemovingcolumns(selectedItemsController.get())
      selectedItemsController.set({})
    }
    confirmDialogController.set({ open: false })
  }

  function buildUiColumns(): ColumnTypes.Column<Dictionary<Dictionary>, TableContext>[] {
    if (dictionaryTable?.columns === undefined) return []

    const columns = dictionaryTable.columns.map((column) =>
      Column.fromDatabaseColumn<Item['data'], TableContext>(column),
    )
    const searchColumns = columns.map(SearchColumn.toSearchColumn)
    const sortColumns = searchColumns.map(ListTable.Sort.injectIntoHeader)

    const actionsColumn = createActionColumn({
      onTrashClick: (_, item) => {
        setItemToRemove(item)
        confirmDialogController.set({ open: true })
      },
      onEditClick: (_, item) => {
        formToUpdate.initialize(item as Item['data'])
        setFormToUpdateOpen(true)
      },
    })
    const selectionColumn = createSelectionColumn()
    return [selectionColumn, ...sortColumns, actionsColumn] as ColumnTypes.Column<
      Dictionary<Dictionary>,
      TableContext
    >[]
  }

  async function removeRows(columns: Dictionary<Dictionary>): Promise<void> {
    const whereIds = Object.values(columns).map((item) => ({
      [explorer!.idKey!]: item[explorer!.idKey] as string,
    }))

    explorerRemoveMutator.mutate({
      kn,
      where: { OR: whereIds },
    })
  }
}

Component.displayName = NAME
