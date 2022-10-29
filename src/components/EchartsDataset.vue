<template>
  <div id="dataset" style="height: 400px"></div>
  <div id="cumulative" style="height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
        tooltip: {
          // 鼠标悬浮提示框显示 X和Y 轴数据
          trigger: "axis",
          backgroundColor: "rgba(32, 33, 36,.7)",
          borderColor: "rgba(32, 33, 36,0.20)",
          borderWidth: 1,
          textStyle: {
            // 文字提示样式
            color: "#fff",
            fontSize: "12",
          },
          axisPointer: {
            // 坐标轴虚线
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
      },
    };
  },
  props: ["dataset","cur_tag"],
  methods: {},
  emits :['changeTag'],
  watch: {
    dataset(newVal, oldVal) {
      this.$nextTick(() => {
        if (!this.dataset.hasOwnProperty("domID")) {
          this.dataset["domID"]="dataset"
        }
        var chartDom = document.getElementById(this.dataset["domID"]);
        var myChart = echarts.init(chartDom);
        console.log(this.dataset);
        this.option.series.at(0).data = this.dataset["yAxis"];

        this.option.xAxis.data = this.dataset["xAxis"];
        this.option && myChart.setOption(this.option);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
