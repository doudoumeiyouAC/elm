<template>
  <div id="app">
    <router-view></router-view>
    <footer-bar v-if="isFooterShow"></footer-bar>
  </div>
</template>

<script>
import footerBar from '@/components/FooterBar.vue'
import { mapState } from 'vuex';
export default {
  components: {
    footerBar
  },
  computed: {
    ...mapState(['isFooterShow'])
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

a {
  color: #000;
  text-decoration: none;
}

div {
  box-sizing: border-box;
}
</style>
