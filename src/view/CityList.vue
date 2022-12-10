<template>
  <div>
    <div class="header">
      <div class="title">城市列表</div>
      <div class="cross" @click="handleCross">
        <van-icon name="cross" size="22" color="rgb(167 157 157" />
      </div>
      <div class="search-city">
        <div class="search-box">
          <van-icon name="search" style="vertical-align: middle" />
          <input class="input-box" type="text" v-model="inputCity" placeholder="输入城市名、拼音或字母查询" @input="searchCity">
        </div>
      </div>
    </div>

    <div class="content">
      <div class="hot-city">
        <div class="hot-city-title">热门城市</div>
        <div class="hot-city-list">
          <div class="list-items" @click="handleCityName(data.id, data.name)" v-for="data in hotCityList"
            :key="data.id">
            {{ data.name }}
          </div>
          <div class="list-items" @click="handleCityName('11', '深圳')">深圳</div>
        </div>
      </div>
      <div class="city-list">
        <van-index-bar :sticky-offset-top="89" :index-list="indexList">
          <div v-for="(value, key, index) in cityList" :key="index">
            <van-index-anchor :index="key">
              {{ key }}
            </van-index-anchor>
            <div class="city-list-items">
              <van-cell v-for="cityList in value" @click="handleCityName(cityList.id, cityList.name)" :key="cityList.id"
                :title="cityList.name" />
            </div>
          </div>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, IndexBar, IndexAnchor, Cell } from 'vant'
import { mapMutations } from 'vuex';
import { getCityList } from '@/api/api';

Vue.use(Icon)
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Cell)

export default {
  data() {
    return {
      hotCityList: '',
      cityList: {},
      indexList: [],
      cityData: [],
      inputCity: '',
      filterCity: []
    }
  },
  mounted() {
    this.setIsFooterShow(false)

    getCityList('hot').then(res => {
      this.hotCityList = res.data
    })
    getCityList('group').then(res => {
      // console.log(res.data)
      this.cityList = res.data
      Object.keys(res.data).forEach(key => {
        this.indexList.push(key)
        this.cityData.push(...res.data[key])
      })
    })
    // console.log(this.arrFilter);
    // // console.log(this.cityData.filter(this.arrFilter))
  },
  methods: {
    searchCity() {
      this.filterCity = this.fltSearchCity(this.cityData, this.inputCity)
      console.log(this.filterCity);
    },
    fltSearchCity(arr, inputCity) {
      return arr.filter(item => item.name === inputCity)
    },
    handleCross() {
      this.$router.back()
    },
    handleCityName(cityId, cityName) {
      this.setCity({ cityId, cityName })
      this.$router.push('/address')
    },
    ...mapMutations(['setIsFooterShow', 'setCity'])
  },
  destroyed() {
    this.setIsFooterShow(true)
  }
}
</script>

<style lang="scss" scoped>
div {
  color: rgb(51, 51, 51);
}

.header {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 89px;
  background: rgb(245, 245, 245);

  .title {
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: rgb(51, 51, 51);
    text-align: center;
    line-height: 42px;
  }

  .cross {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 45px;
  }

  .search-city {
    margin: 12px;
    height: 25px;

    .search-box {
      padding: 0 12px;
      height: 25px;
      line-height: 24px;
      background-color: #fff;
      border-radius: 4px;

      .input-box {
        vertical-align: middle;
        padding-left: 5px;
        width: 302px;
        font-size: 14px;
        border: none;
      }
    }
  }
}

.content {
  margin-top: 89px;
  height: 900px;
  // background-color: pink;

  .hot-city {
    padding: 0 12px 12px 12px;

    .hot-city-title {
      padding: 20px 0 8px;
      font-size: 14px;
    }

    .hot-city-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .list-items {
        margin-top: 12px;
        padding: 4px 0;
        width: 100px;
        height: 26px;
        text-align: center;
        font-size: 14px;
        background-color: #fff;
        border-radius: 2px;
      }
    }
  }

  .city-list {
    .city-list-items {
      padding: 0 12px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .van-cell {
        margin-bottom: 12px;
        padding: 4px 0;
        width: 80px;
        height: 26px;
        line-height: 18px;
        text-align: center;
        border-radius: 4px;

        span {
          display: inline-block;
          max-width: 56px;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
