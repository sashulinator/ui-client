import ArrowLeft from '../widgets/arrow-left'
import ArrowRight from '../widgets/arrow-right'
import Check from '../widgets/check'
import ChevronDown from '../widgets/chevron-down'
import ChevronLeft from '../widgets/chevron-left'
import ChevronRight from '../widgets/chevron-right'
import ChevronUp from '../widgets/chevron-up'
import Clear from '../widgets/clear'
import Cross1 from '../widgets/cross1'
import Cross2 from '../widgets/cross2'
import Database from '../widgets/database'
import DatabaseSchema from '../widgets/database-schema'
import DotsVertical from '../widgets/dots-vertical'
import DoubleChevronLeft from '../widgets/double-chevron-left'
import DoubleChevronRight from '../widgets/double-chevron-right'
import Filter from '../widgets/filter'
import InfoCircled from '../widgets/info-circled'
import Pencil from '../widgets/pencil'
import Plus from '../widgets/plus'
import Postgres from '../widgets/postgres'
import Refresh from '../widgets/refresh'
import Star from '../widgets/star'
import Table from '../widgets/table'
import Trash from '../widgets/trash'
import User from '../widgets/user'

export const map = {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clear,
  Cross1,
  Cross2,
  Database,
  DatabaseSchema,
  DotsVertical,
  DoubleChevronLeft,
  DoubleChevronRight,
  Filter,
  InfoCircled,
  Plus,
  Postgres,
  Refresh,
  Star,
  Table,
  Trash,
  User,
  Pencil,
} satisfies Record<string, React.FC<React.SVGAttributes<SVGSVGElement>>>

export type IconName = keyof typeof map
