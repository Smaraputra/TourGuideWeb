<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="height: 7vh;">
    <div class="container-fluid">
      <button type="button" id="sidebarCollapse" class="btn btn-primary color-main" @click="hideSidebar">
        <font-awesome-icon icon="align-justify" />
        <span> Toggle Sidebar</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    hideSidebar(){
      console.log("Close");
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #fff;
  border: none;
  border-radius: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
</style>