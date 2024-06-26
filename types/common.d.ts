export interface AllQueryType<F> {
  id?: string
  type?: string
  limit?: number
  filter?: F
  search?: string
  sort?: any
  page?: number
}
