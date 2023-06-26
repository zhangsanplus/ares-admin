import defaultSettings from '@/settings'

const { storagePrefix } = defaultSettings
const useAppStore = defineStore('app', () => {
  const title = ref(defaultSettings.title)
  const menuWidth = ref(defaultSettings.menuWidth)
  const device = ref<'desktop' | 'mobile'>('desktop')
  const collapsed = useStorage(`${storagePrefix}-collapsed`, false)
  const isDark = useDark({
    initialValue: defaultSettings.theme,
    storageKey: `${storagePrefix}-theme`,
  })

  /**
   * 切换暗黑模式
   */
  function toggleDark() {
    isDark.value = !isDark.value
    useToggle(isDark)
  }

  /**
   * 切换侧边菜单
   */
  function toggleCollapse() {
    collapsed.value = !collapsed.value
  }

  /**
   * 切换侧边菜单
   */
  function setCollapse(value: boolean) {
    collapsed.value = value
  }

  /**
   * set device
   */
  function setDevice(value: 'desktop' | 'mobile') {
    device.value = value
  }

  return {
    isDark,
    title,
    device,
    collapsed,
    menuWidth,
    toggleCollapse,
    toggleDark,
    setCollapse,
    setDevice,
  }
})

export default useAppStore