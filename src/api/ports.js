export default {
    urls: {
        HomePageData: '/Api/Statistic/getHomePageData', // 大屏首界面数据获取
        ActivityPageData: '/Api/Statistic/getActivityAreaCatStaData', // 获取活动发布相关统计数据
        ServicePageData: '/Api/Statistic/getActivityServiceStaData', // 获取活动参与人次数据
        VenuePageData: '/Api/Statistic/getVenueBookingStaData', // 活动室预约数据接口
        LivePageData: '/Api/Statistic/getLiveStaData', // 获取直播频道数据
        ResourcePageData: '/Api/Statistic/getVideoResourceStaData', // 获取点播资源数据
        userPageData: '/Api/Statistic/getUserStaData', // 获取用户相关数据

        allCurrentVisitorData: '?s=Home/VisitorStat/all_current_visitor_data', // 今天总在馆人数
        allTopInData: '?s=Home/VisitorStat/all_top_in_data', // 所有机构今天总在馆人数
        getWeekInData: '?s=Home/VisitorStat/get_week_in_data', // 所有机构一周入馆人数
        currentEnterNum: '?s=Home/VisitorStat/current_enter_num', // 当前一分钟入馆人数
        allYesterDay: '?s=Home/VisitorStat/get_all_yesterday_enter_num', // 昨日在馆人数
        allTotalEnterNum: '?s=Home/VisitorStat/get_total_enter_num', // 当前一分钟入馆人数
    }
}

// 使用demon
// this.http.post(this.ports.manage.login, {
//     userAccount: 'test',
//     userPassword: '111111',
//     cert: '1111111111'
// }, res => {
//     if (res.success) {
//        // 返回正确的处理
//     } else {
//       // 返回错误的处理 
//     }
// })
