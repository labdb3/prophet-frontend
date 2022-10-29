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
    &nbsp;&nbsp; <button @click="deleteData">删除数据集</button>
  </main>
  <p></p>
  <main>
    <EchartsDataset :dataset="dataset"></EchartsDataset>
  </main>
  <main>
    <EchartsDataset :dataset="cumulative_dataset"></EchartsDataset>
  </main>
</template>

<script>
import Upload from '../components/upload.vue'
import SelectVue from '../components/select.vue';
import EchartsVue from '../components/Echarts.vue';
import MutliselectVue from '../components/mutliselect.vue';
import service from '../utils/request';
import EchartsDataset from '../components/EchartsDataset.vue';
import SelectTag from '../components/selectTag.vue'

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
      all_tags: [],
      cur_tag:'',
    }
  },
  props: {},
  methods: {
    selectDataset(dataset) {
      this.selected_dataset = dataset
    },
    selectTag(tag) {
      this.cur_tag = tag;
    },
    deleteData() {
      service.get("deleteData?dataset=" + this.selected_dataset).then(
        (response) => {
          location.reload()
          alert("删除成功!")
        }
      )  
    },
    loadData() {
      console.log("getDataset:", this.selected_dataset)
      service.get("getDataset?dataset=" + this.selected_dataset).then(
        (response) => {
          console.log("?:???",response.data)
          this.dataset = response.data
          this.cumulative_dataset = {
            "xAxis": response.data["xAxis"],
            "yAxis": response.data["cumulative"],
            "domID": "cumulative",
          }
        }
      )
    },
  },
  mounted() {
    service.get("getAllDatasets").then(
      (response) => {
        this.all_datasets = response.data
        console.log("all datasets:", this.all_datasets)
      }
    )
  },
  components: { Upload, SelectVue, EchartsVue, MutliselectVue, EchartsDataset,SelectTag }
};
</script>

<style lang="scss" scoped>
</style>