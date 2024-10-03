import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import { routes } from '~/app/route'
import { Item, api } from '~/entities/dictionary-table'
import Button from '~/shared/button'
import Container from '~/shared/container'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { Heading, Pagination } from '~/shared/page'
import Section from '~/shared/section'

import { SYSNAME } from '../constants/name'

export interface Props {
  className?: string | undefined
}

const displayName = `${SYSNAME}-Page_list`

/**
 * page-DictionaryTable
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = api.fetchList.useCache({ take, skip: (page - 1) * take }, { keepPreviousData: true })

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading.Root
              loading={fetcherList.isLoading && fetcherList.data === undefined}
              route={routes.dictionaryTables}
              backRoute={routes.main}
              renderIcon={routes.dictionaryTables.payload.renderIcon}
            >
              <Heading.BackToParent />
              <Heading.Name />
            </Heading.Root>
            <Flex align='center' gap='2'>
              <Button variant='outline' asChild>
                <Link to={routes.storeConfigs_kn.getUrl('workingTable')}>Хранилище</Link>
              </Button>
              <Button asChild>
                <Link to={routes.dictionaryTables_create.getUrl()}>Создать</Link>
              </Button>
            </Flex>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            loading={fetcherList.isFetching}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
          />
        </Section>
        <Section size='1'>
          <Flex gap='4' direction={'column'}>
            {fetcherList.data?.items?.map((item) => {
              return <Item key={item.kn} item={item} />
            })}
          </Flex>
        </Section>
        <Section></Section>
      </Container>
    </main>
  )
}

Component.displayName = displayName