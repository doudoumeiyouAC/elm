<template>
  <div id="login">
    <div class="login">
      <div class="login-name">
        <input style="width: 100%" type="text" placeholder="请输入用户名" v-model="username">
      </div>
      <div class="login-pwd">
        <input style="width: 100%" type="password" placeholder="请输入密码" v-model="password">
      </div>
      <div class="login-code">
        <img :src="codeUrl" width="80px" height="30px" @click="handleCode" style="vertical-align:middle">
        <input class="login-code-text" type="text" v-model="captcha_code">
        <label class="code_error">{{ code_error }}</label>
      </div>
      <div class="login-btn" @click="handleSubmit">登录</div>
      <div class="login-text">温馨提示：未登录过的新用户，自动注册。注册过的用户可凭账号密码登录</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Notify } from 'vant'
import { mapMutations } from 'vuex'

import { getCaptcha, userLogin } from '@/api/api'

Vue.use(Notify)

export default {
  data() {
    return {
      codeUrl: '',
      username: '',
      password: '',
      captcha_code: '',
      code_error: ''
    }
  },
  mounted() {
    this.setIsFooterShow(false)
    this.handleCode()
  },
  methods: {
    handleCode() {
      getCaptcha().then(res => { // 自己封装的获取验证码
        this.codeUrl = res.data.code
      })
    },
    handleSubmit() {
      if (this.username != '' && this.password != '') {
        if (this.captcha_code != '') {
          userLogin({  // 自己封装的用户登录
            username: this.username,
            password: this.password,
            captcha_code: this.captcha_code
          }).then(res => {
            console.log(res.data)
            if (res.data.status === 0) {
              this.code_error = res.data.message
              this.captcha_code = ''
              this.handleCode()
            } else {
              localStorage.setItem('token', res.data.user_id)
              this.setUserName(res.data.username)
              this.setIsManage(true)
              this.$router.replace('/home')
            }
          })
        } else {
          Notify({ type: 'warning', message: '请输入验证码' })
        }
      } else {
        Notify({ type: 'warning', message: '请输入用户名和密码' })
      }
    },
    ...mapMutations(['setIsFooterShow', 'setUserName', 'setIsManage']) // mapMutations要传参的话在调用的时候传递
  },
  destroyed() { // 生命周期函数，这个组件销毁时执行。就是退出这个组件的时候执行
    this.setIsFooterShow(true)
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  background-color: #fff;
}

.login {
  display: flex;
  flex-direction: column;
  padding: 1.875rem 1.5rem 0 1.5rem;
  width: 100%;

  .login-name,
  .login-pwd {
    margin-bottom: .9375rem;
    padding-top: .9375rem;
    width: 100%;
    height: 3.125rem;
    border-bottom: 1px solid #b2b2b2;

    input {
      border: none;
    }
  }

  .login-code {
    height: 2.5rem;

    .login-code-text {
      margin-left: .3125rem;
      vertical-align: middle;
      width: 6.25rem;
      height: 1.875rem;
    }

    .code_error {
      margin-left: .625rem;
      color: red;
      font-size: 14px;
    }
  }

  .login-btn {
    width: 100%;
    height: 2.8125rem;
    text-align: center;
    line-height: 2.8125rem;
    background-color: #02b6fd;
    color: #fff;
    border-radius: 2.8125rem;
  }

  .login-text {
    margin-top: .3125rem;
    color: red;
    font-size: .75rem;
  }
}
</style>