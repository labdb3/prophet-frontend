<template>
    <div :id="name" style="height: 400px" v-for="(value, name) in all_models"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            all_models: {
                "model_prophet": "model_prophet",
                "model_翁氏模型": "model_翁氏模型",
                "model_灰度预测":"model_灰度预测",
            },
            option: {
                title: {
                    text: '模型预测结果',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['真实值', '预测值'],
                    top: "8%",
                    x: "right",
                    padding: [0, 50, 0, 0],
                },
                grid: {
                    left: '10%',
                    height: 300,
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: [0, 1, 2, 3, 4, 5, 6]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '真实值',
                        type: 'line',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '预测值',
                        type: 'line',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ]
            },
        };
    },
    props: ['models'],
    methods: {},
    computed: {
        listenChange() {
            return this.models
        }
    },
    watch: {
        // whenever question changes, this function will run
        listenChange: {
            handler(newVal, oldVal) {
                this.$nextTick(() => {
                    console.log("models:", this.models)
                    let arr=["model_prophet","model_翁氏模型","model_灰度预测"]
                    for (let model of arr) {
                        var chartDom = document.getElementById(model);
                        var myChart = echarts.init(chartDom);
                        this.option.title.text = model.split("_")[1] + " " + this.models[model+"_dataset_name"]
                        this.option.xAxis.data = this.models[model+"_dataset_xAxis"]
                        this.option.series.at(0).data = this.models[model+"_dataset_yAxis"]
                        this.option.series.at(1).data = this.models[model]

                        this.option && myChart.setOption(this.option);
                    }
                })
            },
            deep: true
        }
    },

};
</script>

<style lang="scss" scoped>
</style>