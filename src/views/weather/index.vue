<template>
  <div class="body">
    <h1 class="title">天气查询</h1>
    <div class="content">
      <div class="area">
        <el-input placeholder="输入地址查询" @keydown.enter.native="getArea" v-model="area"></el-input>
        <el-button @click="getArea" class="sub">确定</el-button>
        <div class="ip el-icon-location-information" @click="getIp"></div>
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
                <div class="forecasts-lite-li">
                  <img class="forecasts-icon" src="@/assets/wen.png" alt="" />
                  <div>
                    {{ item.daytemp + "℃" + " ~ " + item.nighttemp + "℃" }}
                  </div>
                </div>
                <div class="forecasts-lite-li">
                  <img class="forecasts-icon" src="@/assets/feng.png" alt="" />
                  <div>
                    {{ item.daypower + " ~ " + item.nightpower }}
                  </div>
                </div>
                <div class="forecasts-lite-li">
                  <!-- <img class="forecasts-icon" src="@/assets/feng.png" alt="" /> -->
                  <div>
                    {{ item.dayweather + " ~ " + item.nightweather }}
                  </div>
                </div>
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
      weatherInfo: [
        { value: "雾", img: "baowu.png" },
        { value: "暴雪", img: "baoxue.png" },
        { value: "暴雨", img: "baoyu.png" },
        { value: "暴雨-大暴雨", img: "baoyudaodabaoyu.png" },
        { value: "冰雹", img: "bingbao.png" },
        { value: "大暴雨", img: "dabaoyu.png" },
        { value: "大暴雨-特大暴雨", img: "dabaoyuzhuantedabaoyu.png" },
        { value: "大雪-暴雪", img: "dadaobaoxue.png" },
        { value: "大雨-暴雨", img: "dadaobaoyu.png" },
        { value: "大雾", img: "dawu.png" },
        { value: "大雪", img: "daxue.png" },
        { value: "大雨", img: "dayu.png" },
        { value: "多云", img: "duoyun.png" },
        { value: "浮尘", img: "fuchen.png" },
        { value: "极端降雨", img: "jiduanjiangyu.png" },
        { value: "雷阵雨", img: "leizhenyu.png" },
        { value: "雷阵雨并伴有冰雹", img: "leizhenyubingbao.png" },
        { value: "冷", img: "leng.png" },
        { value: "霾", img: "mai.png" },
        { value: "毛毛雨/细雨", img: "maomaoyu.png" },
        { value: "浓雾", img: "nongwu.png" },
        { value: "强雷阵雨", img: "qiangleizhenyu.png" },
        // { value: "特强浓雾", img: "qiangnongwu.png" },
        { value: "强沙尘暴", img: "qiangshachenbao.png" },
        { value: "强阵雨", img: "qiangzhenyu.png" },
        // { value: "晴", img: "qiangzhenyu1.png" },
        { value: "晴", img: "qing.png" },
        // { value: "晴", img: "qing1.png" },
        { value: "晴间多云", img: "qingjianduoyun.png" },
        // { value: "晴", img: "qingjianduoyun1.png" },
        // { value: "晴", img: "re.png" },
        { value: "沙尘暴", img: "shachenbao.png" },
        { value: "特大暴雨", img: "tedabaoyu.png" },
        { value: "特强浓雾", img: "teqiangnongwu.png" },
        { value: "未知", img: "weizhi.png" },
        { value: "大雾", img: "wu.png" },
        { value: "小雪-中雪", img: "xiaodaozhongxue.png" },
        { value: "小雨-中雨", img: "xiaodaozhongyu.png" },
        { value: "小雪", img: "xiaoxue.png" },
        { value: "小雨", img: "xiaoyu.png" },
        { value: "雪", img: "xue.png" },
        { value: "扬沙", img: "yangsha.png" },
        { value: "严重霾", img: "yanzhongmai.png" },
        { value: "阴", img: "yin.png" },
        // { value: "晴", img: "yin1.png" },
        { value: "雨", img: "yu1.png" },
        { value: "雨夹雪", img: "yujiaxue.png" },
        { value: "多云", img: "yun.png" },
        { value: "雨雪天气", img: "yuxuetianqi.png" },
        { value: "阵雪", img: "zhenxue.png" },
        // { value: "晴", img: "zhenxue1.png" },
        { value: "阵雨", img: "zhenyu.png" },
        // { value: "晴", img: "zhenyu1.png" },
        { value: "阵雨夹雪", img: "zhenyujiaxue.png" },
        // { value: "晴", img: "zhenyujiaxue1.png" },
        { value: "中雪-大雪", img: "zhongdaodaxue.png" },
        { value: "中雨-大雨", img: "zhongdaodayu.png" },
        { value: "中度霾", img: "zhongdumai.png" },
        // { value: "晴", img: "zhongdumai_1.png" },
        { value: "中雪", img: "zhongxue.png" },
        { value: "中雨", img: "zhongyu.png" },
      ],
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
        case "1":
          a = "星期一";
          break;
        case "2":
          a = "星期二";
          break;
        case "3":
          a = "星期三";
          break;
        case "4":
          a = "星期四";
          break;
        case "5":
          a = "星期五";
          break;
        case "6":
          a = "星期六";
          break;
        case "7":
          a = "星期日";
          break;
        default:
          a = "星期一";
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
      this.getWeather("all");
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
      for (const key in this.weatherInfo) {
        if (this.weatherInfo[key].value == a) {
          this.weatherImg = require("@/assets/weatherIcon/" + this.weatherInfo[key].img);
          return;
        } else {
          this.weatherImg = require("@/assets/weatherIcon/weizhi.png");
        }
      }
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
      // width: 300px;
      display: flex;
      align-items: center;
      .sub {
        background: #ffb379;
        color: #fff;
        font-weight: bold;
        margin-left: 20px;
      }
      .sub:hover {
        background: #ffcaa1;
      }
      .ip {
        font-size: 30px;
        margin-left: 20px;
        cursor: pointer;
      }
      .ip:hover {
        color: #ffb379;
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
        flex: 1;
        justify-content: space-around;
        .forecasts-lite {
          width: 100%;
          border-left: #fff 2px solid;
          // border-right: #fff 1px solid;
          .forecasts-lite-li {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
            .forecasts-icon {
              width: 20px;
              margin-right: 10px;
            }
          }
        }
      }
      .forecasts > :nth-child(1) {
        border-left: none;
      }
    }
  }
}
</style>
