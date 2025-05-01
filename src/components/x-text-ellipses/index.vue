<template>
  <span
    ref="containerRef"
    :class="textClasses"
    :style="{ '-webkit-line-clamp': props.rows }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <ElTooltip v-bind="tooltipBinding">
      <template #content>
        <slot name="tooltip">
          {{ textContent }}
        </slot>
      </template>
    </ElTooltip>
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rows?: number
    tooltipProps?: object
  }>(),
  {
    rows: 1,
    tooltipProps: () => ({}),
  },
)

const containerRef = ref<HTMLDivElement>()
const showTooltip = ref(false)
const textContent = ref('')
const isMultipleLines = computed(() => props.rows > 1)

const textClasses = computed(() => [
  'g-text-ellipses',
  'el-text',
  {
    'is-line-clamp': isMultipleLines.value,
    'is-truncated': !isMultipleLines.value,
  },
])

const tooltipBinding = computed(() => {
  return {
    'placement': 'top',
    ...props.tooltipProps,
    'visible': showTooltip.value,
    'virtual-triggering': true,
    'virtual-ref': containerRef.value,
  }
})

function checkOverflow() {
  if (!containerRef.value) return

  const el = containerRef.value
  let isOverflowed = false

  if (isMultipleLines.value) {
    isOverflowed = el.scrollHeight > el.clientHeight + 1
  } else {
    isOverflowed = el.scrollWidth > el.clientWidth
  }

  if (isOverflowed !== showTooltip.value) {
    showTooltip.value = isOverflowed
  }
}

function getText() {
  if (!containerRef.value) return

  const content = containerRef.value.textContent || ''
  if (content !== textContent.value) {
    textContent.value = content
  }
}

function onMouseEnter() {
  getText()
  checkOverflow()
}

function onMouseLeave() {
  showTooltip.value = false
}
</script>

<style lang="scss">
@forward 'element-plus/theme-chalk/src/text.scss';

.g-text-ellipses {
  word-break: break-word;
}
</style>
