<template>
  <div>
      <Header></Header>
      <!-- 路由组件出口 -->
      <router-view></router-view>
      <!-- 在登录或注册时隐藏 -->
      <Footer v-show="!$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    //获取三级列表数据，放入APP里就只用拉取一次数据
    this.$store.dispatch("categoryList");
    this.$store.dispatch('getFloor');
    this.$store.dispatch("getBanner");   

  },
}
</script>

<style>

</style>
