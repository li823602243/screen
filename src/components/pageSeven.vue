<template>
  <div class="resource-wrapper wrapper">
    <div class="resource-left">
      <div class="title-flag left">分类排名TOP</div>
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
        <el-row class="resource-left--body" v-for="(item,index) in SevenPageData.resource_cat_play_rank" :key="index">
          <el-col :span="8">{{item.filter_name}}</el-col>
          <el-col :span="8"> {{utils.numFormat(item.amount)}}</el-col>
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
      <span class="bouble1" :class="{bouble1Animation:this.$store.state.pageNum==6}"></span>
      <span class="bouble2" :class="{bouble2Animation:this.$store.state.pageNum==6}"></span>
      <span class="bouble3" :class="{bouble3Animation:this.$store.state.pageNum==6}"></span>
      <span class="bouble4" :class="{bouble4Animation:this.$store.state.pageNum==6}"></span>
      <span class="bouble5" :class="{bouble5Animation:this.$store.state.pageNum==6}"></span>
      <span class="bouble6" :class="{bouble6Animation:this.$store.state.pageNum==6}"></span>
      <div class="resource-num" :class="{resourceAnimation:this.$store.state.pageNum==6}">
        <span class="resource-title">资源数量</span>
        <span class="num">{{SevenPageData.resource_total}}</span>
      </div>
      <div class="resource-play" :class="{resourcePlayAnimation:this.$store.state.pageNum==6}">
        <span class="resource-title">播放总数</span>
        <span class="num">{{SevenPageData.resource_play_total}} </span>
      </div>
      <div class="resource-rong" :class="{resourceRongAnimation:this.$store.state.pageNum==6}">
        <span class="resource-title"> 资源容量</span>
        <span class="num">{{SevenPageData.resource_size_total}}</span>
      </div>
    </div>
    <div class="resource-right">
      <div class="title-flag right">资源播放TOP</div>
      <div class="resource-left--content">
        <div class="resource-pannel" v-for="(item,index) in SevenPageData.resource_video_play_rank" :key="index" v-if="index<=4">
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
            <span class="p-header--play">播放{{utils.numFormat(item.amount)}}次</span>
          </div>
          <div class="r-pannel--content">{{item.filter_name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "hello",
  data() {
    return {
    };
  },
  mounted() {
    let that = this;
  },
  computed: {
    ...mapState({
      SevenPageData:state=>state.getSevenPageData.msg,
    })
  }
};
</script>
<style>
.resource-wrapper {
  position: relative;
  padding-bottom: 40px;
  /* display: flex;
  align-items: flex-start; */
  height: 100%;
  padding: 0  60px 40px 60px;
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
  z-index: 2;
}
.bouble1Animation {
  animation: bubbleRise 8s linear infinite;
  transform: translateZ(0); 
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
  z-index: 2;
}
.bouble2Animation {
  animation: bubbleRise 10s linear infinite;
  transform: translateZ(0); 
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
  z-index: 2;
}
.bouble3Animation {
  animation: bubbleRise 6s linear infinite;
  transform: translateZ(0); 
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
  z-index: 2;
}
.bouble4Animation {
  animation: bubbleRise 9s linear infinite;
  transform: translateZ(0);
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
}
.resourceAnimation {
  animation: cricleTrans 6s linear infinite;
  transform: translateZ(0);
}
.resource-title {
  display: inline-block;

  margin: 5px auto;

  font-size: 20px;
}

.resource-num > .num {
  display: inline-block;

  margin: 5px auto;

  font-size: 28px;
}
.resource-rong >.num {
  display: inline-block;

  margin: 5px auto;

  font-size: 24px;
}
.resource-play >.num{
  display: inline-block;

  margin: 5px auto;

  font-size: 28px;
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
}
.resourcePlayAnimation {
  animation: cricleTrans 8s linear infinite;
  transform: translateZ(0); 
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
}
.resourceRongAnimation {
  animation: cricleTrans 10s linear infinite;
  transform: translateZ(0); 
}
.resource-left {
  display: flex;

  flex-direction: column;

  align-items: flex-start;

  position: absolute;

  height: 100%;

  width: 28%;
  box-sizing: border-box;
  padding-bottom: 40px;
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

  height: 100%;
  box-sizing: border-box;
  padding-bottom: 40px;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2vw;
  color: #fff;
  height: 10%;
}
.resource-left--ranking {
  height: 2.2vw;
  line-height: 2.2vw;
  text-align: center;
  width: 2.2vw;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 0 35px;
  height: 20%;;
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
.resource-pannel:last-child::after {
   border-bottom: none;
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
  width: 2.5vw;
  height: 2.4vw;
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
  font-size: 1.6vw;
}
.resource-pannel .p-header--play {
  float: right;
  color: #51f5f6;
  font-size: 1.5vw;
}
.p-header--left {
  float: left;
}
.r-pannel--content {
  padding-top: 0.5vw;
  font-size: 1.2vw;
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

