<template>
  <x-card title="X-Query-Form 风格1">
    <x-query-form label-width="30%" label-suffix="：" action-width="170px" style="margin-bottom: -18px;">
      <el-row>
        <el-col :span="12" :xs="24">
          <el-form-item label="用户名">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="出生日期">
            <el-date-picker v-model="state.value" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="请选择" style="width: 100%;" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="查询时间">
            <el-date-picker v-model="state.daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :clearable="false" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-form-item>
        </el-col>

        <el-col :span="12" :xs="24">
          <el-form-item label="状态">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>

      <template #action>
        <el-space>
          <el-button type="primary" long>
            <template #icon>
              <i-ep-search />
            </template>
            查询
          </el-button>
          <el-button type="info" long>
            <template #icon>
              <i-ep-refresh-right />
            </template>
            重置
          </el-button>
        </el-space>
      </template>
    </x-query-form>
  </x-card>

  <x-card title="X-Query-Form 风格2">
    <x-query-form label-width="30%">
      <el-row>
        <el-col :span="8" :xs="24">
          <el-form-item label="用户名">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="state.value" placeholder="请输入" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="出生日期">
            <el-date-picker v-model="state.value" type="date" :clearable="false" value-format="yyyy-MM-dd" placeholder="请选择" style="width: 100%;" />
          </el-form-item>
        </el-col>

        <el-col :span="8" :xs="24">
          <el-form-item label="状态">
            <el-select v-model="state.value" filterable style="width: 100%;">
              <el-option key="全部" value="" label="全部" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <template #action>
        <el-space direction="vertical" fill :size="18">
          <el-button type="primary" long>
            <template #icon>
              <i-ep-search />
            </template>
            查询
          </el-button>
          <el-button type="info" long>
            <template #icon>
              <i-ep-refresh-right />
            </template>
            重置
          </el-button>
        </el-space>
      </template>
    </x-query-form>

    <el-divider />
    <el-empty />
  </x-card>
</template>

<script setup lang="ts">
const state = reactive<{
  value: string
  date: string
  daterange: [Date | string, Date | string]
}>({
  value: '',
  date: '',
  daterange: ['', ''],
})
</script>