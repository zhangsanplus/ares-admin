<template>
  <ElForm
    ref="formRef"
    class="x-form"
    :class="[`x-form-action--${actionPosition}`]"
    v-bind="$attrs"
    :model="modelValue"
  >
    <ElRow type="flex" :gutter :justify>
      <template v-for="column in displayColumns" :key="column.prop">
        <ElCol v-bind="column.colProps">
          <ElDivider v-if="column.type === 'divider'" v-bind="column.props">
            <template v-if="typeof column.label === 'string'">
              {{ column.label }}
            </template>
            <component :is="column.label" v-else />
          </ElDivider>

          <ElFormItem v-else v-bind="column.formItemProps" :prop="column.prop">
            <template #label>
              <component :is="resolveSlot(column.label)" />
              <span v-if="labelSuffix">{{ labelSuffix }}</span>
            </template>
            <slot :name="column.prop">
              <component
                :is="components[column.type]"
                v-if="column.type !== 'custom'"
                v-bind="column.props"
                :model-value="modelValue[column.prop]"
                @update:model-value="onValueChange($event, column.prop)"
              />
            </slot>
            <template v-for="(slot, name) in column.formItemSlots" :key="name" #[name]>
              <component :is="resolveSlot(slot)" />
            </template>
          </ElFormItem>
        </ElCol>
      </template>

      <ElCol v-if="search || $slots.action" v-bind="actionColProps">
        <ElFormItem label-width="0px" class="is-suffix-item">
          <ElSpace wrap>
            <slot name="action">
              <ElButton type="primary" @click="emit('search')">
                查询
              </ElButton>
              <ElButton @click="emit('reset')">
                重置
              </ElButton>
              <ElLink :underline="false" @click="collapsed = !collapsed">
                {{ collapsed ? '展开' : '收起' }}
                <ElIcon style="margin-left: 2px;">
                  <ArrowDown v-if="collapsed" />
                  <ArrowUp v-else />
                </ElIcon>
              </ElLink>
            </slot>
          </ElSpace>
        </ElFormItem>
      </ElCol>
    </ElRow>
  </ElForm>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { breakpointsElement, useBreakpoints } from '@vueuse/core'
import { ElForm } from 'element-plus'
import components, { defaultProps } from './components'
import { getGreaterSpan, getSumColProps, normalizeColProps, points } from './utils'

interface Emits {
  (e: 'update:modelValue', value: any): void
  (e: 'search'): void
  (e: 'reset'): void
}

interface Props {
  modelValue: any
  columns: XFormColumn[]
  labelSuffix?: string
  gutter?: XFormRowProps['gutter']
  justify?: XFormRowProps['justify']
  colProps?: XFormColProps
  actionColProps?: XFormColProps
  actionPosition?: 'inline' | 'right'
  collapsedRows?: number
  search?: boolean
  searchOnChange?: boolean
}

defineOptions({
  name: 'XForm',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  gutter: 18,
  justify: 'start',
  actionPosition: 'right',
  collapsedRows: 1,
  colProps: () => ({
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 6,
  }),
})

const emit = defineEmits<Emits>()

const collapsed = defineModel('collapsed', {
  type: Boolean,
  default: false,
})

const formRef = ref<typeof ElForm>()
const breakpoints = useBreakpoints(breakpointsElement)
const currentBreakpoint = breakpoints.active()

const normalizedColumns = computed(() => {
  return props.columns.map((column) => {
    const _props = defaultProps[column.type] || {}
    return {
      ...column,
      props: { ..._props, ...column.props },
      colProps: normalizeColProps(getColProps(column)),
    }
  })
})

const visibleColumns = computed(() => {
  return normalizedColumns.value.filter(isColumnVisible)
})

const displayColumns = computed(() => {
  const columns = visibleColumns.value
  if (!collapsed.value || props.collapsedRows <= 0) return columns
  const lastIndex = getDisplayIndex(columns, currentBreakpoint.value || 'xl')
  return columns.slice(0, lastIndex)
})

const actionDefaultCols = computed(() => {
  return normalizeColProps(props.actionColProps ?? props.colProps)
})

const actionColProps = computed(() => {
  const cols = { ...actionDefaultCols.value }
  if (props.actionPosition === 'right') {
    const list = displayColumns.value.map(column => column.colProps)
    const sumCols = getSumColProps(list)
    points.forEach((point) => {
      cols[point] = getGreaterSpan(sumCols[point], cols[point])
    })
  }
  return cols
})

function getColProps(column: XFormColumn) {
  if (column.type === 'divider') return { span: 24 }
  return column.colProps ?? props.colProps
}

function getDisplayIndex(columns: XFormParsedColumn[], point: keyof XFormParsedColProps) {
  const rowSpan = 24 * props.collapsedRows
  const remainingSpan = rowSpan - actionDefaultCols.value[point]
  const span = remainingSpan <= 0 ? rowSpan : remainingSpan

  let spanSum = 0
  for (let i = 0; i < columns.length; i++) {
    const colProps = columns[i].colProps!
    spanSum += colProps[point]
    if (spanSum > span) {
      return i
    }
  }

  return columns.length
}

function onValueChange(value: any, field: string) {
  emit('update:modelValue', Object.assign(props.modelValue, { [field]: value }))
  if (props.searchOnChange) {
    emit('search')
  }
}

function resolveSlot(label?: string | Component) {
  if (!label) return null
  return typeof label === 'string' ? () => label : label
}

function isColumnVisible(column: XFormParsedColumn) {
  if (typeof column.show !== 'undefined') {
    return typeof column.show === 'function'
      ? column.show(props.modelValue)
      : column.show
  }
  if (typeof column.hide !== 'undefined') {
    return !(typeof column.hide === 'function'
      ? column.hide(props.modelValue)
      : column.hide)
  }
  return true
}

defineExpose({ formRef })
</script>

<style lang="scss">
.x-form {
  .el-form-item {
    width: 100%;
    margin-bottom: 18px;
  }

  .is-suffix-item .el-space {
    width: 100%;
  }

  &.x-form-action--right{
    .el-form-item.is-suffix-item .el-space {
      justify-content: flex-end;
    }
  }

  .el-input,
  .el-input-number,
  .el-select,
  .el-date-editor.el-input,
  .el-date-editor.el-input__wrapper {
    width: 100%;
  }
}
</style>
