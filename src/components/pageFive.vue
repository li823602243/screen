<template>
  <div class="wrapper entrance-wrapper">
    <el-row class="entrance-people">
      <div class="flag"><span class="flag-content">入馆服务人数</span></div>
      <el-col :span="8" class="wrapper-col" >
         <div class="today-service--contnet"><span>今日</span><span>服务人数</span></div>
         <div class="today-service--num">{{utils.numFormat(enterNum.enter_num)}}人</div>
         <div class="yester-service--contnet"><span>昨日</span><span>服务人数</span></div>
         <div class="yester-service--num">{{utils.numFormat(allYesterDay)}}人</div>
        <div id="today-service--num"></div>
      </el-col>
      <el-col :span="8" class="wrapper-col" >
        <div class="aggregate-people--num">累计服务人数</div>
        <div id="aggregate-people"></div>
        </el-col>
      <el-col :span="8" class="wrapper-col">
        <span class="entrance-num--now">在馆人数</span>
        <span class="entrance-people--now">{{utils.numFormat(allCurrentVisitorData.in_num)}}人</span>
        <span class="entrance-top--title">最高</span>
        <span class="entrance-top--num">在馆人数</span>
        <span class="entrance-top--people">{{utils.numFormat(allTopInData.num)}}人</span>
        <div id="library-people">
        </div>
        </el-col>
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
import {mapState} from 'vuex';
export default {
  name: "hello",
  data() {
    return {
      dataBoxArr:[],
      pageFive:'',
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    let that = this;
    that.pageFiveData();
  },
  computed: {
    pageNum() {
      return this.$store.state.pageNum;
    },
    ...mapState({
      allCurrentVisitorData:state=>state.allCurrentVisitorData.msg,
      enterNum:state=>state.allCurrentVisitorData.msg,
      allTopInData:state=>state.allTopInData.msg,
      WeekInData:state=>state.getWeekInData.msg,
      TodayDataArrs:state=>state.currentEnterNum.msg,
      YearDataArrs:state=>state.currentEnterNum.msg,
      allYesterDay:state=>state.allYesterDay.msg,
      YearDataAll:state=>state.allTotalData.msg,
    }),
  },
 watch:{
      pageNum(){
        // console.log(this.$store.state.pageNum);
        if(this.$store.state.pageNum===4){
           this.pageFive = setInterval(() =>{
             this.getCurrentEnterNum()                   
          }, 5000); 
        }else{
          window.clearInterval(this.pageFive);
        }
       }
  },
  methods: {
    pageFiveData(){
      let that = this;
      this.$nextTick(()=>{
        that.drawLine();
      });
    },
    getCurrentEnterNum(){
       let myDate = new Date();
       let nowTime = myDate.getMinutes();
       this.http.get(this.ports.urls.currentEnterNum, res => {
       if(nowTime != this.$store.state.nowTimeTips){
        this.$store.state.nowTimeTips = myDate.getMinutes();// 最新数据
        this.$store.state.TodayDataArrPre = this.TodayDataArrs.today;// 最新数据
        this.$store.state.YearDataArrPre = this.YearDataArrs.yesterday;// 最新数据
       }else{
        this.TodayDataArr = res.data.results.today;//
        this.YearDataArr = res.data.results.yesterday;
       }
       //console.log(this.YearDataArr)
       //console.log(this.$store.state.YearDataArrPre)
       this.drwaEntranceNow();
      });
    },
    drawLine() {
        const numFormat = num =>{
          num = parseInt(num);
          num=num.toString().split(".");  // 分隔小数点
          var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
          var res=[];
          for(var i=0,len=arr.length;i<len;i++){
            if(i%3===0&&i!==0){
              res.push(",");   // 添加分隔符
            }
            res.push(arr[i]);
          }
          res.reverse(); // 再次倒序成为正确的顺序
          if(num[1]){  // 如果有小数的话添加小数部分
            res=res.join("").concat("."+num[1]);
          }else{
            res=res.join("");
          }
          return res;
        }
      // 基于准备好的dom，初始化echarts实例
      this.$store.state.todayServiceNum = this.$echarts.init(
        document.getElementById("today-service--num")
      );
      this.$store.state.libraryNum = this.$echarts.init(
        document.getElementById("library-people")
      );
      this.$store.state.aggregateChart = this.$echarts.init(
        document.getElementById("aggregate-people")
      );
      this.$store.state.entranceNowTotalChart = this.$echarts.init(
        document.getElementById("entrance-now-total")
      );
      let aggregateOption = {
        name:'dasda',
        title:{
          show:true,
          offsetCenter:['-50%' , '-50%'],
          color:'#fff'
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            min: 0,
            max: 200000,
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
              formatter:function(p){
                return numFormat(p)+'人'
              },
              color: "#fff",
              offsetCenter: [0, "100%"],
              rich:{
                color:'#fff'
              }
            },
            data: [
              {
                value: this.YearDataAll,
                // name: "累计服务人数"
              }
            ]
          }
        ]
      };
      let entranceNowTotalOption = {
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
        xAxis:
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
          },
          yAxis: {
            show: true,
            minInterval : 1,
            // interval: Math.max.apply(null, this.WeekInData)/5,
            max: Math.max.apply(null, this.WeekInData),
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
            type: "bar",
            barWidth: "20%",
            xAxisIndex: 0,
            yAxisIndex: 0,
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
            data: this.WeekInData,
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
                show:false,
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
                show:false,
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
            legendHoverLink: false,
            hoverAnimation:false,
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
                show:false,
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                name: "在馆人数",
                label: {
                  normal: {
                    // formatter: "最高",
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
                    formatter: this.allCurrentVisitorData,
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
                    formatter: "在馆人数",
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
            name: "最高在馆人数",
            type: "pie",
            legendHoverLink: false,
            hoverAnimation:false,
            animation:false,
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
                show:false,
                position: "center"
              }
            },
            data: [
              {
                value: 75,
                name: "在馆人数",
              },
              {
                value: 25,
                name: "%",
              },
              {
                value: 0,
                name: "%",
              }
            ]
          }
        ]
      };
      this.$store.state.aggregateChart.setOption(aggregateOption);
      window.addEventListener("resize", () => {
        this.$store.state.aggregateChart.resize();
      });
      this.$store.state.entranceNowTotalChart.setOption(entranceNowTotalOption);
      window.addEventListener("resize", () => {
        this.$store.state.entranceNowTotalChart.resize();
      });
      this.$store.state.todayServiceNum.setOption(todayServiceOption);
      window.addEventListener("resize", () => {
        this.$store.state.todayServiceNum.resize();
      });
      this.$store.state.libraryNum.setOption(libraryNumOption);
      window.addEventListener("resize", () => {
        this.$store.state.libraryNum.resize();
      });
    },
    drwaEntranceNow(){
      this.dataBoxArr.shift();
      this.dataBoxArr.push(this.getNowMin()+':'+this.getNowTime()*5);
      this.$store.state.entranceNowNumChart = this.$echarts.init(
        document.getElementById("entrance-now-num")
      );
      function formatDate(time){
          var date = new Date(time);

          var year = date.getFullYear(),
              month = date.getMonth()+1,//月份是从0开始的
              day = date.getDate(),
              hour = date.getHours(),
              min = date.getMinutes(),
              sec = date.getSeconds();
          var newTime =
                      (hour < 10? '0' + hour : hour) + ':' +
                      (min < 10? '0' + min : min) + ':' +
                      (sec < 10? '0' + sec : sec);

          return newTime;         
      }
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
              fontSize: 14
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
                name: this.getPreData(),
                icon: "rect"
              },
              {
                name: this.getNowDate(),
                icon: "rect"
              }
            ],
            textStyle: {
              color: "#a8aab0",
              fontStyle: "normal",
              fontFamily: "微软雅黑",
              fontSize: 14
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
                  fontSize: 16
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
              // splitNumber: 6,
              minInterval : 1,
              axisLabel: {
                textStyle: {
                  color: "#fff",
                  fontStyle: "normal",
                  fontFamily: "微软雅黑",
                  fontSize: 18
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
              name: this.getPreData(),
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
                    fontSize: 14
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
              name: this.getNowDate(),
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
                    fontSize: 14
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
               data: (function () {
                // 加载10项时间数据，每项相隔20秒
                var now = new Date();
                var res = [];
                var len = 12;
                while (len--) {
                  // 格式化时间
                  res.unshift(formatDate(now));
                  now = new Date(now - 5000);
                }
                return res;
              })()
              }
            ],
            series: [
              {
                data: this.getYearData()
              },
              {
                // data: this.TodayDataArr,
                data: this.getDayData()
              }
            ]
          }
        ]
      };
      this.$store.state.entranceNowNumChart.setOption(entranceNowNumOption,true);
      window.addEventListener("resize", () => {
        this.$store.state.entranceNowNumChart.resize();
      });
    },
    //获取当前系统秒数
    getNowTime(){
      let myDate = new Date();
      let nowSecond =  myDate.getSeconds();
      let intSecond = parseInt(nowSecond/5);
      return intSecond;
    },
    //获取当前系统秒数
    getNowMin(){
      let myDate = new Date();
      let hour =  myDate.getHours();
      let min =  myDate.getMinutes();
      return hour +':'+ min;
    },
    //操作昨日时间
    getYearData(){
      let num = this.getNowTime();
      let nomalNewData = this.$store.state.YearDataArrPre;
      let newYearData =  nomalNewData.slice(num,12);
      let newYearDataArr =  this.YearDataArr.slice(0,num);
      return  newYearData.concat(newYearDataArr)
    },//操作昨日时间
    getDayData(){
      let num = this.getNowTime();
      let nomalNewTodayData = this.$store.state.TodayDataArrPre;
      let newTodayData =  nomalNewTodayData.slice(num,12);
      let newTodayDataArr =  this.TodayDataArr.slice(0,num);
      return  newTodayData.concat(newTodayDataArr)
    },
    getNowDate(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    getPreData(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate()-1;
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
  }
};
</script>
<style>
.entrance-people {
  height: 45%;
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
.flag-content:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #0324aa;
    background-color: #000832;
    transform: perspective(2em) scale(1.1,1.3) rotateX(-10deg);
    z-index: -1;
}
.entrance-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-bottom: 60px;
}
.entrance-wrapper .entrance-bottom {
  flex: 1;
}
#library-people{
  height: 100%;
  width: 100%;
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
#today-service--num {
  height: 100%;
  width: 100%;
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
.wrapper-col {
  position: relative;
}
.entrance-bottom .wrapper-col {
  position: relative;
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
.entrance-top--title {
  position: absolute;
  right: 26%;
  top: 35%;
  color: #55ffff;
  font-size: 24px;
}
.entrance-top--num {
  position: absolute;
  right: 22%;
  top: 47%;
  color: #55ffff;
  font-size: 24px;
}
.entrance-top--people {
  position: absolute;
  color: #fff;
  font-size: 24px;
  bottom: 15%;
  right: 23%;
}
.entrance-num--now {
  position: absolute;
  left: 12%;
  top: 42%;
  color: #55ffff;
  font-size: 24px;
}
.entrance-people--now {
  position: absolute;
  color: #fff;
  font-size: 24px;
  bottom: 15%;
  left: 16%;
}
.today-service--contnet {
  position: absolute;
  top: 35%;
  left: 22%;
  color: #55ffff;
  font-size: 24px;
}
.today-service--contnet span {
  display: block;
  margin: 10px auto;
}
.yester-service--contnet span {
  display: block;
  margin: 10px auto;
}
.yester-service--contnet {
  position: absolute;
  top: 35%;
  right: 12%;
  color: #55ffff;
  font-size: 24px;
}
.yester-service--num {
  position: absolute;
  color: #fff;
  font-size: 24px;
  bottom: 15%;
  right: 13%;
 
}
.today-service--num {
  position: absolute;
  color: #fff;
  font-size: 24px;
  bottom: 15%;
   left: 22%;
}
#aggregate-people {
  height: 100%;
  width: 100%;
}
.aggregate-people--num {
  position: absolute;
  color: #55FFFF;
  font-size: 20px;
  top:35%;
  left:50%;
  -webkit-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  transform:translate(-50%,-50%);
}
</style>

