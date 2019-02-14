<template>
  <div>
    <el-button v-if="data.id != 10000" size="mini" type="success" @click="to">编辑</el-button>
    <el-tag v-if="data.id === 10000" style="color: #666666; font-weight: bolder;">不可编辑</el-tag>
    <eForm ref="form" :roles="roles" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    roles: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.roleIds = []
      _this.form = { id: this.data.id, username: this.data.username, email: this.data.email, enabled: this.data.enabled ? 'true' : 'false', roles: [] }
      if (!this.data.roles) {
        this.data.roles = []
      }
      this.data.roles.forEach(function(data, index) {
        _this.roleIds.push(data.id)
      })
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
