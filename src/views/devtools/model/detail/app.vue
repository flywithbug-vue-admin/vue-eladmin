<template>
  <div class="app-container">
    <div align="center" style="margin-bottom: 10px;margin-top: -5px"><el-tag size="mini">请配置App，否则可能会导致无法拉取到代码!</el-tag> </div>
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
                v-model="props.row.option"
                :remote-method="queryAppVersion"
                :loading="loading"
                style="margin-top: 5px"
                remote
                clearable
                filterable
                @focus="versionInputChanged(props.row)"
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
                :v-model="props.row.pop_status">
                <p>确定要删除起始版本号么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelAction(props.row)">取消</el-button>
                  <el-button type="primary" size="mini" @click="confirmAction(props.row,1)">确定</el-button>
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
                :v-model="props.row.pop_status">
                <p>确定要删除结束版本号么？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="cancelAction(props.row)">取消</el-button>
                  <el-button type="primary" size="mini" @click="confirmAction(props.row,2)">确定</el-button>
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
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="app.name" label="应用名"/>
      <el-table-column prop="model.start_version" label="起始版本"/>
      <el-table-column prop="model.end_version" label="结束版本"/>
      <el-table-column  label="操作" width="120px">
        <template slot-scope="props">
          <el-popover
            placement="top"
            width="160"
            :v-model="props.row.pop_status">
            <p>确定要删除所属应用么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelAction(props.row)">取消</el-button>
              <el-button type="primary" size="mini" @click="confirmAction(props.row,3)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" round>删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <el-button>
      {{ "所属App" }}
    </el-button>



  </div>
</template>

<script>
  import { model_apps,modifyAppModelVersion} from '@/api/model'
  import { list} from '@/api/appVersion'

  export default {
		name: 'app',
    props: {
      dataModel: {
        type:Object,
        require:true
      },
    },
    data() {
		  return {
        loading:false,
        list:[],
        options:[],
        currentAppId:0,
      }
    },
    created() {
		  if (this.dataModel.id) this.getModelApps()
    },
    watch: {
      dataModel: function() {
        this.getModelApps()
      },
    },
    methods: {
		  cancelAction(value) {
		    value.pop_status = false
        console.log("value:",value)

      },
      confirmAction(value,tag) {
        value.pop_status = false
        this.modifyVersion(value,tag)
      },
      getModelApps() {
        const query = {
          modelId:this.dataModel.id
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
          size:5
        }
        list(query).then(res => {
          this.options = res.list

        })
      },
      rowClicked(row,event){
		    if (event.target.nodeName === "DIV") {
          this.$refs.refTable.toggleRowExpansion(row)
        }
      },
      versionInputChanged(value){
        this.currentAppId = value.app.id
      },
      deleteAppModel(value){

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
        modifyAppModelVersion(data).then(() => {
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 1500
          })
          this.getModelApps()
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
