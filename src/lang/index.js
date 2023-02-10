import { createI18n } from 'vue-i18n'
// 引入element ui国际化文件
import localeEn from './en'
import localeZh from './zh'
import { getStorage } from '@/utils/storage'
//Vue.use(VueI18n)
const messages = {
  en: {
    ...localeEn,
  },
  zh: {
    ...localeZh,
  },
}
const i18n = createI18n({
  legacy: false, // 使用CompotitionAPI必须添加这条.
  locale: getStorage("language") || "zh", // 默认语言
  messages
})

export default i18n
