<template>
  <v-md-preview :text="report"></v-md-preview>
  <main>
    <Echarts :dataset="echarts_dataset" :models="echarts_models"></Echarts>
  </main>
</template>

<script>
import Echarts from "./Echarts.vue";

export default {
  data() {
    return {
      report: "",
      echarts_model: "",
      echarts_dataset: "",
    };
  },
  components: { Echarts },
  props: ["data"],
  created() {
    console.log(typeof this.$route.params.data);
    var list = decodeURIComponent(this.$route.params.data);
    var data = JSON.parse(list);
    this.echarts_dataset = data["echarts_dataset"];
    this.echarts_models = data["echarts_models"];
    
    this.report = `
## Prophet模型报告

对于prophet模型，在模型训练阶段，我们提供了三个可调的参数
n_changepoints ：调节数据尖峰的数量的参数，我们可以大致看成数据转折点的数量，当尖峰数量较多时，可以调大n_changepoints的值，达到更好的拟合效果
changepoint_prior_scale ：调节尖峰拟合效果的参数，当有的尖峰比较突兀时（即趋势变化较大时），为了达到更好的效果，可以调大changepoint_prior_scale的数值，达到更好的拟合效果，但注意过拟合问题
seasonality_prior_scale =：调节周期性权重的参数，当数据比较平滑并且有较强的周期性规律时，我们可以调大seasonality_prior_scale的值，使得周期性趋势在训练阶段占更大的权重

对于prophet模型，在模型预测阶段，我们提供了一个可调的参数
目前我们将预测分为两大部分，预测结果为数据的趋势性及周期性的求和
趋势性的计算公式为:

$$
g(t)= (k+\\alpha (t)\\delta )\\cdot t+(m+\\alpha (t)^{T}\\gamma  )
$$


周期性的计算公式为：

$$
s(t)=\\sum_{n=1}^{N}(a_{n}cos(\\frac{2\\pi nt}{P} )+b_{n}sin(\\frac{2\\pi nt}{P} )  )
$$


当模型的拟合预测效果不佳时，若想使得模型效果变优，可以调节参数k，此时模型不再重新训练，而是根据用户输入的k值直接计算预测结果，k值只可微调

对于数据样本：数据样本名
模型训练阶段的调参得到预想的三个参数值为：
n_changepoints = ${data['n_changepoints']}
changepoint_prior_scale=${data['changepoint_prior_scale']}
seasonality_prior_scale =${data['seasonality_prior_scale']}

模型学习到的趋势k值为
K=${data["k"]}
调节后的趋势k值为：
K=${data["k"]}

拟合误差值为（拟合误差为预测值/实际值的平均）：
拟合误差 = 0.1

模型拟合及预测效果图示：  
效果图

    `;
  },
};
</script>
