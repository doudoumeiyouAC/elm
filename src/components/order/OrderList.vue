<template>
  <div>
    <div class="tabbar">
      <div class="all" :class="allFont" @click="handleAll">全部</div>
      <div class="refund" :class="refundFont" @click="handleRefund">退款</div>
      <div :class="activeClass" class="tabbar-slider"></div>
    </div>
    <div class="all-list" v-if="allShow"> <!-- 所有订单列表 -->
      <!-- <div class="all-list-item">

      </div> -->
      <div class="all-bottom"> <!-- 底部的展开按钮 -->
        展开更多
        <van-icon name="arrow-down" />
      </div>
    </div>
    <div class="refund-list" v-if="refundShow"> <!-- 退款订单列表 -->
      <img width="200px" src="@/assets/elmimg.png">
      <div style="color: #737373">近3个月内无退款订单</div>
    </div>
    <div class="unList"> <!-- 当前用户没有订单的时候展示 -->
      <img width="200px" src="@/assets/elmimg.png">
      <div style="color: #737373">暂无订单</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { getOrderList } from '@/api/api'

Vue.use(Icon)

export default {
  data() {
    return {
      activeClass: '',
      allFont: 'fontSize',
      refundFont: '',
      allShow: true,
      refundShow: false,
      unListShow: false,
      dataList: []
    }
  },
  mounted() {
    const userId = localStorage.getItem('token')
    getOrderList(userId, 8).then(res => {
      if (res.data) {
        this.allShow = false
        this.unListShow = true
      } else {
        this.dataList = res.data
      }
    })
  },
  methods: {
    handleAll() { // 点击全部时执行
      this.refundFont = '' // 去除退款模块标题的字体加大
      this.allFont = 'fontSize' // 给全部订单模块标题的字体加大
      this.activeClass = ''
      this.refundShow = false
      if (!this.dataList) {
        this.allShow = true
      }
    },
    handleRefund() { // 点击退款时执行
      this.allFont = '' // 去除全部订单模块标题的字体加大
      this.refundFont = 'fontSize' // 给退款模块标题的字体加大
      this.activeClass = 'active'
      this.allShow = false
      this.refundShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  position: relative;
  display: flex;
  padding: 0 .5rem;
  height: 2.75rem;

  .all,
  .refund {
    width: 3.5rem;
    text-align: center;
    line-height: 2.75rem;
  }

  .tabbar-slider {
    position: absolute;
    top: 2.1875rem;
    left: 1.625rem;
    width: 1.25rem;
    height: .25rem;
    background-color: #02b6fd;
    border-radius: 0.25rem;
    transition: all .3s;
  }

  .active {
    left: 5.125rem;
  }

  .fontSize {
    font-size: 1.125rem;
  }
}

.all-list {
  overflow: auto;
  height: 32.1875rem;

  .all-list-item {
    margin: 0 .75rem .5rem .75rem;
    padding: .75rem .75rem 0 .75rem;
    height: 9.5rem;
    background-color: #fff;
    border-radius: 0.375rem;
  }

  .all-bottom {
    margin: 0 .75rem 20px .75rem;
    height: 2.75rem;
    line-height: 2.75rem;
    font-size: .875rem;
    color: #999;
    text-align: center;
    background-color: #fff;
    border-radius: 0.375rem;
  }
}

.refund-list,
.unList {
  padding-top: 4rem;
  height: 25rem;
  text-align: center;
}
</style>
