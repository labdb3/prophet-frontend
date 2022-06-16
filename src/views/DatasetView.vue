<template>
  <div>数据集导入:</div>
  <p></p>
  <main>
    <Upload></Upload>
  </main>

  <p></p>
  <p></p>
  <div>加载数据集:</div>
  <p></p>
  <main>
    <SelectVue :options="all_datasets">
      <button @click="loadData"> 加载数据集 </button>
    </SelectVue>
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
      all_datasets:[1],
      select_models: [],
      select_dataset: '',
      echarts_dataset: {},
      echarts_models:{},
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
        "dataset":this.select_dataset,
      }).then(
        (response) => {
          console.log("response:", response.data.dataset, response.data.model1)
          console.log(response.data)
          for (let key in response.data) {
            if (key.indexOf("dataset") == 0) {
              this.echarts_dataset = response.data.dataset
            } else {
              this.echarts_models[key] = response.data[key]
              }
            }
        }
      )
    }
  },
  mounted() {
    service.get("getAllModels").then(
      (response) => {
        this.all_models = response.data
        console.log("all models:",this.all_models)
      }
    )
    service.get("getAllDatasets").then(
      (response) => {
        this.all_datasets = response.data
        console.log("all datasets:",this.all_datasets)
      }
    )
  },
  components: { Upload, SelectVue, EchartsVue, MutliselectVue }
};
</script>

<style lang="scss" scoped>
</style>