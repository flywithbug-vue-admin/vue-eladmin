<template>
  <div class="app-container">
    <div align="center" style="margin-bottom: 10px;margin-top: -5px"><el-tag size="mini">请配置App，否则可能会导致无法拉取到代码!</el-tag> </div>
    <div align="center" style="margin-bottom: 10px;margin-top: -5px;"><el-tag size="mini" style="color: red">代码拉取功能等待完善!</el-tag> </div>
    <el-table v-loading="loading"
              :data="list"
              size="small"
              ref="refTable"
              border style="width: 100%;"
              @row-click="rowClicked">

      <el-table-column type="expand" >
        <template slot-scope="props">
          <div style="margin-right: -50px;height: 40px;display: flex">
            <div style="width: 34%">
              修改版本号
              <el-select
                size="mini"
                v-model="props.row.option"
                :remote-method="queryAppVersion"
                :loading="loading"
                style="margin-top: 5px"
                remote
                clearable
                filterable
                @focus="setCurrentAppId(props.row.app.id)"
                placeholder="请输入版本号关键字">
                <el-option
                  v-for="item in options"
                  :key="item.version"
                  :label="item.version"
                  :value="item.version"/>
              </el-select>
            </div>
            <div class="contentDiv">
              <el-popover
                v-show="props.row.option === '' && props.row.model.start_version != '-' && props.row.model.start_version != ''"
                placement="top"
                width="160"
                v-model="props.row.visible">
                <p>确定要删除起始版本号么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="props.row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="confirmAction(props.row,1);props.row.visible = false">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" round>删除开始版本</el-button>
              </el-popover>

              <el-button v-show="props.row.option !== '' "
                         @click="modifyVersion(props.row,1)"
                         type="primary"
                         plain round
                         style="margin-left: 10px"
                         size="mini"
                         icon="el-icon-check">
                {{ "修改起始版本"}}
              </el-button>
            </div>
            <div class="contentDiv">
              <el-popover
                v-show="props.row.option === ''&& props.row.model.end_version != '-' && props.row.model.end_version != ''"
                placement="top"
                width="160"
                v-model="props.row.visible1">
                <p>确定要删除结束版本号么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="props.row.visible1 = false;" >取消</el-button>
                  <el-button type="primary" size="mini"
                             @click="confirmAction(props.row,2);props.row.visible1 = false">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" round>删除结束版本</el-button>
              </el-popover>
              <el-button v-show="props.row.option !== ''"
                         @click="modifyVersion(props.row,2)"
                         type="primary"
                         plain round
                         style="margin-left: 10px"
                         size="mini"
                         :icon="props.row.option === ''? 'el-icon-delete' : 'el-icon-check'">
                {{ "修改结束版本" }}
              </el-button>
            </div>
            <div  style="width: 180px">
              <el-popover
                placement="top"
                width="160"
                v-model="props.row.visible2">
                <p>确定要删除所属应用么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="props.row.visible2 = false;">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteAppModel(props.row)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" round>删除关联应用</el-button>
              </el-popover>
            </div>
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="app.name" label="应用名"/>
      <el-table-column prop="model.start_version" label="起始版本"/>
      <el-table-column prop="model.end_version" label="结束版本"/>
      <!--<el-table-column  label="操作" width="120px">-->
        <!--<template slot-scope="props">-->
          <!--<el-popover-->
            <!--placement="top"-->
            <!--width="160"-->
            <!--v-model="props.row.visible2">-->
            <!--<p>确定要删除所属应用么？</p>-->
            <!--<div style="text-align: right; margin: 0">-->
              <!--<el-button size="mini" type="text" @click="props.row.visible2 = false;">取消</el-button>-->
              <!--<el-button type="primary" size="mini" @click="deleteAppModel(props.row)">确定</el-button>-->
            <!--</div>-->
            <!--<el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" round>删除</el-button>-->
          <!--</el-popover>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <div align="center" style="margin-top: 10px">
      <el-button  type="primary"
                  @click="addAction"
                  plain size="mini"
                  icon="el-icon-plus" round>
        {{ "所属App" }}
      </el-button>
    </div>

    <!--添加app 关联-->
    <e-form :modelId="modelId" :appList="list" ref="appForm" @refreshList="refreshList"/>
    <hr style="border:1px dashed rgba(104,178,77,0.3);margin-top: 15px"/>
  </div>
</template>

<script>
  import {
    model_apps,
    modifyVersion,
    removeRelation} from '@/api/model'
  import { list} from '@/api/appVersion'
  import eForm   from './appForm'

  export default {
		name: 'app',
    components: { eForm },
    props: {
      dataModel: {
        type:Object,
        require:true
      },
    },
    data() {
		  return {
        sup_this: this,
        loading:false,
        modelId:0,
        list:[],
        options:[],
        currentAppId:0,
      }
    },
    created() {
		  if (this.dataModel.id === 0)return
      this.modelId = this.dataModel.id
      this.getModelApps()
    },
    watch: {
      dataModel: function() {
        if (this.dataModel.id === 0)return
        this.modelId = this.dataModel.id
        this.getModelApps()
      },
    },
    methods: {
      refreshList() {
        this.getModelApps()
      },
      confirmAction(value,tag) {
        this.modifyVersion(value,tag)
      },
      getModelApps() {
        const query = {
          modelId:this.modelId
        }
        model_apps(query).then(res => {
          this.list = res.list
        })
      },
      queryAppVersion(value){
        if (this.currentAppId == 0){
          return
        }
        const query = {
          app_id:this.currentAppId,
          version:value,
          size:5,
        }
        list(query).then(res => {
          this.options = res.list
        })
      },
      rowClicked(row,event){
		    if (event.target.nodeName != "BUTTON") {
          this.$refs.refTable.toggleRowExpansion(row)
        }
      },
      setCurrentAppId(value){
        this.currentAppId = value
      },
      deleteAppModel(value){
        const data = {
          id:value.model.id
        }
        removeRelation(data).then(() => {
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.getModelApps()
        })
      },
      addAction() {
        this.$refs.appForm.dialog = true
        this.$refs.appForm.appList = this.list
        this.$refs.appForm.formatDisabledSimpleAppList()
      },
      selectorChanged() {
        this.currentAppId = this.form.appId
        this.options = []
      },
      modifyVersion(row,value){
        if (row.option === '') {
          row.option = "-"
        }
        const data = {
          id: row.model.id,
        }
        if (value === 1) {
          data.start_version = row.option
        }
        if (value === 2) {
          data.end_version = row.option
        }
        modifyVersion(data).then(() => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 1500
          })
          if (value === 1) {
            row.model.start_version = row.option
          }
          if (value === 2) {
            row.model.end_version = row.option
          }
          row.option = ""
        })
      },
    }
	}
</script>

<style scoped>
  .app-container {
    margin-left: 10px;
    margin-top: -30px;
    width: auto;
  }

  .contentDiv {
    display: inline-block;
    flex: 1;
  }

</style>
