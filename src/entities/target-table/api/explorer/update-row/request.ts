import { type Response } from '~/shared/api'
import api from '~/shared/axios'
import { type Where } from '~/shared/where'

import { SYSNAME } from '../../../constants/name'
import { type Row, type TargetTable } from '../../../types/target-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerUpdateRow`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Where }

export type ResponseData = {
  targetTable: TargetTable
  row: Row
}

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
