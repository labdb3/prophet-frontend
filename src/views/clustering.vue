<template>
  <div>
    <div>选择聚类数据集:</div>
    <p></p>
    <div>
      <p style="margin-left: 10px">default</p>
      <el-select v-model="dataset" multiple placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in dataset_set"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <p></p>
  </div>
  <div>
    <button @click="clustering">重新计算</button>
    <p></p>
    <p></p>
    <img class="p" src="http://127.0.0.1:8000/static/clustering.webp" />
  </div>
</template>
<script>
import service from "../utils/request";

export default {
  data() {
    return {
      dataset_set: [],
      dataset: ['三个样本.xlsx_样本1', '三个样本.xlsx_样本2', '三个样本.xlsx_样本3', '数据单元.xlsx_1', '数据单元.xlsx_1', '数据单元.xlsx_2',
        '数据单元.xlsx_3', '数据单元.xlsx_4', '数据单元.xlsx_5', '数据单元.xlsx_6', '数据单元.xlsx_7', '数据单元.xlsx_8', '数据单元.xlsx_9',
      '数据单元.xlsx_10','数据单元.xlsx_11','数据单元.xlsx_12','数据单元.xlsx_13','数据单元.xlsx_14','数据单元.xlsx_15',],
    };
  },
  methods: {
    clustering() {
      window.alert("大约需要几分钟才可以看到结果的更新");
      service.post("clustering",{
          "name":this.dataset,
        }
      ).then(response => {
        window.alert("结果已更新，请刷新页面")
      })
    },
  },
  mounted() {
    service.get("getAllDatasets").then((response) => {
      this.dataset_set = response.data;
      console.log("all datasets:", response.data);
    });
  },
};
</script>
<style>
.p {
  width: 1000px;
}
</style>
