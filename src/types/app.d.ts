declare namespace AppType {
  interface DefaultSetting {
    theme: 'light' | 'dark' | 'auto'
    size: 'large' | 'default' | 'small'
    storagePrefix: string
    title: string
    menuWidth: number
    showTabs: boolean
  }

  type Device = 'desktop' | 'mobile'
}
