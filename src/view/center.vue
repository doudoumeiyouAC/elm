<template>
  <div>
    <header>饿了么</header>
    <van-popup overlay-class="van-overlay" :round="true" v-model="show">
      <div class="van-manage">账号管理</div>
      <div @click="handleExit">退出登录</div>
    </van-popup>
    <div class="center-content">
      <div class="user" @click="handleLogin">
        <div class="user-img"></div>
        <div class="user-name">{{ userName }}</div>
        <div class="user-manage" @click.stop="showPopup" v-show="isManage">账号管理</div>
      </div>
      <div class="common-functions">
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('//img.alicdn.com/imgextra/i3/O1CN010LxbFE1iuDvnAX5E7_!!6000000004472-2-tps-66-66.png_Q90s50.jpg')">
          </div>
          <div class="functions-item-text">我的资产</div>
          <div class="tag"></div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-164277423089735.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">
            <div style="font-size: 0.8125rem;font-weight: bold">红包</div>
            <div style="margin-top: 0.1875rem;font-size: 0.625rem;line-height: 1;color: #999;">
              查看我的红包
            </div>
          </div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642774562217617.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">
            <div style="font-size: 0.8125rem;font-weight: bold">券包</div>
            <div style="margin-top: 0.1875rem;font-size: 0.625rem;line-height: 1;color: #999;">
              查看我的券
            </div>
          </div>
        </div>
      </div>
      <div class="more-functions">
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642992665747320.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">我的地址</div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642992943515310.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">我的客服</div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642993031653333.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">关于饿了么</div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642993119557101.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">用户隐私</div>
        </div>
        <div class="functions-item">
          <div class="functions-item-pic"
            style="background-image: url('https://nr-op.elemecdn.com/image/mussel-1642993191570286.png?x-oss-process=image/format,png/quality,q_90')">
          </div>
          <div class="functions-item-text">规则中心</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex';
import { Popup } from 'vant'

import { userOut } from '@/api/api'

Vue.use(Popup)
export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['userName', 'isManage'])
  },
  methods: {
    handleLogin() {
      if (localStorage.getItem('token') === null) {
        this.$router.push('/login')
      }
      // console.log(localStorage.getItem('token'))
    },
    showPopup() {
      this.show = true
    },
    handleExit() {
      userOut().then(res => {
        console.log(res.data);
      })
      localStorage.setItem('token', '')
      this.setUserName('立即登录')
      this.setIsManage(false)
      this.$router.replace('/home')
    },
    ...mapMutations(['setUserName', 'setIsManage'])
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

.van-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12.5rem;
  height: 6.25rem;

  div {
    height: 3.125rem;
    line-height: 3.125rem;
  }

  .van-manage {
    color: #999;
    font-size: .875rem;
  }
}

.center-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 18.5625rem;

  .user {
    position: relative;
    display: flex;
    padding-top: .5rem;
    padding-left: .875rem;
    height: 2.75rem;

    .user-img {
      width: 2rem;
      height: 2rem;
      background-image: url("https://cube.elemecdn.com/c/6b/8384f98b8dedfd87fc1450926648cjpeg.jpeg?x-oss-process=image/resize,m_mfit,w_120,h_120/format,png/quality,q_90");
      background-size: 2rem 2rem;
      border-radius: 2rem;
    }

    .user-name {
      margin-left: .3125rem;
      font-size: 1.25rem;
      font-weight: 600;
      line-height: 1.75rem;
      color: #191919;
    }

    .user-manage {
      position: absolute;
      top: .625rem;
      right: 1.5625rem;
      width: 3.75rem;
      height: 1.25rem;
      text-align: center;
      line-height: 1.25rem;
      font-size: .75rem;
      color: rgb(2, 182, 253);
      border-radius: 1.875rem;
      border: 1px solid rgb(2, 182, 253);
    }
  }

  .common-functions {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: .5rem .75rem 0 .75rem;
    height: 5.9375rem;
    background-color: #fff;
    border-radius: 0.5rem;
  }

  .more-functions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: .5rem .75rem 0 .75rem;
    height: 8.875rem;
    background-color: #fff;
    border-radius: 0.5rem;

    .more-functions-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 5.4688rem;
      height: 3.3125rem;
    }
  }
}

.functions-item {
  display: flex;
  width: 5.4844rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tag {
    position: absolute;
    top: .875rem;
    left: 6.125rem;
    width: .2813rem;
    height: 3.5625rem;
    background-image: url("https://gw.alicdn.com/imgextra/i4/O1CN01LMkY0b1tWN52xTY6d_!!6000000005909-2-tps-16-232.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .functions-item-pic {
    width: 1.375rem;
    height: 1.375rem;
    background-size: 1.375rem 1.375rem;
  }

  .functions-item-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-weight: normal;
    color: #191919;
  }
}
</style>
