<template>
    <div class="app-container">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form  :model="dataModel" label-width="90px" :rules="rules">
              <el-form-item label="模型名称" prop="name">
                <el-input disabled v-model="dataModel.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form  :model="dataModel" label-width="80px">
              <el-form-item label="父类">
                <el-select v-model="parentId"
                           :remote-method="queryManager"
                           :loading="loading"
                           @change="formEdited = true"
                           remote
                           style="width: 100%"
                           reserve-keyword
                           filterable
                           clearable
                           :placeholder="pClass">
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

      <!--TODO 设计功能的业务线-->
      <el-row>
        <el-col :span="12">
          <div>
            <el-form  :model="dataModel" label-width="90px">
              <el-form-item label="业务线">
                <el-input disabled v-model="dataModel.alias"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form  :model="dataModel" label-width="90px">
              <el-form-item label="负责人">
                <el-input disabled v-model="dataModel.owner.username"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div>
            <el-form  :model="dataModel" label-width="90px">
              <el-form-item label="模型描述">
                <el-input :autosize="{ minRows: 2, maxRows: 4}"
                          @change="formEdited = true"
                          :placeholder="$t('placeholder.desc')"
                          v-model="dataModel.desc"
                          type="textarea"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" >
          <div align="center" v-show="formEdited">
            <el-button type="primary"
                       @click="updateModelInfo"
                       size="small"
                       round><svg-icon
                        icon-class="confirm_r"
                        style="margin-right: 5px" />保存修改</el-button>
          </div>
        </el-col>
      </el-row>
      <hr style="border:1px dashed rgba(104,178,77,0.3)"/>
    </div>
</template>

<script>
  import { queryModels,edit } from '@/api/model'
  import { simpleList } from '@/api/app'

  export default {
		name: 'info',
    props: {
		  dataModel: {
		    type:Object,
        require:true
      },
    },
    created() {
    },
    data() {
		  return {
		    parentId:'',
        loading:false,
        formEdited:false,
        options: [],
        pClass:'请输入模型关键字',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    watch: {
		  dataModel: function(val) {
        if (val.parent) this.pClass = val.parent.name
      },
    },
    methods: {
		  updateModelInfo() {
		    let param = {
		      id:this.dataModel.id,
          desc:this.dataModel.desc
        }
        if (this.parentId){
          param.parentId = this.parentId
        }
        edit(param).then(() => {
          this.formEdited = false
          this.$notify({
            title: '修改成功',
            type: 'success',
            duration: 1500
          })
        })
      },
      queryManager(name) {
        if (name.length == 0)return
        let query = {
          name :name,
          exc:this.dataModel.id
        }
        queryModels(query).then(res => {
          this.options = res.list
        })
      },
    }
	}
</script>

<style scoped>
  .app-container {
    margin-left: 10px;
    width: auto;
  }

</style>
