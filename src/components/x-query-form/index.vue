<template>
  <el-form class="x-query-form" v-bind="$attrs">
    <div class="x-query-form__content">
      <slot />
    </div>

    <div
      v-if="$slots.action"
      class="x-query-form__action"
      :style="{
        width: actionWidth,
      }"
    >
      <slot name="action" />
    </div>
  </el-form>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface FormCardProps {
  actionWidth?: string
}

withDefaults(
  defineProps<FormCardProps>(),
  {
    actionWidth: '86px',
  },
)
</script>

<style lang="scss">
.x-query-form {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: flex-start;

  &__content {
    flex: 1 1 0%;
  }

  &__action {
    margin-left: var(--app-margin);
    text-align: right;
  }
}

@media only screen and (width <= 768px) {
  .x-query-form {
    &__action {
      flex-basis: 100%;
      margin-left: 0;
    }
  }
}
</style>
