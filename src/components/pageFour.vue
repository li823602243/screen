<template>
  <div class="wrapper">
    <el-row :gutter="40" class="wrapper-order">
      <el-col :span="12" class="wrapper-col">
        <el-row>
          <el-col :span="24" class="order-num--content"> 
            <div class="aside-title">场馆预约数量统计</div>
            <div class="order-num" id="order-total">
              <el-row :gutter="20">
                 <el-col :span="6"><span class="show-order-num">10004</span><div class="order-day" id="order-day"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">10004</span><div class="order-day" id="order-week"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">10004</span><div class="order-day" id="order-month"></div> </el-col>
                 <el-col :span="6"><span class="show-order-num">10004</span><div class="order-day" id="order-all"></div></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="order-type--content">
          <el-col :span="24" class="order-type--wrapper"> 
            <div class="aside-title">按类型TOP10</div>
            <el-row class="order-type">
                <el-col :span="12" class="order-type--right">
                  <el-row class="right">
                    <el-col :span="8">音乐厅</el-col>
                    <el-col :span="8">225552</el-col>
                    <el-col :span="8" class="order-type--icon order-type--first"></el-col>
                  </el-row> 
                  <el-row class="right">
                    <el-col :span="8">舞蹈厅</el-col>
                    <el-col :span="8">10000</el-col>
                    <el-col :span="8" class="order-type--icon order-type--second"></el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">1222</el-col>
                    <el-col :span="8" class="order-type--icon order-type--three"></el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">10055</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">4</el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">10022</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">5</el-col>
                  </el-row>
                </el-col>
                <el-col :span="12" class="order-type--right">
                   <el-row class="right">
                    <el-col :span="8">音乐厅</el-col>
                    <el-col :span="8">225552</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">6</el-col>
                  </el-row> 
                  <el-row class="right">
                    <el-col :span="8">舞蹈厅</el-col>
                    <el-col :span="8">10000</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">7</el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">1222</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">8</el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">10055</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">9</el-col>
                  </el-row>
                  <el-row class="right">
                    <el-col :span="8">展厅</el-col>
                    <el-col :span="8">10022</el-col>
                    <el-col :span="8" class="order-type--icon order-type--nomal">10</el-col>
                  </el-row>
                </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="wrapper-col">
         <div class="aside-title aside-title--address"></div>
         <div class="address-left">
          <el-row class="address-left--top">
            <el-col :span="8">
              机构数
            </el-col>
            <el-col :span="8">
              城市
            </el-col>
            <el-col :span="8">
              活动室数量
            </el-col>
          </el-row>
          <el-row class="address-left--bottom" id="address-city-total">
          </el-row>
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
      // 基于准备好的dom，初始化echarts实例
      let orderDayChart = this.$echarts.init(
        document.getElementById("order-day")
      );
      let orderWeekChart = this.$echarts.init(
        document.getElementById("order-week")
      );
      let orderMonthChart = this.$echarts.init(
        document.getElementById("order-month")
      );
      let orderAllChart = this.$echarts.init(
        document.getElementById("order-all")
      );
      let addressCityTotalChart = this.$echarts.init(
        document.getElementById("address-city-total")
      );
      var dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 40,
          shadowColor: "rgba(40, 40, 40, 0.5)"
        }
      };
      var placeHolderStyle = {
        normal: {
          color: "rgba(44,59,70,1)", //未完成的圆环的颜色
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: "rgba(44,59,70,1)" //未完成的圆环的颜色
        }
      };
      var samObject = {
        name: "Line 2",
        type: "pie",
        animation: false,
        clockWise: false,
        radius: [70, 68],
        itemStyle: dataStyle,
        hoverAnimation: false,
        tooltip: {
          show: false
        },
        data: [
          {
            value: 100,
            name: "02",
            itemStyle: {
              emphasis: {
                color: "#18366d"
              }
            }
          },
          {
            value: 0,
            name: "invisible",
            itemStyle: placeHolderStyle
          }
        ]
      };
      let orderDayOption = {
        title: {
          text: "今日",
          bottom: 30,
          left: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#54ffff",
            fontSize: 20
          }
        },
        color: ["#eb644b", "#18366d", "#fff"],
        series: [
          {
            name: "15000",
            type: "pie",
            clockWise: false,
            radius: [75, 73],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 75,
                name: "01"
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: placeHolderStyle
              }
            ]
          },
          samObject
        ]
      };
      let orderWeekOption = {
        title: {
          text: "本周",
          bottom: 30,
          left: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#54ffff",
            fontSize: 20
          }
        },
        color: ["#ba04e8", "#18366d", "#fff"],
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: false,
            radius: [75, 73],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 75,
                name: "01"
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: placeHolderStyle
              }
            ]
          },
          samObject
        ]
      };
      let orderMonthOption = {
        title: {
          text: "本月",
          bottom: 30,
          left: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#54ffff",
            fontSize: 20
          }
        },
        color: ["#f9db18", "#18366d", "#fff"],
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: false,
            radius: [75, 73],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 75,
                name: "01"
              },
              {
                value: 25,
                name: "invisible",
                itemStyle: placeHolderStyle
              }
            ]
          },
          samObject
        ]
      };
      let orderAllOption = {
        title: {
          text: "全部",
          bottom: 30,
          left: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#54ffff",
            fontSize: 20
          }
        },
        color: ["#f62301", "#18366d", "#fff"],
        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: false,
            radius: [75, 73],
            itemStyle: dataStyle,
            hoverAnimation: false,
            data: [
              {
                value: 100,
                name: "01"
              },
              {
                value: 0,
                name: "invisible",
                itemStyle: placeHolderStyle
              }
            ]
          },
          samObject
        ]
      };
      var myData = [
        "浙江大华",
        "家和物联",
        "海康威视",
        "杭州消安",
        "泛海三江",
        "中辰科技",
        "汇点科技",
        "超翔科技"
      ];
      var dataFirm = {
        1: [389, 259, 262, 324, 233, 432, 267, 245]
      };
      var dataDevice = {
        1: [121, 388, 233, 309, 432, 345, 675, 245]
      };
      var timeLineData = [1];
      let addressCityTotalOption = {
        baseOption: {
          timeline: {
            show: false,
            top: 0,
            data: []
          },
          legend: {
            show: false
          },
          grid: [
            {
              show: false,
              left: "9%",
              top: 0,
              bottom: 0,
              containLabel: true,
              width: "31%"
            },
            {
              show: false,
              left: "52.5%",
              top: 0,
              bottom: 0,
              width: "0%"
            },
            {
              show: false,
              right: "9%",
              top: 0,
              bottom: 0,
              containLabel: true,
              width: "31%"
            }
          ],

          xAxis: [
            {
              type: "value",
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: "top",
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            },
            {
              gridIndex: 1,
              show: false
            },
            {
              gridIndex: 2,
              nameTextStyle: {
                color: "#50afff",
                fontSize: 14
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              position: "top",
              axisLabel: {
                show: false
              },
              splitLine: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: "category",
              inverse: true,
              position: "right",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: myData
            },
            {
              gridIndex: 1,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                interval: 0,
                textStyle: {
                  color: "#50afff",
                  fontSize: 14
                }
              },
              data: myData.map(function(value) {
                return {
                  value: value,
                  textStyle: {
                    align: "center"
                  }
                };
              })
            },
            {
              gridIndex: 2,
              type: "category",
              inverse: true,
              position: "left",
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: myData
            }
          ],
          series: []
        },
        options: []
      };
      addressCityTotalOption.baseOption.timeline.data.push(timeLineData[0]);
      addressCityTotalOption.options.push({
        series: [
          {
            name: "接入单位",
            type: "bar",
            barWidth: 10,
            barMinWidth: 5,
            label: {
              normal: {
                show: true,
                position: "left",
                offset: [0, 0],
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#4ca8f6",
                barBorderRadius: 50
              }
            },

            data: dataFirm[timeLineData[0]]
          },
          {
            name: "接入设备",
            type: "bar",
            barWidth: 10,
            xAxisIndex: 2,
            yAxisIndex: 2,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [0, 0],
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#00d484",
                barBorderRadius: 50
              }
            },
            data: dataDevice[timeLineData[0]]
          }
        ]
      });
      // 绘制图表
      orderDayChart.setOption(orderDayOption);
      window.addEventListener("resize", () => {
        orderDayChart.resize();
      });
      orderWeekChart.setOption(orderWeekOption);
      window.addEventListener("resize", () => {
        orderWeekChart.resize();
      });
      orderMonthChart.setOption(orderMonthOption);
      window.addEventListener("resize", () => {
        orderMonthChart.resize();
      });
      orderAllChart.setOption(orderAllOption);
      window.addEventListener("resize", () => {
        orderAllChart.resize();
      });
      addressCityTotalChart.setOption(addressCityTotalOption);
      window.addEventListener("resize", () => {
        addressCityTotalChart.resize();
      });
    }
  }
};
</script>
<style>
.wrapper-order {
  height: 100%;
}
.wrapper-col {
  display: flex;
  flex-direction: column;
}
.order-num {
  height: 300px;
  width: 100%;
  border: 1px solid #032ac6;
}
.order-type--content {
  flex: 1;
  /* height: 100%; */
}
.order-type {
  position: relative;
  flex: 1;
  width: 100%;
  border: 1px solid #032ac6;
}
.order-type::after{
  position: absolute;
  height: 96%;
  top:0;
  width: 1px;
  background-color: #032ac6;
  left: 50%;
}
.order-total,
.wrapper-col {
  height: 100%;
}
.order-total {
  border: 1px solid red;
}
.order-num--content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.order-type--wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 88%;
  margin-top: 30px;
}
.wrapper-col--left {
  height: 100%;
  border: 1px solid #032ac6;
}
.address-left {
  display: flex;
  flex-direction: column;
  height: 89%;
  border: 1px solid #032ac6;
}
.address-left--bottom {
  flex: 1;
}
.aside-title--address::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  -webkit-transform: perspective(1em) scale(1, 1) rotateX(1.2deg);
  z-index: -1;
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left;
}
.order-num > .el-row {
  width: 100%;
  height: 100%;
}
.order-num > .el-row > .el-col {
  position: relative;
  height: 100%;
}
.order-num > .el-row > .el-col > .order-day {
  height: 100%;
  width: 100%;
}
.show-order-num {
  position: absolute;
  font-size: 20px;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.address-left--top {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  color: #4deaea;
}
.order-type--right {
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
  height: 100%;
}
.order-type--right  .el-row {
  display: flex;
  align-items: center;
}
.order-type--right  .el-row .el-col{
  font-size: 24px;
  color: #fff;
  margin: 15px 0;
}
.order-type--icon {
  height: 50px;
  line-height: 50px;
  width: 50px;
}
.order-type--first {
  background-image: url(../../static/images/gold-one.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.order-type--second {
  background-image: url(../../static/images/gold-two.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.order-type--three {
  background-image: url(../../static/images/gold-three.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.order-type--nomal {
  background-image: url(../../static/images/gold-other.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>

