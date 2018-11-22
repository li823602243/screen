<template>
  <div class="top-bar">
  <div class="left">
    <div class="icon-run" v-if="buttonStatus" @click="run"></div>
    <div class="icon-stop" v-else @click="run"></div>
    </div>
  <div class="right">{{nowTime}}</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
     buttonStatus:true,
     nowTime:''
    };
  },
  // 挂载完成时
  mounted(){
    this.nowTimes();
  },
  methods: {
// 获取当前时间函数
  timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
      let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
      let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
      let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
      let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.nowTime = year + "." + month + "." + date +" "+hh+":"+mm +":"+ss ;
      // console.log(this.nowTime);
    },
    // 定时器函数
    nowTimes(){
      this.timeFormate(new Date());
      setTimeout(this.nowTimes,1000);
    },
    run:function(){
     if(this.buttonStatus){
       this.buttonStatus=false;
       this.$store.state.autoplay = false;
     }else{
       this.buttonStatus=true;
       this.$store.state.autoplay = true;
     }
    //  if(this.runButton){
    //     this.$store.state.autoplay = false;
    //  }else{
    //     this.$store.state.autoplay = true;
    //  }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  height: 130px;
  box-sizing: border-box;
  background: url('../../static/images/title.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin:  0 auto;
}
.left {
  width: 20%;
}
.icon-run {
  position: absolute;
  top: 19px;
  left: 30px;
  height: 62px;
  width: 62px;
  background: url('../../static/images/play.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
.icon-stop {
  position: absolute;
  top: 19px;
  left: 30px;
  height: 62px;
  width: 62px;
  background: url('../../static/images/stop.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
.middle {
  height: 100%;
  width: 100%;
 
}
.right {
  position: absolute;
  top: 35px;
  right: 30px;
  font-size: 25px;
  color: #54ffff;
  width: 20%;
}
</style>
