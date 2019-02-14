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

</style>
