import { createApp } from 'vue'
import 'amfe-flexible'
import '@/static/styles/common.scss'
import App from './App.vue'
import router from './router'
import i18n from '@/lang';
import { Button, Cell, CellGroup } from 'vant';
import { createPinia } from 'pinia'
import { getStorage } from "@/utils/storage";

const pinia = createPinia()
const app = createApp(App)
//设置多主题
const theme = getStorage('theme') || 'white'
document.body.className = theme

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(Button)
app.use(Cell)
app.use(CellGroup)
app.mount('#app')
