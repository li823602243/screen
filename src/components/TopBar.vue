<template>
  <div class="top-bar">
  <div class="left"><div class="icon-run"></div></div>
  <div class="right">2018.11.05 10:12:36</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
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
