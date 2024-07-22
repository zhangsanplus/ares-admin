import { breakpointsAntDesign } from '@vueuse/core'

export interface XQueryFormProps {
  direction?: 'vertical' | 'horizontal'
  xs?: number // 480
  sm?: number // 576
  md?: number // 768
  lg?: number // 992
  xl?: number // 1200
  xxl?: number // 1600
}

// https://ant.design/components/layout/#breakpoint-width
type Size = keyof typeof breakpointsAntDesign

const sizes: Size[] = ['sm', 'xs', 'md', 'lg', 'xl', 'xxl']

export default function useQueryForm(props: XQueryFormProps) {
  const breakpoints = useBreakpoints(breakpointsAntDesign)
  const activeSize = breakpoints.active()
  const cols = computed(() => {
    const index = sizes.indexOf(activeSize.value as Size)

    for (let i = index; i >= 0; i--) {
      const size = sizes[i] as Size
      if (props[size]) {
        return props[size]
      }
    }
  })

  return {
    cols,
    breakpoints,
  }
}
