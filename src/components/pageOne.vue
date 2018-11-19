<template>
  <div class="wrapper">
  <el-row :gutter="24" class="wrapper-content">
    <el-col :span="9">
      <el-row :gutter="24">
        <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">活动发布场次</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日新增:32222</span>
        </el-col>
        <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">活动参与人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日参与:32222</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">直播观看人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日观看:32222</span>
        </el-col>
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">资源点播人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日观看:32222</span>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <div class="platform">
        <span class="title">平台访问次数</span>
        <span class="num">30000</span>
      </div>
      </el-col>
    <el-col :span="9">
      <el-row :gutter="24">
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">场馆预约次数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日预约:32222</span>
        </el-col>
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">入馆服务人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日新增:32222</span>
        </el-col>
      </el-row>
      <el-row :gutter="24">
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">微信关注人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日新增:32222</span>
        </el-col>
       <el-col :span="12">
          <div class="circle-content">
            <div class="circle-wrapper">
              <span class="title">注册用户人数</span>
              <span class="num">23555522</span>
            </div>
          </div>
          <span class="tips">昨日新增:32222</span>
        </el-col>
      </el-row>
    </el-col>
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
   this.http.post(this.ports.urls.HomePageData,res => {
     console.log(res)
      if (res.success) {
          // 返回正确的处理
      } else {
        // 返回错误的处理 
      }
  })
  },
  computed: {
      author () {
        return this.$store.state.author
      }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page {
  background: url('../../static/images/index-bg.jpg');
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
  height: 300px;
  width: 300px;
  background: url('../../static/images/index-circle.png');
  background-size: cover;
  background-repeat: no-repeat;
  margin:  0 auto;
  animation:changDeg 5s linear 0.2s infinite;
}
.circle-wrapper {
  animation:changDegr 5s linear 0.2s infinite;
}
.circle-wrapper .title {
  display: inline-block;
  font-size: 25px;
  color: #fff;
  margin: 5px;
}

.circle-wrapper .num {
  display: inline-block;
  font-size: 40px;
  color: #f1ffa3;
  margin: 5px;
}
.tips {
  display: inline-block;
  margin: 26px auto;
  font-size: 25px;
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
  font-size: 25px;
  color: #fff;
  margin: 5px;
}
.platform .num {
  display: inline-block;
  font-size: 40px;
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
