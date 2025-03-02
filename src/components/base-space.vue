<script lang="tsx">
import { ElDivider, ElSpace } from 'element-plus'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'BaseSpace',
  setup(_, { attrs, slots }) {
    const spacer = h(ElDivider, { direction: 'vertical' })

    return () => (
      <ElSpace spacer={spacer} size={2} {...attrs}>
        {slots.default?.()}
      </ElSpace>
    )
  },
})
</script>
