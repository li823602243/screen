import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js';
import api from '../api/api';
Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    pageNum: 0,
    autoplay: true,
    interval: 15000,//了轮播时间间隔
    intervalTime: 600000,//接口刷新时间
    YearDataArrPre: [],
    allTotalEnterNum: "1",
    allYesterDay: '2',
    pageOneChart: '',
    pageTwoChart: '',
    pageThreeChart: '',
    pageFourChart: '',
    getOnePageData: {
      errno: 1,
      msg: {}
    },
    getSecondPageData: {
      errno: 1,
      msg: {}
    },
    getThreePageData: {
      errno: 1,
      msg: {}
    },
    getFourPageData: {
      errno: 1,
      msg: {}
    },
    getSixPageData: {
      errno: 1,
      msg: {}
    },
    getSevenPageData: {
      errno: 1,
      msg: {}
    },
    getEightPageData: {
      errno: 1,
      msg: {}
    },
    allCurrentVisitorData:{
      errno: 1,
      msg: {}
    },
    allTopInData:{
      errno: 1,
      msg: {}
    },
    getWeekInData:{
      errno: 1,
      msg: {}
    },
    currentEnterNum:{
      errno: 1,
      msg: {}
    },
    allYesterDay:{
      errno: 1,
      msg: {}
    }

  },
  mutations: {
    [types.ONE_MUTATION](state, res) {
      state.getOnePageData = { ...state.getOnePageData, msg: res.data.results }
    },
    [types.SECOND_MUTATION](state, res) {
      state.getSecondPageData = { ...state.getSecondPageData, msg: res.data.results }
    },
    [types.THREE_MUTATION](state, res) {
      state.getThreePageData = { ...state.getThreePageData, msg: res.data.results }
    },
    [types.FOUR_MUTATION](state, res) {
      state.getFourPageData = { ...state.getFourPageData, msg: res.data.results }
    },
    [types.SIX_MUTATION](state, res) {
      state.getSixPageData = { ...state.getSixPageData, msg: res.data.results }
    },
    [types.SEVEN_MUTATION](state, res) {
      state.getSevenPageData = { ...state.getSevenPageData, msg: res.data.results }
    },
    [types.EIGHT_MUTATION](state, res) {
      state.getEightPageData = { ...state.getEightPageData, msg: res.data.results }
    },
    [types.ALL_CURRENT_VISIT](state, res) {
      state.allCurrentVisitorData = { ...state.allCurrentVisitorData, msg: res.data.results }
    },
    [types.ALL_TOP_IN](state, res) {
      state.allTopInData = { ...state.allTopInData, msg: res.data.results }
    },
    [types.GET_WEEK_IN](state, res) {
      state.getWeekInData = { ...state.getWeekInData, msg: res.data.results }
    },
    [types.CURRENT_ENTER_NUM](state, res) {
      state.currentEnterNum = { ...state.currentEnterNum, msg: res.data.results }
    },
    [types.ALL_YESTER_DAY](state, res) {
      state.allYesterDay = { ...state.allYesterDay, msg: res.data.results }
    }
  },
  actions: {
    //首页数据
    getHomePageData({ commit }) {
      api.getOnePageData().then(res => {
        commit(types.ONE_MUTATION, res);
      })
    },
    //第二页数据
    getSecondPageData({ commit }) {
      api.getSecondPageData().then(res => {
        commit(types.SECOND_MUTATION, res);
      })
    },//第三页数据
    getThreePageData({ commit }) {
      api.getThreePageData().then(res => {
        commit(types.THREE_MUTATION, res);
      })
    },
    getFourPageData({ commit }) {
      api.getFourPageData().then(res => {
        commit(types.FOUR_MUTATION, res);
      })
    },
    getFivePageData({ commit }) {
      api.getFivePageData().then(res => {
        commit(types.FIVE_MUTATION, res);
      })
    },
    //第六页数据
    getSixPageData({ commit }) {
      api.getSixPageData().then(res => {
        commit(types.SIX_MUTATION, res);
      })
    },
    //第七页数据
    getSevenPageData({ commit }) {
      api.getSevenPageData().then(res => {
        commit(types.SEVEN_MUTATION, res);
      })
    },
    //第八,九页数据
    getEightPageData({ commit }) {
      api.getEightPageData().then(res => {
        commit(types.EIGHT_MUTATION, res);
      })
    },
    //今天总在馆人数
    allCurrentVisitorData({ commit }) {
      api.allCurrentVisitorData().then(res => {
        commit(types.ALL_CURRENT_VISIT, res);
      })
    },
    //所有机构今天总在馆人数
    allTopInData({ commit }) {
      api.allTopInData().then(res => {
        commit(types.ALL_TOP_IN, res);
      })
    },
    //所有机构一周入馆人数
    getWeekInData({ commit }) {
      api.getWeekInData().then(res => {
        console.log(res)
        commit(types.GET_WEEK_IN, res);
      })
    },
    //当前一分钟入馆人数
    currentEnterNum({ commit }) {
      api.currentEnterNum().then(res => {
        console.log(res)
        commit(types.CURRENT_ENTER_NUM, res);
      })
    },
    //昨日在馆人数
    allYesterDay({ commit }) {
      api.allYesterDay().then(res => {
        console.log(res)
        console.log('213213213213213213')
        commit(types.ALL_YESTER_DAY, res);
      })
    }
  }
})

export default store
