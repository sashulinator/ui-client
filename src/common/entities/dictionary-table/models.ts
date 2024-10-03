import * as v from 'valibot'

import { crudableModel } from '~/common/shared/crud/models/crudable'

import { getKeys } from '../../shared/dictionary'
import { columnModel, databaseTableModel } from '../../shared/working-table'
import { userSchema } from '../user'

/**
 * BaseDictionaryTable
 */

export const baseDictionaryTableSchema = v.object({
  kn: v.string(),
  name: v.string(),
  nav: v.boolean(),
  tableName: v.string(),
  tableSchema: v.lazy(() => tableSchemaSchema),
  // meta
  ...crudableModel.entries,
})

export type BaseDictionaryTable = v.InferOutput<typeof baseDictionaryTableSchema>

/**
 * Relations
 */

export const dictionaryTableRelationsSchema = v.object({
  createdBy: userSchema,
  updatedBy: userSchema,
})

export type DictionaryTableRelations = v.InferOutput<typeof dictionaryTableRelationsSchema>

/**
 * DictionaryTable
 */

export const dictionaryTableSchema = v.intersect([baseDictionaryTableSchema, dictionaryTableRelationsSchema])

export type DictionaryTable = v.InferOutput<typeof dictionaryTableSchema>

/**
 * CreateDictionaryTable
 */

export const createDictionaryTableSchema = v.omit(baseDictionaryTableSchema, getKeys(crudableModel.entries))

export type CreateDictionaryTable = v.InferOutput<typeof createDictionaryTableSchema>

/**
 * UpdateDictionaryTable
 */

export const updateDictionaryTableSchema = v.omit(baseDictionaryTableSchema, getKeys(crudableModel.entries))

export type UpdateDictionaryTable = v.InferOutput<typeof updateDictionaryTableSchema>

/**
 * TableSchema
 */

export const tableSchemaSchema = v.intersect([
  databaseTableModel,
  v.object({
    defaultView: v.union([v.literal('tree'), v.literal('table')]),
  }),
])

export type TableSchema = v.InferOutput<typeof tableSchemaSchema>

/**
 * TableSchemaItem
 */

export const tableSchemaItemSchema = v.intersect([columnModel])

export type TableSchemaItem = v.InferOutput<typeof tableSchemaItemSchema>

/**
 * Row
 */

export const rowSchema = v.objectWithRest(
  {
    _id: v.string(),
  },
  v.string(),
)

export type Row = v.InferOutput<typeof rowSchema>