<template>
    <div class="app-container">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form  :model="dataModel" label-width="80px">
              <el-form-item label="模型名称">
                <el-input disabled v-model="dataModel.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <!--TODO 模型select-->
            <el-form  :model="dataModel" label-width="80px">
              <el-form-item label="父类">
                <el-select v-model="optionValue"
                           :remote-method="queryManager"
                           :loading="loading"
                           remote
                           style="width: 100%"
                           reserve-keyword
                           filterable
                           clearable
                           placeholder="请输入模型关键字">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
	export default {
		name: 'info',
    props: {
		  dataModel: {
		    type:Object,
        require:true
      }
    },
    created() {

    },
    data() {
		  return {
        optionValue:'',
        loading:false,
        options: [],

      }
    },
    methods: {
      queryManager(name) {

      },
    }
	}
</script>

<style scoped>


</style>
