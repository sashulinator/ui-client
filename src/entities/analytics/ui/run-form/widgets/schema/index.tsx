import { Text } from '@radix-ui/themes'

import { useField } from 'react-final-form'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import { TreeCheckbox } from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import Table from '../table'

export interface Props {
  className?: string | undefined
  tables: Record<
    string,
    {
      name: string
      display: string
      columns: Record<
        string,
        {
          name: string
          display: string
          actions: AnalyticalActions[]
        }
      >
    }
  >
  name: string
  display: string
}

const NAME = 'dnp-e-analytics-Form-w-Schema'

export default function Component(props: Props): JSX.Element {
  const { name, display, tables } = props

  const field = useField<{ [name: string]: AnalyticalActions[] }>(name)

  return (
    <Flex className={c(props.className, NAME)} gap='4'>
      <Flex width='300px' gap='2'>
        <TreeCheckbox treeChecked={field.input.value} onTreeCheckedChange={field.input.onChange} />
        <Flex direction='column'>
          <HighlightedText tooltipContent='Бизнес название схемы'>{display}</HighlightedText>
          <Text color='gray'>{display}</Text>
        </Flex>
      </Flex>
      <Flex direction='column'>
        {Object.values(tables).map((table) => {
          return (
            <Table key={table.name} columns={table.columns} name={`${name}.${table.name}`} display={table.display} />
          )
        })}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME