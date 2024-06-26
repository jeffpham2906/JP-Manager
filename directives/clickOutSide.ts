const handleClickOutSide = (
  event: MouseEvent,
  el: HTMLElement,
  callback: Function
) => {
  if (el && !el.contains(event.target as Node)) {
    callback()
  }
}
export const vClickOutSide = {
  mounted: (el: HTMLElement, { value: callback }: { value: Function }) => {
    document.addEventListener('click', (e) =>
      handleClickOutSide(e, el, callback)
    )
  },
  beforeUnmount(el: HTMLElement, { value: callback }: { value: Function }) {
    document.removeEventListener('click', (e) =>
      handleClickOutSide(e, el, callback)
    )
  },
}
