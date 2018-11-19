<template>
  <div class="map-wrapper">
   <el-row :gutter="24">
    <el-col :span="6">
      <div class="map-tab">
        <div class="pannel-title left">微信关注人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--wechat"></div>
          <div class="map-tab-infos">
           <span class="map-num">231232131</span>
           <span class="map-title">昨日新增: 1121211</span>
          </div>
        </div>
      </div>
       <div class="map-tab">
        <div class="pannel-title left">注册人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--sign"></div>
          <div class="map-tab-infos">
           <span class="map-num">231232131</span>
           <span class="map-title">昨日新增: 1121211</span>
          </div>
        </div>
      </div>
      </el-col>
    <el-col :span="12" class="echarts-map--bg"><div class="echarts-map" id="echarts"></div></el-col>
    <el-col :span="6">
       <div class="map-tab map-tab--right">
        <div class="pannel-title right">微信关注人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--people"></div>
          <div class="map-tab-infos">
           <span class="map-num">231232131</span>
           <span class="map-title">昨日新增: 1121211</span>
          </div>
        </div>
      </div>
       <div class="map-tab map-tab--right">
        <div class="pannel-title right">注册人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--name"></div>
          <div class="map-tab-infos">
           <span class="map-num">231232131</span>
           <span class="map-title">昨日新增: 1121211</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  methods: {
    drawLine() {
      let mapChart = this.$echarts.init(document.getElementById("echarts"));
      this.$echarts.extendsMap = function(id, opt) {
        var curGeoJson = {};
        var geoCoordMap = {
          南京: [118.78, 32.04],
          常州: [119.95, 31.79],
          南通: [121.05, 32.08],
          昆山: [120.95, 31.39],
          连云港: [119.16, 34.59],
          淮安: [119.15, 33.5],
          泰州: [119.9, 32.49],
          苏州: [120.62, 31.32],
          镇江: [119.44, 32.2],
          扬州: [119.42, 32.39],
          常州: [119.95, 31.79],
          无锡: [120.29, 31.59],
          徐州: [117.2, 34.26],
          宿迁: [118.29, 33.95],
          盐城: [120.15, 33.38]
        };
        //设置颜色
        var levelColorMap = {
          "1": "rgba(241, 109, 115, .8)",
          "2": "rgba(255, 235, 59, .7)",
          "3": "rgba(147, 235, 248, 1)"
        };
        var handleEvents = {
          /**
           * i 实例对象
           * o option
           * n 地图名
           **/
          // 设置effectscatter
          initSeriesData: function(data) {
            var temp = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                temp.push({
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value, data[i].level)
                });
              }
            }
            console.log(temp)
            return temp;
          },

        };

        var option = {
          geo: {
            map: opt.mapName,
            // roam: true,
            zoom: 1,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#125288",
                borderWidth: 2,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#145c97" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#145c97" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(128, 217, 248, 1)",
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: "#389BB7",
                borderWidth: 0
              }
            },
          },
          series: [
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              symbolOffset:[0, '-200%'],
              // symbol: 'diamond',
              showEffectOn: "render",
              rippleEffect: {
                period: 8,
                scale: 4,
                brushType: "fill"
              },
              hoverAnimation: true,
              label:{                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                  show:true,
                  formatter: '{@[2]}',
                  position:'top',
                  distance:15
              },
              itemStyle: {
                normal: {
                  color: function(params) {
                    return levelColorMap[params.value[3]];
                  },
                  shadowBlur: 10,
                  shadowColor: "#333"
                }
              },
              data: handleEvents.initSeriesData(opt.data)
            }
          ]
        };

        mapChart.setOption(option);
        window.addEventListener("resize", () => {
        mapChart.resize();
      });
        return mapChart;
      };
      let geoJson = {};
      this.$axios.get("../static/geoJson/jiangsu.json").then(response => {
        console.log(response.data);
        this.$echarts.registerMap("江苏", response.data);
        var myChart = this.$echarts.extendsMap("chart-panel", {
          bgColor: "#0f6ab8", // 画布背景色
          mapName: "江苏", // 地图名
          goDown: false, // 是否下钻
          // 数据展示
          data: [
            {
              name: "南京",
              value: 10,
              level: 1
            },
            {
              name: "苏州",
              value: 12,
              level: 2
            },
            {
              name: "扬州",
              value: 11,
              level: 3
            },
            {
              name: "常州",
              value: 16,
              level: 2
            },
            {
              name: "盐城",
              value: 1,
              level: 1
            }
          ]
        });
      });
    }
  }
};
</script>
<style>
.page {
  background: url('../../static/images/nomal-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.map-wrapper {
  height: 100%;
  width: 100%;
  padding: 0 60px;
  box-sizing: border-box;
}
.map-wrapper .el-row {
   height: 100%;
  width: 100%;
}
.echarts-map--bg {
  height: 100%;
  background-image: url(../../static/images/square.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 100%;
}
.echarts-map--bg .echarts-map {
  height: 100%;
  width: 100%;
}
.map-tab {
 display: flex;
 flex-direction: column;
 margin-top: 60px;
 align-items: flex-start;

}
.map-tab--content {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 200px;
  border: 1px solid #022ac8;
  padding: 0 20px;
}
.map-tab--right {
 display: flex;
 flex-direction: column;
 margin-bottom: 60px;
 align-items: flex-end;
}
.map-icon {
  width: 130px;
  height: 120px;
}
.map-icon--wechat {
  background-image: url(../../static/images/map-wechat.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 100%;
}
.map-icon--sign {
  background-image: url(../../static/images/map-sign.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 100%;
}
.map-icon--people {
  background-image: url(../../static/images/map-people.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 100%;
}
.map-icon--name {
  background-image: url(../../static/images/map-name.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 100%;
}
.map-num {
  display: inline-block;
  color: #fff;
  font-size: 36px;
}
.map-tab-infos {
  padding: 20px;
  box-sizing: border-box;
}
.map-num {
  display: inline-block;
  width: 100%;
  text-align: right;
}
.map-title {
  display: inline-block;
  margin-top: 20px;
  color: #fff;
  width: 100%;
  text-align: right;
  font-size: 16px;
}
</style>

