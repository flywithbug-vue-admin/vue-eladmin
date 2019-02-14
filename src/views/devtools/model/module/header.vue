<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input
      v-model="query.name"
      :placeholder="$t('table.name')"
      clearable
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    <el-input
      v-model="query.owner"
      :placeholder="$t('table.owner')"
      clearable
      style="width: 200px;"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    <el-button
      v-waves
      class="filter-item"
      size="mini"
      type="primary"
      icon="el-icon-search"
      @click="toQuery">{{ $t('actions.search') }}
    </el-button>

    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-waves
        v-if="checkPermission(['ADMIN','APP_ALL','APP_CREATE'])"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">{{ $t('actions.add') }}</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>

  </div>
</template>

<script>
import waves from '@/directive/waves' // Waves directive
import checkPermission from '@/utils/permission' // 权限判断函数
import { parseTime } from '@/utils/index'
import eForm from './form'
// 查询条件
export default {
  components: { eForm },
  directives: { waves },

  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      downloadLoading: false

    }
  },
  methods: {
    checkPermission,
    // 去查询
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    // 导出
    download() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['ID', '用户名', '邮箱', '头像地址', '状态', '注册日期', '最后修改密码日期']
          const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']
          const data = this.formatJson(filterVal, this.$parent.data)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
