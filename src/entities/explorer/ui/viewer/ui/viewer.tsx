import React from 'react'
import { ContextProps, context } from '../models/context'
import Flex from '~/ui/flex'
import { c } from '~/utils/core'

export interface Props extends Required<ContextProps> {
  className?: string | undefined
  children: React.ReactNode
}

export const NAME = 'explorer-Viewer'

/**
 * explorer-Viewer
 */
export default function Component(props: Props): JSX.Element {
  const { children, className, ...contextProps } = props

  return (
    <context.Provider value={contextProps}>
      <Flex direction='column' gap='4' width='100%' className={c(className, NAME)}>
        {children}
      </Flex>
    </context.Provider>
  )
}

Component.displayName = NAME
