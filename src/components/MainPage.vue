<template>
  <el-carousel :interval="this.$store.state.interval" height="100%" v-on:change='changePage'  :autoplay="this.$store.state.autoplay" indicator-position='none'>
    <el-carousel-item>
      <page-one></page-one>
    </el-carousel-item>
    <el-carousel-item>
      <page-two></page-two>
    </el-carousel-item>
    <el-carousel-item>
      <page-three></page-three>
    </el-carousel-item>
    <el-carousel-item>
      <page-four></page-four>
    </el-carousel-item>
       <el-carousel-item>
      <page-five></page-five>
    </el-carousel-item>
       <el-carousel-item>
      <page-six></page-six>
    </el-carousel-item>
       <el-carousel-item>
      <page-seven></page-seven>
    </el-carousel-item>
    <el-carousel-item>
      <page-eight></page-eight>
    </el-carousel-item>
    <el-carousel-item>
      <page-nine></page-nine>
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
  methods:{
   changePage:function(e){
    this.$store.state.pageNum = e;
   }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-carousel {
  height: 88%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>
