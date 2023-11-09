<template>
  <x-card full>
    <el-empty class="exception" description="抱歉，你无权访问这个页面。">
      <el-button type="primary" @click="goHome">
        首页
      </el-button>
    </el-empty>
  </x-card>
</template>

<script setup lang="ts">
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.exception {
  margin-top: 10vh;

  --el-empty-description-margin-top: 30px;
  --el-empty-bottom-margin-top: 30px;
}
</style>
