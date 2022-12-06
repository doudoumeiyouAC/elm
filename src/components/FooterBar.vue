<template>
  <div class="footer">
    <router-link to="/home" tag="div">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/order" tag="div">
      <i class="iconfont icon-dingdan"></i>
      <span>订单</span>
    </router-link>
    <router-link to="/center" tag="div">
      <i class="iconfont icon-wode"></i>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
import '@/assets/iconfont1/iconfont.css'
export default {

}
</script>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    // justify-content: space-between;
    width: 100%;
    height: 3.925rem;
    background-color: #fff;
    // background-color: pink;
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      font-size: .625rem;
      i {
        margin-bottom: .125rem;
        font-size: 1.5625rem;
      }
    }
    div:first-child {
      i {
        font-size: 1.875rem;
        margin-bottom: -0.0625rem;
      }
    }
  }

  .router-link-active {
    color: rgb(2, 182, 253);
  }
</style>
