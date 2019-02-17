<template>
  <div class="app-container">
    <div align="center"><el-tag size="mini">请配置App，否则可能会导致无法拉取到代码!</el-tag> </div>
    <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;">

    </el-table>
  </div>
</template>

<script>
  import initData from '@/mixins/initData'

  export default {
		name: 'app',
    mixins: [initData],
    props: {
      dataModel: {
        type:Object,
        require:true
      },
    },
    methods: {
      beforeInit() {
        const modelId = this.dataModel.id
        this.params.modelId = modelId
        this.url = '/tools/model_apps'
        return true
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
