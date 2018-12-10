<template>
  <el-carousel :interval="this.$store.state.interval" height="100%" v-on:change='changePage'  :autoplay="this.$store.state.autoplay" indicator-position='none'>
    <el-carousel-item>
    <page-one></page-one>
    </el-carousel-item>
    <el-carousel-item>
      <page-two ref="mychildTwo"></page-two>
    </el-carousel-item>
    <el-carousel-item>
      <page-three ref="mychildThree"></page-three>
    </el-carousel-item>
    <el-carousel-item>
      <page-four ref="mychildFour"></page-four>
    </el-carousel-item>
       <el-carousel-item>
      <page-five ref="mychildFive"></page-five>
    </el-carousel-item>
       <el-carousel-item>
      <page-six ref="mychildSix"></page-six>
    </el-carousel-item>
       <el-carousel-item>
    <page-seven ref="mychildSeven"></page-seven>
    </el-carousel-item>
    <el-carousel-item>
      <page-eight ref="mychildEight"></page-eight>
    </el-carousel-item>
    <el-carousel-item>
      <page-nine ref="mychildNine"></page-nine>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import pageOne from "./pageOne.vue";
import pageTwo from "./pageTwo.vue";
import pageThree from "./pageThree.vue";
import pageFour from "./pageFour.vue";
import pageFive from "./pageFive.vue";
import pageSix from "./pageSix.vue";
import pageSeven from "./pageSeven.vue";
import pageEight from "./pageEight.vue";
import pageNine from "./pageNine.vue";
export default {
  name: "app",
  components: {
    pageOne,
    pageTwo,
    pageThree,
    pageFour,
    pageFive,
    pageSix,
    pageSeven,
    pageEight,
    pageNine
  },
  created(){
     this.getPageData();
     const pageOne = setInterval(() =>{                    
          this.getPageData();   
     }, this.$store.state.intervalTime);    
  },
  mounted() {
  },
  methods:{
   changePage:function(e){
    this.$store.state.pageNum = e;
    switch(e)
      {
      case 0:
        //第九页
        // this.$store.state.userSexChart.clear();
        // this.$store.state.userTimeChart.clear();
        // this.$store.state.userPadChart.clear();

        // 第二页
        //this.$store.state.actTypeChart.clear();
        // this.$store.state.actPublicChart.clear();
        ///this.$store.state.actStatusChart.clear();
        //this.$store.state.actTrendChart.clear();
        break;
       case 1:
        this.$refs.mychildTwo.getActivityPageData();
        // 第三页
        //this.$store.state.trendWeekChart.clear();
        //this.$store.state.trendYearChart.clear();
       // this.$store.state.actTypeChart.clear();
        //this.$store.state.orderChart.clear();
        //this.$store.state.ageChart.clear();
        break;
      case 2:
        // 第二页
       // this.$store.state.actTypeChart.clear();
        //this.$store.state.actPublicChart.clear();
        ///this.$store.state.actStatusChart.clear();
       // this.$store.state.actTrendChart.clear();

        this.$refs.mychildThree.getServicePageData();
        // 第四页
       // this.$store.state.orderDayChart.clear();
       // this.$store.state.orderWeekChart.clear();
       // this.$store.state.orderMonthChart.clear();
       // this.$store.state.orderAllChart.clear();
       // this.$store.state.addressCityTotalChart.clear();
        break;
      case 3:
        // 第三页
        //this.$store.state.trendWeekChart.clear();
       // this.$store.state.trendYearChart.clear();
       // this.$store.state.actTypeChart.clear();
       // this.$store.state.orderChart.clear();
       // this.$store.state.ageChart.clear();

        this.$refs.mychildFour.getVenuePageData();
        // 第五页
        //this.$store.state.todayServiceNum.clear();
        //this.$store.state.libraryNum.clear();
       // this.$store.state.aggregateChart.clear();
       // this.$store.state.entranceNowTotalChart.clear();
       // this.$store.state.entranceNowNumChart.clear();
        break;
      case 4:
        // 第四页
        //this.$store.state.orderDayChart.clear();
       // this.$store.state.orderWeekChart.clear();
       // this.$store.state.orderMonthChart.clear();
       // this.$store.state.orderAllChart.clear();
       // this.$store.state.addressCityTotalChart.clear();
        this.$refs.mychildFive.pageFiveData();
        //第六页
         //this.$store.state.trendYearChart.clear();
        break;
      case 5:
        //第五页
        //this.$store.state.todayServiceNum.clear();
       // this.$store.state.libraryNum.clear();
       // this.$store.state.aggregateChart.clear();
      //  this.$store.state.entranceNowTotalChart.clear();
      //  this.$store.state.entranceNowNumChart.clear();
        this.$refs.mychildSix.getVenuePageData();
        //第七页
        break;
      case 6:
        //第六页
        //this.$store.state.trendYearChart.clear();
        break;
      case 7:
        //第七页
        this.$refs.mychildEight.getVenuePageData();
       // this.$store.state.userSexChart.clear();
       // this.$store.state.userTimeChart.clear();
      //  this.$store.state.userPadChart.clear();
         //第九页
        break;
      case 8:
        //第八页
        this.$refs.mychildNine.getVenuePageData();
        //第一页
        
        break;
      default:
      }
   },
   getPageData:function(){
      this.$store.dispatch('getHomePageData');
      this.$store.dispatch('getSecondPageData');
      this.$store.dispatch('getThreePageData');
      this.$store.dispatch('getFourPageData');
      this.$store.dispatch('getSixPageData');
      this.$store.dispatch('getSevenPageData');
      this.$store.dispatch('getEightPageData');
      this.$store.dispatch('allCurrentVisitorData');
      this.$store.dispatch('allTopInData');
      this.$store.dispatch('getWeekInData');
      this.$store.dispatch('currentEnterNum');
      this.$store.dispatch('allYesterDay');
   }
  }
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-carousel {
  flex: 1;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>
