<template>
  <div class="head-container">
    <!-- 搜索 -->
    关键字
    <el-input
      v-model="query.name"
      :placeholder="$t('query.model_query')"
      clearable
      style="width: 180px;  margin-right: 5px"
      class="filter-item"
      @keyup.enter.native="toQuery"/>
    APP
    <el-input
      v-model="query.owner"
      :placeholder="$t('query.app_name')"
      clearable
      style="width: 120px; margin-right: 5px"
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

  }
}
</script>
