import type { Tables } from '~/database'
import type { AllQueryType } from '~/types/common'

export default () => {
  const { $supabase } = useNuxtApp()
  const resource = 'order_products'
  const getOrder = (options?: AllQueryType<any>) => {
    let query = $supabase
      .from(resource)
      .select('*', { count: 'exact' })
      .order('created_time', { ascending: false })

    if (options?.page && options?.limit) {
      const start = (options.page - 1) * options.limit
      const end = start + options.limit - 1
      query.range(start, end)
    }
    if (options?.search) {
      query.textSearch('product_name', options.search)
    }
    if (options?.filter && Object.keys(options.filter).length >= 1) {
      const keys = Object.keys(options.filter)
      for (let key of keys) {
        query.gte(key, new Date(options.filter[key].gte).toISOString())
        query.lte(key, new Date(options.filter[key].lte).toISOString())
      }
    }
    return query
  }

  const getOneOrder = async (id: number) => {
    return $supabase.from(resource).select('*').eq('id', id).single()
  }

  const deleteOrder = async (id: number) => {
    return $supabase.from(resource).delete().eq('id', id).select('*')
  }

  const createOrder = async (data: Tables<'order_products'>) => {
    return $supabase.from(resource).insert(data).select()
  }

  const updateOrder = async (data: Tables<'order_products'>, id: number) => {
    return $supabase.from(resource).update(data).eq('id', id).select().single()
  }
  return { getOrder, deleteOrder, createOrder, getOneOrder, updateOrder }
}
