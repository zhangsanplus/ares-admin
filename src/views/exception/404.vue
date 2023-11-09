<template>
  <x-card full>
    <el-empty description="抱歉，您访问的页面不存在。" class="exception">
      <el-button type="info" @click="goHome">
        首页
      </el-button>

      <el-button type="primary" @click="goBack">
        返回
      </el-button>
    </el-empty>
  </x-card>
</template>

<script setup lang="ts">
const router = useRouter()

function goBack() {
  router.go(-1)
}

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
