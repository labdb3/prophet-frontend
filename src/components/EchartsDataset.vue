<template>
  <div id="dataset" style="height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import service from "../utils/request";

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
        var chartDom = document.getElementById("dataset");
        var myChart = echarts.init(chartDom);
        let tmp_dataset = this.dataset;
        let _this = this;
        myChart.on("click", function (params) {
          alert(params.name);
          console.log(tmp_dataset);
          service
            .get(
              "saveTag?dataset=" + tmp_dataset["name"] + "&year=" + params.name + "&cur_tag=" + _this.cur_tag
            )
            .then((response) => {
              console.log(response);
            });
          let fun = function(){
            _this.$emit('changeTag', tmp_dataset["name"]);
          }
          setTimeout(fun, 1000 )
        });
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
