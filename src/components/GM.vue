<template>
  <div>
    <h2 align="center">灰度预测模型调优</h2>
    <div>
      数据集:
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <p></p>
    nums: 峰点左右点的数目（取两边的最大值，默认为1）
    <el-input v-model="nums" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>
    peak_rate: 峰点相比左右临近点最小的增长率（取最大值，默认为0.4）
    <el-input v-model="peak_rate" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>
    option: 保留选项，将来用作用户自行划定轮回区间使用
    <el-input v-model="option" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>
    预测年数:
    <el-input v-model="years" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>

    <div>
      <button @click="fitting">拟合结果</button>&nbsp;&nbsp;
      <button @click="save">保存当前模型及参数</button>
    </div>
  </div>
  <br>
  <br>
  <main>
    <Echarts :dataset="echarts_dataset" :models="echarts_models"></Echarts>
  </main>
  <p></p>
  <p></p>
  <div>
    <button @click="download">下载数据</button>&nbsp;&nbsp;
    <button @click="gotoProphetReport">查看生成的报告</button>
  </div>
   <p></p>
  <hr size="1" noshade="noshade" style="border:1px #cccccc dotted;">
  <h2 align="center">查看已保存模型</h2>
  <br>
  <br>
  <div>
    已保存的模型:
    <el-select v-model="curModel" class="m-2" placeholder="Select" size="large">
      <el-option v-for="item in savedModels" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>&nbsp;&nbsp; 预测年数:
    <el-input v-model="years" style="width: 180px" size="large" placeholder="Please Input" />&nbsp;&nbsp;
    <button @click="loadModel">加载模型</button>
  </div>
  <main>
    <EchartsLoadModel :dataset="loadModel_echarts_dataset" :models="loadModel_echarts_models"></EchartsLoadModel>
  </main>
</template>

<script>
import service from "../utils/request";
import Echarts from "./Echarts.vue";
import EchartsLoadModel from "./EchartsLoadModel.vue";

export default {
  name: "wensi",
  created() {},
  data() {
    return {
      value: "",
      options: [],
      nums:1,
      peak_rate: 0.4,
      option: 0,
      years: 5,
      echarts_dataset: {},
      echarts_models: {},
      savedModels: [],
      curModel: "",
      loadModel_echarts_dataset: {},
      loadModel_echarts_models: {},
    };
  },
  props: {},
  methods: {
    download() {
      
    },
    gotoProphetReport() {
      // 跳转路由传递对象参数
      var arr=JSON.stringify({name:"aaaa"})
      this.$router.push('/gm_report/'+encodeURIComponent(arr))
    },
    fitting() {
      service
        .post("getResultWithParams", {
          model: "GM",
          dataset: this.value,
          params: {
            nums: parseFloat(this.nums),
            peak_rate: parseFloat(this.peak_rate),
            option: parseFloat(this.option),
            years: parseInt(this.years),
          },
        })
        .then((response) => {
          console.log("response",response.data);
          for (let key in response.data) {
            if (key.indexOf("dataset") == 0) {
              this.echarts_dataset["xAxis"] = response.data.dataset_xAxis;
              this.echarts_dataset["yAxis"] = response.data.dataset_yAxis;
            } else {
              this.echarts_models[key] = response.data[key];
            }
          }
          console.log("changed:", this.echarts_dataset, this.echarts_models);
        });
    },
    save() {
      var name = prompt("保存模型的名字:");

      if (name != "" && name !=null ) {
        console.log("保存模型成功")
        service.post("saveModel", {
            model: "GM",
            dataset: this.value,
            params: {
              nums: parseFloat(this.nums),
            peak_rate: parseFloat(this.peak_rate),
            option: parseFloat(this.option),
              name: name,
            },
          })
          .then((response) => {
            alert("保存成功");
          });
      }
    },
    loadModel() {
      service
        .post("loadModel", {
          model:"GM",
          name: this.curModel,
          years: parseInt(this.years),
        })
        .then((response) => {
          console.log("response",response.data);
          for (let key in response.data) {
            if (key.indexOf("dataset") == 0) {
              this.loadModel_echarts_dataset["xAxis"] =
                response.data.dataset_xAxis;
              this.loadModel_echarts_dataset["yAxis"] =
                response.data.dataset_yAxis;
            } else {
              this.loadModel_echarts_models[key] = response.data[key];
            }
          }
          console.log("changed:", this.echarts_dataset, this.echarts_models);
        });
    },
  },
  mounted() {
    service.get("getAllDatasets").then((response) => {
      this.options = response.data;
      console.log("all datasets:", this.all_datasets);
    });
    service.get("getSavedModels?model=GM").then((response) => {
      console.log(response.data);
      this.savedModels = response.data;
    });
  },
  components: { Echarts, EchartsLoadModel },
};
</script>

<style lang="scss" scoped></style>
