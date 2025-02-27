import { type Response } from '~/shared/api'
import api from '~/shared/api'

import { SYSNAME } from '../../constants/name'
import { type CreateOperationalTable, type OperationalTable } from '../../types/operational-table'
import { url } from '../common'

export const NAME = `${SYSNAME}.create`

export type RequestData = { input: CreateOperationalTable }

export type ResponseData = OperationalTable

export const buildURL = (): string => url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
