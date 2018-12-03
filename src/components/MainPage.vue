<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
              <page-one></page-one>
            </div>
            <div class="swiper-slide">
             <page-two></page-two>
            </div>
            <div class="swiper-slide">
              <page-three></page-three>
            </div>
             <div class="swiper-slide">
               <page-four></page-four>
            </div>
             <div class="swiper-slide">
               <page-five></page-five>
            </div>
             <div class="swiper-slide">
              <page-six></page-six>
            </div>
            <div class="swiper-slide">
               <page-seven></page-seven>
            </div>
            <div class="swiper-slide">
              <page-eight></page-eight>
            </div>
            <div class="swiper-slide">
               <page-nine></page-nine>
            </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
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
  mounted(){
    new Swiper ('.swiper-container', {
    loop: true,
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  })        
  },
  methods:{
   changePage:function(e){
    console.log(e)
    this.$store.state.pageNum = e;
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
.swiper-container {
  width:100%;
  height:100%;      
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
</style>
