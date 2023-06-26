export default function useLoading(initValue = false) {
  const loading = ref(initValue)
  const setLoading = (value: boolean) => {
    loading.value = value
  }
  const toggleLoading = () => {
    loading.value = !loading.value
  }
  return {
    loading,
    setLoading,
    toggleLoading,
  }
}
