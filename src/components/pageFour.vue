<template>
  <div class="wrapper">
    <el-row :gutter="40" class="wrapper-order">
      <el-col :span="12" class="wrapper-col">
        <el-row>
          <el-col :span="24" class="order-num--content"> 
            <div class="aside-title">场馆预约数量统计</div>
            <div class="order-num" id="order-total">
              <el-row :gutter="20">
                 <el-col :span="6"><span class="show-order-num">{{utils.numFormat(venue_booking_date_num.today_num)}}</span><div class="order-day" id="order-day"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">{{utils.numFormat(venue_booking_date_num.week_num)}}</span><div class="order-day" id="order-week"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">{{utils.numFormat(venue_booking_date_num.month_num)}}</span><div class="order-day" id="order-month"></div> </el-col>
                 <el-col :span="6"><span class="show-order-num">{{utils.numFormat(venue_booking_date_num.all_num)}}</span><div class="order-day" id="order-all"></div></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="order-type--content">
          <el-col :span="24" class="order-type--wrapper"> 
            <div class="aside-title">按类型TOP10</div>
            <el-row class="order-type">
                <el-col :span="12" class="order-type--right">
                  <el-row class="right" v-for="(item,index)  in venue_cat_booking_num" :key="index" v-if='index<=4'>
                    <el-col :span="8">{{item.filter_name}}</el-col>
                    <el-col :span="8">{{utils.numFormat(item.amount)}}</el-col>
                    <el-col :span="8">
                      <div class="order-type--icon order-type--first" v-if='index==0'>
                        <span v-if="index >2">{{index+1}}</span>
                      </div>
                      <div class="order-type--icon order-type--second"  v-else-if='index==1'>
                        <span v-if="index >2">{{index+1}}</span>
                      </div>
                      <div class="order-type--icon order-type--three"  v-else-if='index==2'>
                        <span v-if="index >2">{{index+1}}</span>
                      </div>
                      <div class="order-type--icon order-type--nomal" v-else>
                        <span v-if="index >2">{{index+1}}</span>
                      </div>
                      </el-col>
                  </el-row> 
                </el-col>
                <el-col :span="12" class="order-type--right">
                  <el-row class="right" v-for="(item,index)  in venue_cat_booking_num" :key="item.amount" v-if='index >= 5'>
                    <el-col :span="8">{{item.filter_name}}</el-col>
                    <el-col :span="8">{{item.amount}}</el-col>
                    <el-col :span="8"><div class="order-type--icon order-type--nomal">{{index+1}}</div></el-col>
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
     venue_booking_date_num:{},
     city_agency_room_num:[],
     venue_cat_booking_num:[],
     myCityData:[],
     agencyAmount:[],
     venueAmount:[]
    };
  },
  mounted() {
    let that = this;
    this.getVenuePageData();
    const pageFour = setInterval(() =>{    
          this.venue_booking_date_num={},
          this.city_agency_room_num=[],
          this.venue_cat_booking_num=[],
          this.myCityData=[],
          this.agencyAmount=[],
         this.venueAmount=[]                
         that.getVenuePageData();          
    }, this.$store.state.intervalTime); 
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  methods: {
    getVenuePageData() {
      this.http.get(this.ports.urls.VenuePageData, res => {
        //console.log("第四页调用");
        this.venue_booking_date_num = res.data.results.venue_booking_date_num;
        this.city_agency_room_num = res.data.results.city_agency_room_num;
        this.venue_cat_booking_num = res.data.results.venue_cat_booking_num;
        this.drawLine();
      });
    },
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
      for(let i in this.city_agency_room_num){
        this.myCityData.push(this.city_agency_room_num[i].filter_name);
        this.agencyAmount.push(this.city_agency_room_num[i].agency_amount);
        this.venueAmount.push(this.city_agency_room_num[i].venue_amount);
      }
      var dataFirm = {
        1: this.agencyAmount
      };
      var dataDevice = {
        1: this.venueAmount
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
              left: "51%",
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
                fontSize: 18
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
              data: this.myCityData
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
                  color: "#fff",
                  fontSize: 18
                }
              },
              data: this.myCityData.map(function(value) {
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
              data: this.myCityData
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
  display: flex;
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
  top:2%;
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
  height: auto;
  margin-top: 30px;
}
.wrapper-col--left {
  height: 100%;
  border: 1px solid #032ac6;
}
.address-left {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  height: 20%;
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
  margin: 0 auto;
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

