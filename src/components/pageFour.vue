<template>
  <div class="wrapper">
    <el-row :gutter="40" class="wrapper-order">
      <el-col :span="12" class="wrapper-col">
        <el-row>
          <el-col :span="24" class="order-num--content"> 
            <div class="aside-title">场馆预约数量统计</div>
            <div class="order-num" id="order-total">
              <el-row :gutter="20">
                 <el-col :span="6"><span class="show-order-num">{{venue_booking_date_num.today_num}}</span><div class="order-day" id="order-day"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">{{venue_booking_date_num.week_num}}</span><div class="order-day" id="order-week"></div></el-col>
                 <el-col :span="6"><span class="show-order-num">{{venue_booking_date_num.month_num}}</span><div class="order-day" id="order-month"></div> </el-col>
                 <el-col :span="6"><span class="show-order-num">{{venue_booking_date_num.all_num}}</span><div class="order-day" id="order-all"></div></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="order-type--content">
          <el-col :span="24" class="order-type--wrapper"> 
            <div class="aside-title">按类型TOP</div>
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
              机构总数
            </el-col>
            <el-col :span="8">
              城市
            </el-col>
            <el-col :span="8">
              活动室总数
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
import {mapState} from 'vuex';
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
    setTimeout(()=>{
        this.getVenuePageData();
    },500)
  },
  computed: {
    ...mapState({
        FourPageData:state=>state.getFourPageData.msg,
      })
  },
  methods: {
    getVenuePageData() {
      let that = this ;
      this.myCityData = []
      this.venue_booking_date_num = this.FourPageData.venue_booking_date_num;
      this.city_agency_room_num = this.FourPageData.city_agency_room_num;
      this.venue_cat_booking_num = this.FourPageData.venue_cat_booking_num;
      this.$nextTick(()=>{
        that.drawLine();
      });
      
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.$store.state.orderDayChart = this.$echarts.init(
        document.getElementById("order-day")
      );
      this.$store.state.orderWeekChart = this.$echarts.init(
        document.getElementById("order-week")
      );
      this.$store.state.orderMonthChart = this.$echarts.init(
        document.getElementById("order-month")
      );
      this.$store.state.orderAllChart = this.$echarts.init(
        document.getElementById("order-all")
      );
      this.$store.state.addressCityTotalChart = this.$echarts.init(
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
          bottom: 15,
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
          bottom: 15,
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
          bottom: 15,
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
          bottom: 15   ,
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
      //(this.myCityData)
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
      this.$store.state.orderDayChart.setOption(orderDayOption);
      window.addEventListener("resize", () => {
        this.$store.state.orderDayChart.resize();
      });
      this.$store.state.orderWeekChart.setOption(orderWeekOption);
      window.addEventListener("resize", () => {
        this.$store.state.orderWeekChart.resize();
      });
      this.$store.state.orderMonthChart.setOption(orderMonthOption);
      window.addEventListener("resize", () => {
        this.$store.state.orderMonthChart.resize();
      });
      this.$store.state.orderAllChart.setOption(orderAllOption);
      window.addEventListener("resize", () => {
        this.$store.state.orderAllChart.resize();
      });
      this.$store.state.addressCityTotalChart.setOption(addressCityTotalOption);
      window.addEventListener("resize", () => {
        this.$store.state.addressCityTotalChart.resize();
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
  height: 16vw;
  width: 100%;
  border: 1px solid #032ac6;
}
.order-type--content {
  display: flex;
  flex: 1;
  /* height: 100%; */
}
.aside-title {
    position: relative;
    text-decoration: none;
    display: inline-block;
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
    font-size: 25px;
    color: #55fffc;
}
.aside-title:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    border: 1px solid #032ac6;
    border-bottom: none;
    -webkit-transform: perspective(1em) scale(1) rotateX(1.2deg);
    z-index: -1;
    transform-origin: bottom left;
}
.order-type {
  position: relative;
  flex: 1;
  width: 100%;
  border: 1px solid #032ac6;
  border-bottom: none;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width: 8px;
    height: 2px;
    background-color: #000733;
}
 
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
}
 
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
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
  border-bottom: 1px solid #032ac6;
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
  font-size: 28px;
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
  height: 100%;
  display: flex;
  align-items: center;
  /* text-align: center; */
  justify-content: center;
  /* margin: 15px 0; */
}
.order-type--icon {
  height: 60%;
  margin: 0 auto;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
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

