<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :roles="roles" :menus="menus" :sup_this="sup_this" :is-add="false"/>
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
    menus: {
      type: Array,
      required: true
    },
    roles: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.roleIds = []
      _this.form = {
        id: this.data.id,
        component: this.data.component,
        name: this.data.name,
        sort: this.data.sort,
        pid: this.data.pid,
        path: this.data.path,
        iframe: this.data.iframe ? 'true' : 'false',
        roles: [],
        icon: this.data.icon
      }
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
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
