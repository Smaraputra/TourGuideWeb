<template>
  <NavigationBar ></NavigationBar>
  <router-view/>
  <MyFooter v-if="($route.name !== 'login') &&  ($route.name !== 'register')"></MyFooter>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "HomeView",
  components: {
    NavigationBar,
    MyFooter,
  },
};
</script>

<style>
  .color-main {
    color: #184fa7;
  }
</style>
