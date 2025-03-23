import type { PropType } from 'vue'
import {
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElOption,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelect,
  ElSelectV2,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'

// ==================== 类型定义 ====================

interface ComponentOption {
  label: string | number
  value: string | number
}

type ComponentMap = typeof componentMap
type ComponentPropsMap = {
  [K in keyof ComponentMap]?: InstanceType<ComponentMap[K]>['$props'] &
  // eslint-disable-next-line ts/no-empty-object-type
    (K extends 'checkbox' | 'radio' | 'select' ? { options: ComponentOption[] } : {}) &
  // eslint-disable-next-line ts/no-empty-object-type
    (K extends 'checkbox' | 'radio' ? { button?: boolean } : {})
}

interface ComponentSlotNamesMap {
  'input': 'prefix' | 'prepend' | 'append' | 'suffix'
  'select': 'header' | 'footer' | 'empty' | 'prefix' | 'tag' | 'label'
  'select-v2': 'header' | 'footer' | 'empty' | 'prefix' | 'tag' | 'label'
}

type PartialComponentPropsMap = {
  [K in keyof ComponentPropsMap]: Partial<ComponentPropsMap[K]>
}

export type FromComponentType = keyof ComponentMap
export type FromComponentPropsMap = ComponentPropsMap
export type FromComponentSlotsMap = {
  [K in keyof ComponentPropsMap]: K extends keyof ComponentSlotNamesMap
    ? { [P in ComponentSlotNamesMap[K]]?: (scope: any) => any }
    : never
}

// ==================== 组件映射 ====================

export const componentMap = {
  'divider': ElDivider,
  'input': ElInput,
  'input-number': ElInputNumber,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  'switch': ElSwitch,
  'select': ElSelect,
  'select-v2': ElSelectV2,
  'radio': ElRadioGroup,
  'checkbox': ElCheckboxGroup,
} as const

// ==================== 默认配置 ====================

export const defaultProps: PartialComponentPropsMap = {
  'input': {
    clearable: true,
    placeholder: '请输入',
  },
  'select': {
    clearable: true,
    placeholder: '请选择',
  },
  'select-v2': {
    clearable: true,
    placeholder: '请选择',
    options: [],
  },
  'date-picker': {
    type: 'date',
    valueFormat: 'YYYY-MM-DD',
    format: 'YYYY-MM-DD',
    placeholder: '请选择日期',
  },
  'time-picker': {
    type: 'time',
    valueFormat: 'HH:mm:ss',
    format: 'HH:mm:ss',
    placeholder: '请选择时间',
  },
  'divider': {
    contentPosition: 'left',
    style: {
      marginTop: '10px',
      marginBottom: '28px',
    },
  },
}

export default defineComponent({
  name: 'FieldComponent',
  inheritAttrs: false,
  props: {
    type: {
      type: String as PropType<FromComponentType>,
      required: true,
    },
    options: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    slots: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { attrs }) {
    if (props.type === 'select-v2') {
      return () => (
        <ElSelectV2
          v-slots={props.slots}
          {...attrs}
          options={props.options}
        />
      )
    }

    if (props.type === 'select') {
      return () => (
        <ElSelect
          v-slots={props.slots}
          {...attrs}
        >
          {
            props.options.map((option) => {
              return (
                <ElOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              )
            })
          }
        </ElSelect>
      )
    }

    if (props.type === 'checkbox') {
      return () => (
        <ElCheckboxGroup
          {...attrs}
          v-slots={props.slots}
        >
          {
            props.options.map(opt => attrs.button
              ? (
                  <ElCheckboxButton
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </ElCheckboxButton>
                )
              : (
                  <ElCheckbox
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </ElCheckbox>
                ))
          }
        </ElCheckboxGroup>
      )
    }

    if (props.type === 'radio') {
      return () => (
        <ElRadioGroup
          {...attrs}
          v-slots={props.slots}
        >
          {
            props.options.map(opt => attrs.button
              ? (
                  <ElRadioButton
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </ElRadioButton>
                )
              : (
                  <ElRadio
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </ElRadio>
                ))
          }
        </ElRadioGroup>
      )
    }

    const CurrentComponent = componentMap[props.type]
    return () => (
      <CurrentComponent
        {...attrs}
        v-slots={props.slots}
      />
    )
  },
})
