<template>
  <div>选择数据集:</div>
  <p></p>
  <main>
    <SelectVue :options="all_datasets" @getSelectedDataset="selectDataset"></SelectVue>
  </main>
  <p></p>
  <div>选择模型:</div>
  <p></p>
  <main>
    <MutliselectVue :options="all_models" @getSelectedModels="selectModels"></MutliselectVue>
  </main>
  <p></p>
  <button @click="fitting">拟合结果</button>
  <p></p>
  <p></p>
  <main>
    <EchartsVue :dataset="echarts_dataset" :models="echarts_models"></EchartsVue>
  </main>
</template>

<script>
import Upload from '../components/upload.vue'
import SelectVue from '../components/select.vue';
import EchartsVue from '../components/Echarts.vue';
import MutliselectVue from '../components/mutliselect.vue';
import service from '../utils/request';
export default {
  name: "dataset",
  data() {
    return {
      all_models: [],
      all_datasets: [1],
      select_models: [],
      select_dataset: '',
      echarts_dataset: {},
      echarts_models: {},
    }
  },
  props: {},
  methods: {
    selectModels(models) {
      this.select_models = models
    },
    selectDataset(dataset) {
      this.select_dataset = dataset
    },
    fitting() {
      service.post("getResultOfModel", {
        "models": this.select_models,
        "dataset": this.select_dataset,
      }).then(
        (response) => {
          console.log("############")
          console.log("response:",response.data)
          for (let key in response.data) {
            if (key.indexOf("dataset") == 0) {
              this.echarts_dataset["xAxis"] = response.data.dataset_xAxis
              this.echarts_dataset["yAxis"] = response.data.dataset_yAxis
            } else if(key.indexOf("k")==0){
              this.k = response.data["k"];
            } else {
              this.echarts_models[key] = response.data[key]
            }
          }
          console.log("changed:",this.echarts_dataset,this.echarts_models)
        }
      )
    }
  },
  mounted() {
    service.get("getAllMetaModels").then(
      (response) => {
        this.all_models = response.data
        console.log("all models:", this.all_models)
      }
    )
    service.get("getAllDatasets").then(
      (response) => {
        this.all_datasets = response.data
        console.log("all datasets:", this.all_datasets)
      }
    )
  },
  components: { Upload, SelectVue, EchartsVue, MutliselectVue }
};
</script>

<style lang="scss" scoped>
</style>