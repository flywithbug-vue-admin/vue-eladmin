<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input
      v-model="query.name"
      :placeholder="$t('query.model_query')"
      clearable
      style="width: 180px;  margin-right: 5px"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    <el-select v-model="query.appId"
               filterable  clearable
               placeholder="选择应用" class="filter-item" style="width: 130px" @change="toQuery">
      <el-option v-for="item in appList" :key="item.key" :label="item.name" :value="item.id"/>
    </el-select>
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
import eForm from './form'
import { simpleList } from '@/api/app'

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
      downloadLoading: false,
      appList: null
    }
  },
  created() {
    this.getSimpleAppList()
  },
  methods: {
    checkPermission,
    // 去查询
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
    getSimpleAppList() {
      simpleList().then(response => {
        if (response.list) {
          this.appList = response.list
          this.$parent.appList = this.appList
        }
      })
    }
  }
}
</script>
