<template>
  <div class="home">
    <!-- 头部nav信息 -->
    <header>
      <div class="header">
        <div>饿了么</div>
      </div>
      <div class="address">
        <van-icon name="location-o" />
        <!-- <i class="iconfont icon-dingweixiao icon-add" style="font-size: .9375rem"></i> -->
        <span class="address-info" @click="handleAddress">{{ addressName }}</span>
        <!-- <i class="iconfont icon-you-copy icon-right" style="font-size: 0.875rem"></i> -->
        <van-icon size="0.75rem" name="arrow" />
        <span class="slogan">美食果蔬医药·30分钟送达</span>
      </div>
      <div style="height: 3.125rem;">
        <div class="search" v-sticky>
          <div class="search-box">
            <i class="iconfont icon-sousuo search-ico"></i>
            <span class="search-text">螺蛳粉</span>
          </div>
          <div class="search-btn">搜索</div>
        </div>
      </div>
      <div class="tip">
        <div class="tip-left"></div>
        <span class="tip-text">为你推荐附近的商家</span>
        <div class="tip-right"></div>
      </div>
    </header>

    <!-- 内容信息 -->
    <div class="shop">
      <div class="shop-item" v-for="data in dataList" :key="data.id">
        <img class="shop-img" :src="'https://elm.cangdu.org/img/' + data.image_path" alt="">
        <div class="shop-info">
          <div class="shop-name">{{ data.name }}</div>
          <div class="shop-mark">
            <div>
              <span class="shop-rating">{{ data.rating }}<span>分</span></span>
              <span class="shop-month-order">月售{{ data.recent_order_num }}</span>
            </div>
            <div>
              <span class="shop-order_lead_time">{{ data.order_lead_time }}</span>
              <span>{{ data.distance }}</span>
            </div>
          </div>
          <div class="shop-deliver">
            <div>
              <span>起送¥{{ data.float_minimum_order_amount }}</span>
              <span class="shop-deliver-fee">{{ data.piecewise_agent_fee.tips }}</span>
            </div>
            <!--配送方式是否由蜂鸟配送-->
            <div class="shop-deliver-text" :style="data.delivery_mode ? '' : 'border: none'">{{ data.delivery_mode ?
                data.delivery_mode.text : ''
            }}</div>
          </div>
          <div class="shop-tag">{{ data.promotion_info }}</div>
          <div class="shop-tags">
            <div v-for="activities in data.activities" :key="activities.id">{{ activities.description }}</div>
            <!-- <div style="color: rgb(174, 108, 40);background: none;border-color: rgb(220, 160, 90);">
              <img src="https://cube.elemecdn.com/b/41/a2a371a914179dcb348ce3ae34f5epng.png?x-oss-process=image/resize,m_mfit,w_18,h_18/format,png/quality,q_90" alt="">
              6元无门槛
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      附近无更多商家
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

import { getShop, getAddress } from '@/api/api' // 导入自己二次封装的axios库
import { setLocStorage } from '@/utils/setLocStorage' // 用来设置 localStorage 中的 addressName,latitude,longitude值(务必按顺序传值)

Vue.use(Icon)

Vue.directive('sticky', { // 自定义指令，当页面滚动一定距离的时候让搜索框固定不动
  inserted: (el) => {
    window.onscroll = () => {
      if (document.documentElement.scrollTop >= 34.5) {
        el.style = 'position: fixed; top: 2.75rem'
      } else {
        el.style = 'position: relative'
      }
    }
  }
})

export default {
  data() {
    return {
      addressName: '正在获取定位...',
      dataList: []
    }
  },
  mounted() {
    const addressName = localStorage.getItem('addressName')
    const latitude = localStorage.getItem('latitude')
    const longitude = localStorage.getItem('longitude')
    let limit = 5
    if (localStorage.getItem('token')) {
      limit = 20
    }

    if (addressName) {
      this.addressName = addressName
      this.loadShop(latitude, longitude, limit)
    } else {
      navigator.geolocation.getCurrentPosition(scu => {
        getAddress(scu.coords.latitude + ',' + scu.coords.longitude).then(res => {
          this.addressName = res.data.name
          setLocStorage(res.data.name, res.data.latitude, res.data.longitude)
          // localStorage.setItem('addressName', res.data.name)
          // localStorage.setItem('latitude', res.data.latitude)
          // localStorage.setItem('longitude', res.data.longitude)
        })
        this.loadShop(scu.coords.latitude, scu.coords.longitude, limit)
      }, err => {
        console.log(err)
      }, {
        enableHighAccuracy: false, // 是否开启高精度定位
        timeout: 10000,
        maximumAge: 0
      })
    }
  },
  methods: {
    handleAddress() {
      this.$router.push('/address')
    },
    loadShop(lat, long, lim) {
      getShop({
        latitude: lat,
        longitude: long,
        limit: lim,
        order_by: 5
      }).then(res => [
        this.dataList = res.data
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(white 6.25rem, #f5f5f5 14.0625rem);

  header {
    padding-top: 2.75rem;
    height: 4.875rem;
    background-image: linear-gradient(90deg, rgb(41, 202, 255) 0%, rgb(0, 171, 245) 100%);

    .header {
      z-index: 1;
      padding-left: .75rem;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-image: linear-gradient(90deg, rgb(41, 202, 255) 0%, rgb(0, 171, 245) 100%);
      height: 2.75rem;
      color: #fff;
      font-weight: bold;
      font-size: 1.125rem;
      line-height: 2.75rem;
    }

    .address {
      position: relative;
      padding: .75rem .75rem 0 .75rem;
      width: 100%;
      height: 2.1563rem;
      background-color: #fff;
      border-top-left-radius: 1.25rem;
      border-top-right-radius: 1.25rem;

      .van-icon {
        vertical-align: middle;
      }

      .address-info {
        vertical-align: middle;
        display: inline-block;
        max-width: 6.25rem;
        font-size: 1rem;
        color: #333;
        overflow: hidden; // 溢出隐藏
        text-overflow: ellipsis; // 溢出的部分显示成...
        white-space: nowrap; // 溢出不换行
      }

      .slogan {
        position: absolute;
        right: .75rem;
        bottom: .3125rem;
        font-size: 0.75rem;
        color: #999;
      }
    }

    .search {
      z-index: 1;
      position: relative;
      padding: .5rem 0;
      width: 100%;
      height: 3.125rem;
      background-color: #fff;

      .search-box {
        position: absolute;
        padding-left: .6875rem;
        padding-top: .2813rem;
        top: .5rem;
        left: .75rem;
        width: 20rem;
        height: 2.125rem;
        border: 1px solid rgb(2, 182, 253);
        border-radius: 2.0625rem;

        .search-ico {
          vertical-align: bottom;
          font-size: 1.0625rem;
          color: #999;
        }

        .search-text {
          margin-left: 4px;
          font-size: 0.875rem;
          color: #999;
        }
      }

      .search-btn {
        position: absolute;
        top: .5rem;
        right: .75rem;
        width: 4.125rem;
        height: 2.125rem;
        background-image: linear-gradient(90deg, rgb(41, 202, 255) 0%, rgb(0, 171, 245) 100%);
        font-size: 0.875rem;
        color: #fff;
        text-align: center;
        line-height: 2.125rem;
        border-radius: 2.0625rem;
      }
    }

    .tip {
      position: relative;
      width: 100%;
      height: 3.1375rem;
      text-align: center;
      line-height: 2.95rem;

      .tip-left,
      .tip-right {
        width: 7.1875rem;
        border-bottom: 1px solid #ccc;
        position: absolute;
        top: 1.5rem;
      }

      .tip-left {
        left: .75rem;
      }

      .tip-text {
        font-size: 0.75rem;
        color: #999;
      }

      .tip-right {
        right: .75rem;
      }
    }
  }

  .shop {
    margin-top: 3.75rem;

    span {
      font-size: 0.75rem;
      color: #666;
    }

    .shop-item {
      padding: .625rem .75rem 7px .75rem;
      margin: 0 .75rem .5rem .75rem;
      width: 21.9375rem;
      height: 7.75rem;
      background-color: #fff;
      border-radius: 10px;

      .shop-img {
        float: left;
        margin-right: .625rem;
        width: 6.5rem;
        height: 6.625rem;
        border-radius: .625rem;
      }

      .shop-info {
        .shop-name {
          max-width: 12rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 1rem;
          font-weight: bold;
          color: #191919;
        }

        .shop-mark {
          display: flex;
          justify-content: space-between;

          .shop-rating {
            font-size: 0.875rem;
            font-weight: 600;
            color: #ff6300;

            span {
              font-size: 0.75rem;
              font-weight: normal;
              color: #ff6300;
            }
          }

          .shop-month-order {
            margin-left: .5rem;
          }

          .shop-order_lead_time {
            margin-right: .5rem;
          }
        }

        .shop-deliver {
          display: flex;
          height: 1.0625rem;
          line-height: 1.0625rem;
          justify-content: space-between;

          .shop-deliver-fee {
            margin-left: .5rem;
            // color: rgb(153, 153, 153);
          }

          .shop-deliver-text {
            padding: 0 .125rem;
            height: 1.0625rem;
            font-size: .75rem;
            font-weight: 700;
            color: rgb(2, 182, 253);
            border: 1px solid rgb(205, 241, 255);
            border-radius: 0.25rem;
            background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
          }
        }

        .shop-tag {
          display: inline-block;
          margin-top: .3125rem;
          padding: 0 .375rem;
          height: 1.25rem;
          max-width: 13.3125rem;
          line-height: 1.25rem;
          font-size: 0.6875rem;
          color: #f56105;
          background-color: #fef0e5;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-radius: 0.25rem;
        }

        .shop-tags {
          margin-top: -0.1875rem;
          width: 11.875rem;
          height: 1.25rem;
          overflow: hidden;

          div {
            display: inline-block;
            padding: 0 .1875rem;
            margin-right: .4375rem;
            height: .95rem;
            line-height: .95rem;
            font-size: .75rem;
            color: rgb(255, 75, 51);
            background: none;
            border: 1px solid rgb(255, 201, 193);
            border-radius: 0.25rem;

            img {
              width: .625rem;
            }
          }
        }
      }
    }
  }

  .footer {
    margin-bottom: 3.925rem;
    font-size: .75rem;
    color: rgba(0, 0, 0, 0.5);
    height: 2.625rem;
    text-align: center;
    line-height: 2.625rem;
  }
}
</style>
