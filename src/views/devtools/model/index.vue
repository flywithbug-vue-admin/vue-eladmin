<template>
  <div class="app-container">
    <eHeader :query="query"/>

    <!--悬浮添加按钮-->
    <section class="content">
      <fixed-button :bottom="4" class="fixed-container" @clickEvent="$refs.form.dialog = true">
        <svg-icon icon-class="add" class="icon-add"/>
      </fixed-button>
    </section>
    <eForm ref="form" :is-add="true"/>
    <el-table :data="data"
              border style="width: 100%;">
      <el-table-column prop="id" label="ID" width="80px"/>
      <el-table-column prop="name" label="模型名称">
        <template slot-scope="scope">
          <router-link :to="{path:'/tool/model/detail',query:{id:scope.row.id},meta:{title:scope.row.name,appList:appList}}"
                       style="color: #3794FF; font-weight: revert; font-size: 16px;">
            {{scope.row.name}}
          </router-link>
        </template>;
      </el-table-column>
      <el-table-column prop="alias" label="别名"/>
      <el-table-column prop="desc" label="描述">
      </el-table-column>
      <el-table-column prop="create_time" label="注册日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time * 1000) }}</span>
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
import fixedButton from '@/components/FixedButton'
import eForm from './module/form'
import eHeader from './module/header'
import initData from '@/mixins/initData'

import { parseTime } from '@/utils/index'
import checkPermission from '@/utils/permission'

export default {
  name: 'Index',
  components: {
    fixedButton,
    eForm,
    eHeader
  },
  mixins: [initData],
  data() {
    return {
      appList:[]
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
      this.url = '/tools/model/list'
      const sort = '-id'
      const query = this.query
      const name = query.name
      const appId = query.appId
      this.params = { page: this.page, size: this.size, sort: sort,appId:appId, name:name }
      if (appId) this.params["appId"] = appId
      if (name) this.params["name"] = name
      return true
    },
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

  .router-link-active {
    text-decoration-line: underline;
    text-decoration: #3794FF;
  }
</style>
