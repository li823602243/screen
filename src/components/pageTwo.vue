<template>
  <!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->
  <div class="wrapper">
    <el-row type="flex"  justify="space-between" class="page-two">
      <el-col :span="11">
        <div class="pannel left">
          <div class="pannel-title left">各地市活动发布数量统计</div>
          <div class="pannel-content" id="actPublic">
          </div>
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
    <el-row class='interval page-two' type="flex"  justify="space-between">
      <el-col :span="11">
        <div class="pannel left">
          <div class="pannel-title left">活动类别统计</div>
          <div class="pannel-content--bottom" id="actType"></div>
        </div>
      </el-col>
      <el-col :span="11">
        <div class="pannel right">
          <div class="pannel-title right">活动发布走势分析统计</div>
          <div class="pannel-content--actStatus">
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
  padding: 0 60px 40px 60px;
  box-sizing: border-box;
}
.page-two > .el-col-11 {
  width: 48.5%!important;
}
.interval {
  margin-top: 30px;
  flex: 1;
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
.pannel-content--actStatus {
  height: 100%;
  width: 100%;
  border: 1px solid #032ac6
}
.pannel-content--bottom {
  height: 100%;
  width: 100%;
  border: 1px solid #032ac6
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
.pannel-content--infos {
  height: 100%;
  width: 100%;
  transform: scale(1.5)
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
.pannel  {
  height: 100%;
}
</style>

<script>
import DateChoose from "./DateChoose.vue";
import {mapState} from 'vuex';
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
      actTrendBottomData:['周一','周二','周三','周四','周五','周六','周日'],
      actTrendData:[],
      actStatusData:[],
      maxActStatus:[],
    };
  },
  mounted() {
    let that = this;
      setTimeout(()=>{
        this.getActivityPageData();
      },500)
  },
  computed: {
      ...mapState({
        SecondPageData:state=>state.getSecondPageData.msg,
        
      })
  },
  methods: {
    getActivityPageData() {
      this.act_area_num_lists = [];
      this.act_cat_num_lists = []; 
      this.act_status_data = [];
      this.act_trend_publish = [];
      this.actStatusData = [];
      this.maxActStatus =[];
      this.actTrendData= [];
      this.act_area_num_lists = this.SecondPageData.act_area_num_lists;
      this.act_cat_num_lists = this.SecondPageData.act_cat_num_lists;
      this.act_status_data = this.SecondPageData.act_status_data;
      this.act_trend_publish = this.SecondPageData.act_trend_publish;
      for(let i in this.act_trend_publish.week){
        this.actTrendData.push(this.act_trend_publish.week[i]);
      }
      this.drawLine();
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
      this.maxActStatus =[];
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
      for(let i in  this.actStatusData){
        this.maxActStatus.push(1.1*Math.max.apply(null, this.actStatusData))
      }
      console.log(this.maxActStatus)
      this.drawActStatusCharts()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
     this.$store.state.actPublicChart = this.$echarts.init(
        document.getElementById("actPublic")
      );
      this.$store.state.actStatusChart = this.$echarts.init(
        document.getElementById("actStatus")
      );
      this.$store.state.actTypeChart = this.$echarts.init(document.getElementById("actType"));
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
            radius: [37, 250],
            avoidLabelOverlap: false,
            startAngle: 0,
            center: ["50%", "10%"],
            roseType: "area",
            // radius : '100%',
            selectedMode: "single",
            label: {
              normal: {
                show: true,
                formatter: "{b}:{c}",
                fontSize:18
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
      console.log(this.actStatusData)
      for(let i in  this.actStatusData){
        this.maxActStatus.push(1.1*Math.max.apply(null, this.actStatusData))
      }
      this.drawActStatusCharts()
      this.drawTrendCharts();
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
          left: "10%",
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
             return (
               params[0]["data"].name +
               "<br/>" +
               "活动场次: " +
               params[1]["data"].value 
            );
          }
        },
        xAxis: [
          {
            type: "category",
            show: false,
            data: xAxisMonth,
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
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              color: "#fff",
              fontSize:18
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
            name: "活动场次",
            type: "pictorialBar",
            xAxisIndex: 1,
            barCategoryGap: "-80%",
            // barCategoryGap: '-5%',
            symbol: 'path://d="M150 50 L130 130 L170 130  Z"',
            label: {
              show: true, //开启显示
              // position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16,
                fontWeight: 600
                }
              },
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
            symbolSize: 0,
            name: "完成率",
            type: "line",
            yAxisIndex: 1,
            data: lineData,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: "transparent"
              }
            }
          }
        ]
      };
      for(let i in this.act_trend_publish.week){
        this.actTrendData.push(this.act_trend_publish.week[i])
      }
      // 绘制图表
      this.$store.state.actPublicChart.setOption(actPublicOption);
      window.addEventListener("resize", () => {
        this.$store.state.actPublicChart.resize();
      });
      this.$store.state.actTypeChart.setOption(actTypeChartOption);
      window.addEventListener("resize", () => {
         this.$store.state.actTypeChart.resize();
      });
    },
    drawTrendCharts(){
      this.$store.state.actTrendChart = this.$echarts.init(
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
          left: "10%",
          right: "10%",
          bottom: "2%",
          top: "10%",
          height: "85%",
          containLabel: true,
          z: 22
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
          max: Math.max.apply(null, this.actTrendData),
          show: true,
          offset: 52,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            color: "#fff",
            fontSize:18
          }
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.actTrendData,
            barWidth: 20,
            barGap: 10,
            smooth: true,
            label: {
              show: true, //开启显示
              position: 'top', //在上方显示
              textStyle: { //数值样式
                color: '#fff',
                fontSize: 16,
                // fontWeight: 600
                }
              },
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
      this.$store.state.actTrendChart.setOption(actTrendOption);
      window.addEventListener("resize", () => {
        this.$store.state.actTrendChart.resize();
      });
    },
    drawActStatusCharts(){
      this.$store.state.actStatusChart = this.$echarts.init(
        document.getElementById("actStatus")
      );
      var myColor = ["#f57473", "#54ffff", "#f7b449", "#8a79f4"];
      let actStatusOption = {
        xAxis: {
          max: Math.max.apply(null, this.maxActStatus),
          show: false,
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
              fontSize:20,
              rich: {
                lg: {
                  backgroundColor: "#339911",
                  color: "#fff",
                  borderRadius: 15,
                  // padding: 50,
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
                fontSize: 20,
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
            data: this.actStatusData,
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
                show: false,
                position: "inside",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "框",
            type: "bar",
            yAxisIndex: 1,
            data:  this.maxActStatus,
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
      this.$store.state.actStatusChart.setOption(actStatusOption);
      window.addEventListener("resize", () => {
        this.$store.state.actStatusChart.resize();
      });
    }
  }
};
</script>