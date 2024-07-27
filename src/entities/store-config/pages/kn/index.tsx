import { SymbolIcon } from '@radix-ui/react-icons'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { safeParse } from 'valibot'
import {
  Form,
  FormValues,
  fromFormValues,
  getByKn,
  toFormValues,
  update,
  updateStoreConfigSchema,
} from '~/entities/store-config'
import { notify } from '~/shared/notification-list-store'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Container from '~/ui/container'
import Flex from '~/ui/flex'
import FForm, { toNestedErrors, useCreateForm } from '~/ui/form'
import Heading from '~/ui/heading'
import Section from '~/ui/section'
import Spinner from '~/ui/spinner'
import TextHighlighter from '~/ui/text-highlighter'
import Tooltip from '~/ui/tooltip'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-storeConfigs_id'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  const { kn = '' } = useParams<{ kn: string }>()

  const form = useCreateForm<FormValues>(
    {
      onSubmit: (values) => {
        updateMutator.mutate({ input: fromFormValues(values) })
      },
      validate: (values) => {
        const storeConfig = fromFormValues(values)
        const { issues } = safeParse(updateStoreConfigSchema, storeConfig)
        return toNestedErrors(issues)
      },
      initialValues: { kn },
    },
    { values: true },
  )

  const values = form.getState().values

  const updateMutator = update.useCache({
    onSuccess: (data) => {
      notify({ title: 'Сохранено', type: 'success' })
      getByKn.setCache({ kn }, data.data)
      form.initialize(toFormValues(data.data))
    },
    onError: () => notify({ title: 'Ошибка', description: 'Что-то пошло не так', type: 'error' }),
  })

  const fetcher = getByKn.useCache(
    { kn },
    {
      onSuccess: (data) => form.initialize(toFormValues(data)),
    },
  )

  const render = useCallback(() => <Form />, [])

  return (
    <main className={displayName}>
      <Container p='8'>
        {fetcher.isError && (
          <Flex width='100%' justify='center' gap='2' align='center'>
            Ошибка <Button onClick={() => fetcher.refetch()}>Перезагрузить</Button>
          </Flex>
        )}

        {!fetcher.isError && (
          <Section size='1'>
            <Heading>
              {routes.storeConfigs_kn.getName()}{' '}
              {values.kn && <TextHighlighter tooltipContent='Название'>{values.kn}</TextHighlighter>}{' '}
            </Heading>
          </Section>
        )}

        {fetcher.isLoading && (
          <Flex width='100%' justify='center'>
            <Spinner />
          </Flex>
        )}

        {fetcher.isSuccess && (
          <>
            <Section size='1'>
              <FForm
                form={form}
                // eslint-disable-next-line react-hooks/exhaustive-deps
                render={render}
              />
            </Section>

            <Card asChild>
              <Section size='1'>
                <Flex gap='2' direction='row' justify='end'>
                  <Flex gap='2' align='center'>
                    <Tooltip content='Сбросить'>
                      <span>
                        <Button
                          size='1'
                          variant='outline'
                          onClick={() => form.reset()}
                          disabled={!form.getState().dirty}
                          round={true}
                        >
                          <SymbolIcon />
                        </Button>
                      </span>
                    </Tooltip>
                    <Button
                      loading={updateMutator.isLoading}
                      disabled={!form.getState().dirty || form.getState().invalid}
                      onClick={form.submit}
                    >
                      Сохранить
                    </Button>
                  </Flex>
                </Flex>
              </Section>
            </Card>
          </>
        )}
      </Container>
    </main>
  )
}

Component.displayName = displayName