import { List } from '~dnp/shared/api'
import { StringFilter } from '~dnp/shared/api/types/string-filter'

import { NormalizationConfig } from '../../types/normalization-config'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
  }
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = List<NormalizationConfig>
