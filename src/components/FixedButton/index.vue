<template>
  <section class="fixed-button"
           :style="{ bottom: bottom + 'rem' }"
           :class="[ !transition ? 'fixed-transition' : '']"
           @click="event">
    <slot></slot>
  </section>
</template>
<script>
  export default {
    name: 'fixedButton',
    props: {
      bottom: { // 改图标距离底部距离 单位 rem
        type: Number,
        default: 3,
      },
    },
    data () {
      return {
        transition: true, // 是否触发动画
        timer: null, // 定时器
      };
    },
    methods: {
      event() {
        this.$emit('clickEvent'); // 绑定点击图表时间
      },
      handleScroll () { // 每次滑动都会执行函数
        this.transition = false;
        if (this.timer) { // 判断是否已存在定时器
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => { // 创建定时器，1.4s后图标回归原位置
          this.transition = true;
        }, 1400);
      }
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll); // 监听页面滑动
    }
  };
</script>

<style scoped lang="scss">
  /*@media only screen and (min-width:750px){html{font-size:20px}} */
  .fixed-button{
    position: fixed;
    z-index: 1100;
    right: 1.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.1rem;
    width: 4.1rem;
    border-radius: 50%;
    transition: 0.7s ease-in-out;
  }
  .fixed-transition{
    right: -2.05rem;
    opacity: 0.4;
    transition: 1s ease-in-out;
  }
</style>
