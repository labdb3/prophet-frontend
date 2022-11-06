<template>
  <p></p>
  <div>数据集浏览:</div>
  <p></p>
  <main>
    <SelectVue :options="all_datasets" @getSelectedDataset="selectDataset">
      <button @click="loadData"> 数据集浏览 </button>
    </SelectVue>
    &nbsp;&nbsp; <button @click="loadFitting">加载拟合累加曲线</button>
  </main>
  <p></p>
  <main>
  <img :src="fitting" id="photo" alt=""/>
  </main>
  <main>
    <EchartsDataset :dataset="dataset"></EchartsDataset>
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
      fitting:'',
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
    loadFitting() {
      
      service.get("getSumFitting?dataset="+this.selected_dataset).then(
        (response) => {
        console.log("????",response.data)
          this.fitting = 'data:image/png;base64,' + response.data;
          //document.getElementById('photo').src = 'data:image/png;base64,' + this.imgurl;
          $('#photo').attr('src','data:image/png;base64,' + this.fitting);
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
  components: { Upload, SelectVue, EchartsVue, MutliselectVue, EchartsDataset,SelectTag }
};
</script>

<style lang="scss" scoped>
</style>