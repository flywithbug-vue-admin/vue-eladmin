<template>
  <div>
    <el-button
      v-if="data.id != 10000"
      size="mini"
      type="success"
      @click="to">
      {{ $t('actions.edit') }}
    </el-button>
    <el-tag v-if="data.id === 10000" style="color: #666666; font-weight: bolder;">不可编辑</el-tag>

    <eForm
      ref="form"
      :permissions="permissions"
      :sup_this="sup_this"
      :is-add="false"/>
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
      console.log('permissions:', this.permissions)
      const _this = this.$refs.form
      _this.permissionIds = []
      _this.form = { id: this.data.id, name: this.data.name, note: this.data.note, permissions: [] }
      if (!this.data.permissions) {
        this.data.permissions = []
      }
      this.data.permissions.forEach(function(data, index) {
        _this.permissionIds.push(data.id)
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
