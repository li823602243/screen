export default {
    urls: {
        HomePageData: '/getHomePageData', // 大屏首界面数据获取
        ActivityPageData: '/getActivityAreaCatStaData', // 获取活动发布相关统计数据
        ServicePageData: '/getActivityServiceStaData', // 获取活动参与人次数据
        VenuePageData: '/getVenueBookingStaData', // 活动室预约数据接口
        LivePageData: '/getLiveStaData', // 获取直播频道数据
        ResourcePageData: '/getVideoResourceStaData', // 获取点播资源数据
        userPageData: '/getUserStaData', // 获取用户相关数据
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
