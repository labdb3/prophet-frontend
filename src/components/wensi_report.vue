<template>
  <v-md-preview :text="report"></v-md-preview>
  <main>
    <Echarts :dataset="echarts_dataset" :models="echarts_models"></Echarts>
  </main>
</template>

<script>
import Echarts from "./Echarts.vue";

let a, b, c;
export default {
  data() {
    return {
      report: "",
      echarts_dataset: "",
      echarts_models: "",
    };
  },
    methods: {
        paint() {
        
    }
  },
  components: { Echarts },
  props: ["data"],
  created() {
    console.log("data", this.$route.params.data);
    var list = decodeURIComponent(this.$route.params.data);
    let data = JSON.parse(list);
    a = data["a"];
    b = data["b"];
    c = data["c"];
    this.echarts_dataset = data["echarts_dataset"];
    this.echarts_models = data["echarts_models"];

    console.log(this.echarts_dataset);
    console.log(this.echarts_models);
    this.report = `
## 翁氏模型报告

翁氏模型的计算公式为：

$$
Q=at^{b}e^{-t/c}
$$



我们根据现有的数据的样本拟合出最优的翁氏模型曲线

计算得到的翁氏模型曲线参数为：

a = ${a}

b = ${b}

c = ${c}



得到的拟合和预测曲线图示为：

`;
    // console.log("data",list,this.songList)
  },
};
</script>
