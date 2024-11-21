import { useMemo } from 'react'

import { SLICE } from '~/common/entities/analytical-actions'
import Container from '~/shared/container'
import { type Controller, createController } from '~/shared/controller'
import { TICK_MS, cssAnimations } from '~/shared/css-animations'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import { Pagination } from '~/shared/page'
import { FetcherStatus } from '~/shared/query'
import ScrollArea from '~/shared/scroll-area'
import Section from '~/shared/section'
import { type ColumnTypes, ListTable, type ListTableTypes, SearchColumn, type SearchColumnTypes } from '~/shared/table'
import Text, { HighlightedText } from '~/shared/text'
import { JSONParam, NumberParam, useQueryParam, useQueryParams, withDefault } from '~/shared/use-query-params'
import { type ToSort, useSort } from '~/slices/sort'
import { createSelectionColumn } from '~/slices/table/lib/selection-action-column'
import { type Any, type Dictionary, c } from '~/utils/core'

import { api } from '../../api'
import { getMany } from '../../api/analycal-actions'
import _Heading from './widgets/heading'
import _RunAnalyticsDialog from './widgets/run-analytics-dialog'
import _SelectionActions from './widgets/selection-actions'

type AnalyticsTable = api.findManyAndCountTables.ResponseData['items'][number]

type TableContext = SearchColumnTypes.Context<AnalyticsTable> &
  ListTableTypes.SortTypes.Context<AnalyticsTable> & {
    selectedItemsController: Controller<Dictionary<AnalyticsTable>>
    idKey: string
  }

export default function Component(): JSX.Element {
  const displayName = `${SLICE}-Page_list`

  const selectedItemsController = useMemo(() => createController<Dictionary<AnalyticsTable>>({}), [])

  const sortController = useMemo(() => createController<ToSort<Dictionary> | undefined>(undefined), [])
  const [sortParam, , setSort] = useSort([sortController.set])
  sortController.subscribe((value, prev) => prev !== value && setSort(value))

  const runAnalyticsDialogController = useMemo(() => createController(false), [])

  const [columnSearchParams, setColumnSearchParams] = useQueryParam<
    string,
    SearchColumnTypes.ReplaceValueByFilter<AnalyticsTable>
  >('columnSearch', JSONParam as Any)

  const [{ page = 1, limit = 100 }, setPaginationParams] = useQueryParams(
    {
      page: withDefault(NumberParam, 1),
      limit: withDefault(NumberParam, 100),
    },
    { removeDefaultsFromUrl: true },
  )

  const requestParams = {
    where: { ...columnSearchParams },
    offset: (page - 1) * limit,
    limit,
    sort: sortParam,
  }

  const tableListFetcher = api.findManyAndCountTables.useCache(requestParams, {
    keepPreviousData: true,
    staleTime: 10_000,
  })

  const analyticalActionsListFetcher = getMany.useCache()

  const uiColumns = useMemo(buildUiColumns, [])

  return (
    <>
      <main className={displayName} style={{ position: 'relative' }}>
        <RenderCounter style={{ top: 0 }} />
        <Container p='4'>
          <Section size='1' className={c(cssAnimations.Appear)}>
            <_Heading />
          </Section>

          <Section size='1' className={c(cssAnimations.Appear)} style={{ animationDelay: `${TICK_MS * 3}ms` }}>
            <Pagination
              currentPage={page}
              limit={limit}
              loading={!tableListFetcher ? false : tableListFetcher.isFetching}
              totalElements={tableListFetcher?.data?.total}
              onChange={(page) => setPaginationParams({ page })}
            />
          </Section>

          <Section>
            <Flex style={{ position: 'relative' }}>
              <_SelectionActions
                selectedItemsController={selectedItemsController}
                onRunAnalyticsClick={() => runAnalyticsDialogController.set(true)}
                style={{ position: 'absolute', top: '-1.5rem', left: '0' }}
              />
              <FetcherStatus
                isChildrenOnFetchingVisible={true}
                isLoading={tableListFetcher.isLoading}
                isFetching={tableListFetcher.isFetching}
                isError={tableListFetcher.isError}
                error={tableListFetcher.error?.response?.data}
                refetch={tableListFetcher.refetch}
              >
                <ScrollArea scrollbars='horizontal'>
                  <ListTable<AnalyticsTable, TableContext>
                    className={c(cssAnimations.Appear)}
                    list={tableListFetcher.data?.items ?? []}
                    columns={uiColumns}
                    context={{
                      idKey: 'id',
                      selectedItemsController,
                      sortController: sortController,
                      searchFilter: columnSearchParams,
                      setSearchFilter: (value) => {
                        const newValue = typeof value === 'function' ? value(columnSearchParams as any) : value
                        setColumnSearchParams(newValue as any)
                      },
                    }}
                  />
                </ScrollArea>
              </FetcherStatus>
            </Flex>
          </Section>
        </Container>
      </main>

      <_RunAnalyticsDialog
        analyticalActions={analyticalActionsListFetcher.data?.data ?? []}
        dialogController={runAnalyticsDialogController}
        selectedItemsController={selectedItemsController}
      />
    </>
  )

  function buildUiColumns(): ColumnTypes.Column<AnalyticsTable, TableContext>[] {
    const selectionColumn = createSelectionColumn<AnalyticsTable, TableContext>()
    const columns: ColumnTypes.Column<AnalyticsTable, TableContext>[] = [
      {
        accessorKey: 'serviceDisplay',
        name: 'Сервис',
        renderCell: (props) => <HighlightedText>{props.item.serviceDisplay}</HighlightedText>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'databaseName',
        name: 'База данных',
        renderCell: (props) => <HighlightedText>{props.item.databaseName}</HighlightedText>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'databaseDisplay',
        name: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.databaseDisplay}</Text>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'schemaName',
        name: 'Схема',
        renderCell: (props) => <HighlightedText>{props.item.schemaName}</HighlightedText>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'schemaDisplay',
        name: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.schemaDisplay}</Text>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'name',
        name: 'Таблица',
        renderCell: (props) => <HighlightedText>{props.item.name}</HighlightedText>,
        renderHeader: (props) => props.name,
      },
      {
        accessorKey: 'display',
        name: '(бизнес название)',
        renderCell: (props) => <Text color='gray'>{props.item.display}</Text>,
        renderHeader: (props) => props.name,
      },
    ]

    const searchColumns = columns.map(SearchColumn.toSearchColumn)
    const sortColumns = searchColumns.map(ListTable.Sort.injectIntoHeader)

    return [selectionColumn, ...sortColumns]
  }
}