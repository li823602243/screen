<template>
  <div class="wrapper">
  
    <el-row :gutter="20">
  
      <el-col :span="12">
  
        <div class="title-flag left">直播数量统计</div>
  
        <div class="live-num">
  
          <div class="row row-header">
  
            <div class="col"></div>
  
            <div class="col">今日</div>
  
            <div class="col">本周</div>
  
            <div class="col">本月</div>
  
            <div class="col">全部</div>
  
          </div>
  
          <div class="row row-body">
  
            <div class="col">场次</div>
  
            <div class="col">2214</div>
  
            <div class="col">55544</div>
  
            <div class="col">55844</div>
  
            <div class="col">78874</div>
  
          </div>
  
          <div class="row row-header">
  
            <div class="col">观看人数</div>
  
            <div class="col">11444</div>
  
            <div class="col">444</div>
  
            <div class="col">4444</div>
  
            <div class="col">88585</div>
  
          </div>
  
        </div>
  
      </el-col>
  
      <el-col :span="12">
  
        <div class="title-flag left">观看人数趋势</div>
  
        <div class="watch-people"></div>
  
      </el-col>
  
    </el-row>
  
    <el-row :gutter="20" class="live-ranking">
  
      <div class="title-flag left">观看人数趋势</div>
  
      <el-row class="live-ranking--wrapper">
  
        <el-col :span="12"></el-col>
  
        <el-col :span="12"></el-col>
  
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
  
  
  
    },
  
    computed: {
  
      author() {
  
        return this.$store.state.author
  
      }
  
    },
  
    methods: {}
  
  };
</script>
<style>
  .live-num {
  
    height: 300px;
  
    border: 1px solid #002ac5
  
  }
  
  
  
  .watch-people {
  
    height: 360px;
  
    border: 1px solid #002ac5
  
  }
  
  
  
  .live-ranking {
  
    margin-top: 30px;
  
    flex: 1;
  
  }
  
  
  
  .live-ranking--wrapper {
  
    height: 100%;
  
    border: 1px solid #002ac5
  
  }
</style>

