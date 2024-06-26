import dayjs from 'dayjs'
export const presetDates = [
  { label: 'Today', value: [dayjs().toDate(), dayjs().toDate()] },
  {
    label: 'Yesterday',
    value: [
      dayjs().subtract(1, 'day').toDate(),
      dayjs().subtract(1, 'day').toDate(),
    ],
  },
  {
    label: 'This week',
    value: [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
  },
  {
    label: 'Last week',
    value: [
      dayjs().subtract(1, 'week').startOf('week').toDate(),
      dayjs().subtract(1, 'week').endOf('week').toDate(),
    ],
  },
  {
    label: 'This month',
    value: [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
  },
  {
    label: 'Last month',
    value: [
      dayjs().subtract(1, 'month').startOf('month').toDate(),
      dayjs().subtract(1, 'month').endOf('month').toDate(),
    ],
  },
]
