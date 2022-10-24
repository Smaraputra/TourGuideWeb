<template>
  <router-view/>
</template>
<script>

</script>

<style>
  .color-main {
    color: #184fa7;
  }

  .color-main-background {
    background-color: #184fa7;
  }

  .gradient-custom-2 {
    background: #fccb90;
    background: -webkit-linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
    background: linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
  }

  @media (min-width: 768px) {
    .gradient-form {
      height: 100% !important;
    }
  }

  @media (min-width: 768px) {
    .gradient-custom-2 {
      border-top-right-radius: .3rem;
      border-bottom-right-radius: .3rem;
    }
  }

  @import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
  body {
    font-family: 'Poppins', sans-serif;
    background: #fff;
  }
</style>
