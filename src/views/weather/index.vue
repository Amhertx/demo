<template>
  <div class="body">
    <h1 class="title">天气查询</h1>
    <div class="content">
      <div class="area">
        <el-input placeholder="输入地址查询" @keydown.enter.native="getArea" v-model="area"></el-input>
        <el-button @click="getArea" class="sub">确定</el-button>
      </div>
      <div class="addrea">
        <h2>
          {{ areaInfo.formatted_address || areaInfo.province + areaInfo.city }}
        </h2>
      </div>
      <div class="info" v-show="info.lives.length">
        <h3 class="today">当前天气</h3>
        <div class="time">{{ now }}</div>
        <div>
          <div class="weather">
            <div class="weather-info">
              <div>
                <img :src="weatherImg" alt="" />
              </div>
              <div>
                <h1 class="num">
                  {{ info.lives[0]?.temperature }}
                </h1>
                <div class="weather-content">
                  <div class="weather-content-title">{{ info.lives[0]?.weather }}</div>
                  <div class="weather-content-body">最高温度：{{ forecastsList[0]?.daytemp }}℃</div>
                  <div class="weather-content-body">最低温度：{{ forecastsList[0]?.nighttemp }}℃</div>
                </div>
              </div>
            </div>
            <div class="forecasts">
              <div class="forecasts-lite" v-for="(item, index) in forecastsList" :key="index">
                <div class="forecasts-lite-li">{{ item.date }}</div>
                <div class="forecasts-lite-li">{{ item.img }}</div>
                <div class="forecasts-lite-li">{{ item.daytemp + "℃" + " ~ " + item.nighttemp + "℃" }}</div>
                <div class="forecasts-lite-li">{{ item.daypower + " ~ " + item.nightpower }}</div>
                <div class="forecasts-lite-li">{{ setWeek(item.week) }}</div>
              </div>
            </div>
          </div>
          <div class="weather-other">
            <div class="other-lite">湿度：{{ info.lives[0]?.humidity }}</div>
            <div class="other-lite">风速：{{ forecastsList[0]?.daypower + " ~ " + forecastsList[0]?.nightpower }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      area: "",
      now: "",
      weatherImg: "",
      key: "12d51a0b7808783113853fd286f481cd",
      info: {
        lives: [],
      },
      forecastsList: [],
      areaInfo: {},
    };
  },
  mounted() {
    this.getIp();
    this.getTime();
    // setInterval(() => {
    //   this.getTime();
    // }, 1000 * 60);
  },
  methods: {
    setWeek(item) {
      let a = "";
      switch (item) {
        case 5:
          a = "星期一";
          break;

        default:
          break;
      }
      return a;
    },
    getTime() {
      const time = new Date();
      this.now =
        (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) +
        ":" +
        (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
    },
    getIp() {
      axios.get("https://restapi.amap.com/v3/ip", { params: { key: this.key } }).then(({ data } = res) => {
        if (data.status) {
          this.areaInfo = data;
          this.getWeather();
          this.getWeather("all");
        }
      });
    },
    async getArea() {
      const params = {
        key: this.key,
        address: this.area,
      };
      await axios.get("https://restapi.amap.com/v3/geocode/geo", { params }).then(({ data } = res) => {
        if (data.status) {
          this.areaInfo = data.geocodes[0];
        }
      });
      this.getWeather();
    },
    async getWeather(item) {
      const param = {
        key: this.key,
        city: this.areaInfo.adcode,
        extensions: item,
      };
      await axios
        .get("https://restapi.amap.com/v3/weather/weatherInfo", {
          params: param,
        })
        .then(({ data } = res) => {
          if (data.status) {
            if (item) {
              this.forecastsList = data.forecasts[0].casts;
              return;
            }
            this.info = data;
            this.info.lives[0].temperature = data.lives[0].temperature + "℃";
          }
        });
      // this.body = this.info.lives[0].temperature;
      this.setWeatherImg(this.info.lives[0]?.weather);
    },
    setWeatherImg(a) {
      this.weatherImg =
        a == "暴雪"
          ? require("@/assets/weather/baoxue.png")
          : a == "暴雨"
          ? require("@/assets/weather/baoyu.png")
          : a == "暴雨"
          ? require("@/assets/weather/baoyu.png")
          : a == "晴"
          ? require("@/assets/weather/qingtian.png")
          : a == "少云"
          ? require("@/assets/weather/shaoyun.png")
          : a == "晴间多云"
          ? require("@/assets/weather/duoyun.png")
          : a == "多云"
          ? require("@/assets/weather/duoyun.png")
          : a == "阴"
          ? require("@/assets/weather/yintian.png")
          : a == "阴天"
          ? require("@/assets/weather/yintian.png")
          : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  // background: #dfedf9;
  background: url("../../assets/bg.jpg") no-repeat;
  height: 100vh;
  width: 100%;
  .title {
    margin-top: 0;
    color: #acacac;
    font-size: 60px;
    padding: 20px;
    border-radius: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .area {
      width: 300px;
      display: flex;
      .sub {
        background: #ffb379;
        color: #fff;
        font-weight: bold;
        margin-left: 20px;
      }
      .sub:hover {
        background: #ffcaa1;
      }
    }
    .info {
      margin-top: 20px;
      width: 80%;
      height: 300px;
      border: solid 1px #fff;
      border-radius: 10px;
      backdrop-filter: blur(10px) saturate(1.5);
      padding: 20px;
      .today {
        margin: 0 0 10px;
        text-align: left;
      }
      .time {
        text-align: left;
      }
      .weather {
        display: flex;
        .weather-info {
          display: flex;
          justify-content: space-between;
          width: 350px;
          margin-top: 20px;
          .num {
            margin-top: 0;
            font-size: 50px;
          }
        }
        .weather-content {
          margin-left: 20px;
          width: max-content;
          text-align: left;
          .weather-content-title {
            font-size: 30px;
          }
          .weather-content-body {
          }
        }
      }
      .weather-other {
        display: flex;
        justify-content: start;
        .other-lite {
          width: 150px;
          text-align: left;
        }
      }
      .forecasts {
        margin-left: 20px;
        display: flex;
        .forecasts-lite {
          width: 170px;
          border-left: #fff 1px solid;
          border-right: #fff 1px solid;
          .forecasts-lite-li {
            margin: 10px 0;
          }
        }
      }
    }
  }
}
</style>
