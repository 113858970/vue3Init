<template>
  <div class="p1">
    home
    <p class="p2">font-size</p>
    <p>
      多语言：{{ $t("pagesIndexRecommend") }}
      <van-button plain type="primary" @click="changeLang"
        >多语言修改</van-button
      >
    </p>
    <p>
      <van-button plain type="primary" @click="changeTheme"
        >多主题修改</van-button
      >
      <span class="color1">修改效果</span>
    </p>
    <van-button type="danger">危险按钮</van-button>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <router-link to="about">about</router-link>
    <br />
    <router-link to="hello">hello</router-link>
    <p @click="patch">修改store</p>
    <p>旧：{{ store.age }} 新:{{ store.getAddAge }}</p>
    <p @click="changeName">通过action修改name:{{ store.name }}</p>
  </div>
</template>
<style lang="scss" scoped>
.p1 {
  .p2 {
    color: red;
    font-size: 30px;
  }
}
</style>
<script>
import { reactive } from "vue";
import i18n from "@/lang";
import { useUsersStore } from "@/store/index";
import { getParamConfigByCode } from "@/apis/api";
import { setStorage, getStorage } from "@/utils/storage";
const { t } = i18n.global;
export default {
  setup() {
    const store = useUsersStore();
    console.log(store.name);
    store.name = "xxxx";
    console.log(store.name);
    getParamConfigByCode();
    const patch = () => {
      store.$state = { counter: 666, name: "张三" };
      //store.aaa = "xxx22";
      console.log(store);
      console.log(store.name, store.counter);
    };
    const changeName = () => {
      store.saveName("aaa");
      console.log(store.name);
    };
    const changeLang = () => {
      let lang = getStorage("language") || "zh";
      setStorage({ name: "language", content: lang == "zh" ? "en" : "zh" });
      window.location.reload();
    };
    const changeTheme = () => {
      let theme = getStorage("theme") || "black";
      setStorage({
        name: "theme",
        content: theme == "black" ? "white" : "black",
      });
      window.location.reload();
    };
    return {
      patch,
      changeName,
      changeLang,
      changeTheme,
      store,
    };
  },
};
</script>