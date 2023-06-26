<template>
  <svg class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`)
    return {
      iconName,
    }
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentcolor;

  &::after {
    position: absolute;
    z-index: 1;
    cursor: pointer;
    content: '';
    pointer-events: none;
    inset: 0;
  }
}
</style>
