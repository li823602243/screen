<template>
  <div class="wrapper entrance-wrapper">
    <el-row class="entrance-people">
      <div class="flag"><span class="flag-content">入馆服务人数</span></div>
      <el-col :span="8" class="wrapper-col" id="today-service--num">1</el-col>
      <el-col :span="8" class="wrapper-col" id="aggregate-people">3</el-col>
      <el-col :span="8" class="wrapper-col" id="library-people">4</el-col>
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
      dataBoxArr:[],
      YearDataArr:[100,200,214,100,254,211,214,100,455,522,122,255,852],
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    let that = this;
    this.drawLine();
    const pageFive = setInterval(() =>{
      that.yearDataArr();
      that.dataBoxArr=[]                    
      that.drawLine();          
    }, 1000); 
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let todayServiceNum = this.$echarts.init(
        document.getElementById("today-service--num")
      );
      let libraryNum = this.$echarts.init(
        document.getElementById("library-people")
      );
      let aggregateChart = this.$echarts.init(
        document.getElementById("aggregate-people")
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
      for (let i=0;i<=12;i++)
        {
          this.dataBoxArr.push(5*i)
        }
      this.drwaEntranceNow();
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
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            tickWidth: 0, //去掉刻度
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
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
              show: false
            },
            axisLabel: {
              show: false
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
            }
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
      let todayServiceOption = {
        series: [
          {
            name: "今日服务人数",
            type: "pie",
            radius: ["50%", "60%"],
            center: ["30%", "50%"],
            startAngle: 225,
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00a2ff"
                },
                {
                  offset: 1,
                  color: "#70ffac"
                }
              ]),
              "transparent"
            ],
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
                name: "今日服务人数",
                label: {
                  normal: {
                    formatter: "今日",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              },
              {
                value: 25,
                name: "%",
                label: {
                  normal: {
                    formatter: "\n35",
                    textStyle: {
                      color: "#007ac6",
                      fontSize: 30
                    }
                  }
                }
              },
              {
                value: 0,
                name: "%",
                label: {
                  normal: {
                    formatter: "服务人数",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              }
            ]
          },
          {
            name: "昨日服务人数",
            type: "pie",
            radius: ["50%", "60%"],
            center: ["80%", "50%"],
            startAngle: 225,
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00a2ff"
                },
                {
                  offset: 1,
                  color: "#70ffac"
                }
              ]),
              "transparent"
            ],
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
                name: "昨日服务人数",
                label: {
                  normal: {
                    formatter: "昨日",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              },
              {
                value: 25,
                name: "%",
                label: {
                  normal: {
                    formatter: "\n3534",
                    textStyle: {
                      color: "#007ac6",
                      fontSize: 30
                    }
                  }
                }
              },
              {
                value: 0,
                name: "%",
                label: {
                  normal: {
                    formatter: "服务人数",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      let libraryNumOption = {
        series: [
          {
            name: "在馆人数",
            type: "pie",
            radius: ["50%", "60%"],
            center: ["20%", "50%"],
            startAngle: 225,
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#f125ff"
                },
                {
                  offset: 1,
                  color: "#2dcbff"
                }
              ]),
              "transparent"
            ],
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
                name: "昨日服务人数",
                label: {
                  normal: {
                    formatter: "昨日",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              },
              {
                value: 25,
                name: "%",
                label: {
                  normal: {
                    formatter: "\n3534",
                    textStyle: {
                      color: "#007ac6",
                      fontSize: 30
                    }
                  }
                }
              },
              {
                value: 0,
                name: "%",
                label: {
                  normal: {
                    formatter: "服务人数",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              }
            ]
          },
          {
            name: "昨日服务人数",
            type: "pie",
            radius: ["50%", "60%"],
            center: ["70%", "50%"],
            startAngle: 225,
            color: [
              new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00a2ff"
                },
                {
                  offset: 1,
                  color: "#70ffac"
                }
              ]),
              "transparent"
            ],
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
                name: "昨日服务人数",
                label: {
                  normal: {
                    formatter: "昨日",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              },
              {
                value: 25,
                name: "%",
                label: {
                  normal: {
                    formatter: "\n3534",
                    textStyle: {
                      color: "#007ac6",
                      fontSize: 30
                    }
                  }
                }
              },
              {
                value: 0,
                name: "%",
                label: {
                  normal: {
                    formatter: "服务人数",
                    textStyle: {
                      color: "#55FFF",
                      fontSize: 24
                    }
                  }
                }
              }
            ]
          }
        ]
      };
      aggregateChart.setOption(aggregateOption);
      window.addEventListener("resize", () => {
        aggregateChart.resize();
      });
      entranceNowTotalChart.setOption(entranceNowTotalOption);
      window.addEventListener("resize", () => {
        entranceNowTotalChart.resize();
      });
      todayServiceNum.setOption(todayServiceOption);
      window.addEventListener("resize", () => {
        todayServiceNum.resize();
      });
      libraryNum.setOption(libraryNumOption);
      window.addEventListener("resize", () => {
        libraryNum.resize();
      });
    },
    drwaEntranceNow(){
      let entranceNowNumChart = this.$echarts.init(
        document.getElementById("entrance-now-num")
      );
      let entranceNowNumOption = {
        baseOption: {
          timeline: {
            show:false
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
            bottom: 10,
            top: 60,
            containLabel: true
          },
          legend: {
            //图例组件，颜色和名字
            left: 10,
            top: 10,
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
                data: this.dataBoxArr
              }
            ],
            series: [
              {
                data: [
                  156,
                  235,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0
                ]
              },
              {
                data: this.YearDataArr
              }
            ]
          }
        ]
      };
      entranceNowNumChart.setOption(entranceNowNumOption);
      window.addEventListener("resize", () => {
        entranceNowNumChart.resize();
      });
    },
    yearDataArr(){
      this.YearDataArr=[];
      for(let i = 0; i < 15;i++){
        this.YearDataArr.push(Math.floor(Math.random()*40)+200)
      }
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

