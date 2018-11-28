import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    pageNum: 0,
    autoplay:true,
    interval:15000,//了轮播时间间隔
    intervalTime:600000,//接口刷新时间
    YearDataArrPre:[]
  },
  mutations: {
    modifyMsg(state, Obj) {
      if (state.NewMsg.Msgs[0].id === 'no_msg') {
        state.NewMsg.Msgs.shift();
      }
      var obj = {
        title: Obj.title,
        content: Obj.content
      };
      obj.id = 'Msg_' + Obj.id;
      obj.url = '#' + obj.id;
      state.NewMsg.Msgs.push(obj);
    }
  },
  actions: {
    fetchMsg(context) {
      $.ajax({
        url: 'PHP/GetMsgs.php',
        type: 'GET',
        data: {},
        dataType: 'json',

        success: function (response) {
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }
          console.log(response);
          $(response).each(function (k, v) {
            // console.log(v.id+v.title+v.content);
            context.commit('modifyMsg', v);
          });
        }
      });
    }
  }
})

export default store
