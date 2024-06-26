import dayjs from 'dayjs'

export const formatDate = (
  date?: string | number | null,
  format = 'YYYY-MM-DD'
) => {
  if (!date) return null
  return dayjs(date).format(format)
}
