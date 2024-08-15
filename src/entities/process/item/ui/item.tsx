import { Avatar } from '@radix-ui/themes'
import dayjs from 'dayjs'
import { Process } from '../../types/process'
import './item.scss'
import Badge from '~/ui/badge'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import Text from '~/ui/text'
import TextHighlighter from '~/ui/text-highlighter'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  item: Process
}

const displayName = 'process-Item'

/**
 * process-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.id} asChild={false} className={c(displayName, className)}>
      <Flex>
        <TextHighlighter size='4' tooltipContent='Название конфига нормализации'>
          {item.normalizationConfig.name}
        </TextHighlighter>
      </Flex>
      <Flex gap='4'>
        <Flex align='center' gap='2'>
          {item.normalizationConfig.last ? <Badge color='green'>Текущий</Badge> : <Badge color='red'>Архивный</Badge>}
          <TextHighlighter color='yellow' tooltipContent='Версия конфига нормализации'>
            {item.normalizationConfig.v}
          </TextHighlighter>
        </Flex>
        <Flex gap='2' align='center'>
          <Tooltip content={item.createdBy.name}>
            <Avatar radius='full' size='1' fallback='a' src={item.createdBy.avatar} />
          </Tooltip>
          <Tooltip content='Создано'>
            <Text color='gray' as='div' size='2'>
              {dayjs(item?.createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  )
}

Component.displayName = displayName
