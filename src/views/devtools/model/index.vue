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
              size="small"
              border style="width: 100%;">
      <el-table-column prop="id" label="ID"/>

    </el-table>
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
      const sort = '+id'
      const query = this.query
      const name = query.name
      const appId = query.appId
      this.params = { page: this.page, size: this.size, sort: sort,appId:appId, name:name }
      if (appId) this.params["appId"] = appId
      if (name) this.params["name"] = name
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

</style>
