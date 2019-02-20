<template>
  <div class="app-container">
    <!--悬浮添加按钮-->
    <section class="content">
      <fixed-button :bottom="3" class="fixed-container" @clickEvent="handleCreate">
        <svg-icon icon-class="add" class="icon-add"/>
      </fixed-button>
    </section>

    <div class="filter-container" align="center" style="margin-bottom: 20px">
      <label style="color: #2d2f33">选择App</label>
      <el-select
        v-model="listQuery.app_id"
        @change="handleFilter">
        <el-option
          v-for="item in simpleAppList"
          :key="item.id"
          :label=" '('+(item.id)+')'+item.name"
          :value="item.id"/>
      </el-select>

      <img
        :src="currentSimpleApp?currentSimpleApp.icon:imagePlaceHolder"
        style="height: 50px; display: inline-block; margin-bottom: -15px;margin-left: 10px">
      <span style="color: #2d2f33">{{ $t( 'table.owner') }}:</span>
      <label style="color: #2d2f33">{{ currentSimpleApp?currentSimpleApp.owner.username:'' }}</label>
    </div>

    <!--列表-->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; "
      header-row-class-name="center"
      @sort-change="sortChange">

      <!--<el-table-column type="expand">-->
        <!--<template slot-scope="props" class="expandDiv">-->

        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="80px">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appVersion.versionN')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.parentVN')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ scope.row.parent_version }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.platform')" align="center" min-width="150px">
        <template slot-scope="scope">
          <span>{{ formatPlatform(scope.row.platform) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.approvalTime')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.approval_time) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.lockTime')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.lock_time) }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.grayTime')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.gray_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appVersion.releaseTime')" align="center" min-width="90px">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.release_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('appVersion.status')" align="center" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="formatTagString(scope.row.status)">{{ scope.row.app_status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        v-if="checkPermission"
        :label="$t('actions.action')"
        align="center"
        min-width="200px"
        class-name="small-padding fixed-width" >
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status == 5"
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)">
            {{ $t('actions.edit') }}
          </el-button>

          <el-popover
            v-show="scope.row.status < 5"
            v-model="scope.row.pop_status"
            placement="top"
            width="160px"
            trigger="click"
            align="center" >
            <p align="center">
              <span>{{ formatStatusButtonConfirmString(scope.row.status) }}</span>
              <span style="color:#c03639; font-weight: bolder;font-size: 18px">{{ formatStatusString(scope.row.status) }}</span>
              <span>？</span>
            </p>
            <div style="text-align: center; margin: 0">
              <el-button size="mini" type="text" @click="cancelPopover(scope.row)">{{ $t('actions.cancel') }}</el-button>
              <el-button type="primary" size="mini" @click="confirmPopover(scope.row)">{{ $t('actions.confirm') }}</el-button>
            </div>
            <el-button slot="reference" style="width: 60px" type="success" size="mini">{{ $t('selector.changeStatus') }}</el-button>
          </el-popover>

          <el-popover
            v-show="scope.row.status < 2"
            v-model="scope.row.pop_de_status"
            placement="top"
            width="160px"
            trigger="click"
            align="center" >
            <p align="center">
              <span>{{ $t('selector.confirmDelete') }}</span>
            </p>
            <div style="text-align: center; margin: 0">
              <el-button size="mini" type="text" @click="cancelPopover(scope.row)">{{ $t('actions.cancel') }}</el-button>
              <el-button type="primary" size="mini" @click="deleteVersionPopover(scope.row)">{{ $t('actions.confirm') }}</el-button>
            </div>
            <el-button slot="reference" style="width: 60px" type="danger" size="mini">{{ $t('actions.delete') }}</el-button>
          </el-popover>

        </template>
      </el-table-column>

      <el-table-column :label="$t('appVersion.createTime')" align="center" width="100px">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.create_time) }}</span>
        </template>
      </el-table-column>

    </el-table>

    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"/>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="600px">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 400px; margin-left:50px;">

        <el-form-item
          :label="$t('appVersion.versionN')"
          prop="version">
          <el-input
            :disabled="dialogStatus==='update' && temp.status > 1"
            v-model="temp.version"
            :placeholder="$t('appVersion.versionN')"/>
        </el-form-item>

        <el-form-item
          :label="$t('appVersion.parentVN')"
          prop="parent_version">
          <el-input
            :disabled="dialogStatus==='update' && temp.status > 1"
            v-model="temp.parent_version"
            :placeholder="$t('appVersion.parentVNPlaceholder')"/>
        </el-form-item>

        <el-form-item
          :label="$t('appVersion.approvalTime')"
          prop="approval_time">
          <el-date-picker
            :disabled="dialogStatus==='update' && temp.status > 1"
            v-model="temp.approval_time"
            :placeholder="$t('appVersion.approvalTime')"
            type="date"/>
        </el-form-item>

        <el-form-item
          :label="$t('appVersion.lockTime')"
          prop="lock_time">
          <el-date-picker
            :disabled="dialogStatus==='update' && temp.status > 2"
            v-model="temp.lock_time"
            :placeholder="$t('appVersion.lockTime')"
            format="yyyy-MM-dd"
            type="date"/>
        </el-form-item>

        <el-form-item
          :label="$t('appVersion.grayTime')"
          prop="gray_time">
          <el-date-picker
            :disabled="dialogStatus==='update' && temp.status > 2"
            v-model="temp.gray_time"
            :placeholder="$t('appVersion.grayTime')"
            format="yyyy-MM-dd"
            type="date"/>
        </el-form-item>

        <el-form-item
          v-show="temp.status > 3"
          :label="$t('appVersion.releaseTime')"
          prop="release_time">
          <el-date-picker
            v-model="temp.release_time"
            :placeholder="$t('appVersion.releaseTime')"
            format="yyyy-MM-dd"
            type="date"/>
        </el-form-item>

        <el-form-item :label="$t('appVersion.platform')" prop="platform">
          <el-select
            :disabled="dialogStatus==='update' && temp.status > 1"
            v-model="temp.platform"
            :placeholder="$t('selector.placeholder')"
            style="width:320px;"
            clearable
            multiple>
            <el-option
              v-for="item in platformOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('actions.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'? createData():updateDate()">{{ $t('actions.confirm') }}</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<!--TODO 页面优化-->

<script>
import fixedButton from '@/components/FixedButton'
import Pagination from '@/components/Pagination'
import { simpleList } from '@/api/app'
import { list, add, edit, editStatus, del } from '@/api/appVersion'
import { formatDate } from '@/utils/date'

import ElTableFooter from 'element-ui'
import store from '@/store'

export default {
  name: 'MetaData',
  components: {
    ElTableFooter,
    fixedButton,
    Pagination
  },
  data() {
    return {
      appId: 0,
      showAction: false,
      listLoading: true,
      list: null,
      total: 10,
      dialogFormVisible: false,
      dialogStatus: 'create',
      dialogEditCount: 0,
      imagePlaceHolder: require('@/assets/image_placeholder.png'),
      textMap: {
        update: this.$t('actions.edit'),
        create: this.$t('actions.add')
      },
      temp: {
        id: 0,
        version: '',
        parent_version: '',
        platform: [],
        approval_time: undefined,
        lock_time: undefined,
        gray_time: undefined,
        create_time: undefined,
        release_time: undefined,
        status: 0,
        app_status: '',
        app_id: 0
      },
      listQuery: {
        page: 0,
        size: 10,
        name: '',
        owner: '',
        sort: '-id',
        app_id: 0
      },
      simpleAppList: null,
      currentSimpleApp: { owner_id: 0, name: '', managers: [], id: 0, icon: '', owner: { username: '', id: 0 }},
      platformOptions: [{
        value: 'iOS',
        label: 'iOS'
      }, {
        value: 'Android',
        label: 'Android'
      }, {
        value: 'H5',
        label: 'H5'
      }, {
        value: 'Server',
        label: 'Server'
      }],
      statusOptions: [{
        value: '1',
        label: this.$t('selector.preparing')
      }, {
        value: '2',
        label: this.$t('selector.developing')
      }, {
        value: '3',
        label: this.$t('selector.gray')
      }, {
        value: '4',
        label: this.$t('selector.release')
      }],
      rules: {
        version: [
          {
            required: true,
            message: '必填,格式:1.0.0',
            trigger: 'blur'
          },
          {
            pattern: /\d+(\.\d+)*/,
            message: '输入格式1.0.0,只能是`数字`和 `.`',
            trigger: 'blur'
          }
        ],
        approval_time: [
          {
            required: true,
            message: '必选',
            trigger: 'change'
          }
        ],
        lock_time: [
          {
            required: true,
            message: '必选',
            trigger: 'change'
          }
        ],
        gray_time: [
          {
            required: true,
            message: '必选',
            trigger: 'change'
          }
        ],
        platform: [
          {
            required: false,
            message: '选填',
            trigger: 'change'
          }
        ]
      }

    }
  },
  computed: {
    checkPermission() {
      const userId = store.getters.userId
      if (this.currentSimpleApp.owner_id === userId) {
        return true
      }
      if (this.currentSimpleApp.managers) {
        for (const value of this.currentSimpleApp.managers) {
          if (value.id === userId) {
            return true
          }
        }
      }
      return false
    }
  },

  watch: {
    temp: {
      handler: function() {
        if (this.dialogStatus === 'update') {
          this.dialogEditCount++
        }
      },
      deep: true
    }
  },
  created() {
    this.getSimpleAppList()
  },
  methods: {
    getSimpleAppList() {
      this.listLoading = true
      simpleList().then(response => {
        this.simpleAppList = response.list
        this.currentSimpleApp = this.simpleAppList[0]
        this.listQuery.app_id = this.currentSimpleApp.id
        this.getList()
      })
    },
    getList() {
      list(this.listQuery).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    formatStatusString(status) {
      switch (status + 1) {
        case 1:
          return this.$t('selector.preparing')
        case 2:
          return this.$t('selector.developing')
        case 3:
          return this.$t('selector.gray')
        case 4:
          return this.$t('selector.release')
        case 5:
          return this.$t('selector.workDone')
        default:
          return 'title undefined'
      }
    },
    formatStatusButtonConfirmString(status) {
      // switch (status) {
      //   case 1, 2, 3:
      //     return this.$t('selector.confirmChange')
      //   case 4:
      //     return this.$t('table.delete')
      // }
      return this.$t('selector.confirmChange')
    },
    formatTagString(status) {
      switch (status) {
        case 1:
          return ''
        case 2:
          return 'success'
        case 3:
          return 'warning'
        case 4:
          return 'danger'
        case 5:
          return 'info'
      }
      return ''
    },
    deleteVersionPopover(data) {
      data.pop_de_status = false
      this.removeAppVersion(data)
    },
    cancelPopover(data) {
      data.pop_status = false
      data.pop_de_status = false
    },
    confirmPopover(data) {
      data.pop_status = false
      this.updateStatus(data)
    },
    formatPlatform(list) {
      if (list) {
        return list.join(',')
      }
      return '-'
    },
    formatDate(time) {
      if (!time || time === 0) {
        return '-'
      }
      if (time.toString().length < 11){
        time = time * 1000
      }
      const date = new Date(time )
      return formatDate(date, 'yyyy-MM-dd')
    },

    resetTemp() {
      this.temp = {
        id: 0,
        version: '',
        parent_version: '',
        platform: [],
        approval_time: undefined,
        lock_time: undefined,
        gray_time: undefined,
        create_time: undefined,
        status: 0,
        app_status: '',
        app_id: 10000
      }
    },
    handleTempTime(data) {
      return {
        id: data.id,
        version: data.version,
        parent_version: data.parent_version,
        platform: data.platform ? data.platform : [],
        approval_time: data.approval_time ? new Date(data.approval_time * 1000) : new Date(),
        lock_time: data.lock_time ? new Date(data.lock_time * 1000) : new Date(),
        gray_time: data.gray_time ? new Date(data.gray_time * 1000) : new Date(),
        create_time: data.create_time ? new Date(data.create_time * 1000) : new Date(),
        release_time: data.release_time ? new Date(data.release_time * 1000) : 0,
        status: data.status,
        app_status: data.app_status,
        app_id: data.app_id
      }
    },
    removeAppVersion(data) {
      del(data.id).then(() => {
        this.getList()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.approval_time > this.temp.lock_time) {
            this.$message.error('立项时间必须早于锁版时间')
            return
          }
          if (this.temp.lock_time > this.temp.gray_time) {
            this.$message.error('锁版时间必须早于灰度时间')
            return
          }

          add(
            this.listQuery.app_id,
            this.temp.version,
            this.temp.parent_version,
            this.temp.platform,
            this.temp.approval_time.valueOf() / 1000,
            this.temp.lock_time.valueOf() / 1000,
            this.temp.gray_time.valueOf() / 1000).then((response) => {
            this.list.unshift(response.app)
            this.dialogFormVisible = false
            this.resetTemp()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateStatus(data) {
      editStatus(data.id, data.status + 1).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateDate() {
      if (this.dialogEditCount < 1) {
        this.dialogFormVisible = false
        return
      }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.approval_time > this.temp.lock_time) {
            this.$message.error('锁版时间必须晚于立项时间')
            return
          }
          if (this.temp.lock_time > this.temp.gray_time) {
            this.$message.error('灰度时间必须晚于锁版时间')
            return
          }
          if (this.temp.release_time && this.temp.release_time < this.temp.gray_time) {
            this.$message.error('发布时间必须晚于灰度时间')
            return
          }

          let gray_time = parseInt('0')
          let lock_time = parseInt('0')
          let approval_time = parseInt('0')
          let release_time = parseInt('0')
          let parent_version = ''
          let platform = []
          let version = ''
          this.temp.lock_time = this.temp.lock_time.getTime() / 1000
          this.temp.gray_time = this.temp.gray_time.getTime() / 1000
          this.temp.approval_time = this.temp.approval_time.getTime() / 1000
          if (this.temp.release_time){
            this.temp.release_time = this.temp.release_time.getTime() / 1000
          }


          if (this.temp.status < 2) {
            approval_time = this.temp.approval_time
            platform = this.temp.platform
            version = this.temp.version
            parent_version = this.temp.parent_version
          }
          if (this.temp.status < 3) {
            lock_time = this.temp.lock_time
          }
          if (this.temp.status < 4) {
            gray_time = this.temp.gray_time
          }
          console.log('status', this.temp.status)
          if (this.temp.status === 4) {
            release_time = this.temp.release_time
          }

          if (this.temp.parent_version === '-') {
            parent_version = ''
          }

          const data = {
            id: this.temp.id,
            version: version,
            parent_version: parent_version,
            platform: platform,
            approval_time: approval_time,
            lock_time: lock_time,
            gray_time: gray_time,
            release_time: release_time
          }
          edit(data).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.resetTemp()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleCreate() {
      if (this.dialogStatus === 'update') {
        this.resetTemp()
      }
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(data) {
      this.temp = this.handleTempTime(data)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogEditCount = -1
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+_id'
      } else {
        this.listQuery.sort = '-_id'
      }
      this.handleFilter()
    },
    handleFilter() {
      this.currentSimpleApp = this.simpleAppList.filter(item => item.id === this.listQuery.app_id)[0]
      this.listQuery.page = 1
      this.getList()
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

  .expandDiv {
    display: inline-block;
    flex: 1;
  }

</style>
