import { ElDivider, ElSpace } from 'element-plus'

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
