<script lang="ts">
export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()

    onBeforeMount(() => {
      const path = route.params.path as string
      router.replace({ path })
    })

    return () => null
  },
})
</script>
