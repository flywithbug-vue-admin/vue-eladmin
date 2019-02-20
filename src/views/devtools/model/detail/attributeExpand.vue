<template>
 <div>
   <el-form  :model="form" size="small"  label-width="90px"  :rules="rules">
     <el-form-item label="属性名称" prop="name">
       <el-input v-model="form.name" :placeholder="isAdd?'请输入属性名称':'请输入要修改的名称'"></el-input>
     </el-form-item>
     <el-form-item label="类型" prop="properType">
       <el-select v-model="form.type"
                  placeholder="选择类型"
                  style="width: 100%"
                  clearable
                  @change="selectorChanged">
         <el-option v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"/>
       </el-select>
     </el-form-item>
     <el-form-item v-show="mQuery" label="选择模型" prop="properType">
       <el-select v-model="form.model_id"
                  placeholder="输入模型关键字搜索"
                  remote
                  clearable
                  filterable
                  :remote-method="queryModelList"
                  @change="selectionModelChanged"
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
     <el-form-item label="默认值" prop="default">
       <el-input   v-model="form.default"></el-input>
     </el-form-item>
     <el-form-item label="必须" prop="required">
       <el-select v-model="form.required"
                  placeholder="选择是否必须"
                  style="width: 100%">
         <el-option v-for="item in options1"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"/>
       </el-select>
     </el-form-item>
     <el-form-item align="right">
       <el-button type="text" @click="cancelAction" >取消</el-button>
       <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
     </el-form-item>
   </el-form>
 </div>

</template>

<script>
  import { queryModels,attributes } from '@/api/model'
  export default {
		name: 'attributeExpand',
    props: {
		  modelId:{
		    type:Number,
        required: true,
      },
      attribute: {
        type:Object,
        require:true
      },
      isAdd:{
        type:Boolean,
        required: false,
      },
    },
    created(){
		  if (this.attribute){
        this.form = this.attribute
        this.oldName = this.attribute.name
      }
    },
    data() {
		  return {
        loading: false,
        mQuery:false,
        oldName:'',
        form:{type:'', name:'',model_name:'',model_id:null,comments:'',required:true,default:''},
        options:[
          {name: "String"},
          {name: "Int"},
          {name: "Float"},
          {name: "Bool"},
          {name: "Array"},
          {name: "Object"},
        ],
        optionsArray:[
          {name: "String",id:-1},
          {name: "Int",id:-2},
          {name: "Float",id:-3},
          {name: "Bool",id:-4}
        ],
        options1:[
          {name: "是",id:true},
          {name: "否",id:false},
        ],
        list:this.optionsArray,
        rules: {
          name: [
            { required: true, message: "请输入属性名称", trigger: 'blur' },
            { pattern: /^[A-Z][A-Za-z0-9_]+$/, message: '首字母大写的英文字母名字', trigger: 'blur' }
          ],
          properType: [
            { required: true, message: "必须选择属性类型", trigger: 'blur' }
          ],
          comments: [
            { required: true, message: "必须填写属性注释", trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      selectorChanged(value) {
        if (value === 'Object' || value === 'Array'){
          this.mQuery = true
        } else {
          this.mQuery = false
          this.form.model_id = null
          this.list = []
        }
      },
      cancelAction() {
        // console.log("cancelAction")
        this.$emit('closeExpand')
      },
      doSubmit() {
        const data = {
          id:this.modelId,
          attributes:[this.form],
        }
        if (this.oldName){
          const dropD = {
            name:this.oldName
          }
          data.drop_attributes = [dropD]
        }
        attributes(data).then(() => {
          this.$notify({
            title: '添加成功',
            type: 'success',
            duration: 1500
          })
          this.$emit('refreshData')
          this.resetForm()
        })
      },
      resetForm() {
        this.form = {type:'String', name:'',model_name:'',model_id:null,comments:'',required:true,default:''}
      },
      selectionModelChanged(value){
        switch (value) {
          case -1:
            this.form.model_name = 'String'
            break;
          case -2:
            this.form.model_name = 'Int'
            break;
          case -3:
            this.form.model_name = 'Float'
            break;
          case -4:
            this.form.model_name = 'Bool'
            break;
        }
      },
      queryModelList(value) {
        if (value.length == 0)return
        const data = {
          name:value,
          exc:this.modelId
        }
        queryModels(data).then(res => {
          if (this.form.type === 'Array') {
            this.list = res.list.concat(this.optionsArray)
          }else {
            this.list = res.list
          }
        })
      }
    }
	}
</script>

<style scoped>

</style>
