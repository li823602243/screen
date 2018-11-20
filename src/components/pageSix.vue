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
            <el-col :span="5" class="live-row--td">1323</el-col>
            <el-col :span="5" class="live-row--td">2321321</el-col>
            <el-col :span="5" class="live-row--td">434324</el-col>
            <el-col :span="5" class="live-row--td">434324</el-col>
          </el-row>
          <el-row :gutter="20" class="live-num--row">
            <el-col :span="4" class="live-row--th">观看人数</el-col>
            <el-col :span="5" class="live-row--td">3213</el-col>
            <el-col :span="5" class="live-row--td">4534543</el-col>
            <el-col :span="5" class="live-row--td">56756</el-col>
            <el-col :span="5" class="live-row--td">56756</el-col>
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
          <div class="live-panel">
            <div class="live-pannel--title">直播播放次数114次</div>
            <div class="live-pannel-content">
              <span class="live-pannel--icon live-pannel-first"></span>
              第二届高邮文化艺术节 中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的
            </div>
          </div>
          <div class="live-panel">
            <div class="live-pannel--title">直播播放次数114次</div>
            <div class="live-pannel-content">
              <span class="live-pannel--icon live-pannel-second"></span>
              第二届高邮文化艺术节 中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的
             </div>
          </div>
             <div class="live-panel">
            <div class="live-pannel--title">直播播放次数114次</div>
            <div class="live-pannel-content">
              <span class="live-pannel--icon live-pannel-three"></span>
              第二届高邮文化艺术节 中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的
            </div>
          </div>
        </el-col>
  
        <el-col :span="12" class="live-aside">
          <el-row class="live-aside--row">
              <el-col :span="16" class="live-aside--infos">中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的</el-col>
              <el-col :span="6" class="live-aside--num">21312312312</el-col>
              <el-col :span="2" class="live-aside--namal">4</el-col>
          </el-row>
          <el-row class="live-aside--row">
              <el-col :span="16" class="live-aside--infos">中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的</el-col>
              <el-col :span="6" class="live-aside--num">213213</el-col>
              <el-col :span="2" class="live-aside--namal">5</el-col>
          </el-row>
          <el-row class="live-aside--row">
              <el-col :span="16" class="live-aside--infos">中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的</el-col>
              <el-col :span="6" class="live-aside--num">324234</el-col>
              <el-col :span="2" class="live-aside--namal">6</el-col>
          </el-row>
          <el-row class="live-aside--row">
              <el-col :span="16" class="live-aside--infos">中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的</el-col>
              <el-col :span="6" class="live-aside--num">234234234</el-col>
              <el-col :span="2" class="live-aside--namal">7</el-col>
          </el-row>
          <el-row class="live-aside--row">
              <el-col :span="16" class="live-aside--infos">中国民歌之乡盎司伦敦安排收到啦艾玛史东帕斯卡的</el-col>
              <el-col :span="6" class="live-aside--num">234234234</el-col>
              <el-col :span="2" class="live-aside--namal">8</el-col>
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
  
        msg: "Welcome to Your Vue.js App"
  
      };
  
    },
  
    mounted() {
      this.drawLine();
    },
  
    computed: {
  
      author() {
  
        return this.$store.state.author
  
      }
  
    },
    methods: {
      drawLine() {
        let trendYearChart = this.$echarts.init(
          document.getElementById("watch-people")
        );
         let trendYearOption = {
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
    height: 82.5%;
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
    padding: 25px 20px;
    color: #fff;
    border: 1px solid#ffcb6f;
    width: 90%;
    margin: 0 auto;
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
   }
  .live-pannel-content .live-pannel-second{
    background: url('../../static/images/silver.png');
   }
  .live-pannel-content .live-pannel-three{
     background: url('../../static/images/bronze.png');
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
    padding: 20px 0;
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
  }
  .live-aside--infos {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>

