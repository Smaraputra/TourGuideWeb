<template>
  <NavigationBar ></NavigationBar>
  <router-view/>
  <MyFooter ></MyFooter>
</template>
<!-- v-if="($route.name !== 'login') &&  ($route.name !== 'register')" -->
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
  .color-main-background {
    background-color: #184fa7;
  }
</style>
