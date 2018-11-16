<template>
  <div class="resource-wrapper">
   <div class="resource-left">
     <div class="title-flag left">分类排名TOP10</div>
     <div class="resource-left--content"></div>
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
        <span class="resource-title">
          资源数量
        </span>
        <span class="num">
          225112
        </span>
     </div>
     <div class="resource-play">
        <span class="resource-title">
          播放总数
        </span>
        <span class="num">
          225112
        </span>
      </div>
      <div class="resource-rong">
        <span class="resource-title">
          资源容量
        </span>
        <span class="num">
          225112T
        </span>
      </div>
   </div>
   <div class="resource-right">
      <div class="title-flag right">资源播放TOP</div>
      <div class="resource-left--content"></div>
   </div>
  </div>
</template>

<script>
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
.resource-num >.num{
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
</style>

