<template>
  <NavigationBar ></NavigationBar>
  <router-view></router-view>
  <MyFooter ></MyFooter>
</template>

<style>

</style>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import MyFooter from "@/components/MyFooter.vue";
export default {
  name: "MainView",
  components: {
    NavigationBar,
    MyFooter,
  },
  data() {
    return {
      packages: [],
    };
  },
  computed: {

  },
  mounted() {
    
  },
};
</script>
