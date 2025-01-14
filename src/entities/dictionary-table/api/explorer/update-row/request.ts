import { type Response } from '~/shared/api'
import api from '~/shared/api'
import { type Where } from '~/slices/where'

import { SLICE } from '../../../constants.name'
import { type DictionaryTable, type Row } from '../../../models/dictionary-table'
import { v1Url } from '../../constants.v1-url'

export const NAME = `${SLICE}.explorerUpdateRow`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Where }

export type ResponseData = {
  dictionaryTable: DictionaryTable
  row: Row
}

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
