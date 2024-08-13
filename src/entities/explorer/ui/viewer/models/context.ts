import { createContext } from 'react'
import { Explorer, Path } from '../../../types/explorer'

export interface ContextProps {
  data?: Explorer | undefined
  loading?: boolean | undefined
  paths?: Path[] | undefined
  onPathChange?: (paths: Path[]) => void
}

export const context = createContext<ContextProps>({})