<template>
  <div class="wrapper" id="m_body" v-cloak>
    <el-row :gutter="24" class="wrapper-content">
      <el-col :span="9">
        <el-row :gutter="24">
          <el-col :span="12" class="circle-content--bottom">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">活动发布场次</span>
                <span class="num">{{HomePageData.act_total}}</span>
              </div>
            </div>
            <span class="tips">昨日新增:{{HomePageData.act_today}}</span>
          </el-col>
          <el-col :span="12" class="circle-content--bottom">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">活动参与人数</span>
                <span class="num">{{HomePageData.act_join_total}}</span>
              </div>
            </div>
            <span class="tips">昨日参与:{{HomePageData.act_join_today}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
        <el-col :span="12">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">直播观看人次</span>
                <span class="num">{{HomePageData.live_play_total}}</span>
              </div>
            </div>
            <span class="tips">昨日观看:{{HomePageData.live_play_today}}</span>
          </el-col>
        <el-col :span="12">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">资源点播人次</span>
                <span class="num">{{HomePageData.video_play_total}}</span>
              </div>
            </div>
            <span class="tips">昨日观看:{{HomePageData.video_play_today}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="platform">
          <span class="title">平台访问次数</span>
          <span class="num">{{HomePageData.web_access_total}}</span>
        </div>
        <div class="tips">今日新增:{{HomePageData.web_access_today}}</div>
        </el-col>
      <el-col :span="9">
        <el-row :gutter="24">
        <el-col :span="12" class="circle-content--bottom">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">场馆预约次数</span>
                <span class="num">{{HomePageData.venue_booking_total}}</span>
              </div>
            </div>
            <span class="tips">昨日预约:{{HomePageData.venue_booking_today}}</span>
          </el-col>
        <el-col :span="12" class="circle-content--bottom">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">入馆服务人数</span>
                <span class="num">{{utils.numFormat(YearDataArrs)}}</span>
              </div>
            </div>
            <span class="tips">昨日新增:{{allYesterDay}}</span>
          </el-col>
        </el-row>
        <el-row :gutter="24">
        <el-col :span="12">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">微信关注人数</span>
                <span class="num">{{HomePageData.wx_inviter_total}}</span>
              </div>
            </div>
            <span class="tips">昨日新增:{{HomePageData.wx_inviter_today}}</span>
          </el-col>
        <el-col :span="12">
            <div class="circle-content" :class="{circleAnimation:this.$store.state.pageNum==10}">
              <div class="circle-wrapper" :class="{circleAnimationWrapper:this.$store.state.pageNum==10}">
                <span class="title">注册用户人数</span>
                <span class="num">{{HomePageData.register_total}}</span>
              </div>
            </div>
            <span class="tips">昨日新增:{{HomePageData.register_today}}</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// $("#m_body").css({
//     'transform': 'translate('+(zoom-1)*thisWidth/2+'px, '+(zoom-1)*thisHeight/2+'px) scale('+zoom+')',
// });
import {mapState} from 'vuex';
export default {
  data() {
    return {
    };
  },
  mounted(){
    var zoom=1.2;
    var thisWidth=$('#m_body').width();
    var thisHeight=$('#m_body').height();
    console.log($('#m_body'))
    console.log(thisHeight)
    console.log(thisWidth)
  },
  computed: {
    ...mapState({
      HomePageData:state=>state.getOnePageData.msg,
      YearDataArrs:state=>state.allTotalData.msg,
      allYesterDay:state=>state.allYesterDay.msg,
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page {
  background: url('../../static/images/index-bg.jpg')!important;
  background-size: cover;
  background-repeat: no-repeat;
}
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 100%;
}
.wrapper-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100%;
}
.circle-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 14vw;
  width: 14vw;
  min-height: 200px;
  min-width: 200px;
  background: url('../../static/images/index-circle.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin:  0 auto;
  
}
.circleAnimation {
  animation:changDeg 5s linear 0.2s infinite; 
  transform: translateZ(0);
}
.circleAnimationWrapper {
  animation:changDegr 5s linear 0.2s infinite;
  transform: translateZ(0); 
}
.circle-wrapper .title {
  display: inline-block;
  font-size: 1.3vw;
  color: #fff;
  margin: 5px;
}
.circle-content--bottom {
  /* margin-bottom: 45px; */
}
.circle-wrapper .num {
  display: block;
  font-size: 2.5vw;
  color: #f1ffa3;
  margin: 5px;
}
.tips {
  display: block;
  margin: 26px auto;
  font-size: 1.8vw;
  color: #55fffe;
}
.platform {
  width: 100%;
  height: 417px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('../../static/images/center.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.platform .title {
  display: inline-block;
  font-size: 2.2vw;
  color: #fff;
  margin: 5px;
}
.platform .num {
  display: inline-block;
  font-size: 2.5vw;
  color: #f1ffa3;
  margin: 5px;
}
@keyframes changDeg{
			0%{
        transform: rotate(0deg);
			}
			100%{
        transform: rotate(360deg);
			}
		}
@keyframes changDegr{
			0%{
        transform: rotate(360deg);
			}
			100%{
        transform: rotate(0deg);
			}
    }    
</style>
