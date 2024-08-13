import React, { useContext } from 'react'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'
import Type from '../../type'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import { ChevronLeftIcon, ChevronRightIcon } from '~/ui/icon'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
}

export const NAME = `${ROOT_NAME}-w-Breadscrums`

/**
 * explorer-Viewer-w-Breadscrums
 */
export default function Component(props: Props): JSX.Element {
  const { className } = props

  const { loading = false, paths = [], onPathChange } = useContext(context)

  return (
    <Flex className={c(className, NAME)} gap='4' align='center' height='var(--space-7)'>
      <Button
        square={true}
        loading={loading}
        disabled={paths.length <= 1}
        variant='outline'
        onClick={() => {
          paths.pop()
          onPathChange?.([...paths])
        }}
      >
        <ChevronLeftIcon />
      </Button>

      <Flex gap='3' align='center'>
        {paths.map((path, i) => (
          <React.Fragment key={i}>
            <Flex gap='2' align='center' asChild>
              <Button
                key={i}
                variant={i === 0 ? 'soft' : 'ghost'}
                size={i === 0 ? '3' : '2'}
                onClick={() => {
                  if (paths.length - 1 === i) return
                  onPathChange?.(paths.slice(0, i - 1))
                }}
              >
                <Type value={path.type} />
                <div className={`${NAME}_name`}>{path.name}</div>
              </Button>
            </Flex>
            {paths.length - 1 !== i && <ChevronRightIcon />}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
