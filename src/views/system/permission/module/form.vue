<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? $t('actions.add') : $t('actions.edit')" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item :label="$t('table.name')" prop="name">
        <el-input v-model="form.name" style="width: 360px;"/>
      </el-form-item>
      <el-form-item :label="$t('table.alias')" prop="alias">
        <el-input v-model="form.alias" style="width: 360px;"/>
      </el-form-item>
      <el-form-item :label="$t('table.sup_dir')" style="margin-bottom: 0px;">
        <TreeSelect v-model="form.pid" :options="permissions" :placeholder="$t('placeholder.sup_dir')" style="width: 360px;" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">{{ $t('actions.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">{{ $t('actions.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/permission'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Form',
  components: {
    TreeSelect
  },
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
      form: { name: '', alias: '', pid: 0 },
      rules: {
        name: [
          { required: true, message: this.$t('placeholder.name'), trigger: 'blur' }
        ],
        alias: [
          { required: true, message: this.$t('placeholder.alias'), trigger: 'blur' }
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
        setTimeout(() => {
          this.$parent.$parent.init()
          this.$parent.$parent.getPermissions()
        }, 200)
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
        setTimeout(() => {
          this.sup_this.init()
          this.sup_this.getPermissions()
        }, 200)
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', alias: '', pid: 0 }
    }
  }
}
</script>

<style scoped>

</style>
