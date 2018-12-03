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
              <el-row :gutter="24" class="aside-list--th" v-for="(item,index) in act_cat_join_num_lists" :key="item.filter_id">
                <el-col :span="8" class="aside-list--td" :class="{'type': index == 0,'type1': index == 1,'type2': index == 2,'type3': index == 3,'type4': index == 4,'type5': index == 5}">{{item.filter_name}}</el-col>
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
  
              <div class="flag page-three--flag"><span class="flag-content">活动服务人数</span></div>
              <div class="date-group page-three--group">
                <div class="date" :class="{active:showNums=='day'}"  @click="chooseDateNum('day')">今日</div>
                <div class="date" :class="{active:showNums=='week'}"  @click="chooseDateNum('week')">本周</div>
                <div class="date" :class="{active:showNums=='month'}"  @click="chooseDateNum('month')">本月</div>
                <div class="date" :class="{active:showNums=='all'}"  @click="chooseDateNum('all')">全部</div>
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
      showNums: "day",
      act_cat_join_num_lists: "",
      act_cat_join_num_arr: [],
      bookPeopleNum: "",
      joinPeopleNum: "",
      trendWeekData:[],
      trendYearData:[]
    };
  },
  components: {
    DateChoose
  },
  mounted() {
    let that = this;
    this.getServicePageData();
     const pageThree = setInterval(() =>{
           this.showNums= "day",
           this.act_cat_join_num_lists= "",
           this.act_cat_join_num_arr= [],
           this.bookPeopleNum= "",
           this.joinPeopleNum= "",
           this.trendWeekData=[],
           this.trendYearData=[]                  
          that.getServicePageData();          
     }, this.$store.state.intervalTime); 
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
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
      this.http.get(this.ports.urls.ServicePageData, res => {
        //("第三页调用")
        this.act_cat_join_num_lists = res.data.results.act_cat_join_num_lists;
        this.act_register_date_num = res.data.results.act_register_date_num;
        this.act_sign_date_num = res.data.results.act_sign_date_num;
        this.act_sign_trend_data = res.data.results.act_sign_trend_data;
        this.user_age_period_num = res.data.results.user_age_period_num;
        this.drawLine();
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
      this.drawTotal();
      this.bookPeopleNum = this.act_register_date_num.today_num;
      this.joinPeopleNum = this.act_sign_date_num.today_num;
      this.drawServicePeople();
      this.userAgePeriodNum();
      let trendWeekChart = this.$echarts.init(
        document.getElementById("trend-week")
      );
      let trendYearChart = this.$echarts.init(
        document.getElementById("trend-year")
      );
      // let trendWeekData = 
      for(let i in this.act_sign_trend_data.week){
         this.trendWeekData.push(this.act_sign_trend_data.week[i])
      }
      for(let i in this.act_sign_trend_data.year){
         this.trendYearData.push(this.act_sign_trend_data.year[i])
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

          bottom: "20%",

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
            symbol:'circle',//拐点样式
            symbolSize: 15,//拐点大小
            type: "line",
            label : {
              show: true,
              color:'#2ba9f2',
              fontSize:18,
              formatter:function(p){ 
                return numFormat(p.value)
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
                ),
              }
            },

            data: this.trendYearData
          }
        ]
      };
      trendWeekChart.setOption(trendWeekOption);
      window.addEventListener("resize", () => {
        trendWeekChart.resize();
      });
      trendYearChart.setOption(trendYearOption);
      window.addEventListener("resize", () => {
        trendYearChart.resize();
      });
    },
    drawTotal() {
      let actTypeChart = this.$echarts.init(
        document.getElementById("aside-charts")
      );
      for (let i in this.act_cat_join_num_lists) {
        let obj = {};
        obj.name = this.act_cat_join_num_lists[i].filter_name;
        obj.value = this.act_cat_join_num_lists[i].amount;
        this.act_cat_join_num_arr.push(obj);
      }
      let actTrendOption = {
        color: ["#37a2da", "#32c5e9", "#9fe6b8", "#ffdb5c", "#ff9f7f"],
        calculable: true,
        series: [
          {
            type: "pie",
            radius: [40, 150],
            roseType: "area",
            itemStyle : {
              normal: {
                  label: {                 //指示到模块的标签文字
                      show: true,
                      fontSize:18,
                      formatter: '{b} : {c}'
                  },
                  labelLine: {             //指示到模块的标签线
                      show: true,

                  }
              },
           },
            data: this.act_cat_join_num_arr
          }
        ]
      };
      actTypeChart.setOption(actTrendOption);
      window.addEventListener("resize", () => {
        actTypeChart.resize();
      });
    },
    drawServicePeople() {
      let orderChart = this.$echarts.init(
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
      orderChart.setOption(orderChartOption);
      window.addEventListener("resize", () => {
        orderChart.resize();
      });
    },
    userAgePeriodNum() {
      let userAge = [];
      for(let i in this.user_age_period_num){
        userAge.push(this.user_age_period_num[i].percent/100)
      }
      let ageChart = this.$echarts.init(document.getElementById("service-age"), null, {renderer: 'svg'});
      let plantCap = [];
      for(let i in this.user_age_period_num){
        let obj = {}
        obj.name = this.user_age_period_num[i].filter_name;
        obj.value = this.user_age_period_num[i].amount;
        obj.pre = this.user_age_period_num[i].percent;
        plantCap.push(obj)

      }
      var datalist = [{
            offset: [56, 48],
            opacity: .95,
            color: '#f467ce'
        }, {
            offset: [35, 80],
            opacity: .88,
            color: '#7aabe2'
        }, {
            offset: [20, 43],
            opacity: .84,
            color: '#ff7123'
        }, {
            offset: [83, 30],
            opacity: .8,
            color: '#ffc400'
        }, {
            offset: [36, 20],
            opacity: .75,
            color: '#5e333f'
        }];
        var datas = [];
        for (var i = 0; i < plantCap.length; i++) {
            var item = plantCap[i];
            var itemToStyle = datalist[i];
            let itemValue = parseFloat(item.pre).toFixed(2);
            datas.push({
                name:itemValue+'%' + '\n\n' + item.name+'岁',
                value: itemToStyle.offset,
                symbolSize: this.orderData(itemValue),
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 16
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: itemToStyle.color,
                        opacity: itemToStyle.opacity
                    }
                },
            })
        }
      let ageChartOption = {
        grid: {
        show: false,
        top: 10,
        bottom: 10
        },
        xAxis: [{
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 5
        }],
        yAxis: [{
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
        }],
        series: [{
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 120,
            label: {
                normal: {
                    show: true,
                    formatter: '{b}',
                    color: '#fff',
                    textStyle: {
                        fontSize: '20'
                    }
                },
            },
            itemStyle: {
                normal: {
                    color: '#00acea'
                }
            },
            data: datas
        }]
      };
      ageChart.setOption(ageChartOption);
      window.addEventListener("resize", () => {
        ageChart.resize();
      });
    },
    orderData(items){
       if(items <= 10){
        return 75;
      }else if(10 < items && items <=　30){
        return 90;
      } else if (30 < items && items <=　50){
        return 110;
      } else if (50 < items && items <=　70){
        return 130;
      } else if (70 < items && items <=　90){
        return 150;
      }else{
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
  left: 28%;
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
  left: 28%;
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
  left: 28%;
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
  left: 28%;
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
  top: 0!important;
}
.page-three--group {
  margin: 50px auto 0px auto;
  padding: 0;
}
</style>