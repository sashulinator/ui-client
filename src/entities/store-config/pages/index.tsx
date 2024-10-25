import { NumberParam, withDefault } from 'serialize-query-params'
import { useQueryParams } from 'use-query-params'

import { routes } from '~dnp/app/route'
import { Item, fetchList } from '~dnp/entities/store-config'
import Button from '~dnp/shared/button'
import Container from '~dnp/shared/container'
import Flex from '~dnp/shared/flex'
import Heading from '~dnp/shared/heading'
import Link from '~dnp/shared/link'
import { Pagination } from '~dnp/shared/page'
import Section from '~dnp/shared/section'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-StoreConfig'

/**
 * page-storeConfig
 */
export default function Component(): JSX.Element {
  const [{ page = 1, take = 10 }, setPaginationParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    take: withDefault(NumberParam, 10),
  })

  const fetcherList = fetchList.useCache({ take, skip: (page - 1) * take })

  return (
    <main className={displayName}>
      <Container p='var(--space-4)'>
        <Section size='1'>
          <Flex width='100%' justify='between'>
            <Heading>{routes.storeConfigs.getName()}</Heading>
            <Button size='1' asChild>
              <Link to={routes.storeConfigs_create.getUrl()}>Создать</Link>
            </Button>
          </Flex>
        </Section>
        <Section size='1'>
          <Pagination
            currentPage={page}
            limit={take}
            totalElements={fetcherList.data?.total}
            onChange={(page) => setPaginationParams({ page }, 'replace')}
            loading={fetcherList.isFetching}
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
