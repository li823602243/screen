<template>
  <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
  <div class="wrapper pageThree">
    <el-row :gutter="24">
      <el-col :span="7" class="aside-wrapper">
        <div class="aside-title">活动分类数量统计</div>
        <div class="aside">
          <div class="aside-charts" id="aside-charts"></div>
          <div class="aside-list">
            <el-row :gutter="24" class="aside-list--tr">
              <el-col :span="8" class="aside-list--td">类别</el-col>
              <el-col :span="8" class="aside-list--td">服务人数</el-col>
              <el-col :span="8" class="aside-list--td">占比</el-col>
            </el-row>
            <el-row
              :gutter="24"
              class="aside-list--th"
              v-for="(item,index) in act_cat_join_num_lists"
              :key="item.filter_id"
            >
              <el-col
                :span="8"
                class="aside-list--td"
                :class="{'type': index == 0,'type1': index == 1,'type2': index == 2,'type3': index == 3,'type4': index == 4,'type5': index == 5}"
              >{{item.filter_name}}</el-col>
              <el-col :span="8" class="aside-list--td">{{utils.numFormat(item.amount)}}</el-col>
              <el-col :span="8" class="aside-list--td">{{item.percent.toFixed(2)}}%</el-col>
            </el-row>
          </div>
        </div>
      </el-col>

      <el-col :span="17" class="main-wrapper">
        <div class="main-title">年龄段数量统计</div>

        <div class="main">
          <el-row :gutter="24" class="main-top">
            <el-col :span="12" class="main-left">
              <div class="flag page-three--flag">
                <span class="flag-content">活动服务人数</span>
              </div>
              <div class="date-group page-three--group">
                <div class="date" :class="{active:showNums=='day'}" @click="chooseDateNum('day')">今日</div>
                <div
                  class="date"
                  :class="{active:showNums=='week'}"
                  @click="chooseDateNum('week')"
                >本周</div>
                <div
                  class="date"
                  :class="{active:showNums=='month'}"
                  @click="chooseDateNum('month')"
                >本月</div>
                <div class="date" :class="{active:showNums=='all'}" @click="chooseDateNum('all')">全部</div>
              </div>
              <span class="service-icon--book"></span>
              <span class="service-icon--join"></span>
              <div id="service-order"></div>
            </el-col>

            <el-col :span="12" class="main-right">
              <div id="service-age"></div>
            </el-col>
          </el-row>

          <el-row :gutter="24" class="mian-footer">
            <div class="flag">
              <span class="flag-content">活动服务人数趋势</span>
            </div>

            <el-col :span="8" class="mian-footer--col">
              <div class="service-trend" id="trend-week"></div>
            </el-col>

            <el-col :span="16" class="mian-footer--col">
              <div class="service-trend" id="trend-year"></div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DateChoose from "./DateChoose.vue";
import { mapState } from "vuex";
export default {
  name: "hello",
  data() {
    return {
      showNums: "day",
      act_cat_join_num_lists: "",
      act_cat_join_num_arr: [],
      bookPeopleNum: "",
      joinPeopleNum: "",
      trendWeekData: [],
      trendYearData: [],
    };
  },
  components: {
    DateChoose
  },
  mounted() {
    let that = this;
    setTimeout(()=>{
       this.getServicePageData();
    },500)
  },
  computed: {
    ...mapState({
      ThreePageData: state => state.getThreePageData.msg
    })
  },
  methods: {
    chooseDateNum: function(data) {
      this.showNums = data;
      this.bookPeopleNum = "";
      this.joinPeopleNum = "";
      switch (data) {
        case "day":
          this.bookPeopleNum = this.act_register_date_num.today_num;
          this.joinPeopleNum = this.act_sign_date_num.today_num;
          break;
        case "week":
          this.bookPeopleNum = this.act_register_date_num.week_num;
          this.joinPeopleNum = this.act_sign_date_num.week_num;
          break;
        case "month":
          this.bookPeopleNum = this.act_register_date_num.month_num;
          this.joinPeopleNum = this.act_sign_date_num.month_num;
          break;
        case "all":
          this.bookPeopleNum = this.act_register_date_num.all_num;
          this.joinPeopleNum = this.act_sign_date_num.all_num;
          break;
      }
      this.drawServicePeople();
    },
    getServicePageData() {
      let that = this;
      this.act_cat_join_num_lists = [];
      this.act_cat_join_num_lists = this.ThreePageData.act_cat_join_num_lists;
      this.act_register_date_num = this.ThreePageData.act_register_date_num;
      this.act_sign_date_num = this.ThreePageData.act_sign_date_num;
      this.act_sign_trend_data = this.ThreePageData.act_sign_trend_data;
      this.user_age_period_num = this.ThreePageData.user_age_period_num;
      this.$nextTick(()=>{
        that.drawLine();
      });
    },
    drawLine() {
      this.trendWeekData = [];
      const numFormat = num => {
        num = parseInt(num);
        num = num.toString().split("."); // 分隔小数点
        var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
        var res = [];
        for (var i = 0, len = arr.length; i < len; i++) {
          if (i % 3 === 0 && i !== 0) {
            res.push(","); // 添加分隔符
          }
          res.push(arr[i]);
        }
        res.reverse(); // 再次倒序成为正确的顺序
        if (num[1]) {
          // 如果有小数的话添加小数部分
          res = res.join("").concat("." + num[1]);
        } else {
          res = res.join("");
        }
        return res;
      };
      // 基于准备好的dom，初始化echarts实例
      this.drawTotal();
      this.bookPeopleNum = this.act_register_date_num.today_num;
      this.joinPeopleNum = this.act_sign_date_num.today_num;
      this.drawServicePeople();
      this.userAgePeriodNum();
      this.$store.state.trendWeekChart = this.$echarts.init(
        document.getElementById("trend-week")
      );
      this.$store.state.trendYearChart = this.$echarts.init(
        document.getElementById("trend-year")
      );
      // let trendWeekData =
      for (let i in this.act_sign_trend_data.week) {
        this.trendWeekData.push(this.act_sign_trend_data.week[i]);
      }
      for (let i in this.act_sign_trend_data.year) {
        this.trendYearData.push(this.act_sign_trend_data.year[i]);
      }
      let trendWeekOption = {
        title: {
          text: "本周",

          left: "center",

          top: 35,

          textStyle: {
            color: "#43d8d7"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "10%",

          right: "10%",

          top: "22%",

          bottom: "5%",

          containLabel: true
        },

        xAxis: [
          {
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],

            axisLabel: {
              interval: 0,

              rotate: 45, //倾斜度 -90 至 90 默认为0

              margin: 10,

              textStyle: {
                color: "#fff"
              }
            },

            axisLine: {
              lineStyle: {
                type: "solid",

                color: "#00103e", //左边线的颜色

                width: "1" //坐标线的宽度
              }
            }
          }
        ],

        yAxis: {
          nameTextStyle: {
            color: "#fff",

            fontSize: 14
          },

          axisLine: {
            lineStyle: {
              type: "solid",

              color: "#00103e", //左边线的颜色

              width: "1" //坐标线的宽度
            }
          },

          axisLabel: {
            color: "#fff",

            fontSize: 14
          },

          splitLine: {
            show: false,

            lineStyle: {
              color: "#0177d4"
            }
          },

          interval: 100,

          max: Math.max.apply(null, this.trendWeekData)
        },

        series: [
          {
            type: "bar",

            barWidth: 10,
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "#fff",
                fontSize: 16
                // fontWeight: 600
              }
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,

                  0,

                  0,

                  1,
                  [
                    {
                      offset: 0,

                      color: "#00b0ff"
                    },

                    {
                      offset: 0.8,

                      color: "#7052f4"
                    }
                  ],

                  false
                )
              }
            },

            data: this.trendWeekData
          }
        ]
      };
      let trendYearOption = {
        title: {
          text: "本年",

          left: "center",

          top: 35,

          textStyle: {
            color: "#43d8d7"
          }
        },

        grid: {
          left: "3%",

          right: "5%",

          top: "22%",

          bottom: "5%",

          containLabel: true
        },

        xAxis: {
          type: "category",

          boundaryGap: false,

          data: [
            "1月",

            "2月",

            "3月",

            "4月",

            "5月",

            "6月",

            "7月",

            "8月",

            "9月",

            "10月",

            "11月",

            "12月"
          ],

          axisLine: {
            lineStyle: {
              type: "solid",

              color: "#2ba9f2", //左边线的颜色

              width: "1" //坐标线的宽度
            }
          }
        },

        yAxis: {
          type: "value",

          splitLine: {
            show: false
          },

          min: 0,

          max: Math.max.apply(null, this.trendYearData),

          interval: 2000,

          axisLine: {
            lineStyle: {
              type: "solid",

              color: "#2ba9f2", //左边线的颜色

              width: "1" //坐标线的宽度
            }
          }
        },

        series: [
          {
            color: ["#337ae4"],
            symbol: "circle", //拐点样式
            symbolSize: 15, //拐点大小
            type: "line",
            label: {
              show: true,
              color: "#2ba9f2",
              fontSize: 18,
              formatter: function(p) {
                return numFormat(p.value);
              }
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 5 //折线宽度
                },

                color: new this.$echarts.graphic.LinearGradient(
                  0,

                  0,

                  1,

                  0,
                  [
                    {
                      offset: 1,

                      color: "#f22be6" // 0% 处的颜色
                    },

                    {
                      offset: 0,

                      color: "#2ba9f2" // 100% 处的颜色
                    }
                  ],

                  false
                )
              }
            },

            data: this.trendYearData
          }
        ]
      };
      this.$store.state.trendWeekChart.setOption(trendWeekOption);
      window.addEventListener("resize", () => {
        this.$store.state.trendWeekChart.resize();
      });
      this.$store.state.trendYearChart.setOption(trendYearOption);
      window.addEventListener("resize", () => {
        this.$store.state.trendYearChart.resize();
      });
    },
    drawTotal() {
      this.$store.state.actTypeChart = this.$echarts.init(
        document.getElementById("aside-charts")
      );
      this.act_cat_join_num_arr = [];
      for (let i in this.act_cat_join_num_lists) {
        let obj = {};
        obj.name = this.act_cat_join_num_lists[i].filter_name;
        obj.value = this.act_cat_join_num_lists[i].amount;
        this.act_cat_join_num_arr.push(obj);
      }
      //console.log("00000000000000000000000000000000")
     // console.log(this.act_cat_join_num_arr)
      let actTrendOption = {
        color: ["#37a2da", "#32c5e9", "#9fe6b8", "#ffdb5c", "#ff9f7f"],
        calculable: true,
        grid: {
          left: "15%",
          top:'15%',
          top:'15%',
          bottom: '15%',
          containLabel: true
        },
        series: [
          {
            type: "pie",
            radius: [40, 100],
            roseType: "area",
            itemStyle: {
              normal: {
                label: {
                  //指示到模块的标签文字
                  show: true,
                  fontSize: 16,
                  formatter: "{b} : {c}"
                },
                labelLine: {
                  //指示到模块的标签线
                  show: true
                }
              }
            },
            data: this.act_cat_join_num_arr
          }
        ]
      };
      this.$store.state.actTypeChart.setOption(actTrendOption);
      window.addEventListener("resize", () => {
        this.$store.state.actTypeChart.resize();
      });
    },
    drawServicePeople() {
      this.$store.state.orderChart = this.$echarts.init(
        document.getElementById("service-order")
      );
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        },
        emphasis: {
          color: "rgba(0,0,0,0)",
          borderWidth: 0
        }
      };
      var dataStyle = {
        normal: {
          formatter: "{c}",
          position: "center",
          show: true,
          textStyle: {
            fontSize: "28",
            fontWeight: "normal",
            color: "#fff"
          }
        }
      };
      let orderChartOption = {
        title: [
          {
            text: "预约人数",
            left: "29.8%",
            top: "60%",
            textAlign: "center",
            textStyle: {
              fontWeight: "normal",
              fontSize: "18",
              color: "#55ffff",
              textAlign: "center"
            }
          },
          {
            text: "参与人数",
            left: "70%",
            top: "60%",
            textAlign: "center",
            textStyle: {
              color: "#55ffff",
              fontWeight: "normal",
              fontSize: "18",
              textAlign: "center"
            }
          }
        ],
        series: [
          {
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["70%", "50%"],
            center: ["30%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: this.bookPeopleNum,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#99da69"
                        },
                        {
                          offset: 1,
                          color: "#01babc"
                        }
                      ]
                    )
                  }
                },
                label: dataStyle
              },
              {
                value: this.bookPeopleNum / 3,
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: "pie",
            hoverAnimation: false,
            radius: ["70%", "50%"],
            center: ["70%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: this.joinPeopleNum,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#9f3edd"
                        },
                        {
                          offset: 1,
                          color: "#4897f6"
                        }
                      ]
                    )
                  }
                },
                label: dataStyle
              },
              {
                value: this.joinPeopleNum / 3,
                itemStyle: placeHolderStyle
              }
            ]
          },
          //外圈的边框
          {
            // name: '总人数',
            type: "pie",
            hoverAnimation: false, //鼠标经过的特效
            radius: ["70%", "65%"],
            center: ["30%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#01babc"
                        },
                        {
                          offset: 1,
                          color: "#99da69"
                        }
                      ]
                    )
                  }
                }
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            type: "pie",
            hoverAnimation: false,
            radius: ["70%", "65%"],
            center: ["70%", "50%"],
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            label: {
              normal: {
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                itemStyle: {
                  normal: {
                    color: new this.$echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#4897f6"
                        },
                        {
                          offset: 1,
                          color: "#9f3edd"
                        }
                      ]
                    )
                  }
                }
              },
              {
                value: 25,
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      };
      // 绘制图表
      this.$store.state.orderChart.setOption(orderChartOption);
      window.addEventListener("resize", () => {
        this.$store.state.orderChart.resize();
      });
    },
    userAgePeriodNum() {
      let userAge = [];
      for (let i in this.user_age_period_num) {
        userAge.push(this.user_age_period_num[i].percent / 100);
      }
      this.$store.state.ageChart = this.$echarts.init(
        document.getElementById("service-age"),
        null,
        { renderer: "svg" }
      );
      let scaleData = [];
      for (let i in this.user_age_period_num) {
        let obj = {};
        obj.name = this.user_age_period_num[i].filter_name;
        obj.value = parseInt(this.user_age_period_num[i].amount);
        scaleData.push(obj);
      }
      var rich = {
        white: {
          color: "#ddd",
          align: "center",
          padding: [3, 0]
        }
      };
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: "rgba(0, 0, 0, 0)",
          borderColor: "rgba(0, 0, 0, 0)",
          borderWidth: 0
        }
      };
      var data = [];
      var color = [
        "#00ffff",
        "#00cfff",
        "#006ced",
        "#ffe000",
        "#ffa800",
        "#ff5b00",
        "#ff3000"
      ];
      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 2,
                shadowBlur: 150,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          },
          {
            value: 2,
            name: "",
            itemStyle: placeHolderStyle
          }
        );
      }
      var seriesObj = [
        {
          name: "",
          type: "pie",
          clockWise: false,
          radius: [40, 80],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "outside",
                fontSize: 16,
                formatter: function(params) {
                  var percent = 0;
                  var total = 0;
                  for (var i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== "") {
                    return params.name + "\n" + "占比" + percent + "%";
                  } else {
                    return "";
                  }
                },
                rich: rich
              },
              labelLine: {
                length: 15,
                length2: 50,
                show: true,
                color: "#00ffff"
              }
            }
          },
          data: data
        }
      ];
      let ageChartOption = {
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      };
      this.$store.state.ageChart.setOption(ageChartOption);
      window.addEventListener("resize", () => {
        this.$store.state.ageChart.resize();
      });
    },
    orderData(items) {
      if (items <= 10) {
        return 75;
      } else if (10 < items && items <= 30) {
        return 90;
      } else if (30 < items && items <= 50) {
        return 110;
      } else if (50 < items && items <= 70) {
        return 130;
      } else if (70 < items && items <= 90) {
        return 150;
      } else {
        return 170;
      }
    }
  }
};
</script>
<style>
.wrapper {
  height: 100%;
  margin: 10px auto;
}
.pageThree > .el-row,
.pageThree > .el-row > .el-col {
  height: 100%;
  padding: 0 !important;
}
.aside-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.aside {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 1px solid #022ac8;
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

.aside-title::after {
  content: "";

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background: transparent;

  border: 1px solid #032ac6;

  border-bottom: none;

  -webkit-transform: perspective(1em) scale(1, 1) rotateX(1.2deg);

  z-index: -1;

  transform-origin: bottom left;
}

.main-title {
  position: relative;

  text-decoration: none;

  display: inline-block;

  height: 60px;

  line-height: 60px;

  padding: 0 30px;

  font-size: 25px;

  color: #55fffc;
}

.main-title::after {
  content: "";

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  background: transparent;

  border: 1px solid #032ac6;

  border-bottom: none;

  -webkit-transform: perspective(1em) scale(1, 1) rotateX(1.2deg);

  z-index: -1;

  transform-origin: bottom right;
}

.main {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  height: 100%;

  width: 100%;

  border-top: 1px solid #022ac8;

  border-right: 1px solid #022ac8;

  border-bottom: 1px solid #022ac8;
}

.main .mian-footer {
  height: 400px;
}

.aside-charts {
  position: relative;
  height: 250px;
}

.aside::after {
  content: "";

  position: absolute;

  height: 1px;

  background-color: #022ac8;

  width: 80%;

  top: 260px;

  left: 50%;

  margin-left: -40%;
}

.aside-list {
  flex: 1;

  display: flex;

  flex-direction: column;

  justify-content: space-around;
}

.aside-list--tr .aside-list--td {
  color: #55ffff;

  font-size: 24px;
}

.aside-list--th .aside-list--td {
  text-align: center;

  color: #fff;

  font-size: 24px;
}

.line {
  width: 90%;

  height: 1px;

  background-color: #022ac8;

  margin: 0 auto;
}
.aside-list--td.type {
  position: relative;
}
.aside-list--td.type1 {
  position: relative;
}
.aside-list--td.type2 {
  position: relative;
}
.aside-list--td.type3 {
  position: relative;
}
.aside-list--td.type4 {
  position: relative;
}
.aside-list--td.type::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #37a2da;
  top: 50%;
  margin-top: -5px;
  left: 20%;
}
.aside-list--td.type1::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #32c5e9;
  top: 50%;
  margin-top: -5px;
  left: 20%;
}
.aside-list--td.type2::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #9fe6b8;
  top: 50%;
  margin-top: -5px;
  left: 20%;
}
.aside-list--td.type3::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #ffdb5c;
  top: 50%;
  margin-top: -5px;
  left: 20%;
}
.aside-list--td.type4::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #ff9f7f;
  top: 50%;
  margin-top: -5px;
  left: 20%;
}

.main-top {
  height: 300px;

  border-bottom: 1px solid #022ac8;

  margin: 0 !important;
}

.main-top .main-left {
  display: flex;

  flex-direction: column;

  height: 100%;

  border-right: 1px solid #022ac8;
}

.main-top .main-left #service-order {
  flex: 1;

  height: 100%;

  width: 100%;
}

.main-right {
  height: 100%;
}

#service-age {
  height: 100%;

  width: 100%;
}

.mian-footer .mian-footer--col,
.mian-footer .mian-footer--col .service-trend {
  height: 100%;
}

.flag {
  position: absolute;

  left: 50%;

  transform: translate(-50%);
}

.flag-content {
  position: relative;

  top: 25px;

  font-size: 24px;

  color: #54ffff;

  padding: 5px 15px;
}

.flag-content::after {
  content: "";

  position: absolute;

  top: 0;

  left: 0;

  right: 0;

  bottom: 0;

  border: 1px solid #0324aa;

  background-color: #000832;

  transform: perspective(2em) scale(1.1, 1.3) rotateX(-10deg);

  z-index: -1;
}

.main-left {
  position: relative;
}

.main-left .flag-content {
  top: -18px;
}
.service-icon--book {
  position: absolute;
  top: 180px;
  left: 29%;
  width: 25px;
  height: 23px;
  background-image: url(../../static/images/order.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.service-icon--join {
  position: absolute;
  top: 180px;
  right: 29%;
  width: 25px;
  height: 23px;
  background-image: url(../../static/images/part.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.page-three--flag {
  top: 0 !important;
}
.page-three--group {
  margin: 50px auto 0px auto;
  padding: 0;
}
</style>