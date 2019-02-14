<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      border
      style="width: 100%;">
      <el-table-column prop="user_id" label="用户ID" width="80px" />
      <el-table-column :show-overflow-tooltip="true" prop="client_ip" label="IP" width="120px"/>
      <el-table-column prop="method" label="Method" width="80px" />
      <el-table-column :show-overflow-tooltip="true" prop="request_id" label="RequestId" width="200px"/>
      <el-table-column :show-overflow-tooltip="true" prop="path" label="Path" width="150px"/>
      <el-table-column prop="latency" label="请求耗时" align="center" width="120px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.latency/1000 <= 1000" > {{ formatTimeDuration(scope.row.latency) }}</el-tag>
          <el-tag v-else-if="scope.row.latency/1000000 <= 1000" type="success"> {{ formatTimeDuration(scope.row.latency) }}</el-tag>
          <el-tag v-else-if="scope.row.latency/1000000000 <= 2" type="info">{{ formatTimeDuration(scope.row.latency) }}</el-tag>
          <el-tag v-else-if="scope.row.latency/1000000000 <= 60" type="warning">{{ formatTimeDuration(scope.row.latency) }}</el-tag>
          <el-tag v-else type="danger">{{ formatTimeDuration(scope.row.latency) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="info" label="日志内容"/>
      <el-table-column prop="response_code" label="状态" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.response_code === 400" type="warning">{{ scope.row.response_code }}</el-tag>
          <el-tag v-else-if="scope.row.response_code === 200" type="success">{{ scope.row.response_code }}</el-tag>
          <el-tag v-else-if="scope.row.response_code > 0" type="info">{{ scope.row.response_code }}</el-tag>
          <el-tag v-else type="info">{{ scope.row.status_code }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="para" label="参数" width="80px"/>
      <el-table-column :show-overflow-tooltip="true" prop="response" label="错误返回" width="80px" align="center">
        <template slot-scope="scope">
          {{ scope.row.response }}
        </template>
      </el-table-column>

      <el-table-column prop="flag" label="日志类型" width="100px" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.flag === 'ERROR'" type="danger">{{ scope.row.flag }}</el-tag>
          <el-tag v-else type="info">{{ scope.row.flag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="创建日期" width="180px">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.time) }}</span>
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
import { formatTimeDuration } from '@/utils/date'
export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      win_height: ''
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
    beforeInit() {
      this.url = 'log/list'
      const sort = '-id'
      const query = this.query
      const user_id = query.user_id
      const flag = query.flag
      const requestId = query.requestId
      const code = query.code
      this.params = { page: this.page, size: this.size, sort: sort }
      if (requestId && requestId.length > 0) {
        this.params['requestId'] = requestId
      }

      if (user_id && user_id.length > 0) {
        this.params['user_id'] = user_id
      }
      if (flag && flag.length > 0) {
        this.params['flag'] = flag
      }
      if (code && code > 0) {
        this.params['response_code'] = code
      }
      console.log(':query', this.params)
      return true
    }
  }
}
</script>

<style scoped>

</style>
