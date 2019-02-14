<template>
  <div>
    <el-tag v-if="data.id === 10000" style="color: #666666; font-weight: bolder;">不可编辑</el-tag>
    <el-button v-if="data.id != 10000" size="mini" type="success" @click="to">{{ $t('actions.edit') }}</el-button>
    <eForm ref="form" :permissions="permissions" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = { id: this.data.id, name: this.data.name, alias: this.data.alias, pid: this.data.pid }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
