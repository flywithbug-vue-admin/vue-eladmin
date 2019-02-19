<template >
  <div class="app-container" v-loading="loading" >
    <div class="tHeader">
      {{dataModel.name}}
    </div>
    <!--TODO -->
    <e-operation></e-operation>
    <div class="tAlias">
      <label style="margin-left: 5px;color: rgb(104,178,77);font-size: 18px">
        {{dataModel.alias}}
      </label>
    </div>
    <e-info :dataModel="dataModel" @refreshData="refreshData" ></e-info>
    <e-app :dataModel="dataModel"></e-app>
    <e-attribute :dataModel="dataModel" @refreshData="refreshData"></e-attribute>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'
  import { getModel } from '@/api/model'
  import eInfo   from './detail/info'
  import eApp   from './detail/app'
  import eOperation   from './detail/operation'
  import eAttribute   from './detail/attribute'
  export default {
  components:{eInfo,eOperation,eApp,eAttribute},
  mixins: [initData],
  created() {
    this.modelId = this.$route.query.id
    this.getDataModel()
  },
  data() {
    return {
      dataModel:{name:'',parent:{name:''},owner:{username:''}},
      modelId:undefined,
      loading: true,
    }
  },
  methods: {
    getDataModel(){
      getModel(this.modelId).then(res => {
        this.dataModel = res.model
        if (!this.dataModel.parent)this.dataModel.parent = {username:''}
        this.loading = false
      })
    },
    refreshData() {
      this.getDataModel()
    }
  }
}
</script>

<style scoped>
  .tHeader{
    width: 100%;
    height: 40px;
    font-weight: bolder;
    font-size: 25px;
    color: #2d2f33;
    /*background-color: #eef1f6;*/
    display: flex;
    align-items:Center;
    /*justify-content:center;*/
  }

  .tAlias{
    width: 100%;
    height: 40px;
    font-weight: bolder;
    font-size: 25px;
    border-radius: 5px;
    border: 1px solid rgba(104,178,77,0.2);
    /*border-color: rgb(104,178,77);;*/
    background-color: rgba(104,178,77,0.1);
    display: flex;
    align-items:Center;
    /*justify-content:center;*/
  }

</style>
