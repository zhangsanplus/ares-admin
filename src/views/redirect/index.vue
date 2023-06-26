<script lang="ts">
export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({
        path: `/${Array.isArray(path) ? path.join('/') : path}`,
        query,
      })
    })
    return () => null
  },
})
</script>
