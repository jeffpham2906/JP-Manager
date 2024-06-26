export const getItems = () => {
  // const { t } = useNuxtApp().$i18n
  return [
    {
      label: 'Home',
      key: 'Home',
      url: '/',
      icon: 'i-material-symbols:house-outline',
    },
    {
      label: 'Order',
      key: 'Order',
      icon: 'i-material-symbols:border-all-outline-rounded',
      url: '/order/list',
    },
  ]
}
