<template>
  <main>
    <img :src="'data:image/png;base64,'+imgurl" alt="">
  </main>
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
      imgurl:'',
    };
  },
  props: {},
  mounted() {
    // service.get("showPhoto").then(
    //   (response) => {
    //     console.log("///////",response.data)
    //     this.imgurl = response.data
    //   }
    // )
    service.get("clustering").then(
      (response) => {
        console.log("///////",response.data)
        this.imgurl = response.data
      }
    )
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
