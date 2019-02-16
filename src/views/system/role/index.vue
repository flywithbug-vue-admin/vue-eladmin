<template>
  <div class="app-container">
    <eHeader :permissions="permissions" :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">
      <el-table-column :label="$t('table.name')" prop="name"/>
      <el-table-column :label="$t('table.desc')" prop="note"/>
      <el-table-column :label="$t('table.create_time')" prop="create_time">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('actions.action')" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','ROLE_ALL','ROLE_EDIT'])" :permissions="permissions" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','ROLE_ALL','ROLE_DELETE'])"
            v-model="scope.row.delPopover"
            placement="top"
            width="180">
            <p>{{ $t('system.role_confirm_del') }}</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.delPopover = false">{{ $t('actions.cancel') }}</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.$index, scope.row)">{{ $t('actions.confirm') }}</el-button>
            </div>
            <el-button v-if="scope.row.id != 10000" slot="reference" type="danger" size="mini" @click="scope.row.delPopover = true">{{ $t('actions.delete') }}</el-button>
          </el-popover>
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
import checkPermission from '../../../utils/permission'
import initData from '../../../mixins/initData'
import { del } from '@/api/role'
import { getPermissionTree } from '@/api/permission'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import config from '../../../config'

export default {
  components: { eHeader, edit },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this, permissions: []
    }
  },
  created() {
    this.getPermissions()
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = config.PathRoleList
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['name'] = value }
      return true
    },
    subDelete(index, row) {
      this.delLoading = true
      del(row.id).then(res => {
        this.delLoading = false
        row.delPopover = false
        this.init()
        this.$notify({
          title: res.msg,
          type: 'success',
          duration: 1500
        })
      }).catch(err => {
        this.delLoading = false
        row.delPopover = false
        console.log(err.msg)
      })
    },
    getPermissions() {
      getPermissionTree().then(res => {
        this.permissions = res.list
      })
    }
  }
}
</script>

<style scoped>

</style>
