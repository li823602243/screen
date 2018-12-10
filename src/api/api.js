import http from './http.js'
export function fetch(url) {
    return new Promise((resolve, reject) => {
        http.get(url,res => {
            resolve(res);
        })
    })
   
}

export default {
  // 获取我的页面的后台数据
  getOnePageData() {
    return fetch('/Api/Statistic/getHomePageData');
  },
  //获取活动发布数据
  getSecondPageData(){
    return fetch('/Api/Statistic/getActivityAreaCatStaData');
  },
  //获取活动参与人次
  getThreePageData(){
    return fetch('/Api/Statistic/getActivityServiceStaData');
  },
  //活动室预约数据接口
  getFourPageData(){
    return fetch('/Api/Statistic/getVenueBookingStaData');
  },
  //直播数据接口
  getSixPageData(){
    return fetch('/Api/Statistic/getLiveStaData');
  },
  //获取点播资源数据
  getSevenPageData(){
    return fetch('/Api/Statistic/getVideoResourceStaData');
  },
  //获取个人数据
  getEightPageData(){
    return fetch('/Api/Statistic/getUserStaData');
  },
  //今天总在馆人数
  allCurrentVisitorData(){
    return fetch('?s=Home/VisitorStat/all_current_visitor_data');
  },
  //所有机构今天总在馆人数
  allTopInData(){
    return fetch('?s=Home/VisitorStat/all_top_in_data');
  },
  //所有机构一周入馆人数
  getWeekInData(){
    return fetch('?s=Home/VisitorStat/get_week_in_data');
  },
  //当前一分钟入馆人数
  currentEnterNum(){
    return fetch('?s=Home/VisitorStat/current_enter_num');
  },
  //昨日在馆人数
  allYesterDay(){
    return fetch('?s=Home/VisitorStat/get_all_yesterday_enter_num');
  },
  //入馆服务总数
  allTotalEnterNum(){
    return fetch('?s=Home/VisitorStat/get_total_enter_num');
  }
}
