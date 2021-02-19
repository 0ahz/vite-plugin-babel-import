<template>
  <ElRow>
    <ElButton>默认按钮</ElButton>
    <ElButton type="primary">主要按钮</ElButton>
    <ElButton type="success">成功按钮</ElButton>
    <ElButton type="info">信息按钮</ElButton>
    <ElButton type="warning">警告按钮</ElButton>
    <ElButton type="danger">危险按钮</ElButton>
  </ElRow>
</template>

<script>
import { ElButton, ElRow } from 'element-plus'

export default {
  components: {
    ElRow,
    ElButton,
  },
}
</script>

<route lang="yaml">
meta:
  layout: home
</route>
