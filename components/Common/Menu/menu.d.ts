export type MenuNode = {
  key: string | number
  label: string
  icon?: string
  url?: string
  children?: MenuNode[]
  expanded?: boolean
}
