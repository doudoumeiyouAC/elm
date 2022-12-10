<template>
  <div>
    <header class="header">选择收货地址</header>
    <div class="content">
      <div class="search-address">
        <div class="address-name" @click="$router.push('/address/city_list')">
          {{ cityName }}
          <van-icon name="arrow-down" />
        </div>
        <div class="search-box">
          <van-icon name="search" />
          <input type="text" placeholder="请输入你的收货地址" @input="inputAddress" v-model="inAddress">
        </div>
        <div class="cancel-address" @click="handleCancel">取消</div>
      </div>
      <div class="current" v-if="inAddress ? false : true">
        <div class="current-address">
          <div id="current">当前定位</div>
          <div id="current-text" @click="handleCurrent">
            <van-icon name="location-o" />
            {{ addressName }}
          </div>
        </div>
        <div class="reset-address" @click="handleResetAddress">重新定位</div>
      </div>
      <div class="address-info" v-if="inAddress ? false : true">
        <div class="info-title">
          <div class="sh-address">收货地址</div>
          <div class="manage-address">管理</div>
        </div>
      </div>
      <div class="address-list" v-if="inAddress ? true : false">
        <div class="address-items" @click="handleItem(dataList.name, dataList.latitude, dataList.longitude)"
          v-for="dataList in addressList" :key="dataList.geohash">
          <div>{{ dataList.name }}</div>
          <div id="address-items-ads">{{ dataList.address }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-icon name="plus" />
      新增地址
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
import { mapMutations, mapState } from 'vuex'
import { getCityList, getAddress, searchAddress } from '@/api/api'
import { setLocStorage } from '@/utils/setLocStorage' // 用来设置 localStorage 中的 addressName,latitude,longitude值(务必按顺序传值)
import debounce from 'lodash.debounce' // 加载节流防抖库

Vue.use(Icon)

export default {
  data() {
    return {
      cityName: '',
      cityId: '',
      addressName: '',
      inAddress: '',
      addressList: []
    }
  },
  mounted() {
    const addressName = localStorage.getItem('addressName')
    this.setIsFooterShow(false)

    if (this.city.cityId) {
      this.cityId = this.city.cityId
      this.cityName = this.city.cityName
    } else {
      getCityList('guess').then(res => { // guess表示获取当前定位城市
        this.cityName = res.data.name
        this.cityId = res.data.id
      })
    }

    if (addressName) {
      this.addressName = addressName
    } else {
      this.handleResetAddress()
    }
  },
  methods: {
    inputAddress: debounce(function () { // 设置一个防抖，用来优化搜索。因为lodash库的this指向问题，所以不能使用箭头函数
      if (this.inAddress) {
        searchAddress(this.cityId, this.inAddress).then(res => {
          this.addressList = res.data
        })
      }
    }, 500),
    handleResetAddress() {
      this.addressName = '定位中...'
      navigator.geolocation.getCurrentPosition(scu => {
        getAddress(scu.coords.latitude + ',' + scu.coords.longitude).then(res => {
          this.addressName = res.data.name
          setLocStorage(res.data.name, res.data.latitude, res.data.longitude) // 封装的模块，设置locStorage的值
        })
      }, err => {
        console.log(err)
      }, {
        enableHighAccuracy: false, // 是否开启高精度定位
        timeout: 10000,
        maximumAge: 0
      })
    },
    handleCancel() {
      this.inAddress = ''
    },
    handleItem(name, latitude, longitude) {
      setLocStorage(name, latitude, longitude)
      this.$router.replace('/home')
    },
    handleCurrent() {
      this.$router.replace('/home')
    },
    ...mapMutations(['setIsFooterShow'])
  },
  computed: {
    ...mapState(['city'])
  },
  destroyed() {
    this.setIsFooterShow(true)
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2.75rem;
  font-size: 18px;
  text-align: center;
  line-height: 2.75rem;
  background-color: #fff;
}

.content {
  margin-top: 2.75rem;
  background-color: #fff;

  .search-address {
    margin-left: .9375rem;
    display: flex;
    height: 3.25rem;

    .address-name {
      margin-top: 1rem;
      font-size: 0.875rem;
    }

    .search-box {
      padding: .375rem 0 0 .625rem;
      margin: .625rem 0 0 .625rem;
      width: 15.625rem;
      height: 2rem;
      border-radius: 2rem;
      background-color: #f0f1f2;

      .van-icon {
        vertical-align: middle;
      }

      input {
        margin-left: .3125rem;
        vertical-align: middle;
        font-size: .875rem;
        border: none;
        background-color: #f0f1f2;
      }
    }

    .cancel-address {
      width: 3.125rem;
      height: 3.25rem;
      font-size: 0.875rem;
      text-align: center;
      color: #00a6ff;
      line-height: 3.25rem;
    }
  }

  .current {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5rem solid #f5f5f5;

    .current-address {
      padding-top: .625rem;
      padding-left: .9375rem;
      width: 15.625rem;
      height: 4.5625rem;

      #current {
        font-size: .875rem;
        color: #999;
      }

      #current-text {
        overflow: hidden; // 溢出隐藏
        text-overflow: ellipsis; // 溢出的部分显示成...
        white-space: nowrap; // 溢出不换行
        margin-top: .625rem;
      }
    }

    .reset-address {
      padding-top: 2.5625rem;
      padding-left: 1.75rem;
      width: 6.25rem;
      height: 4.5625rem;
      font-size: .875rem;
      color: #00a6ff;
    }
  }

  .address-info {
    height: 6.25rem;

    .info-title {
      padding-top: .625rem;
      padding-left: .9375rem;
      display: flex;
      height: 1.875rem;

      .sh-address {
        font-size: 0.875rem;
        color: #999;
      }

      .manage-address {
        margin-left: 16.25rem;
        font-size: 0.875rem;
        color: #00a6ff;
      }
    }
  }

  .address-list {
    width: 100%;
    height: 31.75rem;
    background-color: #f5f5f5;
    overflow: auto;

    .address-items {
      padding: 10px 15px;
      width: 100%;
      height: 3.75rem;

      div {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #address-items-ads {
        font-size: 0.8125rem;
        color: #333;
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: .625rem;
  text-align: center;
  width: 100%;
  height: 3.925rem;
  background-color: #fff;
}
</style>
