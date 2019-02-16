<template>
  <div class="tOperation">
    <el-button type="success" size="mini">生成代码</el-button>
    <el-button type="success" size="mini">模型关联</el-button>
    <el-button type="success" size="mini">历史记录</el-button>
    <el-button type="danger" size="mini">删除</el-button>
    <el-tag style="margin-left: 20px">hash值</el-tag>
  </div>
</template>

<script>
	export default {
		name: 'operation'
	}
</script>

<style scoped>
  .tOperation{
    width: 100%;
    height:50px;
    font-weight: bolder;
    font-size: 25px;
    color: #3a835d;
    border-color: #a13e0d;

    display: flex;
    align-items:Center;
    /*justify-content:center;*/
  }
</style>
