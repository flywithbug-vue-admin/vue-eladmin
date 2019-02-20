<template>
  <el-dialog loading="loading" :append-to-body="true" :visible.sync="dialog" title="添加属性" width="400px">
  <e-expand :modelId="modelId" :is-add="true" @refreshData="refreshData" @closeExpand="closeExpand"/>
  </el-dialog>
</template>

<script>
  import eExpand from './attributeExpand'

  export default {
		name: 'attributeForm',
    components:{eExpand},
    props: {
      modelId: {
        type: Number,
        require: true
      },
    },
    data() {
		  return {
        dialog: false,
      }
    },
    methods: {
      refreshData() {
        this.dialog = false
        this.$emit('refreshData')
      },
      closeExpand(){
        this.dialog = false
      }
    }
	}
</script>

<style scoped>

</style>
