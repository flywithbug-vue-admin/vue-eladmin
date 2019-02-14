<template >
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :before-close="dialogClose"
    :title="dialogTitle()"
    width="500px">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-position="left"
      label-width="80px"
      style="width: 400px;">
      <el-form-item
        align="center"
        style="margin-left:-50px;margin-top: -50px">
        <label >{{ $t('table.icon') }}</label>
        <el-upload
          :action="actionURL"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :on-error="handleUploadError"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader">
          <img v-if="form.icon" :src="form.icon" width="100%" class="app-icon">
          <img v-if="!form.icon" :src="imagePlaceHolder" width="100%" class="app-icon">
        </el-upload>

      </el-form-item>
      <el-form-item
        :label="$t('table.name')"
        prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>

      <el-form-item
        :label="$t('table.owner')"
        prop="owner">
        <div class="filter-item">
          <el-tag
            type="info"
            style="margin-left: 5px;">
            {{ form.owner.username }}
          </el-tag>
        </div>
        <el-select
          v-model="optionValue1"
          :remote-method="queryOwner"
          :loading="loading"
          style="margin-top: 5px"
          remote
          reserve-keyword
          filterable
          placeholder="搜索用户名">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.username"
            :value="item.id"/>
        </el-select>
        <el-button @click="changeOwnerAction" >{{ "更换负责人" }}</el-button>

      </el-form-item>

      <el-form-item
        :label="$t('table.manager')"
        prop="managers">
        <div >
          <el-tag
            v-for="(item,id) in form.managers"
            :key="id"
            closable
            type="info"
            style="margin-left: 5px;"
            @close="handleClose(item)">
            {{ item.username }}
          </el-tag>
        </div>
        <div class="head-container">
          <el-select
            v-model="optionValue"
            :remote-method="queryManager"
            :loading="loading"
            style="margin-top: 5px"
            remote
            reserve-keyword
            filterable
            placeholder="搜索用户名">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.username"
              :value="item.id"/>
          </el-select>
          <el-button @click="addManagerAction">{{ "添加管理员" }}</el-button>
        </div>

      </el-form-item>

      <el-form-item
        :label="$t('table.bundle')"
        prop="bundle_id">
        <el-input
          :disabled="!isAdd"
          v-model="form.bundle_id"
          :placeholder="$t('placeholder.bundle_id')"/>
      </el-form-item>

      <el-form-item
        :label="$t('table.desc')"
        prop="desc">
        <el-input
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="$t('placeholder.desc')"
          v-model="form.desc"
          type="textarea"/>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">{{ $t('actions.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">{{ $t('actions.confirm') }}</el-button>
    </div>

  </el-dialog>
</template>

<script>
import store from '@/store'
import global_ from '@/config'
import { add, edit } from '@/api/app'
import initData from '@/mixins/initData'
import { queryList } from '@/api/user'

export default {
  name: 'Form',
  mixins: [initData],
  props: {
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
      ownerEdit: false,
      editType: 'manager',
      options: [],
      optionValue: '',
      optionValue1: '',
      headers: { 'Authorization': store.getters.token },
      actionURL: global_.UploadImageURL,
      imagePlaceHolder: require('@/assets/image_placeholder.png'),
      dialog: false,
      loading: false,
      form: { id: 0, name: '', owner: '', owner_id: 0, desc: '', icon: '', bundle_id: '', managers: [], manager_ids: [] },
      rules: {
        name: [
          { required: true, message: this.$t('placeholder.name'), trigger: 'blur' },
          { max: 10, message: '请输入不多于10个字符', trigger: 'blur' },
          { min: 2, message: '请输入不少于2个字符', trigger: 'blur' },
          { pattern: /^[A-Za-z\u4e00-\u9fa5]+$/, message: '只允许输入汉字或者英文字母', trigger: 'blur' }
        ],
        bundle_id: [
          { required: true, message: this.$t('placeholder.bundle_id'), trigger: 'blur' },
          { pattern: /^(com).[A-Za-z0-9.-]+(.)[A-Za-z0-9.-]+$/, message: '(格式：com.xxx.xxx)', trigger: 'blur' },
          { min: 10, message: '请输入不少于10个字符', trigger: 'blur' },
          { max: 30, message: '请输入不多于30个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: this.$t('placeholder.desc'), trigger: 'blur' },
          { min: 10, message: '请输入不少于10个字符', trigger: 'blur' },
          { max: 200, message: '请输入不多于200个字符', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    checkPermission() {
      const userId = store.getters.userId
      if (this.form.owner.id === userId || this.ownerEdit) {
        return true
      }
      return false
    }
  },
  methods: {
    dialogClose() {
      this.dialog = false
      this.sup_this.init()
    },
    handleClose(tag) {
      this.form.managers.splice(this.form.managers.indexOf(tag), 1)
    },
    queryOwner(name) {
      this.editType = 'owner'
      this.queryList(name)
    },
    queryManager(name) {
      this.editType = 'manager'
      this.queryList(name)
    },
    queryList(name) {
      if (!name) {
        return
      }
      this.loading = true
      this.url = '/user/list'
      const sort = '+id'
      this.params = { page: this.page, size: this.size, sort: sort }
      this.params['enabled'] = true
      this.params['username'] = name
      const ids = []
      if (this.form.owner) ids.push(this.form.owner.id)
      if (this.editType === 'manager') {
        if (!this.form.managers) this.form.managers = []
        this.form.managers.forEach(function(item) {
          ids.push(item.id)
        })
      }
      this.params['exc'] = ids.join(',')
      queryList(this.params).then(res => {
        this.options = res.list
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    changeOwnerAction() {
      const optionValue = this.optionValue1
      let temp
      for (const value of this.options) {
        if (value.id === optionValue) {
          temp = value
        }
      }
      this.optionValue1 = ''
      this.options = []
      if (temp) {
        this.ownerEdit = true
        this.form.owner = temp
        this.form.owner_id = optionValue
      }
    },
    addManagerAction() {
      const optionValue = this.optionValue
      const temp = []
      this.options.forEach(function(item) {
        if (item.id === optionValue) {
          temp.push(item)
        }
      })
      this.optionValue = ''
      this.options = []
      this.form.managers.push(...temp)
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { id: 0, name: '', owner: '', owner_id: 0, desc: '', icon: '', bundle_id: '', managers: [], manager_ids: [] }
    },
    cancel() {
      this.dialogClose()
      this.resetForm()
    },
    dialogTitle() {
      return this.isAdd ? this.$t('actions.add') : this.$t('actions.edit')
    },
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.form.icon = global_.downloadImageURL + res.data['imagePath']
      } else {
        this.$message.error(res.msg)
      }
    },
    handleUploadError(err) {
      this.$message.error(err.msg)
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 2
      if (!isLt10M) {
        this.$message.error('图片大小不能超过 2MB!')
        return false
      }
      // 限定宽高比
      const isSize = new Promise(function(resolve, reject) {
        const _URL = window.URL || window.webkitURL
        const img = new Image()
        img.onload = function() {
          const valid = img.width === img.height
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(() => {
        return file
      }, () => {
        this.$message.error('图片宽高比需为1:1')
        return Promise.reject()
      })
      return isSize
    },
    doSubmit() {
      // console.log('form', this.form, 'users:', this.users)
      // return
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
      add(this.form).then(() => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          message: 'Success',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    doEdit() {
      edit(this.form).then(() => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    }
  }
}
</script>

<style scoped>

  .app-icon {
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    width: 120px;
    height: 120px;
  }
</style>
