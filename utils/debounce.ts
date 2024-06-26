export const debounce = (func: Function, delay: number) => {
  // closure
  let timer: string | number | NodeJS.Timeout | undefined
  return (): void => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      await func()
    }, delay)
  }
}
