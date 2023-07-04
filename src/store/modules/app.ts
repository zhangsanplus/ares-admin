import defaultSetting from '@/settings'

const { storagePrefix } = defaultSetting
const useAppStore = defineStore('app', () => {
  const title = ref(defaultSetting.title)
  const menuWidth = ref(defaultSetting.menuWidth)
  const showTabs = ref(defaultSetting.showTabs)
  const device = ref<AppType.Device>('desktop')
  const size = useStorage<AppType.DefaultSetting['size']>(`${storagePrefix}-size`, defaultSetting.size)
  const collapsed = useStorage(`${storagePrefix}-collapsed`, false)
  const isDark = useDark({
    initialValue: defaultSetting.theme,
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
  function setDevice(value: AppType.Device) {
    device.value = value
  }

  /**
   * 修改 element 尺寸
   */
  function setSize(value: AppType.DefaultSetting['size']) {
    size.value = value
  }

  return {
    isDark,
    size,
    title,
    device,
    collapsed,
    menuWidth,
    showTabs,
    toggleCollapse,
    toggleDark,
    setCollapse,
    setDevice,
    setSize,
  }
})

export default useAppStore