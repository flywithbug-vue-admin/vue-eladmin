<template >
  <div class="app-container" v-loading="loading" >
    <div class="tHeader">
      {{dataModel.name}}
    </div>
    <!--TODO -->
    <e-operation></e-operation>
    <div class="tDesc">
      <label style="margin-left: 5px;color: rgb(104,178,77)">
        {{dataModel.desc}}
      </label>
    </div>
    <e-info :dataModel="dataModel"></e-info>

  </div>
</template>

<script>
import { getModel } from '@/api/model'
import eInfo   from './detail/info'
import eOperation   from './detail/operation'
import initData from '@/mixins/initData'

export default {
  components:{eInfo,eOperation},
  mixins: [initData],
  created() {
    console.log("created")
    this.modelId = this.$route.query.id
    this.getDataModel()
  },
  data() {
    return {
      dataModel:{name:'',parent:{name:''}},
      modelId:undefined,
      loading: true
    }
  },
  methods: {

    getDataModel(){
      getModel(this.modelId).then(res => {
        this.dataModel = res.model
        this.loading = false
      })
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

  .tDesc{
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
