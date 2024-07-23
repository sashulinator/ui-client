import { RequestData } from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getKeys(requestData: RequestData): unknown[] {
  return ['storeConfigs.findMany', requestData.skip, requestData.take, requestData.where]
}