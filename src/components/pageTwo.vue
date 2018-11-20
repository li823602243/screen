<template>
  <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
  <div class="wrapper">
    <el-row type="flex"  justify="space-between">
      <el-col :span="11">
        <div class="pannel left">
          <div class="pannel-title left">各地市活动发布数量统计</div>
          <div class="pannel-content" id="actPublic"></div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="pannel right">
          <div class="pannel-title right">活动状态数量统计</div>
          <div class="pannel-content pannel-content--actStatus">
             <div class="date-group">
                <div class="date" :class="{active:showNums=='day'}"  @click="chooseDateNum('day')">今日</div>
                <div class="date" :class="{active:showNums=='week'}"  @click="chooseDateNum('week')">本周</div>
                <div class="date" :class="{active:showNums=='month'}"  @click="chooseDateNum('month')">本月</div>
                <div class="date" :class="{active:showNums=='all'}"  @click="chooseDateNum('all')">全部</div>
              </div>
            <div class="echarts-pannel" id="actStatus">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class='interval' type="flex"  justify="space-between">
      <el-col :span="11">
        <div class="pannel left">
          <div class="pannel-title left">活动类别统计</div>
          <div class="pannel-content" id="actType"></div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="pannel right">
          <div class="pannel-title right">活动发布走势分析统计</div>
          <div class="pannel-content pannel-content--actStatus">
            <div class="date-group">
              <div class="date" :class="{active:shows=='week'}"  @click="chooseDate('week')">本周</div>
              <div class="date" :class="{active:shows=='all'}"  @click="chooseDate('all')">本年</div>
            </div>
            <div class="echarts-pannel" id="actTrend">
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.wrapper {
  padding: 0 60px;
}
.el-col-11 {
  width: 48.5%;
}
.interval {
  margin-top: 10px;
}
.actStatus {
  color: #fff;
  font-size: 18px;
}
.pannel-content--actStatus {
  display: flex;
  flex-direction: column;
}
.pannel-content--actStatus .echarts-pannel {
  flex: 1;
}
.actStatus-process {
  background-color: transparent;
  border: 1px solid #123e5e;
  border-radius: 20px;
  padding: 1px 0;
  text-align: left;
  height: 24px;
}
.actStatus-process--line {
  display: inline-block;
  background-color: red;
  border-radius: 10px;
  height: 100%;
  width: 90%;
}
.actStatus-process {
  background-color: transparent;
  border: 1px solid #123e5e;
  border-radius: 20px;
  padding: 1px 0;
  text-align: left;
  height: 24px;
}
.actStatus-process--line {
  display: inline-block;
  background-color: red;
  border-radius: 10px;
  height: 100%;
  width: 90%;
}
.actStatus-process {
  background-color: transparent;
  border: 1px solid #123e5e;
  border-radius: 20px;
  padding: 1px 0;
  text-align: left;
  height: 24px;
}
.actStatus-process--line {
  display: inline-block;
  background-color: red;
  border-radius: 10px;
  height: 100%;
  width: 90%;
}
.actStatus-process {
  background-color: transparent;
  border: 1px solid #123e5e;
  border-radius: 20px;
  padding: 1px 0;
  text-align: left;
  height: 24px;
}
.actStatus-process--line {
  display: inline-block;
  border-radius: 10px;
  height: 100%;
  width: 90%;
}
.actStatus-process--line.public {
  background-color: #f57473;
}
.actStatus-process--line.onloading {
  background-color: #54ffff;
}
.actStatus-process--line.end {
  background-color: #f7b449;
}
.actStatus-process--line.subscribe {
  background-color: #8a79f4;
}
.echarts {
  width: 100%;
  height: 100%;
}
.pannel {
  display: flex;
  flex-direction: column;
}
.pannel.left {
  align-items: flex-start;
}
.pannel.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.pannel-content {
  width: 100%;
  /* width: 880px; */
  height: 380px;
  border: 1px solid #032ac6;
}
.pannel-title {
  position: relative;
  text-decoration: none;
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  font-size: 25px;
  color: #55fffc;
}
.pannel-title:after {
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
.pannel-title.left:after {
  transform-origin: bottom left;
}
.pannel-title.right:after {
  transform-origin: bottom right;
}
.date-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
}
.date-group .date {
  color: #175d6f;
  font-size: 18px;
  margin: 0 20px;
  padding: 5px 20px;
  cursor: pointer;
}
.date-group .date.active {
  color: #fff;
  border: 1px solid #54ffff;
  border-radius: 5px;
}
</style>

<script>
import DateChoose from "./DateChoose.vue";
export default {
  name: "hello",
  components: {
    DateChoose
  },
  data() {
    return {
      ActivityPageData: '',
      shows:'week',
      showNums:'day',
      actTrendBottomData:[],
      actTrendData:[],
      actStatusData:[]
    };
  },
  mounted() {
    this.getActivityPageData();
  },
  computed: {
      author () {
        return this.$store.state.author
      }
  },
  methods: {
    getActivityPageData() {
      this.http.get(this.ports.urls.ActivityPageData,res => {
          console.log(res.data.results);
          console.log("00000000000000000000000000000")
          // this.ActivityPageData = res.data.results;
          this.act_area_num_lists = res.data.results.act_area_num_lists;
          this.act_cat_num_lists = res.data.results.act_cat_num_lists;
          this.act_status_data = res.data.results.act_status_data;
          this.act_trend_publish = res.data.results.act_trend_publish;
           this.drawLine();
      })
    },
    chooseDate:function(data){
      this.shows=data;
      this.actTrendData= [];
      if(this.shows == 'week'){
        this.actTrendBottomData = ['周一','周二','周三','周四','周五','周六','周日'];
          for(let i in this.act_trend_publish.week){
          this.actTrendData.push(this.act_trend_publish.week[i]);
        }
      }else {
        this.actTrendBottomData = ['1','2','3','4','5','6','7','8','9','10','11','12'];
          for(let i in this.act_trend_publish.year){
          this.actTrendData.push(this.act_trend_publish.year[i]);
        }
      }
      this.drawTrendCharts();
    },
    chooseDateNum:function(data){
      this.showNums=data;
      this.actStatusData = [];
      switch(data)
      {
      case 'day':
        for( let i in this.act_status_data.today){
          this.actStatusData.push(this.act_status_data.today[i].amount)
        }
        break;
      case 'week':
        for( let i in this.act_status_data.week){
          this.actStatusData.push(this.act_status_data.week[i].amount)
        }
        break;
      case 'month':
        for( let i in this.act_status_data.month){
          this.actStatusData.push(this.act_status_data.month[i].amount)
        }
        break;
      case 'all':
        for( let i in this.act_status_data.all){
          this.actStatusData.push(this.act_status_data.all[i].amount)
        }
        break;
      }
      this.drawActStatusCharts()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let actPublicChart = this.$echarts.init(
        document.getElementById("actPublic")
      );
      let actStatusChart = this.$echarts.init(
        document.getElementById("actStatus")
      );
      let actTypeChart = this.$echarts.init(document.getElementById("actType"));
      let actTrendChart = this.$echarts.init(
        document.getElementById("actTrend")
      );
      let actPublicData = [];
      let actPublicDataLength = this.act_area_num_lists.length;
      for(let i in this.act_area_num_lists){
        let actPublicObj = {};
        actPublicObj.name = this.act_area_num_lists[i].filter_name;
        actPublicObj.value = this.act_area_num_lists[i].amount;
        actPublicData.push(actPublicObj);
      }
      for (let  j=0; j < 2*actPublicDataLength; j++){
        if(j > actPublicDataLength){
          let actPublicObj = {
            name : 0,
            value:0,
            itemStyle:{
              color:'transparent'
            }
          };
          actPublicData.push(actPublicObj);
        }
      }
      let actPublicOption = {
        calculable: true,
        series: [
          {
            type: "pie",
            radius: [37, 155],
            avoidLabelOverlap: false,
            startAngle: 0,
            center: ["50%", "34%"],
            roseType: "area",
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}"
              },
              emphasis: {
                show: true
              }
            },
            labelLine: {
              normal: {
                show: true,
                smooth: false,
                length: 20,
                length2: 10
              },
              emphasis: {
                show: true
              }
            },
            data: actPublicData
          }
        ]
      };
      for( let i in this.act_status_data.today){
         this.actStatusData.push(this.act_status_data.today[i].amount)
      }
      this.drawActStatusCharts()
    
      let actTypeCharts = []
      for( let i in this.act_cat_num_lists){
         let obj = {};
         obj.month=this.act_cat_num_lists[i].filter_name;
         obj.value=this.act_cat_num_lists[i].amount;
         obj.ratio= 12;
         actTypeCharts.push(obj)
      }
      let data = {
        chart: actTypeCharts
      };

      let xAxisMonth = [],
        barData = [],
        lineData = [];
      for (let i = 0; i < data.chart.length; i++) {
        xAxisMonth.push(data.chart[i].month);
        barData.push({
          name: xAxisMonth[i],
          value: data.chart[i].value
        });
        lineData.push({
          name: xAxisMonth[i],
          value: data.chart[i].ratio
        });
      }

      let actTypeChartOption = {
        grid: {
          top: "24%",
          left: "7%",
          bottom: "6%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            // return (
            //   params[0]["data"].name +
            //   "<br/>" +
            //   "训练人次: " +
            //   params[1]["data"].value +
            //   "<br/>" +
            //   "合格率: " +
            //   params[0]["data"].value
            // );
          }
        },
        xAxis: [
          {
            type: "category",
            show: false,
            data: ["3月", "4月", "5月", "6月", "7月", "8月"],
            axisLabel: {
              textStyle: {
                color: "#b6b5ab"
              }
            }
          },
          {
            type: "category",
            position: "bottom",
            data: xAxisMonth,
            boundaryGap: true,
            // offset: 40,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: "#b6b5ab"
              }
            }
          }
        ],
        yAxis: [
          {
            show: true,
            offset: 52,
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.2)"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisLabel: {
              show: true,
              color: "#b6b5ab"
            }
          },
          {
            show: false,
            type: "value",
            name: "合格率(%)",
            nameTextStyle: {
              color: "#ccc"
            },
            axisLabel: {
              color: "#ccc"
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        color: ["#e54035"],
        series: [
          {
            name: "训练人次",
            type: "pictorialBar",
            xAxisIndex: 1,
            barCategoryGap: "-80%",
            // barCategoryGap: '-5%',
            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = [
                    "rgba(13,177,205,0.8)",
                    "rgba(29,103,182,0.6)",
                    "rgba(13,177,205,0.8)",
                    "rgba(29,103,182,0.6)",
                    "rgba(13,177,205,0.8)",
                    "rgba(29,103,182,0.6)"
                  ];
                  return colorList[params.dataIndex];
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: barData
          },
          {
            symbol:
              "image://data:image/png;base64,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",
            symbolSize: 42,
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: lineData,
            itemStyle: {
              normal: {
                borderWidth: 5,
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#821eff"
                    },

                    {
                      offset: 1,
                      color: "#204fff"
                    }
                  ]
                }
              }
            }
          }
        ]
      };
      for(let i in this.act_trend_publish.week){
        this.actTrendData.push(this.act_trend_publish.week[i])
      }
      this.actTrendBottomData = ['周一','周二','周三','周四','周五','周六','周日'];
      let actTrendOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: this.actTrendBottomData,
          axisLabel: {
            show: true //这行代码控制着坐标轴x轴的文字是否显示
          },
          axisLine: {
            lineStyle: {
              color: "#fff", // x坐标轴的轴线颜色
              width: 0 //这里是坐标轴的宽度,为0就是不显示
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.actTrendData,
            barWidth: 20,
            barGap: 10,
            smooth: true,
            itemStyle: {
              emphasis: {},
              normal: {
                barBorderRadius: 7,
                color:new  this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00ecef'
                }, {
                    offset: 0.8,
                    color: '#0f8ff8'
                }], false)
              }
            }
          }
        ]
      };
      // 绘制图表
      actPublicChart.setOption(actPublicOption);
      window.addEventListener("resize", () => {
        actPublicChart.resize();
      });
      actTypeChart.setOption(actTypeChartOption);
      window.addEventListener("resize", () => {
        actTypeChart.resize();
      });
      actTrendChart.setOption(actTrendOption);
      window.addEventListener("resize", () => {
        actTrendChart.resize();
      });
    },
    drawTrendCharts(){
      let actTrendChart = this.$echarts.init(
        document.getElementById("actTrend")
      );
       let actTrendOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: this.actTrendBottomData,
          axisLabel: {
            show: true //这行代码控制着坐标轴x轴的文字是否显示
          },
          axisLine: {
            lineStyle: {
              color: "#fff", // x坐标轴的轴线颜色
              width: 0 //这里是坐标轴的宽度,为0就是不显示
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.actTrendData,
            barWidth: 20,
            barGap: 10,
            smooth: true,
            itemStyle: {
              emphasis: {},
              normal: {
                barBorderRadius: 7,
                color:new  this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#00ecef'
                }, {
                    offset: 0.8,
                    color: '#0f8ff8'
                }], false)
              }
            }
          }
        ]
      };
      actTrendChart.setOption(actTrendOption);
      window.addEventListener("resize", () => {
        actTrendChart.resize();
      });
    },
    drawActStatusCharts(){
      let actStatusChart = this.$echarts.init(
        document.getElementById("actStatus")
      );
      var myColor = ["#f57473", "#54ffff", "#f7b449", "#8a79f4"];
      let actStatusOption = {
        xAxis: {
          show: false
        },
        yAxis: [
          {
            show: true,
            data: ["已发布", "正进行", "已结束", "可预约"],
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              formatter: function(value, index) {
                return ["{title|" + value + "} "].join("\n");
              },
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 5,
                  align: "center",
                  width: 15,
                  height: 15
                }
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: this.actStatusData,
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [70, 34, 60, 78],
            barWidth: 20,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [100, 100, 100, 100],
            barWidth: 24,
            itemStyle: {
              normal: {
                color: "none",
                borderColor: "#00c1de",
                borderWidth: 1,
                barBorderRadius: 15
              }
            }
          }
        ]
      };
      actStatusChart.setOption(actStatusOption);
      window.addEventListener("resize", () => {
        actStatusChart.resize();
      });
    }
  }
};
</script>