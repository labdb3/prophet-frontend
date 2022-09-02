<template>
  <div>
    <h2 align="center">温室模型调优</h2>
    <div>
      数据集:
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <p></p>
    a(参数1)
    <el-input v-model="a" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>
    b(参数2)
    <el-input v-model="b" style="width: 180px" size="large" placeholder="Please Input" />
    <p></p>
    c(参数3)
    <el-input v-model="c" style="width: 180px" size="large" placeholder="Please Input" />
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
      a: -6.495156943324077,
      b: 6.952106129349494,
      c: -0.3863897712009849,
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
      let obj = {
        "echarts_dataset": this.echarts_dataset,
        "echarts_models": this.echarts_models,
        "a": this.a,
        "b": this.b,
        "c": this.c,
      }
      var arr=JSON.stringify(obj)
      this.$router.push('/wensi_report/'+encodeURIComponent(arr))
    },
    fitting() {
      service
        .post("getResultWithParams", {
          model: "wensi",
          dataset: this.value,
          params: {
            a: parseFloat(this.a),
            b: parseFloat(this.b),
            c: parseFloat(this.c),
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
            model: "wensi",
            dataset: this.value,
            params: {
              a: parseFloat(this.a),
              b: parseFloat(this.b),
              c: parseFloat(this.c),
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
          model:"wensi",
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
    service.get("getSavedModels?model=wensi").then((response) => {
      console.log(response.data);
      this.savedModels = response.data;
    });
  },
  components: { Echarts, EchartsLoadModel },
};
</script>

<style lang="scss" scoped></style>
