<template>
  <div>
    <header>饿了么</header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem('token')) {
      if (this.$route.path != '/order/order_list') {
        this.$router.replace('/order/order_list')
      }
    } else {
      if (this.$route.path != '/order/unlogin_order') {
        this.$router.replace('/order/unlogin_order')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  padding-left: .75rem;
  height: 2.75rem;
  line-height: 2.75rem;
  font-size: 1.125rem;
  font-weight: bold;
}
</style>