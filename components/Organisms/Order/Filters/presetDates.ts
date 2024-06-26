import dayjs from 'dayjs'
export const presetDates = [
  { label: 'today', value: [dayjs().toDate(), dayjs().toDate()] },
  {
    label: 'yesterday',
    value: [
      dayjs().subtract(1, 'day').toDate(),
      dayjs().subtract(1, 'day').toDate(),
    ],
  },
  {
    label: 'this_week',
    value: [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
  },
  {
    label: 'last_week',
    value: [
      dayjs().subtract(1, 'week').startOf('week').toDate(),
      dayjs().subtract(1, 'week').endOf('week').toDate(),
    ],
  },
  {
    label: 'this_month',
    value: [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
  },
  {
    label: 'last_month',
    value: [
      dayjs().subtract(1, 'month').startOf('month').toDate(),
      dayjs().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
]
