import type { LocationQuery, LocationQueryRaw } from 'vue-router'
import type { AllQueryType } from '~/types/common'
type onChangeFuncType = ({}: AllQueryType<any>) => Promise<any>
interface PagingProps {
  pageName?: string
  updateUrl?: boolean
  onChange?: onChangeFuncType
}
export type PageType = ReturnType<typeof usePaging>
export const usePaging = ({ pageName, onChange, updateUrl }: PagingProps) => {
  const route = useRoute()
  const router = useRouter()
  const pageRef = ref(1)
  const limitRef = ref(10)
  const search = ref('')
  const totalCount = ref(0)
  const pageCount = computed(() =>
    Math.round(totalCount.value / limitRef.value)
  )
  const filter = ref<{ [k: string]: any }>({})

  const setUrl = (query: LocationQueryRaw) => {
    router.push({ query: { ...route.query, ...query } })
  }

  const setSearch = async (query: string, trigger: boolean = true) => {
    pageRef.value = 1
    search.value = query

    if (updateUrl) setUrl({ search: query, page: 1 })
    if (trigger && onChange) {
      await fireCallback()
    }
  }

  const setPage = async (newPage: number, trigger: boolean = true) => {
    if (updateUrl)
      setUrl({
        page: newPage,
        limit: limitRef.value,
      })
    pageRef.value = newPage
    if (trigger && onChange) {
      await fireCallback()
    }
  }
  const setLimit = async (newLimit: number, trigger: boolean = true) => {
    if (updateUrl) setUrl({ page: 1, limit: newLimit })
    limitRef.value = newLimit
    pageRef.value = 1
    if (trigger && onChange) {
      await fireCallback()
    }
  }
  const setFilter = async (myFilter: any, trigger: boolean = true) => {
    filter.value = { ...myFilter }
    const serialized = JSON.stringify({ ...filter.value })
    if (updateUrl) setUrl({ filter: serialized })
    if (trigger && onChange) {
      await fireCallback()
    }
  }
  const getQuery = () => {
    const filter = route.query.filter
      ? JSON.parse((route.query.filter || {}) as string)
      : {}

    const page = Number(route.query.page) || pageRef.value
    const limit = Number(route.query.limit) || limitRef.value
    const search = route.query.search || ''
    return { filter, page, limit, search }
  }

  const fireCallback = async () => {
    if (!onChange) return
    const count = await onChange({
      search: search.value,
      page: pageRef.value,
      limit: limitRef.value,
      filter: {
        ...filter.value,
      },
    })
    totalCount.value = count
  }

  return {
    getQuery,
    setPage,
    setLimit,
    pageCount,
    pageRef,
    limitRef,
    totalCount,
    filter,
    setSearch,
    fireCallback,
    setFilter,
  }
}
