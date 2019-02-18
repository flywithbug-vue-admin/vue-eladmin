<template>
  <el-dialog :loading="loading" :append-to-body="true" :visible.sync="dialog" title="添加应用" width="400px">
    <el-form  :model="form" label-width="90px" >
      <el-form-item label="应用名称" prop="name">
        <el-select v-model="form.appId"
                   filterable clearable
                   placeholder="选择应用"
                   @change="selectorChanged"
                   class="filter-item" >
          <el-option v-for="item in simpleAppList"
                     :key="item.key"
                     :label="item.name"
                     :disabled="item.disabled"
                     :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="起始版本" >
        <el-select
          v-model="form.startVersion"
          :remote-method="queryAppVersion"
          :loading="loading"
          style="margin-top: 5px"
          remote
          :disabled="form.appId === null"
          clearable
          filterable
          placeholder="请输入版本号关键字">
          <el-option
            v-for="item in options"
            :key="item.version"
            :label="item.version"
            :value="item.version"/>
        </el-select>
      </el-form-item>
      <el-form-item label="结束版本" >
        <el-select
          v-model="form.endVersion"
          :remote-method="queryAppVersion"
          :loading="loading"
          style="margin-top: 5px"
          remote
          :disabled="form.appId === null"
          clearable
          filterable
          placeholder="请输入版本号关键字">
          <el-option
            v-for="item in options"
            :key="item.version"
            :label="item.version"
            :value="item.version"/>
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="dialog = false">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {addRelation} from '@/api/model'
  import {simpleList} from  '@/api/app'

  export default {
		name: 'appForm',
    props: {
      modelId: {
        type: Number,
        require:true
      },
    },
    data() {
		  return {
        dialog: false,
        loading: true,
        currentAppId:0,
        options:[],
        form:{startVersion:'',endVersion:'',appId:null},
        simpleAppList:[],
        appList:[]
      }
    },
    created() {
      this.getSimpleAppList()
    },
    methods: {
      getSimpleAppList(){
        if (this.simpleAppList.length != 0)return
        simpleList().then(response => {
          if (response.list) {
            this.simpleAppList = response.list
          }
          this.loading = false
        })
      },
      formatDisabledSimpleAppList (){
        if (this.appList.length === 0) return
        for ( let index in this.simpleAppList) {
          const itemApp = this.simpleAppList[index]
          itemApp.disabled = false
          this.appList.forEach(function(item) {
            if ( itemApp.id === item.app.id){
              itemApp.disabled = true
              return
            }
          })

        }
      },
      resetForm(){
        this.form.appId = null
        this.form.endVersion = ''
        this.form.startVersion = ''

      },
      doSubmit(){
        const data = {
          app_id:this.form.appId,
          model_id:this.modelId
        }
        if (this.form.startVersion) data.start_Version = this.form.startVersion
        if (this.form.endVersion) data.end_Version = this.form.endVersion
        addRelation(data).then(() => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 1500
          })
          this.resetForm()
          this.$emit('refreshList')
        })
        this.dialog = false
      },

      selectorChanged() {
        this.currentAppId = this.form.appId
        this.options = []
      },
      queryAppVersion(value){
        if (this.currentAppId == 0){
          return
        }
        const query = {
          app_id:this.currentAppId,
          version:value,
          size:5
        }
        list(query).then(res => {
          this.options = res.list
        })
      },
    }
	}
</script>

<style scoped>

</style>
