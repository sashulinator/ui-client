import type { Response } from '~/shared/api'
import api from '~/shared/api'

import type { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `/api/v1/normalization-configs/${requestData.id}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { id, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ id }), { data: body })

  return response
}
