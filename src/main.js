import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdPreview.use(vuepressTheme, {
  Prism,
});
VMdPreview.use(createKatexPlugin());
VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createLineNumbertPlugin());

const app = createApp(App)

app.use(ArcoVue);
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VMdPreview)
app.mount('#app')
