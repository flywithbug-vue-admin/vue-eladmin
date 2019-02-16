<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80px">
        <template slot-scope="scope">
          <span> {{ scope.row.id }} </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.name')"
        prop="id"
        align="center"
        width="160px">
        <template slot-scope="scope">
          <span style="color: #4a9ff9; font-weight: bolder;font-size: 18px;">
            {{ scope.row.name }}
          </span>
          <br>
          <span style="color: #2d2d2d; font-weight: bolder;font-size: 10px;">
            {{ scope.row.bundle_id }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.icon')"
        prop="id"
        align="center"
        width="100px">
        <template slot-scope="scope" >
          <img :src="scope.row.icon" class="app-icon" width="auto" align="center">
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.owner')"
        prop="id"
        align="center"
        width="150px">
        <template slot-scope="scope">
          <span> {{ scope.row.owner.username }} </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.manager')"
        prop="id"
        align="center"
        min-width="150px">
        <template slot-scope="scope">
          <el-tag v-for="(item,id) in scope.row.managers" :key="id" type="info" style="margin-left: 5px" >
            {{ item.username }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.desc')"
        prop="id"
        align="center"
        min-width="150px">
        <template slot-scope="scope">
          <span> {{ scope.row.desc }} </span>
        </template>
      </el-table-column>

      <el-table-column
        :label="$t('table.create_time')"
        prop="id"
        align="center"
        width="200px">
        <template slot-scope="scope">
          <span> {{ parseTime(scope.row.create_time) }} </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('actions.action')"
        align="center"
        width="180px"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <edit :data="scope.row" :sup_this="sup_this"/>
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

import initData from '@/mixins/initData'
import eHeader from './module/header'
import edit from './module/edit'
import { parseTime } from '@/utils/index'
import checkPermission from '@/utils/permission'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = '/app/list'
      const sort = '+id'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    }

  }
}
</script>
<style lang="scss" scoped>
  .fixed-container{
    background-color: #eef1f6;
    .icon-add{
      width: 2rem;
      height: 1.9rem;
      background-size: 2rem 1.9rem;
    }
  }
  .app-icon {
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    width: 60px;
    height: 60px;
  }
</style>
