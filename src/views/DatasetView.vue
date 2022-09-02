<template>
  <div>数据集导入:</div>
  <p></p>
  <main>
    <Upload></Upload>
  </main>

  <p></p>
  <p></p>
  <div>数据集浏览:</div>
  <p></p>
  <main>
    <SelectVue :options="all_datasets" @getSelectedDataset="selectDataset">
      <button @click="loadData"> 数据集浏览 </button>
    </SelectVue>
  </main>
  <p></p>
  <main>
    <EchartsDataset :dataset="dataset" @changeTag="changeTag"></EchartsDataset>
  </main>
  <main>
    <div>当前数据集标记的集合:</div>
    {{ tagSet }}
  </main>

</template>

<script>
import Upload from '../components/upload.vue'
import SelectVue from '../components/select.vue';
import EchartsVue from '../components/Echarts.vue';
import MutliselectVue from '../components/mutliselect.vue';
import service from '../utils/request';
import EchartsDataset from '../components/EchartsDataset.vue';

export default {
  name: "dataset",
  data() {
    return {
      all_models: [],
      all_datasets: [1],
      selected_models: [],
      selected_dataset: '',
      echarts_dataset: {},
      echarts_models: {},
      dataset: {},
      tagSet: [],
    }
  },
  props: {},
  methods: {
    selectDataset(dataset) {
      this.selected_dataset = dataset
    },
    loadData() {
      console.log("getDataset:", this.selected_dataset)
      service.get("getDataset?dataset=" + this.selected_dataset).then(
        (response) => {
          console.log(response.data)
          this.dataset = response.data
        }
      )
      let _this = this;
      let fun = function () {
        console.log(_this.dataset["name"])
        service.get("getTagData?dataset="+_this.dataset["name"]).then(
        (response) => {
          console.log("tagset",response.data)
          _this.tagSet = response.data
        }
      )
      }
      setTimeout(fun, 1000)
      
    },
    changeTag(obj) {
      service.get("getTagData?dataset="+this.dataset["name"]).then(
        (response) => {
          console.log(response.data)
          this.tagSet = response.data
        }
      )

    }
  },
  mounted() {
    service.get("getAllDatasets").then(
      (response) => {
        this.all_datasets = response.data
        console.log("all datasets:", this.all_datasets)
      }
    )
  },
  components: { Upload, SelectVue, EchartsVue, MutliselectVue, EchartsDataset }
};
</script>

<style lang="scss" scoped>
</style>