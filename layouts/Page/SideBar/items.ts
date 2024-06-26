export const getItems = () => {
  const { t } = useNuxtApp().$i18n
  return [
    {
      label: t('Home'),
      key: 'Home',
      url: '/',
      icon: 'i-material-symbols:house-outline',
    },
    {
      label: t('Order'),
      key: 'Order',
      icon: 'i-material-symbols:border-all-outline-rounded',
      url: '/order/list',
    },
  ]
}
