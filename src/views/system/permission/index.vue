<template>
  <div class="app-container">
    <eHeader :permissions="permissions" :query="query"/>
    <!--表格渲染-->
    <tree-table v-loading="loading" :data="data" :expand-all="true" :columns="columns" border size="medium">
      <el-table-column :label="$t('table.create_time')" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.create_time*1000) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('actions.action')" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="checkPermission(['ADMIN','PERMISSION_ALL','PERMISSION_EDIT'])" :permissions="permissions" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="checkPermission(['ADMIN','PERMISSION_ALL','PERMISSION_DELETE'])"
            v-model="scope.row.delPopover"
            placement="top"
            width="200">
            <p>{{ $t('system.per_confirm_del') }}</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.delPopover = false">{{ $t('actions.cancel') }}</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.$index, scope.row)">{{ $t('actions.confirm') }}</el-button>
            </div>
            <el-button v-if="scope.row.id != 10000" slot="reference" type="danger" size="mini" @click="scope.row.delPopover = true">{{ $t('actions.delete') }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import treeTable from '@/components/TreeTable'
import initData from '../../../mixins/initData'
import { del } from '@/api/permission'
import { getPermissionTree } from '@/api/permission'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import config from '../../../config'
export default {
  components: { eHeader, edit, treeTable },
  mixins: [initData],
  data() {
    return {
      columns: [
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '别名',
          value: 'alias'
        }
      ],
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
      this.url = config.PathPermissionList
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
          title: '删除成功',
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
        this.permissions = []
        const permission = { id: 0, label: '顶级类目', children: [] }
        permission.children = res.list
        this.permissions.push(permission)
      })
    }
  }
}
</script>

<style scoped>

</style>
