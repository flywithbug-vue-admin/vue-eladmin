<template>
    <div class="app-container">
      <el-table v-loading="loading"
                :data="dataModel.attributes"
                size="small"
                ref="refTable"
                border style="width: 100%;"
                @row-click="rowClicked">

        <el-table-column type="expand">
          <template slot-scope="props" class="expand">
            <el-row>
              <el-col :span="12">
                <e-expand v-show="showFormat" :attribute="props.row" :modelId="dataModel.id"  @refreshData="refreshData" @closeExpand="closeExpand" style="width: 60%"/>
                <el-button v-show="!showFormat" type="primary" size="mini" @click="showFormat=true">编辑</el-button>
              </el-col>
              <el-col :span="12">
                <el-popover
                  placement="top"
                  width="160"
                  v-model="props.row.visible">
                  <p>确定要删除起始版本号么？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="props.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="confirmAction(props.row);props.row.visible = false">确定</el-button>
                  </div>
                  <el-button slot="reference" type="danger" size="mini" round>删除开始版本</el-button>
                </el-popover>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="属性名称"/>
        <el-table-column label="属性类型">
          <template slot-scope="scope">
            {{formatModelType(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column label="必填">
          <template slot-scope="scope">
            {{formatRequiredBoolean(scope.row.required)}}
          </template>
        </el-table-column>
        <el-table-column prop="comments" label="属性说明"/>

      </el-table>

      <div align="center" style="margin-top: 10px">
        <el-button  type="primary"
                    @click="addAction"
                    plain size="mini"
                    icon="el-icon-plus" round>
          {{ "模型属性" }}
        </el-button>
      </div>
      <eForm :modelId="dataModel.id" ref="appForm" @refreshData="refreshData"  ></eForm>
    </div>
</template>

<script>
  import eForm   from './attributeForm'
  import eExpand from './attributeExpand'
  import { attributes } from '@/api/model'

  export default {
		name: 'attribuite',
    components: { eForm ,eExpand},
    props: {
      dataModel: {
        type:Object,
        require:true
      },
    },
    data() {
		  return {
        loading:false,
        showFormat:false,
      }
    },
    methods: {
		  formatRequiredBoolean(value) {
		    if (value) return "是"
		    return "否"
      },
      formatModelType(value) {
		    switch (value.type) {
          case 'Array':
            return value.type + ": []" + value.model_name
            break
          case 'Object':
            return value.type + ": " + value.model_name
            break
        }
        return value.type
      },
      closeExpand(){
		    this.showFormat = false
      },
      addAction(){
           this.$refs.appForm.dialog = true
      },
      confirmAction(value){
        const dropD = {
          name:value.name
        }
        const data = {
          id:this.dataModel.id,
          drop_attributes:[dropD],
        }
        attributes(data).then(() => {
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.refreshData()
        })
      },
      refreshData() {
        this.$emit('refreshData')
      },
      rowClicked(row,event){
        if (event.target.nodeName != "BUTTON") {
          this.$refs.refTable.toggleRowExpansion(row)
        }
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

  .expand {
    display: inline-block;
    flex: 1;
  }


</style>
