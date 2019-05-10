<template>
  <div class="map-wrapper wrapper">
   <el-row :gutter="24">
    <el-col :span="6">
      <div class="map-tab">
        <div class="pannel-title left">微信关注人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--wechat"></div>
          <div class="map-tab-infos">
           <span class="map-num">{{userData.weixin_user_num}}</span>
           <span class="map-title">昨日新增: {{userData.weixin_user_day_num}}</span>
          </div>
        </div>
      </div>
       <div class="map-tab">
        <div class="pannel-title left">注册人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--sign"></div>
          <div class="map-tab-infos">
           <span class="map-num">{{userData.register_user_num}}</span>
           <span class="map-title">昨日新增: {{userData.register_user_day_num}}</span>
          </div>
        </div>
      </div>
      </el-col>
    <el-col :span="12" class="echarts-map--bg"><div class="echarts-map" id="echarts"></div></el-col>
    <el-col :span="6">
       <div class="map-tab map-tab--right">
        <div class="pannel-title right">平台访问人次</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--people"></div>
          <div class="map-tab-infos">
           <span class="map-num">{{userData.site_visit_num}}</span>
           <span class="map-title">昨日新增: {{userData.site_visit_day_num}}</span>
          </div>
        </div>
      </div>
       <div class="map-tab map-tab--right">
        <div class="pannel-title right">实名人数</div>
        <div class="map-tab--content">
          <div class="map-icon map-icon--name"></div>
          <div class="map-tab-infos">
           <span class="map-num">{{userData.verified_user_num}}</span>
           <span class="map-title">昨日新增: {{userData.verified_user_day_num}}</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "hello",
  data() {
    return {
      userData: {},
      userMapData:[]
    };
  },
  computed: {
    ...mapState({
      EightPageData:state=>state.getEightPageData.msg,
    })
  },
  mounted() {
    let that = this;
    this.$nextTick(function () {
     that.getVenuePageData();
    })
  },
  methods: {
    getVenuePageData() {
        this.userData = this.EightPageData;
        this.drawLine();
    },
    drawLine() {
      let mapChart = this.$echarts.init(document.getElementById("echarts"));
      this.$echarts.extendsMap = function(id, opt) {
        var curGeoJson = {};
        var geoCoordMap = {
          南京市: [118.78, 32.04],
          南通市: [120.8, 32.08],
          连云港市: [119.16, 34.56],
          淮安市: [119.15, 33.5],
          泰州市: [119.9, 32.49],
          苏州市: [120.590229,31.124587],
          镇江市: [119.44, 31.9],
          扬州市: [119.42, 32.39],
          常州市: [119.897546,31.593378],
          无锡市: [120.29, 31.59],
          徐州市: [117.2, 34.26],
          宿迁市: [118.5, 33.5],
          盐城市: [120.15, 33.38],
          昆山市: [121.02544,31.390804],
          沭阳县:[118.785696,34.09952],
          泰兴市:[120.059753,32.167449]
        };
        //设置颜色
        var levelColorMap = {
          "1": "#F62157",
          "2": "#05C3F9",
          "3": "#ffb762"
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
            return temp;
          },
        };
        var option = {
          title: {
            text: "各地市微信推广人数",
            left: "center",
            top: 35,
            textStyle: {
              color: "#43d8d7",
              fontSize:28
            }
          },
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
              // type: "effectScatter",
              type: 'scatter',
              coordinateSystem: "geo",
              symbolOffset:[0, '-130%'],
              // symbol: 'diamond',
              showEffectOn: "render",
              symbolSize: 8,
              rippleEffect: {
                period: 8,
                scale: 4,
                brushType: "fill"
              },
              hoverAnimation: true,
              label:{                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
                  show:false,
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
            },
            {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolOffset:[0, "-15px"],
            symbol: 'pin',
            symbolSize: function (val) {
                if(val[2] <= 100){
                 return 40;
                }else if(100 < val[2] && val[2] <=　1000){
                  return 60;
                } else if (1000 < val[2] && val[2] <=　2000){
                  return 70;
                } else if (2000 < val[2] && val[2] <=　5000){
                  return 80;
                } else if (5000 < val[2] && val[2] <=　10000){
                  return 100;
                }else{
                  return 120;
                }
              },
            label:{                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
              show:true,
              formatter: '{@[2]}',
              color:'#fff',
              fontSize:16
            },
            itemStyle: {
              normal: {
                 color: function(params) {
                    return levelColorMap[params.value[3]];
                  },
              }
            },
            zlevel: 6,
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
      let userMapData= [];
      for(let i in this.userData.area_user_register_num){
        let obj = {};
        obj.name= this.userData.area_user_register_num[i].filter_name;
        obj.value= this.userData.area_user_register_num[i].amount;
        let yu =  i%3;
        if(yu==0){
          obj.level= 1;
        }else if(yu==1){
          obj.level= 2;
        }else{
          obj.level= 3;
        }
        userMapData.push(obj)
      }
       this.$axios.get("../screen/static/geoJson/jiangsu.json").then(response => {
       //this.$axios.get("../../../static/geoJson/jiangsu.json").then(response => {
        this.$echarts.registerMap("江苏", response.data);
        var myChart = this.$echarts.extendsMap("chart-panel", {
          bgColor: "#0f6ab8", // 画布背景色
          mapName: "江苏", // 地图名
          goDown: false, // 是否下钻
          // 数据展示
          data:  userMapData
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
