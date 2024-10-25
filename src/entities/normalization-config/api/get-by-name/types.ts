import { type Id } from '~dnp/utils/core'

import { type NormalizationConfig } from '../../types/normalization-config'

export interface RequestData {
  name: Id
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = NormalizationConfig
