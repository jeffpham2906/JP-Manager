export default () => {
  const isLoading = ref(false)
  const showLoading = () => (isLoading.value = true)
  const hideLoading = () => (isLoading.value = false)
  return { isLoading, showLoading, hideLoading }
}
