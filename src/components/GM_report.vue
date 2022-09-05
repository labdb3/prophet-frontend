<template>
  <v-md-preview :text="report"></v-md-preview>
  <v-md-preview :text="report2"></v-md-preview>
  <v-md-preview :text="report3"></v-md-preview>
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
      report2:"",
      report3:"",
      echarts_dataset: "",
      echarts_models: "",
    };
  },
  components: { Echarts },
  props: ["data"],
  created() {
    console.log("data", this.$route.params.data);
    var list = decodeURIComponent(this.$route.params.data);
    let data = JSON.parse(list);
    this.echarts_dataset = data["echarts_dataset"];
    this.echarts_models = data["echarts_models"];
      this.report = `
# 灰度模型综述

## Hubbert 模型简要介绍

首先，我们使用Hubbert模型来拟合和预测石油产量，Hubbert模型的计算公式如下：

$$
N = \\frac{2N_m}{1 + \\cosh[b(t-t_m)]}
$$

其中，$t$ 是年份， $N_m ,T_m ,b$ 是我们需要利用灰度模型拟合和预测的数。

## 本任务中灰度模型介绍与参数解释

为了得到石油产量的拟合和预测结果，我们需要得到每个旋回中的三个参数值，而三个参 数值的拟合与预测依赖于灰度模型。
首先，先简要介绍一下灰度模型是如何拟合和预测这三个参数的：
在本案例中，Nm 和b的拟合和预测应采用GM（1,3）模型——1是微分方程阶数，3为变量数（其中1个主变量，2个相关变量）。，而Tm的拟合和预测直接采用GM（1，1）时效果更好。下面着重介绍GM（1，3）模型。GM（1，1）只需要进行降阶即可。
累加生成操作(Accumulated generating operation, AGO)是灰度预测理论中最重要的操作，其目的是为了降低序列的随机性。1-AGO的操作如下：
设非负原始序列为：

$$
X^0 = \\{X^0(1), X^0(2),...,X^0(n)\\}
$$

1-AGO 操作后，结果如下:

$$
X^1 =\\{X^1(1),X^1(2),...,X^1(n) \\}
$$

而

$$
X^1(i) = \\sum_{j = 1}^i X^0(j)
$$



$$
X^1(i) = \\sum_{j = 1}^i X^0(j)
$$



$X_1^0$ 、$X_2^0$、$X_3^0$ ,根据上面的1-AGO操作，生成

$X_1^1$、$X_2^1$、$X_3^1$

列出灰度微分方程如下：

$$
\\frac{\\text{d}X_1^1(rp+t)}{\\text{d}t} +b_1X_1^1(rp+t) = b_2X_2^1(t) + b_3X_3^1(t)
$$

将微分方程进行移项，

$X_1^1(rp+t+1) 和 X_1^1(rp+t)$ 的平均值，改写为矩阵乘法形式，

有：
$$
\\begin{bmatrix}
 X_1^0(2)&X_1^0(3)&\\cdots&X_1^0(r)
\\end{bmatrix}^T = \\begin{bmatrix}
 -0.5*(X_1^1(rp+1) + X_1^1(rp+2))&X_2^1(2)&X_3^1(2)\\\\-0.5*(X_1^1(rp+2) + X_1^1(rp+3))&X_2^1(3)&X_3^1(3)\\\\ \\vdots & \\vdots & \\vdots
 \\\\ -0.5*(X_1^1(rp+r-1) + X_1^1(rp+r))&X_2^1(r)&X_3^1(r)
\\end{bmatrix} \\begin{bmatrix}
 b_1&b_2&b_3
\\end{bmatrix}^T
$$
根据最小二乘法，有：

$$
\\begin{bmatrix}
 b_1&b_2&b_3
\\end{bmatrix}^T = (B^TB)^{-1} Y_R
$$

再根据微分方程的解的形式，有：
$$
\\hat{X_1^1(rp+t)} =[ X_1^0(rp+1) - \\frac{1}{b_1}\\sum_{i=2}^{n}b_iX_i^1(t)] * e^{-b_1(t-1)} + \\frac{1}{b_1}\\sum_{i=2}^nb_iX_i^1(t) \\quad t = 2,3,...,r+rf
$$

再对上面的结果进行AGO操作的逆操作，即可得到预测结果。
在模型拟合和预测中，会提供三个可选参数，分别是：
nums: 正整数 峰点左右点的数目（取两边的最大值，默认为1）
peak_rate: 0-1内浮点小数 峰点相比左右临近点最小的增长率（取最大值，默认为0.4）
option: 保留选项，将来用作用户自行划定轮回区间使用 目前只有0这个选项。

      `
    // console.log("data",list,this.songList)
  },
};
</script>
