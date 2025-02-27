import { NAME } from '~/common/entities/operational-table/constants'
import { uncapitalize, unspace } from '~/utils/string'

const SYSNAME = uncapitalize(unspace(NAME))

export { NAME, SYSNAME }
