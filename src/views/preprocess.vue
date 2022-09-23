<template>
  <p></p>
  <div>现有数据集:</div>
  <p></p>
  <main>
    <SelectVue :options="all_datasets" @getSelectedDataset="selectDataset"> </SelectVue>
    <p></p>
    <div>预处理方法:</div>
    <SelectPreprocess :options="all_methods" @getSelectedMethod="selectMethod"> </SelectPreprocess>
  </main>
  <p></p>
  <p><button @click="getResultOfPreprocess">查看预处理效果</button></p>
  <main>
    <EchartsPreprocess :dataset="echarts_dataset" :preprocess="echarts_preprocess"></EchartsPreprocess>
  </main>
  <p></p>
  <p><button @click="saveDataset">保存成为数据集</button></p>
</template>

<script>
import Upload from "../components/upload.vue";
import SelectVue from "../components/select.vue";
import EchartsVue from "../components/Echarts.vue";
import MutliselectVue from "../components/mutliselect.vue";
import service from "../utils/request";
import EchartsDataset from "../components/EchartsDataset.vue";
import SelectTag from "../components/selectTag.vue";
import SelectPreprocess from "../components/selectPreprocess.vue"
import EchartsPreprocess from "../components/EchartsPreprocess.vue"

export default {
  name: "dataset",
  data() {
    return {
      all_models: [],
      all_datasets: [1],
      selected_models: [],
      selected_dataset: "",
      selected_method:"",
      echarts_dataset: {},
      echarts_models: {},
      echarts_preprocess:{},
      dataset: {},
      tagSet: [],
      all_tags: [],
      cur_tag: "",
      dataset_1: {},
      cur_tag_1: {},
    };
  },
  props: {},
  methods: {
    saveDataset() {
      service.post("saveDataset", {
        "name": this.selected_dataset + "_" + this.selected_method,
        "base_data": this.echarts_dataset,
        "data":this.echarts_preprocess,
      }).then(
        (response) => {
          window.alert("保存成功,文件名为:"+this.selected_dataset + "_" + this.selected_method)
        }
      )
    },
    selectDataset(dataset) {
      this.selected_dataset = dataset;
    },
    selectMethod(method) {
      this.selected_method = method;
    },
    selectTag(tag) {
      this.cur_tag = tag;
    },
    getResultOfPreprocess() {
      service.get("getResultOfPreprocess?dataset=" + this.selected_dataset + "&method=" + this.selected_method).then(
        (response) => {
          console.log("###########")
          console.log(response.data)
          for (let key in response.data) {
            if (key.indexOf("dataset") == 0) {
              this.echarts_dataset["xAxis"] = response.data.dataset_xAxis
              this.echarts_dataset["yAxis"] = response.data.dataset_yAxis
            } else {
              this.echarts_preprocess[key] = response.data[key]
            }
          }
          console.log("************")
          console.log("dataset:", this.echarts_dataset)
          console.log("preprocess:",this.echarts_preprocess)

        }
      )
    },
    loadData() {
      console.log("getDataset:", this.selected_dataset);
      service.get("getDataset?dataset=" + this.selected_dataset).then((response) => {
        console.log(response.data);
        this.dataset = response.data;
      });
      let _this = this;
      let fun = function () {
        console.log(_this.dataset["name"]);
        service
          .get(
            "getTagData?dataset=" + _this.dataset["name"] + "&cur_tag=" + _this.cur_tag
          )
          .then((response) => {
            console.log("tagset", response.data);
            _this.tagSet = response.data;
          });
      };
      setTimeout(fun, 1000);
    },
    changeTag(obj) {
      service
        .get("getTagData?dataset=" + this.dataset["name"] + "&cur_tag=" + _this.cur_tag)
        .then((response) => {
          console.log(response.data);
          this.tagSet = response.data;
        });
    },
  },
  mounted() {
    service.get("getAllDatasets").then((response) => {
      this.all_datasets = response.data;
      console.log("all datasets:", this.all_datasets);
    });
    service.get("getAllPreprocessMethods").then(
      (response) => {
        this.all_methods = response.data
        console.log("all methods:",this.all_methods,response.data)
      })
  },
  components: {
    Upload,
    SelectVue,
    EchartsVue,
    MutliselectVue,
    EchartsDataset,
    SelectTag,
    SelectPreprocess,
    EchartsPreprocess
},
};
</script>

<style lang="scss" scoped></style>
