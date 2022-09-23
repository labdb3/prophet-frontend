<template>
  <p></p>
  <main>
    选择保存的prophet模型:&nbsp;&nbsp;
    <selectVue :options="all_models_1" @getSelectedDataset="selectModels_1"></selectVue>
  </main>
  <main>
  选择保存的翁氏模型:&nbsp;&nbsp;
    <selectVue :options="all_models_2" @getSelectedDataset="selectModels_2"></selectVue>
  </main>
  <main>
  选择保存的灰度预测模型:&nbsp;&nbsp;
    <selectVue :options="all_models_3" @getSelectedDataset="selectModels_3"></selectVue>
  </main>
  <p></p>
  <p>
  预测年数: &nbsp;&nbsp;
    <el-input
      v-model="years"
      style="width: 180px"
      size="large"
      placeholder="Please Input"
    />
  </p>
  <button @click="fitting">拟合结果</button>
  <p></p>
  <p></p>
  <main>
    <EchartsLoadModel_mutli :models="echarts_models"></EchartsLoadModel_mutli>
  </main>
</template>

<script>
import Upload from '../components/upload.vue'
import SelectVue from '../components/select.vue';
import service from '../utils/request';
import EchartsLoadModel_mutli from "../components/EchartsLoadModel_mutli.vue"

export default {
  name: "dataset",
  data() {
    return {
      select_model_1: '',
      select_model_2: '',
      select_model_3: '',
      all_models_1: [],
      all_models_2: [],
      all_models_3:[],
      echarts_models: {},
      years:5,
    }
  },
  props: {},
  methods: {
    selectModels_1(models) {
      this.select_model_1 = models
    },
    selectModels_2(models) {
      this.select_model_2 = models
    },
    selectModels_3(models) {
      this.select_model_3 = models
    },
    fitting() {
      service.post("loadModel_multi", {
        "models": {
          "prophet": [this.select_model_1],
          "灰度预测": [this.select_model_3],
          "翁氏模型":[this.select_model_2],
        },
        "years":this.years,
      }).then(
        (response) => {
          this.echarts_models = response.data
        }
      )
    }
  },
  mounted() {
    service.get("getSavedModels?model=灰度预测").then((response) => {
      console.log(response.data);
      this.all_models_3 = response.data;
    });
    service.get("getSavedModels?model=prophet").then((response) => {
      console.log(response.data);
      this.all_models_1 = response.data;
    });
    service.get("getSavedModels?model=翁氏模型").then((response) => {
      console.log(response.data);
      this.all_models_2 = response.data;
    });
  },
  components: { Upload, SelectVue,  EchartsLoadModel_mutli }
};
</script>

<style lang="scss" scoped>
</style>