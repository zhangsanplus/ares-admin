<template>
  <el-dialog
    v-model="dialogVisible"
    :width="600"
    title="自定义列"
  >
    <!-- footer -->
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </el-row>
    </template>

    <!-- body -->
    <div class="custom-columns">
      <template v-for="(item) in items" :key="item.prop || item.type">
        <el-checkbox v-if="!item.type" v-model="item.show" :label="item.label" size="large" />
      </template>
    </div>
  </el-dialog>
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
