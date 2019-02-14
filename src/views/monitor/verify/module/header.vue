<template>
  <div class="head-container">
    <el-input v-model="query.value" clearable placeholder="手机号/邮箱" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.code" clearable placeholder="验证码" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false,
      enabledTypeOptions: [
        { key: 'INFO', display_name: 'INFO' },
        { key: 'ERROR', display_name: 'ERROR' },
        { key: 'WARNING', display_name: 'WARNING' },
        { key: 'FATAL', display_name: 'FATAL' }
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
