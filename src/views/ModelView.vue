<template>
  <p></p>
  <main>
    选择保存的prophet模型:&nbsp;&nbsp;
    <el-select v-model="select_model_1" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in all_models_1" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </main>
  <main>
    选择保存的翁氏模型:&nbsp;&nbsp;
    <el-select v-model="select_model_2" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in all_models_2" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </main>
  <main>
    选择保存的灰度预测模型:&nbsp;&nbsp;
    <el-select v-model="select_model_3" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in all_models_3" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </main>
  <main>
    选择数据集:&nbsp;&nbsp;
    <SelectVue :options="all_datasets" @getSelectedDataset="selectDataset"> </SelectVue>
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
import Upload from "../components/upload.vue";
import SelectVue from "../components/select.vue";
import service from "../utils/request";
import EchartsLoadModel_mutli from "../components/EchartsLoadModel_mutli.vue";

export default {
  name: "dataset",
  data() {
    return {
      all_datasets: [],
      selected_dataset: "",
      select_model_1: "",
      select_model_2: "",
      select_model_3: "",
      all_models_1: [],
      all_models_2: [],
      all_models_3: [],
      echarts_models: {},
      years: 5,
    };
  },
  props: {},
  methods: {
    selectDataset(dataset) {
      this.selected_dataset = dataset;
      this.select_model_1 = '';
      this.select_model_2 = '';
      this.select_model_3 = '';
      service.get("getSavedModels?model=灰度预测&dataset="+this.selected_dataset).then((response) => {
        console.log(response.data);
        this.all_models_3 = response.data;
      });
      service.get("getSavedModels?model=prophet&dataset="+this.selected_dataset).then((response) => {
        console.log(response.data);
        this.all_models_1 = response.data;
      });
      service.get("getSavedModels?model=翁氏模型&dataset="+this.selected_dataset).then((response) => {
        console.log(response.data);
        this.all_models_2 = response.data;
      });
    },
    fitting() {
      console.log(
        "prophet:",
        this.select_model_1,
        this.select_model_2,
        this.select_model_3
      );
      service
        .post("loadModel_multi", {
          models: {
            prophet: [this.select_model_1],
            灰度预测: [this.select_model_3],
            翁氏模型: [this.select_model_2],
          },
          years: parseInt(this.years),
        })
        .then((response) => {
          this.echarts_models = response.data;
        });
    },
  },
  mounted() {
    service.get("getAllDatasets").then((response) => {
      this.all_datasets = response.data;
      console.log("all datasets:", this.all_datasets);
    });
  },
  components: { Upload, SelectVue, EchartsLoadModel_mutli },
};
</script>

<style lang="scss" scoped></style>
