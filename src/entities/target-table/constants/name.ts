import { NAME } from '~dnp/common/entities/target-table/constants'
import { uncapitalize, unspace } from '~dnp/utils/string'

const SYSNAME = uncapitalize(unspace(NAME))

export { NAME, SYSNAME }
