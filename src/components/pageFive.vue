<template>
  <div class="wrapper entrance-wrapper">
    <el-row class="entrance-people">
      <div class="flag"><span class="flag-content">入馆服务人数</span></div>
      <el-col :span="4" class="wrapper-col">1</el-col>
      <el-col :span="4" class="wrapper-col">2</el-col>
      <el-col :span="8" class="wrapper-col" id="aggregate-people">3</el-col>
      <el-col :span="4" class="wrapper-col">4</el-col>
      <el-col :span="4" class="wrapper-col">4</el-col>
    </el-row>
    <el-row class="entrance-bottom" :gutter="20">
      <el-col :span="16" class="wrapper-col">
        <div class="title-flag left">实时入馆人数</div>
        <div class="entrance-now-num" id="entrance-now-num"></div>
      </el-col>
      <el-col :span="8" class="wrapper-col entrance-total-right">
        <div class="title-flag right">入馆人数一周走势分析统计</div>
        <div class="entrance-now-total" id="entrance-now-total"></div>
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
      let aggregateChart = this.$echarts.init(
        document.getElementById("aggregate-people")
      );
      let entranceNowNumChart = this.$echarts.init(
        document.getElementById("entrance-now-num")
      );
      let entranceNowTotalChart = this.$echarts.init(
        document.getElementById("entrance-now-total")
      );
      let aggregateOption = {
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              formatter: "{value}%"
            },
            min: 0,
            max: 40,
            splitNumber: 5,
            pointer: {
              length: "60%",
              width: 3
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 15,
                shadowBlur: 0,
                color: [[0.3, "#65e0e1"], [0.7, "#38a0d8"], [1, "#fa676c"]]
              }
            },
            detail: {
              color: "#fff",
              offsetCenter: [0, "100%"]
            },
            data: [
              {
                value: 10,
                name: "累计服务人数"
              }
            ]
          }
        ]
      };
      var data = [
        {
          name: "一月",
          value: 80
        },
        {
          name: "二月",
          value: 87.8
        },
        {
          name: "三月",
          value: 71
        },
        {
          name: "四月",
          value: 80
        },
        {
          name: "五月",
          value: 66
        },
        {
          name: "六月",
          value: 80
        },
        {
          name: "七月",
          value: 80
        }
      ];
      var xData = [],
        yData = [];
      var min = 50;
      data.map(function(a, b) {
        xData.push(a.name);
        if (a.value === 0) {
          yData.push(a.value + min);
        } else {
          yData.push(a.value);
        }
      });
      let entranceNowNumOption = {
        baseOption: {
          timeline: {
            show: true,
            type: "slider",
            axisType: "category",
            bottom: "10",
            currentIndex: 0, //0 时表示当前选中项为 timeline.data[0]（即使用 options[0]
            autoPlay: true, //是否自动播放
            loop: true,
            realtime: true, //拖动圆点的时候，是否实时更新视图。
            controlPosition: "left",
            label: {
              normal: {
                color: "#2998ff"
              }
            },
            itemStyle: {
              normal: {
                color: "#fff",
                borderColor: "#2998ff",
                borderWidth: 2
              }
            },
            checkpointStyle: {
              //『当前项』（checkpoint）的图形样式
              color: "rgb(215, 0, 0)"
            },
            lineStyle: {
              show: true, //false 不显示轴线
              color: "#2998ff"
            },
            controlStyle: {
              //控制按钮的样式
              show: true,
              showPrevBtn: false,
              showNextBtn: false,
              itemGap: 50,
              itemSize: 36,
              normal: {
                color: "rgb(215, 0, 0)",
                borderColor: "rgb(215, 0, 0)"
              },
              emphasis: {
                color: "rgb(215, 0, 0)",
                borderColor: "rgb(215, 0, 0)"
              }
            },
            data: ["区域人数", "流入人数", "流出人数"]
          },
          tooltip: {
            //提示框组件
            trigger: "axis",
            formatter: "{b}<br />{a0}: {c0}<br />{a1}: {c1}",
            axisPointer: {
              type: "shadow",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            textStyle: {
              color: "#fff",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12
            }
          },
          grid: {
            left: 10,
            right: 35,
            bottom: 70,
            top: 60,
            containLabel: true
          },
          legend: {
            //图例组件，颜色和名字
            left: 0,
            top: 0,
            itemGap: 16,
            itemWidth: 20,
            itemHeight: 14,
            data: [
              {
                name: "2017-08-05 至 2017-08-05",
                icon: "rect"
              },
              {
                name: "2017-08-06 至 2017-08-06",
                icon: "rect"
              }
            ],
            textStyle: {
              color: "#a8aab0",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 12
            }
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false, //坐标轴两边留白

              axisLabel: {
                //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                textStyle: {
                  color: "#078ceb",
                  fontStyle: "normal",
                  fontFamily: "微软雅黑",
                  fontSize: 12
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#ccc"
                }
              },
              axisTick: {
                //坐标轴刻度相关设置。
                show: false
              },
              axisLine: {
                //坐标轴轴线相关设置
                lineStyle: {
                  color: "#999"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              splitNumber: 6,
              axisLabel: {
                textStyle: {
                  color: "#333",
                  fontStyle: "normal",
                  fontFamily: "微软雅黑",
                  fontSize: 12
                }
              },
              axisLine: {
                lineStyle: {
                  color: "#999"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "#ccc"
                }
              }
            }
          ],
          series: [
            {
              name: "2017-08-05 至 2017-08-05",
              type: "line",
              symbol: "circle",
              symbolSize: 6, //空心标记的大小
              smooth: true, //是否平滑曲线显示
              smoothMonotone: "x", //指明是在 x 轴或者 y 轴上保持单调性
              label: {
                //图形上的文本标签
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#018ada",
                    fontStyle: "normal",
                    fontFamily: "微软雅黑",
                    fontSize: 12
                  }
                }
              },
              lineStyle: {
                //线条样式
                normal: {
                  width: 2,
                  color: "#4ac7f5",
                  opacity: 1
                }
              },
              itemStyle: {
                //折线拐点标志的样式。
                normal: {
                  color: "#4ac7f5",
                  borderColor: "#4ac7f5",
                  borderWidth: 2
                }
              }
            },
            {
              name: "2017-08-06 至 2017-08-06",
              type: "line",
              symbol: "circle",
              symbolSize: 6, //空心标记的大小
              smooth: true, //是否平滑曲线显示
              smoothMonotone: "x", //指明是在 x 轴或者 y 轴上保持单调性
              label: {
                //图形上的文本标签
                normal: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#f6a436",
                    fontStyle: "normal",
                    fontFamily: "微软雅黑",
                    fontSize: 12
                  }
                }
              },
              areaStyle: {
                //区域填充样式。
                normal: {
                  opacity: 0,
                  color: "#f6a436"
                }
              },
              lineStyle: {
                //线条样式
                normal: {
                  width: 2,
                  color: "#f6a436"
                }
              },
              itemStyle: {
                //折线拐点标志的样式。
                normal: {
                  color: "#f6a436",
                  borderColor: "#f6a436",
                  borderWidth: 2
                }
              }
            }
          ]
        },
        options: [
          {
            xAxis: [
              {
                data: [
                  "00:00",
                  "01:00",
                  "02:00",
                  "03:00",
                  "04:00",
                  "05:00",
                  "06:00",
                  "07:00",
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              }
            ],
            series: [
              {
                data: [
                  156,
                  235,
                  349,
                  546,
                  452,
                  370,
                  542,
                  638,
                  774,
                  702,
                  609,
                  456
                ]
              },
              {
                data: [
                  352,
                  286,
                  315,
                  429,
                  566,
                  486,
                  399,
                  562,
                  658,
                  794,
                  702,
                  629
                ]
              }
            ]
          },
          {
            xAxis: [
              {
                data: [
                  "01:00",
                  "02:00",
                  "03:00",
                  "04:00",
                  "05:00",
                  "06:00",
                  "07:00",
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              }
            ],
            series: [
              {
                data: [
                  546,
                  452,
                  370,
                  542,
                  638,
                  774,
                  702,
                  609,
                  456,
                  420,
                  398,
                  326
                ]
              },
              {
                data: [
                  429,
                  566,
                  486,
                  399,
                  562,
                  658,
                  794,
                  702,
                  629,
                  610,
                  568,
                  425
                ]
              }
            ]
          },
          {
            xAxis: [
              {
                data: [
                  "03:00",
                  "04:00",
                  "05:00",
                  "06:00",
                  "07:00",
                  "08:00",
                  "09:00",
                  "10:00",
                  "11:00"
                ]
              }
            ],
            series: [
              {
                data: [
                  156,
                  235,
                  349,
                  546,
                  452,
                  370,
                  542,
                  638,
                  774,
                  702,
                  609,
                  456
                ]
              },
              {
                data: [
                  352,
                  286,
                  315,
                  429,
                  566,
                  486,
                  399,
                  562,
                  658,
                  794,
                  702,
                  629
                ]
              }
            ]
          }
        ]
      };
      let entranceNowTotalOption = {
        grid: {
          left: "10%",
          right: "10%",
          bottom: "5%",
          top: "7%",
          height: "85%",
          containLabel: true,
          z: 22
        },
        xAxis: [
          {
            type: "category",
            gridIndex: 0,
            data: ["周一",'周二',"周三","周四","周五","周六","周日"],
            tickWidth:0,//去掉刻度
            axisTick: {
              show:false
            },
            axisLine: {
              show:false,
              lineStyle: {
                color: "#0c3b71"
              }
            },
            axisLabel: {
              show: true,
              color: "#fff",
              fontSize: 16
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            gridIndex: 0,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: min,
            max: 100,
            axisLine: {
              show:false
            },
            axisLabel: {
              show:false
            }
          },
          {
            type: "value",
            gridIndex: 0,
            min: min,
            max: 100,
            splitNumber: 12,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "20%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00feff"
                  },
                  {
                    offset: 0.5,
                    color: "#027eff"
                  },
                  {
                    offset: 1,
                    color: "#0286ff"
                  }
                ])
              }
            },
            data: yData,
            zlevel: 11
          }
        ]
      };
      aggregateChart.setOption(aggregateOption);
      window.addEventListener("resize", () => {
        aggregateChart.resize();
      });
      entranceNowNumChart.setOption(entranceNowNumOption);
      window.addEventListener("resize", () => {
        entranceNowNumChart.resize();
      });
      entranceNowTotalChart.setOption(entranceNowTotalOption);
      window.addEventListener("resize", () => {
        entranceNowTotalChart.resize();
      });
    }
  }
};
</script>
<style>
.entrance-people {
  height: 360px;
  border: 1px solid #012bc6;
}
.flag {
  position: absolute;
  top: -40px;
  left: 50%;
  -webkit-transform: translate(-50%);
  transform: translate(-50%);
}
.flag-content {
  position: relative;
  top: 25px;
  font-size: 24px;
  color: #54ffff;
  padding: 5px 15px;
}
.entrance-wrapper {
  display: flex;
  flex-direction: column;
}
.entrance-wrapper .entrance-bottom {
  flex: 1;
}
.title-flag {
  position: relative;
  text-decoration: none;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  font-size: 25px;
  color: #55fffc;
}
.title-flag:after {
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
}
.title-flag.left:after {
  transform-origin: bottom left;
}
.title-flag.right:after {
  transform-origin: bottom right;
}
.entrance-bottom .wrapper-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.entrance-now-num {
  flex: 1;
  width: 100%;
  border: 1px solid #042bc9;
}
.entrance-now-total {
  flex: 1;
  width: 100%;
  border: 1px solid #042bc9;
}
.entrance-total-right {
  align-items: flex-end !important;
}
.entrance-bottom {
  margin-top: 30px;
}
</style>

