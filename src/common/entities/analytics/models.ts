import * as v from 'valibot'

/**
 * AnalyticalActions
 */

export const analyticalActions = v.object({
  id: v.number(),
  description: v.string(),
  name: v.string(),
  display: v.string(),
  group: v.string(),
  isText: v.boolean(),
  isInt: v.boolean(),
  isDate: v.boolean(),
})

export type AnalyticalActions = v.InferOutput<typeof analyticalActions>