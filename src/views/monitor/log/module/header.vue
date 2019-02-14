<template>
  <div class="head-container">
    <el-input v-model="query.user_id" clearable placeholder="用户ID" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.requestId" clearable placeholder="RequestId" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-input v-model="query.code" clearable placeholder="ResponseCode" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>

    <el-select v-model="query.flag" placeholder="日志类型" clearable class="filter-item" style="width: 110px" @change="toQuery">
      <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
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
