<template>
  <div>
    <div class="error">
      <img src="@/assets/elmimg.png" alt="">
      <div class="error-title">
        登录后查看外卖订单
      </div>
      <div class="login-btn" @click="handleLogin">立即登录</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  margin-top: 4rem;
  width: 100%;
  height: 17.875rem;
  text-align: center;

  img {
    width: 12.5rem;
    height: 12.5rem;
  }

  .error-title {
    height: 1.375rem;
    font-size: 1rem;
    line-height: 1.25rem;
    color: #737373;
    text-align: center;
  }

  .login-btn {
    margin-top: 1.4375rem;
    margin-left: 50%;
    transform: translate(-50%);
    width: 5rem;
    height: 2rem;
    font-size: 0.875rem;
    color: #fff;
    text-align: center;
    line-height: 1.875rem;
    border-radius: 0.9375rem;
    background-color: #00a6ff;
    opacity: 0.8;
  }
}
</style>