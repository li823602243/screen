<template>
  <div class="date-group">
    <div class="date" :class="{active:shows=='day'}"  @click="chooseDate('day')">今日</div>
    <div class="date" :class="{active:shows=='week'}"  @click="chooseDate('week')">本周</div>
    <div class="date" :class="{active:shows=='month'}"  @click="chooseDate('month')">本月</div>
    <div class="date" :class="{active:shows=='all'}"  @click="chooseDate('all')">全部</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    shows:'day'
  },
  methods:{
    chooseDate: function (value) {
     this.shows=value
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.date-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
</style>
