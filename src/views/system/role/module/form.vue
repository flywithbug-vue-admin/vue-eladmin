<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? $t('actions.add') : $t('actions.edit')" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
      <el-form-item :label="$t('table.name')" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item :label="$t('table.permission')">
        <TreeSelect v-model="permissionIds" :multiple="true" :options="permissions" :placeholder="$t('placeholder.permission')" style="width: 370px;" />
      </el-form-item>
      <el-form-item :label="$t('table.desc')" style="margin-top: -10px;">
        <el-input v-model="form.note" style="width: 370px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">{{ $t('actions.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">{{ $t('actions.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/role'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { TreeSelect },
  props: {
    permissions: {
      type: Array,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { name: '', permissions: [], note: '' }, permissionIds: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.form.permissions = []
          const _this = this
          this.permissionIds.forEach(function(data, index) {
            const permission = { id: data }
            _this.form.permissions.push(permission)
          })
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 1500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 1500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.permissionIds = []
      this.form = { name: '', permissions: [], note: '' }
    }
  }
}
</script>

<style scoped>

</style>
