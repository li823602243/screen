<template>
  <div class="wrapper">
    <el-row :gutter="40" class="wrapper-order">
      <el-col :span="12" class="wrapper-col">
        <el-row>
          <el-col :span="24" class="order-num--content"> 
            <div class="aside-title">场馆预约数量统计</div>
            <div class="order-num" id="order-total"></div>
          </el-col>
        </el-row>
        <el-row class="order-type--content">
          <el-col :span="24" class="order-type--wrapper"> 
            <div class="aside-title">按类型TOP10</div>
            <div class="order-type"></div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" class="wrapper-col">
         <div class="aside-title aside-title--address"></div>
          <el-row class="address-left">
            <div class="address-left--content"></div>
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
    this.drawLine();
  },
  computed: {
    author() {
      return this.$store.state.author;
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let orderNumChart = this.$echarts.init(
        document.getElementById("order-total")
      );
      var dataStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          shadowBlur: 40,
          shadowColor: "rgba(40, 40, 40, 0.5)"
        }
      };
      var placeHolderStyle = {
        normal: {
          color: "rgba(44,59,70,1)", //未完成的圆环的颜色
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: "rgba(44,59,70,1)" //未完成的圆环的颜色
        }
      };
      let orderNumOption = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      };
      // 绘制图表
      orderNumChart.setOption(orderNumOption);
      window.addEventListener("resize", () => {
        orderNumChart.resize();
      });
    }
  }
};
</script>
<style>
.wrapper-order {
  height: 100%;
}
.wrapper-col {
  display: flex;
  flex-direction: column;
}
.order-num {
  height: 300px;
  width: 100%;
  border: 1px solid #032ac6;
}
.order-type--content {
  flex: 1;
  height: 100%;
}
.order-type {
  width: 100%;
  border: 1px solid #032ac6;
}
.order-total,
.wrapper-col {
  height: 100%;
}
.order-total {
  border: 1px solid red;
}
.order-num--content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.order-type--wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  margin-top: 30px;
}
.wrapper-col--left {
  height: 100%;
  border: 1px solid #032ac6;
}
.address-left {
  flex: 1;
  height: 100%;
  border: 1px solid #032ac6;
}
.aside-title--address::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  -webkit-transform: perspective(1em) scale(1, 1) rotateX(1.2deg);
  z-index: -1;
  -webkit-transform-origin: bottom left;
  transform-origin: bottom left;
}
</style>

