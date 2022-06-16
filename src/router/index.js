import { createRouter, createWebHistory } from "vue-router";
import DataSetView from "../views/DatasetView.vue";
import ModelViewVue from "../views/ModelView.vue";

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
      path: "/model",
      name: "model",
      component: ModelViewVue
    }
  ],
});

export default router;
