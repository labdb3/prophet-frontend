import { createRouter, createWebHistory } from "vue-router";
import ProphetVue from "../components/Prophet.vue";
import DataSetView from "../views/DatasetView.vue";
import ModelShowVue from "../views/ModelShow.vue";
import ModelViewVue from "../views/ModelView.vue";
import wensiVue from "../components/wensi.vue";
import GMVue from "../components/GM.vue"
import prophet_report from "../components/prophet_report.vue"
import wensi_report from "../components/wensi_report.vue"
import gm_report from "../components/GM_report.vue"
import preprocess from "../views/preprocess.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: DataSetView
    },
    {
      path: "/dataset",
      name: "dataset",
      component: DataSetView
    },
    {
      path: "/preprocess",
      name: "preprocess",
      component:preprocess
    },
    {
      path: "/model",
      name: "model",
      component: ModelViewVue
    },
    {
      path: "/modelShow",
      name: "modelShow",
      component: ModelShowVue
    },
    {
      path: "/prophet",
      name: "prophet",
      component: ProphetVue
    },
    {
      path: "/wensi",
      name: "wensi",
      component: wensiVue
    }, 
    {
      path: "/GM",
      name: "GM",
      component:GMVue
    },
    {
      path: "/prophet_report/:data",
      name: "prophet_report",
      component: prophet_report,
      props: true,
    },
    {
      path: "/wensi_report/:data",
      name: "wensi_report",
      component: wensi_report,
      props: true,
    },
    {
      path: "/gm_report/:data",
      name: "gm_report",
      component: gm_report,
      props: true,
    }
  ],
});

export default router;
