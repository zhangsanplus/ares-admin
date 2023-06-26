interface AppDefaultSettings {
  storagePrefix: string
  title: string
  menuWidth: number
  theme: 'light' | 'dark' | 'auto'
}

const defaultSettings: AppDefaultSettings = {
  theme: 'light',
  title: 'Ares Admin',
  storagePrefix: 'ares',
  menuWidth: 220,
}

export default defaultSettings