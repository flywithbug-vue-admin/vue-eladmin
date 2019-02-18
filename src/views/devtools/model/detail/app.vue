<template>
  <div class="app-container">
    <div align="center" style="margin-bottom: 10px;margin-top: -5px"><el-tag size="mini">请配置App，否则可能会导致无法拉取到代码!</el-tag> </div>
    <el-table v-loading="loading" :data="list" size="small" border style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div style="margin-right: -50px;height: 40px;display: flex">
            <div class="contentDiv"></div>
            <div class="contentDiv">
              <el-select
                v-model="optionValue1"
                :remote-method="queryAppVersion"
                :loading="loading"
                style="margin-top: 5px"
                remote
                reserve-keyword
                filterable
                @focus="versionInputChanged(props.row)"
                placeholder="修改起始版本号">
                <el-option
                  v-for="item in options"
                  :key="item.version"
                  :label="item.version"
                  :value="item.version"/>
              </el-select>
              <el-button v-show="optionValue1 != ''" @click="changeStartVersion" style="margin-left: 10px" icon="el-icon-check">{{ "确认修改" }}</el-button>
            </div>
            <div class="contentDiv">right</div>
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
        optionValue1:'',
        optionValue2:'',
        currentAppId:0
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
      versionInputChanged(value){
        this.currentAppId = value.app.id
      },
      changeStartVersion(){
      },
      changeEndVersion(){

      }
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
