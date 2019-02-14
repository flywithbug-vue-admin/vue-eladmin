<template>
  <div>
    <el-button v-show="checkPermission" size="mini" type="success" @click="to">{{ $t('actions.edit') }}</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'

export default {
  components: { eForm },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    data: {
      type: Object,
      required: true
    },
    // index.vue 的this 可用于刷新数据
    sup_this: {
      type: Object,
      required: true
    }
  },
  computed: {
    checkPermission() {
      return true
    }
  },
  methods: {
    to() {

    }

  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
