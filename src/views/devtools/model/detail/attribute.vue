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
      </el-table>


    </div>
</template>

<script>
	export default {
		name: 'attribuite',
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
		    if (value.model_name){

        }
        return value.type

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
