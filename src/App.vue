<template>
  <router-view/>
</template>
<script>
import axios from "axios";
import urlHost from "@/services/url-host";
const URL_HOST = urlHost()
export default {
  name: "App",
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    this.checkData()
  },
  methods:{
    checkData(){
      axios.get(URL_HOST + '/sanctum/csrf-cookie').then(
      () => {

      })
      .catch(() => {
        alert('Please relog your account.')
      })
      
      axios.interceptors.request.use(
        config => {
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
      
      axios.interceptors.response.use(
        response => {
          return response
        },
        error => {
          console.log(error)
          if (error.response.status === 401) {
            this.$store.dispatch('logoutExpired').then(
              () => {
                this.$router.push("/login");
              },
            );
          }
      
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>

<style>

</style>
