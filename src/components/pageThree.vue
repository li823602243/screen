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
  
              <el-col :span="8" class="aside-list--td">活动数量</el-col>
  
              <el-col :span="8" class="aside-list--td">占比</el-col>
  
            </el-row>
  
            <el-row :gutter="24" class="aside-list--th">
  
              <el-col :span="8" class="aside-list--td type">展览</el-col>
  
              <el-col :span="8" class="aside-list--td">2222</el-col>
  
              <el-col :span="8" class="aside-list--td">50%</el-col>
  
            </el-row>
  
            <el-row :gutter="24" class="aside-list--th">
  
              <el-col :span="8" class="aside-list--td type">曲艺</el-col>
  
              <el-col :span="8" class="aside-list--td">100</el-col>
  
              <el-col :span="8" class="aside-list--td">80%</el-col>
  
            </el-row>
  
            <el-row :gutter="24" class="aside-list--th">
  
              <el-col :span="8" class="aside-list--td type">音乐</el-col>
  
              <el-col :span="8" class="aside-list--td">5520</el-col>
  
              <el-col :span="8" class="aside-list--td">80%</el-col>
  
            </el-row>
  
            <el-row :gutter="24" class="aside-list--th">
  
              <el-col :span="8" class="aside-list--td type">舞蹈</el-col>
  
              <el-col :span="8" class="aside-list--td">552</el-col>
  
              <el-col :span="8" class="aside-list--td">30%</el-col>
  
            </el-row>
  
            <el-row :gutter="24" class="aside-list--th">
  
              <el-col :span="8" class="aside-list--td type">戏剧</el-col>
  
              <el-col :span="8" class="aside-list--td">50%</el-col>
  
              <el-col :span="8" class="aside-list--td">25%</el-col>
  
            </el-row>
  
          </div>
  
        </div>
  
      </el-col>
  
      <el-col :span="17" class="main-wrapper">
  
        <div class="main-title">年龄段数量统计</div>
  
        <div class="main">
  
          <el-row :gutter="24" class="main-top">
  
            <el-col :span="12" class="main-left">
  
              <div class="flag"><span class="flag-content">活动服务人数</span></div>
  
              <date-choose></date-choose>
  
              <div id="service-order"></div>
  
            </el-col>
  
            <el-col :span="12" class="main-right">
  
              <div id="service-age"></div>
  
            </el-col>
  
          </el-row>
  
          <el-row :gutter="24" class="mian-footer">
  
            <div class="flag"><span class="flag-content">活动服务人数趋势</span></div>
  
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
  
  import echartsLiquidfill from "echarts-liquidfill"; //在这里引入
  
  export default {
  
    name: "hello",
  
    data() {
  
      return {
  
        msg: "Welcome to Your Vue.js App"
  
      };
  
    },
  
    components: {
  
      DateChoose
  
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
  
        let actTypeChart = this.$echarts.init(
  
          document.getElementById("aside-charts")
  
        );
  
        let orderChart = this.$echarts.init(
  
          document.getElementById("service-order")
  
        );
  
        let ageChart = this.$echarts.init(document.getElementById("service-age"));
  
        let trendWeekChart = this.$echarts.init(
  
          document.getElementById("trend-week")
  
        );
  
        let trendYearChart = this.$echarts.init(
  
          document.getElementById("trend-year")
  
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
  
            formatter: "{c}%",
  
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
  
          title: [{
  
              text: "预约人数",
  
              left: "29.8%",
  
              top: "60%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                fontSize: "16",
  
                color: "#fff",
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "参与人数",
  
              left: "70%",
  
              top: "60%",
  
              textAlign: "center",
  
              textStyle: {
  
                color: "#fff",
  
                fontWeight: "normal",
  
                fontSize: "16",
  
                textAlign: "center"
  
              }
  
            }
  
          ],
  
          series: [{
  
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
  
              data: [{
  
                  value: 75,
  
                  itemStyle: {
  
                    normal: {
  
                      color: new this.$echarts.graphic.LinearGradient(
  
                        0,
  
                        0,
  
                        0,
  
                        1, [{
  
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
  
                  value: 25,
  
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
  
              data: [{
  
                  value: 20,
  
                  itemStyle: {
  
                    normal: {
  
                      color: new this.$echarts.graphic.LinearGradient(
  
                        0,
  
                        0,
  
                        0,
  
                        1, [{
  
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
  
                  value: 80,
  
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
  
              data: [{
  
                  value: 75,
  
                  itemStyle: {
  
                    normal: {
  
                      color: new this.$echarts.graphic.LinearGradient(
  
                        0,
  
                        0,
  
                        0,
  
                        1, [{
  
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
  
              data: [{
  
                  value: 75,
  
                  itemStyle: {
  
                    normal: {
  
                      color: new this.$echarts.graphic.LinearGradient(
  
                        0,
  
                        0,
  
                        0,
  
                        1, [{
  
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
  
        let actTrendOption = {
  
          color: ["#37a2da", "#32c5e9", "#9fe6b8", "#ffdb5c", "#ff9f7f"],
  
          calculable: true,
  
          series: [{
  
            type: "pie",
  
            radius: [40, 150],
  
  
  
            roseType: "area",
  
            data: [{
  
                value: 10,
  
                name: "展览"
  
              },
  
              {
  
                value: 5,
  
                name: "曲艺"
  
              },
  
              {
  
                value: 15,
  
                name: "音乐"
  
              },
  
              {
  
                value: 25,
  
                name: "舞蹈"
  
              },
  
              {
  
                value: 20,
  
                name: "戏剧"
  
              }
  
            ]
  
          }]
  
        };
  
        let ageChartOption = {
  
          title: [{
  
              text: "0-20岁",
  
              left: "25%",
  
              top: "36%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#fff",
  
                fontSize: 15,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "226",
  
              left: "25%",
  
              top: "42%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#ddea96",
  
                fontSize: 16,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "20~40岁",
  
              left: "50%",
  
              top: "36%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#fff",
  
                fontSize: 15,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "155",
  
              left: "50%",
  
              top: "42%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#ddea96",
  
                fontSize: 16,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "20~40岁",
  
              left: "75%",
  
              top: "36%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#fff",
  
                fontSize: 15,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "155",
  
              left: "75%",
  
              top: "42%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#ddea96",
  
                fontSize: 16,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "20~40岁",
  
              left: "35%",
  
              top: "76%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#fff",
  
                fontSize: 15,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "155",
  
              left: "35%",
  
              top: "82%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#ddea96",
  
                fontSize: 16,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "20~40岁",
  
              left: "65%",
  
              top: "76%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#fff",
  
                fontSize: 15,
  
                textAlign: "center"
  
              }
  
            },
  
            {
  
              text: "155",
  
              left: "65%",
  
              top: "82%",
  
              textAlign: "center",
  
              textStyle: {
  
                fontWeight: "normal",
  
                color: "#ddea96",
  
                fontSize: 16,
  
                textAlign: "center"
  
              }
  
            }
  
          ],
  
          series: [{
  
              type: "liquidFill",
  
              name: "0~20岁", //series name
  
              data: [{
  
                name: "data name", //data name
  
                value: 0.6
  
              }],
  
              radius: "20%",
  
              // 水球颜色
  
              color: ["#db4e8d", "#db4e8d", "#db4e8d"],
  
              center: ["25%", "25%"],
  
              // outline  外边
  
              outline: {
  
                // show: false
  
                borderDistance: 5,
  
                itemStyle: {
  
                  borderWidth: 1,
  
                  borderColor: "#db4e8d"
  
                }
  
              },
  
              label: {
  
                normal: {
  
                  // textStyle: {
  
                  color: "#fff",
  
                  insideColor: "#fff",
  
                  fontSize: 22
  
                  // }
  
                }
  
              },
  
              // 内图 背景色 边
  
              backgroundStyle: {
  
                color: "rgba(4,24,74,0.8)"
  
                // borderWidth: 5,
  
                // borderColor: 'red',
  
              }
  
            },
  
            {
  
              type: "liquidFill",
  
              data: [0.3],
  
              radius: "20%",
  
              // 水球颜色
  
              color: ["#0070f0", "#0070f0", "#0070f0"],
  
              center: ["50%", "25%"],
  
              // outline  外边
  
              outline: {
  
                // show: false
  
                borderDistance: 5,
  
                itemStyle: {
  
                  borderWidth: 1,
  
                  borderColor: "#0070f0"
  
                }
  
              },
  
              label: {
  
                normal: {
  
                  textStyle: {
  
                    color: "#fff",
  
                    insideColor: "#fff",
  
                    fontSize: 20
  
                  }
  
                }
  
              },
  
              // 内图 背景色 边
  
              backgroundStyle: {
  
                color: "rgba(4,24,74,0.8)"
  
                // borderWidth: 5,
  
                // borderColor: 'red',
  
              }
  
            },
  
            {
  
              type: "liquidFill",
  
              data: [0.1],
  
              radius: "20%",
  
              // 水球颜色
  
              color: ["#9d4fc2", "#9d4fc2", "#9d4fc2"],
  
              center: ["75%", "25%"],
  
              // outline  外边
  
              outline: {
  
                // show: false
  
                borderDistance: 5,
  
                itemStyle: {
  
                  borderWidth: 1,
  
                  borderColor: "#9d4fc2"
  
                }
  
              },
  
              label: {
  
                normal: {
  
                  textStyle: {
  
                    color: "#fff",
  
                    insideColor: "#fff",
  
                    fontSize: 20
  
                  }
  
                }
  
              },
  
              // 内图 背景色 边
  
              backgroundStyle: {
  
                color: "rgba(4,24,74,0.8)"
  
                // borderWidth: 5,
  
                // borderColor: 'red',
  
              }
  
            },
  
            {
  
              type: "liquidFill",
  
              //data: [0.6, 0.5, 0.4, 0.3],
  
              data: [0.1, 0.05, 0.25],
  
              radius: "20%",
  
              // 水球颜色
  
              color: ["#00ddf0", "#00ddf0", "#00ddf0"],
  
              center: ["35%", "65%"],
  
              // outline  外边
  
              outline: {
  
                // show: false
  
                borderDistance: 5,
  
                itemStyle: {
  
                  borderWidth: 1,
  
                  borderColor: "#00ddf0"
  
                }
  
              },
  
              label: {
  
                normal: {
  
                  textStyle: {
  
                    color: "#fff",
  
                    insideColor: "#fff",
  
                    fontSize: 24
  
                  }
  
                }
  
              },
  
              // 内图 背景色 边
  
              backgroundStyle: {
  
                color: "rgba(4,24,74,0.8)"
  
                // borderWidth: 5,
  
                // borderColor: 'red',
  
              }
  
            },
  
            {
  
              type: "liquidFill",
  
              //data: [0.6, 0.5, 0.4, 0.3],
  
              data: [0.1, 0.05, 0.25],
  
              radius: "20%",
  
              // 水球颜色
  
              color: ["#d0c944", "#d0c944", "#d0c944"],
  
              center: ["65%", "65%"],
  
              // outline  外边
  
              outline: {
  
                // show: false
  
                borderDistance: 5,
  
                itemStyle: {
  
                  borderWidth: 1,
  
                  borderColor: "#d0c944"
  
                }
  
              },
  
              label: {
  
                normal: {
  
                  textStyle: {
  
                    color: "#fff",
  
                    insideColor: "#fff",
  
                    fontSize: 22
  
                  }
  
                }
  
              },
  
              // 内图 背景色 边
  
              backgroundStyle: {
  
                color: "rgba(4,24,74,0.8)"
  
                // borderWidth: 5,
  
                // borderColor: 'red',
  
              }
  
            }
  
          ]
  
        };
  
        let trendWeekOption = {
  
          title: {
  
            text: "本周",
  
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
  
            bottom: "20%",
  
            containLabel: true
  
          },
  
          xAxis: [{
  
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
  
          }],
  
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
  
            interval: 300,
  
            max: 1600
  
          },
  
          series: [{
  
            type: "bar",
  
            barWidth: 10,
  
            itemStyle: {
  
              normal: {
  
                color: new this.$echarts.graphic.LinearGradient(
  
                  0,
  
                  0,
  
                  0,
  
                  1, [{
  
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
  
            data: [254, 1500, 1300, 1200, 200, 1500, 1211]
  
          }]
  
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
  
            bottom: "20%",
  
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
  
                color: "#4f525e", //左边线的颜色
  
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
  
            max: 10000,
  
            interval: 2000,
  
            axisLine: {
  
              lineStyle: {
  
                type: "solid",
  
                color: "#4f525e", //左边线的颜色
  
                width: "1" //坐标线的宽度
  
              }
  
            }
  
          },
  
          series: [{
  
            color: ["#337ae4"],
  
            type: "line",
  
            itemStyle: {
  
              normal: {
  
                lineStyle: {
  
                  width: 5 //折线宽度
  
                },
  
                color: new this.$echarts.graphic.LinearGradient(
  
                  0,
  
                  0,
  
                  1,
  
                  0, [{
  
                      offset: 1,
  
                      color: "#f22be6" // 0% 处的颜色
  
                    },
  
                    {
  
                      offset: 0,
  
                      color: "#2ba9f2" // 100% 处的颜色
  
                    }
  
                  ],
  
                  false
  
                ),
  
                opacity: 0.4
  
              }
  
            },
  
            data: [
  
              1200,
  
              500,
  
              8006,
  
              4777,
  
              4878,
  
              3122,
  
              1003,
  
              600,
  
              5808,
  
              1002,
  
              3076,
  
              6005
  
            ]
  
          }]
  
        };
  
        // 绘制图表
  
        orderChart.setOption(orderChartOption);
  
        window.addEventListener("resize", () => {
  
          orderChart.resize();
  
        });
  
        actTypeChart.setOption(actTrendOption);
  
        window.addEventListener("resize", () => {
  
          actTypeChart.resize();
  
        });
  
        ageChart.setOption(ageChartOption);
  
        window.addEventListener("resize", () => {
  
          ageChart.resize();
  
        });
  
        trendWeekChart.setOption(trendWeekOption);
  
        window.addEventListener("resize", () => {
  
          trendWeekChart.resize();
  
        });
  
        trendYearChart.setOption(trendYearOption);
  
        window.addEventListener("resize", () => {
  
          trendYearChart.resize();
  
        });
  
      }
  
    }
  
  };
</script>
<style>
  .wrapper {
  
    height: 100%;
  
    margin: 10px auto;
  
  }
  
  
  
  .pageThree>.el-row,
  
  .pageThree>.el-row>.el-col {
  
    height: 97%;
  
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
  
    flex-direction: column;
  
    height: 100%;
  
    width: 100%;
  
    border-top: 1px solid #022ac8;
  
    border-right: 1px solid #022ac8;
  
    border-bottom: 1px solid #022ac8;
  
  }
  
  
  
  .main .mian-footer {
  
    flex: 1;
  
  }
  
  
  
  .aside-charts {
  
    position: relative;
  
    height: 480px;
  
  }
  
  
  
  .aside::after {
  
    content: "";
  
    position: absolute;
  
    height: 1px;
  
    background-color: #022ac8;
  
    width: 80%;
  
    top: 450px;
  
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
  
  
  
  .aside-list--td.type::after {
  
    content: "";
  
    position: absolute;
  
    height: 10px;
  
    width: 10px;
  
    border-radius: 50%;
  
    background-color: red;
  
    top: 50%;
  
    margin-top: -5px;
  
    left: 28%;
  
  }
  
  
  
  .main-top {
  
    height: 400px;
  
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
</style>