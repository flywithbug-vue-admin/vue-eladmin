<template >
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :before-close="dialogClose"
    :title="dialogTitle()"
    width="500px"/>
</template>

<script>
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    checkPermission() {
      return true
    }
  },
  methods: {
    dialogClose() {
      this.dialog = false
    },
    handleClose(tag) {
    },

    cancel() {
      this.dialogClose()
      this.resetForm()
    },
    dialogTitle() {
      return this.isAdd ? this.$t('actions.add') : this.$t('actions.edit')
    },

    doSubmit() {
    },
    doAdd() {
    },
    doEdit() {

    }
  }
}
</script>

<style scoped>

  .app-icon {
    display: inline-block;
    vertical-align: middle;
    border-radius: 10px;
    width: 120px;
    height: 120px;
  }
</style>
