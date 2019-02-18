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
            <div style="width: 34%"></div>
            <div class="contentDiv">
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
              <el-button @click="changeVersion(1)"
                         :disabled= "props.row.option === ''"
                         type="primary" plain
                         style="margin-left: 10px"
                         size="mini"
                         icon="el-icon-check">{{ "修改起始版本" }}
              </el-button>
              <el-button @click="changeVersion(2)"
                         :disabled="props.row.option === ''"
                         type="primary" plain
                         style="margin-left: 10px"
                         size="mini"
                         icon="el-icon-check">{{ "修改结束版本" }}
              </el-button>
            </div>
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="app.name" label="应用名"/>
      <el-table-column prop="model.start_version" label="起始版本"/>
      <el-table-column prop="app.end_version" label="结束版本"/>
    </el-table>
  </div>
</template>

<script>
  import { model_apps} from '@/api/model'
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
		  buttonDisable(value){
		    if (value === '') return true
		    return false
      },
      getModelApps() {
        const query = {
          modelId:this.dataModel.id
        }
        model_apps(query).then(res => {
          this.list = res.list
          for(let item of this.list) {
            item.optionValue = ""
          }
          console.log("model_apps:",this.list)
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
      rowClicked(row){
        this.$refs.refTable.toggleRowExpansion(row)
      },
      versionInputChanged(value){
        this.currentAppId = value.app.id
      },
      changeVersion(value){
        console.log("changeVersion:",value)
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
