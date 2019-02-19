<template>
    <div class="app-container">
      <el-table v-loading="loading"
                :data="dataModel.attributes"
                size="small"
                ref="refTable"
                border style="width: 100%;"
                @row-click="rowClicked">
        <el-table-column type="expand" >
          <template slot-scope="props">
            <div style="margin-right: -50px;height: 40px;display: flex">
              expand
            </div>
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

        <el-table-column  label="操作" width="120px">
          <template slot-scope="props">
            <el-popover
              placement="top"
              width="160"
              v-model="props.row.visible">
              <p>确定要删除所属应用么？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="props.row.visible = false;">取消</el-button>
                <el-button type="primary" size="mini" @click="confirmAction(props.row);props.row.visible = false">确定</el-button>
              </div>
              <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" round>删除</el-button>
            </el-popover>
          </template>
        </el-table-column>


      </el-table>

      <div align="center" style="margin-top: 10px">
        <el-button  type="primary"
                    @click="addAction"
                    plain size="mini"
                    icon="el-icon-plus" round>
          {{ "模型属性" }}
        </el-button>
      </div>
      <eForm :modelId="dataModel.id" ref="appForm" @refreshData="refreshData" ></eForm>
    </div>
</template>

<script>
  import eForm   from './attributeForm'
  export default {
		name: 'attribuite',
    components: { eForm },
    props: {
      dataModel: {
        type:Object,
        require:true
      },
    },
    data() {
		  return {
        loading:false
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
      confirmAction(){

      },
      addAction(){
           this.$refs.appForm.dialog = true
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


</style>
