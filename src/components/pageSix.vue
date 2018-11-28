<template>
  <div class="wrapper">
    <el-row :gutter="20">
      <el-col :span="12" class="live-num--total">
        <div class="title-flag left">直播数量统计</div>
        <div class="live-num">
          <el-row :gutter="20" class="live-num--row">
            <el-col :span="4" class="live-row--space">1</el-col>
            <el-col :span="5" class="live-row--th">今日</el-col>
            <el-col :span="5" class="live-row--th">本周</el-col>
            <el-col :span="5" class="live-row--th">本月</el-col>
            <el-col :span="5" class="live-row--th">全部</el-col>
          </el-row>
          <el-row :gutter="20" class="live-num--row">
            <el-col :span="4" class="live-row--th">场次</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_channel_num.today_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_channel_num.week_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_channel_num.month_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_channel_num.all_num)}}</el-col>
          </el-row>
          <el-row :gutter="20" class="live-num--row">
            <el-col :span="4" class="live-row--th">观看人数</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_play_times.today_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_play_times.week_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_play_times.month_num)}}</el-col>
            <el-col :span="5" class="live-row--td">{{utils.numFormat(live_play_times.all_num)}}</el-col>
          </el-row>
        </div>
      </el-col>
  
      <el-col :span="12" class="live-num--watch">
  
        <div class="title-flag left">观看人数趋势</div>
  
        <div class="watch-people" id="watch-people"></div>
  
      </el-col>
  
    </el-row>
  
    <el-row :gutter="20" class="live-ranking">
  
      <div class="title-flag left">观看人数趋势</div>
  
      <el-row class="live-ranking--wrapper">
  
        <el-col :span="12" >
          <div class="live-panel" v-for="(item,index) in live_channel_play_rank" :key="index" v-if="index<=2">
            <div class="live-pannel--title">直播播放次数{{utils.numFormat(item.amount)}}次</div>
            <div class="live-pannel-content">
              <span class="live-pannel--icon" :class="{'live-pannel-first':index==0,'live-pannel-second':index==1,'live-pannel-three':index==2}"></span>
              {{item.filter_name}}
            </div>
          </div>
        </el-col>
  
        <el-col :span="12" class="live-aside">
          <el-row class="live-aside--row" v-for="(item,index) in live_channel_play_rank" :key="index" v-if="index >2">
              <el-col :span="16" class="live-aside--infos"> {{item.filter_name}}</el-col>
              <el-col :span="6" class="live-aside--num">{{utils.numFormat(item.amount)}}</el-col>
              <el-col :span="2" class="live-aside--namal">{{index+1}}</el-col>
          </el-row>
        </el-col>
  
      </el-row>
  
    </el-row>
  
  </div>
</template>

<script>
  export default {
  
    name: "hello",
  
    data() {
  
      return {
        live_play_times:{},
        live_channel_num:{},
        live_play_year_trend_data:[],
        live_channel_play_rank:[]
      };
  
    },
  
    mounted() {
      let that  =  this;
      this.getVenuePageData();
      const pageFour = setInterval(() =>{                    
         that.getVenuePageData();          
      }, this.$store.state.intervalTime); 
    },
  
    computed: {
  
      author() {
  
        return this.$store.state.author
  
      }
  
    },
    methods: {
      getVenuePageData() {
      this.http.get(this.ports.urls.LivePageData, res => {
         // console.log("第六页调用");
          this.live_play_times = res.data.results.live_play_times;
          this.live_play_year_trend = res.data.results.live_play_year_trend;
          this.live_channel_num = res.data.results.live_channel_num;
          this.live_channel_play_rank = res.data.results.live_channel_play_rank;
          this.drawLine();
        });
      },
      drawLine() {
        for(let i in this.live_play_year_trend){
           this.live_play_year_trend_data.push(this.live_play_year_trend[i])
        }
        let trendYearChart = this.$echarts.init(
          document.getElementById("watch-people")
        );
         let trendYearOption = {
          grid: {
            left: "3%",
            right: "5%",
            top: "10%",
            bottom: "10%",
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
            max: Math.max.apply(null, this.live_play_year_trend_data),
            interval: Math.max.apply(null, this.live_play_year_trend_data)/5,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#2ba9f2", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            }
          },
          series: [{
            color: "#fff",
            type: "line",
            symbol:'circle',//拐点样式
            symbolSize: 15,//拐点大小
            itemStyle: {
              normal: {
                label : {
                  show: true,
                  color:'#2ba9f2',
                  fontSize:18
                  },
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
              }
            },
            data: this.live_play_year_trend_data
          }]
  
        };
        trendYearChart.setOption(trendYearOption);
        window.addEventListener("resize", () => {
          trendYearChart.resize();
        });
      }
    }
  };
</script>
<style>
  .live-num {
    height: 300px;
    border: 1px solid #002ac5;
    width: 100%;
  }
  .live-num--total {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .live-num--watch {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .watch-people {
    width: 100%;
    height: 360px;
    border: 1px solid #002ac5
  }
  .live-ranking {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }
  .live-ranking--wrapper {
    width: 100%;
    height: 100%;
    border: 1px solid #002ac5
  }
  .live-num {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 55px;
    box-sizing: border-box;
  }
  .live-num .live-num--row {
    font-size: 24px;
    color: aliceblue;
  }
  .live-num .live-row--th {
    color: #55FFFF
  }
  .live-num .live-row--space {
    color: transparent
  }
  .live-num .row .col {
    width: 25%;
    float: left;
  }
  .live-pannel--title {
    font-size: 24px;
    color: #55FFFF;
    margin-bottom: 5px;
    text-align: right;
    padding: 0 5%;
  }
  .live-pannel-content {
    position: relative;
    font-size: 24px;
    padding: 20px 20px;
    color: #fff;
    border: 1px solid#ffcb6f;
    width: 90%;
    margin: 0 auto;
    text-align: left;
  }
  .live-pannel-content .live-pannel--icon {
    position: absolute;
    left: 50%;
    margin-left: -100px;
    display: inline-block;
    width: 200px;
    height: 58px;
    top: -39px;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .live-pannel-content .live-pannel-first{
    background: url('../../static/images/gold.png');
    background-size: contain;
    background-repeat: no-repeat;
   }
  .live-pannel-content .live-pannel-second{
    background: url('../../static/images/silver.png');
    background-size: contain;
    background-repeat: no-repeat;
   }
  .live-pannel-content .live-pannel-three{
    background: url('../../static/images/bronze.png');
    background-size: contain;
    background-repeat: no-repeat;
   }
  .live-panel {
    padding-top: 20px;
  }
  .live-pannel--title {
    text-align: right;
  }
  .live-aside {
    padding: 10px;
  }
  .live-aside .live-aside--row{
    padding: 15px 0;
    border-bottom: 1px dashed #11395c;
  }
  .live-aside .live-aside--row{
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    font-size: 24px;
    color: #fff;
  }
  .live-aside--num {
    color: #55ffff;
  }
  .live-aside--namal {
    width: 42px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-image: url(../../static/images/gold-other.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .live-aside--infos {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
</style>

