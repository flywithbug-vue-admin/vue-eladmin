<template>
  <el-dialog loading="loading" :append-to-body="true" :visible.sync="dialog" title="添加属性" width="400px">
    <el-form  :model="form" label-width="80px" :rules="rules">
      <el-form-item label="属性名" prop="name">
        <el-input   v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="properType">
        <el-select v-model="form.type"
                   placeholder="输入模型关键字"
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
                   :remote-method="queryModelList"
                   style="width: 100%">
          <el-option v-for="item in list"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"/>
        </el-select>
      </el-form-item>


      <el-form-item label="注释" prop="comments">
        <el-input   v-model="form.comments"></el-input>
      </el-form-item>
      <el-form-item label="默认值" prop="comments">
        <el-input   v-model="form.default"></el-input>
      </el-form-item>
      <el-form-item label="必须" prop="comments">
        <el-select v-model="form.required"
                   placeholder="选择是否必须"
                   style="width: 100%">
          <el-option v-for="item in options1"
                     :key="item.name"
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
  import { queryModels,attributes } from '@/api/model'

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
            { pattern: /^[A-Z][A-Za-z0-9_]+$/, message: '首字母大写的英文字母名字', trigger: 'blur' }
          ],
          properType: [
            { required: true, message: "必须选择属性类型", trigger: 'blur' }
          ],

        },
        mQuery:false,
        dialog: false,
        loading: false,
        form:{type:'String', name:'',model_name:'',model_id:null,comments:'',required:true,default:''},
        currentAppId:0,
        options:[
          {name: "String"},
          {name: "Int"},
          {name: "Float"},
          {name: "Bool"},
          {name: "Array"},
          {name: "Object"},
        ],
        options1:[
          {name: "是",id:true},
          {name: "否",id:false},
        ],
        list:[]
      }
    },
    methods: {
      doSubmit() {
        const data = {
          id:this.modelId,
          attributes:[this.form]
        }
        attributes(data).then(() => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 1500
          })
          this.dialog = false
          this.$emit('refreshData')

        })
      },
      selectorChanged(value) {
        if (value === 'Object' || value === 'Array'){
          this.mQuery = true
        } else {
          this.mQuery = false
          this.form.model_id = null
          this.list = []
        }
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
