<template>
  <ElDialog
    v-model="dialogVisible"
    :width="600"
    title="自定义列"
  >
    <!-- footer -->
    <template #footer>
      <ElRow type="flex" justify="center">
        <ElButton @click="handleCancel">
          取消
        </ElButton>
        <ElButton type="primary" @click="handleConfirm">
          确定
        </ElButton>
      </ElRow>
    </template>

    <!-- body -->
    <div class="custom-columns">
      <template v-for="(item) in items" :key="item.prop || item.type">
        <ElCheckbox
          v-if="!item.type"
          v-model="item.show"
          :label="item.label"
          size="large"
        />
      </template>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
interface ModalProps {
  visible: boolean
  columns: XTableColumn[]
}

type XCustomColumn = XTableColumn & {
  show: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'visibleChange', value: boolean): void
  (e: 'change', value: XTableColumn[]): void
}>()

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => {
    emit('update:visible', val)
    emit('visibleChange', val)
  },
})

const items = ref<XCustomColumn[]>([])

watch(
  () => props.visible,
  (value) => {
    if (value) {
      items.value = props.columns.map(i => ({
        ...i,
        show: !i.hidden,
      }))
    }
  },
)

function handleConfirm() {
  const data = items.value.map((i) => {
    const { show, ...rest } = i
    return {
      ...rest,
      hidden: !show,
    }
  })
  emit('change', data)
  dialogVisible.value = false
}

function handleCancel() {
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
  .custom-columns {
    min-height: 100px;
    padding: 10px;

    .el-checkbox {
      width: 18%;
      margin-right: 10px;
    }
  }
</style>
