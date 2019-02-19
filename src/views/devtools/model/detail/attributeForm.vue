<template>
  <el-dialog loading="loading" :append-to-body="true" :visible.sync="dialog" title="添加属性" width="400px">
    <el-form  :model="form" label-width="80px" :rules="rules">
      <el-form-item label="属性名" prop="name">
        <el-input   v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="属性类型" prop="properType">
        <el-select v-model="form.type"
                   placeholder="输入模型关键字"
                   filterable
                   remote
                   clearable
                   @clear="clearAction"
                   :remote-method="queryModelList"
                   style="width: 100%"
                   @change="selectorChanged">
          <el-option v-for="item in options"
                     :key="item.name"
                     :label="item.name"
                     :value="item.name"/>
        </el-select>

      </el-form-item>

      <el-form-item v-show="mQuery" label="选择模型" prop="properType">
        <el-select v-model="form.model_id"
                   placeholder="输入模型关键字"
                   filterable
                   remote
                   clearable
                   @clear="clearAction"
                   :remote-method="queryModelList"
                   style="width: 100%"
                   @change="modelSectionChanged">
          <el-option v-for="item in list"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
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
  import { queryModels } from '@/api/model'

  export default {
		name: 'attributeForm',
    props: {
      modelId: {
        type: Number,
        require: true
      },
    },
    data() {
      return {
        rules: {
          name: [
            { required: true, message: "请输入属性名称", trigger: 'blur' },
            { pattern: /^[A-Z][A-Za-z]+$/, message: '首字母大写的英文字母名字', trigger: 'blur' }
          ],
          properType: [
            { required: true, message: "必须选择属性类型", trigger: 'blur' }
          ],

        },
        mQuery:false,
        dialog: false,
        loading: false,
        form:{name:'',model_name:'',model_id:null,comments:'',required:false,default:''},
        currentAppId:0,
        optionValue:'String',
        options:[
          {name: "String",id:1},
          {name: "Int",id:2},
          {name: "Float",id:3},
          {name: "Bool",id:4},
          {name: "Array",id:5},
          {name: "Object",id:6},
        ],
        list:[]
      }
    },
    methods: {
      doSubmit() {

      },
      selectorChanged(value) {
        if (value === 'Object' || value === 'Array'){
          this.mQuery = true
        } else {
          this.mQuery = false
        }
      },
      modelSectionChanged(value) {
        console.log("modelSectionChanged:",value)
      },
      clearAction() {
        this.options = [
          {name: "String",id:1},
          {name: "Int",id:2},
          {name: "Float",id:3},
          {name: "Bool",id:4},
          {name: "Array",id:5},
          {name: "Object",id:6},
        ]
      },
      queryModelList(value) {
        if (value.length == 0)return
        const data = {
          name:value,
          exc:this.modelId

        }
        queryModels(data).then(res => {
          this.list = res.list
        })
      }
		}
	}
</script>

<style scoped>

</style>
