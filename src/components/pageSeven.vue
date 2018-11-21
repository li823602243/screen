<template>
  <div class="resource-wrapper">
    <div class="resource-left">
      <div class="title-flag left">分类排名TOP10</div>
      <div class="resource-left--content">
        <el-row class="resource-left--title">
  
          <el-col :span="8">
  
            分类
  
          </el-col>
  
          <el-col :span="8">
  
            播放次数
  
          </el-col>
  
          <el-col :span="8">
  
          排名
  
          </el-col>
  
  
        </el-row>
        <el-row class="resource-left--body" v-for="(item,index) in resource_cat_play_rank" :key="index">
          <el-col :span="8">{{item.filter_name}}</el-col>
          <el-col :span="8"> {{item.amount}}</el-col>
          <el-col :span="8" >
            <div class="resource-left--ranking resource-left--first" v-if="index==0"></div>
            <div class="resource-left--ranking resource-left--second" v-else-if="index==1"></div>
            <div class="resource-left--ranking resource-left--three" v-else-if="index==2"></div>
            <div class="resource-left--ranking resource-left--other" v-else>{{index+1}}</div>
            </el-col>
        </el-row>
      </div>
    </div>
    <div class="resource">
      <span class="resource-stage--title">资源鉴赏数据统计</span>
      <span class="bouble1"></span>
      <span class="bouble2"></span>
      <span class="bouble3"></span>
      <span class="bouble4"></span>
      <span class="bouble5"></span>
      <span class="bouble6"></span>
      <div class="resource-num">
        <span class="resource-title">资源数量</span>
        <span class="num">{{resource_total}}</span>
      </div>
      <div class="resource-play">
        <span class="resource-title">播放总数</span>
        <span class="num">{{resource_play_total}} </span>
      </div>
      <div class="resource-rong">
        <span class="resource-title"> 资源容量</span>
        <span class="num">{{resource_size_total}}</span>
      </div>
    </div>
    <div class="resource-right">
      <div class="title-flag right">资源播放TOP</div>
      <div class="resource-left--content">
        <div class="resource-pannel" v-for="(item,index) in resource_video_play_rank" :key="index" v-if="index<=4">
          <div class="r-pannel--header">
            <div class="p-header--left">
              <span class="p-header--icon p-header--first" v-if="index==0"></span>
              <span class="p-header--icon p-header--second" v-else-if="index==1"></span>
              <span class="p-header--icon p-header--three" v-else-if="index==2"></span>
              <span class="p-header--icon" v-else></span>
              <span class="p-header--name p-name--first"  v-if="index==0">第一名</span>
              <span class="p-header--name p-name--second"  v-else-if="index==1">第二名</span>
              <span class="p-header--name p-name--three"   v-else-if="index==2">第三名</span>
              <span class="p-header--name"   v-else-if="index==3">第四名</span>
              <span class="p-header--name"   v-else>第五名</span>
            </div>
            <span class="p-header--play">播放{{item.amount}}次</span>
          </div>
          <div class="r-pannel--content">{{item.filter_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      resource_total: "",
      resource_play_total: "",
      resource_total: "",
      resource_cat_play_rank: "",
      resource_video_play_rank: "",
      resource_size_total:""
    };
  },
  mounted() {
    this.getVenuePageData();
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  methods: {
    getVenuePageData() {
      console.log("资源鉴赏接口");
      this.http.get(this.ports.urls.ResourcePageData, res => {
        console.log(res.data.results);
        this.resource_total = res.data.results.resource_total;
        this.resource_play_total = res.data.results.resource_play_total;
        this.resource_cat_play_rank = res.data.results.resource_cat_play_rank;
        this.resource_size_total = res.data.results.resource_size_total;
        this.resource_video_play_rank = res.data.results.resource_video_play_rank;
      });
    }
  }
};
</script>
<style>
.resource-wrapper {
  position: relative;

  /* display: flex;
  
    
  
      align-items: flex-start; */

  height: 100%;

  padding: 0 60px;

  box-sizing: border-box;
}

.resource {
  position: relative;

  width: 50%;

  height: 100%;

  margin: 0 auto;

  background: url("../../static/images/stage.png");

  background-size: contain;

  background-repeat: no-repeat;

  background-position: 50% 100%;
}

.bouble1 {
  position: absolute;

  bottom: 140px;

  display: inline-block;

  width: 55px;

  height: 54px;

  left: 35%;

  margin-left: -27px;

  background: url("../../static/images/bubble.png");

  background-size: contain;

  background-repeat: no-repeat;

  background-position: 50% 100%;

  animation: bubbleRise 8s linear infinite;

  z-index: 2;
}

.bouble2 {
  position: absolute;

  bottom: 140px;

  left: 50%;

  margin-left: -22px;

  display: inline-block;

  width: 45px;

  height: 44px;

  background: url("../../static/images/bubble2.png");

  background-size: contain;

  background-repeat: no-repeat;

  background-position: 50% 100%;

  animation: bubbleRise 10s linear infinite;

  z-index: 2;
}

.bouble3 {
  position: absolute;

  bottom: 140px;

  left: 60%;

  margin-left: -16px;

  display: inline-block;

  width: 32px;

  height: 31px;

  background: url("../../static/images/bubble3.png");

  background-size: contain;

  background-repeat: no-repeat;

  background-position: 50% 100%;

  animation: bubbleRise 6s linear infinite;

  z-index: 2;
}

.bouble4 {
  position: absolute;

  bottom: 140px;

  left: 70%;

  margin-left: -10px;

  display: inline-block;

  width: 20px;

  height: 20px;

  background: url("../../static/images/bubble4.png");

  background-size: contain;

  background-repeat: no-repeat;

  background-position: 50% 100%;

  animation: bubbleRise 9s linear infinite;

  z-index: 2;
}

@keyframes bubbleRise {
  0% {
    transform: translate(0px, 0px);

    opacity: 0;

    border-color: rgba(255, 255, 255, 0.2);
  }

  10% {
    transform: translate(0px, 0px);

    opacity: 1;
  }

  30% {
    transform: translate(-1px, -100px);
  }

  50% {
    transform: translate(1px, -300px);
  }

  75% {
    transform: translate(-1px, -400px) scale(1.2);
  }

  98% {
    opacity: 1;

    border-color: rgba(255, 255, 255, 0.35);
  }

  100% {
    transform: translate(0px, -600px) scale(1.4);

    opacity: 0;

    border-color: rgba(255, 255, 255, 0.2);
  }
}

@keyframes bubbleRise {
  0% {
    transform: translate(0px, 0px);

    opacity: 0;

    border-color: rgba(255, 255, 255, 0.1);
  }

  10% {
    transform: translate(0px, 0px);

    opacity: 1;
  }

  30% {
    transform: translate(-1px, -100px);
  }

  50% {
    transform: translate(1px, -300px);
  }

  75% {
    transform: translate(-1px, -400px) scale(1.2);
  }

  98% {
    opacity: 1;

    border-color: rgba(255, 255, 255, 0.25);
  }

  100% {
    transform: translate(0px, -600px) scale(1.4);

    opacity: 0;

    border-color: rgba(255, 255, 255, 0.1);
  }
}

.resource-stage--title {
  display: inline-block;

  font-size: 26px;

  color: #46d5d9;

  margin-top: 50px;
}

.resource-num {
  position: absolute;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  height: 160px;

  width: 160px;

  bottom: 60%;

  left: 20%;

  border-radius: 50%;

  background-color: #65d5d5;

  color: #000733;

  z-index: 1;

  animation: cricleTrans 6s linear infinite;
}

.resource-title {
  display: inline-block;

  margin: 5px auto;

  font-size: 24px;
}

.resource-num > .num {
  display: inline-block;

  margin: 5px auto;

  font-size: 24px;
}

.resource-play {
  position: absolute;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  height: 200px;

  width: 200px;

  left: 50%;

  margin-left: -100px;

  bottom: 30%;

  border-radius: 50%;

  background-color: #5b57b4;

  color: #fff;

  z-index: 1;

  animation: cricleTrans 8s linear infinite;
}

.resource-rong {
  position: absolute;

  display: flex;

  top: 15%;

  right: 20%;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  height: 130px;

  width: 130px;

  border-radius: 50%;

  background-color: #dfe3a7;

  color: #000733;

  animation: cricleTrans 10s linear infinite;
}

.resource-left {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  position: absolute;

  height: 98%;

  width: 28%;
}

.resource-left--content {
  border: 1px solid #022ac8;

  height: 100%;

  width: 100%;
}

.resource-right {
  display: flex;

  position: absolute;

  right: 60px;

  height: 98%;

  top: 0;

  flex-direction: column;

  align-items: flex-end;

  position: absolute;

  width: 28%;
}

@keyframes cricleTrans {
  0% {
    transform: rotate(0deg);

    transform: translate(0px, 0px);
  }

  25% {
    transform: rotate(45deg);

    transform: translate(15px, 15px);
  }

  50% {
    transform: rotate(0deg);

    transform: translate(25px, 50px);
  }

  75% {
    transform: rotate(-45deg);

    transform: translate(33px, 40px);
  }

  100% {
    transform: rotate(0deg);

    transform: translate(0px, 0px);
  }
}
.resource-left--title {
  height: 90px;
  line-height: 90px;
  font-size: 24px;
}
.resource-left--title > .el-col {
  color: #55ffff;
}
.resource-left--body {
  font-size: 22px;
  color: #fff;
  padding: 3% 0;
}
.resource-left--ranking {
  height: 44px;
  line-height: 44px;
  text-align: center;
  width: 47px;
  margin: 0 auto;
  background-position: 50%;
}
.resource-left--first {
  background-image: url(../../static/images/gold-one.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.resource-left--second {
  background-image: url(../../static/images/gold-two.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.resource-left--three {
  background-image: url(../../static/images/gold-three.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.resource-left--other {
  background-image: url(../../static/images/gold-other.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.resource-pannel {
  position: relative;
  padding: 30px 35px;
}
.resource-pannel::after {
  position: absolute;
  content: "";
  bottom: 0;
  width: 86%;
  border-bottom: 1px dashed #1a5271;
  left: 50%;
  margin-left: -43%;
}
.resource-pannel .r-pannel--header {
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.resource-pannel .p-header--icon {
  display: inline-block;
  width: 47px;
  height: 38px;
  background-image: url(../../static/images/crown.png);
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.resource-pannel .p-header--first {
  background-image: url(../../static/images/gold-crown.png);
}
.resource-pannel .p-header--second {
  background-image: url(../../static/images/silver-crown.png);
}
.resource-pannel .p-header--three {
  background-image: url(../../static/images/bronze-crown.png);
}
.resource-pannel .p-header--name {
  color: #ffffff;
  margin-left: 20px;
  font-size: 24px;
}
.resource-pannel .p-header--play {
  float: right;
  color: #51f5f6;
  font-size: 24px;
}
.p-header--left {
  float: left;
}
.r-pannel--content {
  padding-top: 15px;
  font-size: 22px;
  color: #fff;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.resource-pannel .p-name--first {
  color: #ffe305;
}
.resource-pannel .p-name--second {
  color: #817fff;
}
.resource-pannel .p-name--three {
  color: #ffc1a0;
}
</style>

