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
import { defineComponent } from 'vue'

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

interface ComponentOption {
  label: string | number
  value: string | number
}

type ComponentMap = typeof componentMap
type ComponentPropsMap = {
  [K in keyof ComponentMap]?: InstanceType<ComponentMap[K]>['$props']
}

type ComponentPropsMapWithOptions<T> = {
  [K in keyof T]: K extends 'checkbox' | 'radio' | 'select'
    ? (T[K] & { options: ComponentOption[] })
    : T[K]
}

type ComponentPropsMapWithButton<T> = {
  [K in keyof T]: K extends 'checkbox' | 'radio' | 'select'
    ? (T[K] & { button?: boolean })
    : T[K]
}

export type FromComponentType = keyof ComponentMap
export type FromComponentPropsMap
  = ComponentPropsMapWithButton<
    ComponentPropsMapWithOptions<ComponentPropsMap>
  >

interface FromComponentSlotNamesMap {
  'input': 'prefix' | 'prepend' | 'append' | 'suffix'
  'select': 'header' | 'footer' | 'empty' | 'prefix' | 'tag' | 'label'
  'select-v2': 'header' | 'footer' | 'empty' | 'prefix' | 'tag' | 'label'
}

export type FromComponentSlotsMap = {
  [K in keyof ComponentPropsMap]: K extends keyof FromComponentSlotNamesMap
    ? {
        [P in FromComponentSlotNamesMap[K]]?: (scope: any) => any
      }
    : never
}

type PartialFromComponentPropsMap = {
  [K in keyof FromComponentPropsMap]: Partial<FromComponentPropsMap[K]>
}

export const defaultProps: PartialFromComponentPropsMap = {
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
  name: 'FormComponent',
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
    const renderOptions = () => {
      if (props.options?.length === 0) return null

      return props.options.map((option) => {
        const ButtonComponent = props.type === 'checkbox'
          ? ElCheckboxButton
          : ElRadioButton
        const BaseComponent = props.type === 'checkbox'
          ? ElCheckbox
          : ElRadio

        return attrs.button
          ? (
              <ButtonComponent
                key={option.value}
                label={option.label}
                value={option.value}
              />
            )
          : (
              <BaseComponent
                key={option.value}
                label={option.label}
                value={option.value}
              />
            )
      })
    }

    if (props.type === 'select-v2') {
      const CurrentComponent = componentMap[props.type]
      return () => (
        <CurrentComponent
          {...attrs}
          v-slots={props.slots}
          {...{ options: props.options }}
        />
      )
    }

    if (props.type === 'checkbox' || props.type === 'radio') {
      const CurrentComponent = componentMap[props.type]
      return () => (
        <CurrentComponent
          {...attrs}
          v-slots={props.slots}
          {...{ options: props.options }}
        >
          {renderOptions()}
        </CurrentComponent>
      )
    }

    if (props.type === 'select') {
      const CurrentComponent = componentMap[props.type]
      return () => (
        <CurrentComponent
          {...attrs}
          v-slots={props.slots}
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
        </CurrentComponent>
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
