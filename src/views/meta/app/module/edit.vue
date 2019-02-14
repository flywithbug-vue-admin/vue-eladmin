<template>
  <div>
    <el-button v-show="checkPermission" size="mini" type="success" @click="to">{{ $t('actions.edit') }}</el-button>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
import store from '@/store'

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
      const userId = store.getters.userId
      if (this.data.owner_id === userId) {
        return true
      }
      if (this.data.managers) {
        for (const value of this.data.managers) {
          if (value.id === userId) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        owner: this.data.owner,
        desc: this.data.desc,
        icon: this.data.icon,
        owner_id: this.data.owner_id,
        bundle_id: this.data.bundle_id,
        managers: this.data.managers
      }
      _this.dialog = true
    }

  }
}
</script>

<style scoped>
  div{display: inline-block;margin-right: 3px;}
</style>
