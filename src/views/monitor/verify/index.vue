<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column prop="value" label="邮箱/手机号" width="150px" align="center"/>
      <el-table-column prop="code" label="验证码" width="80px" align="center"/>
      <el-table-column prop="status" label="是否有效" align="center" width="180px">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.status" type="success">已使用</el-tag>
          <el-tag v-else-if="timeExpValid(scope.row.vld*1000)" type="info">待使用</el-tag>
          <el-tag v-else type="warning">已过期</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="vld" label="剩余有效时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ formatExpTimeStamp(scope.row.vld*1000) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time*1000) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import initData from '../../../mixins/initData'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import { formatTimeDuration, timeExpValid, formatExpTimeStamp } from '@/utils/date'
export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      timeNow: new Date()
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    formatTimeDuration,
    timeExpValid,
    formatExpTimeStamp,
    beforeInit() {
      this.url = 'verify/list'
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      const code = query.code
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value && value) { this.params['value'] = value }
      if (code !== '' && code !== null) { this.params['code'] = code }
      return true
    },
    timer() {

    }
  }
}
</script>

<style scoped>

</style>
