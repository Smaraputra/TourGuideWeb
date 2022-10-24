<template>
  <div class="wrapper">
    <DashboardSideMenu></DashboardSideMenu>
    <div id="content">
      <DashboardNavigationBar></DashboardNavigationBar>
      <div class="p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TourAgentService from "../services/tour-agent.service";
import TourGuideService from "../services/tour-guide.service";
import DashboardSideMenu from "@/components/DashboardSideMenu.vue";
import DashboardNavigationBar from "@/components/DashboardNavigationBar.vue";
export default {
  name: "DashboardView",
  components: {
    DashboardSideMenu,
    DashboardNavigationBar,
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
    if (!this.loggedIn) {
      this.$router.push("/");
    }
    if(this.currentUser.role_id==4){
      this.$router.push("/");
    }
    if(this.currentUser.role_id==1){
      this.$swal.fire('Welcome Admin ' + this.currentUser.name);
    }
    if(this.currentUser.role_id==2){
      TourAgentService.checkTourAgent().then(
        (response) => {
          if(response.data.message==1){
            this.$swal.fire('Welcome Tour Agent ' + this.currentUser.name);
          }else if(response.data.message==2){
            this.$swal.fire(
              'Not Verified',
              'Please wait until your Tour Guide account is verified by admin.',
              'info'
            )
            this.$router.push('/')
          }else if(response.data.message==3){
            this.$swal.fire(
              'Profil Incomplete!',
              'Fill this form to finish creating your Tour Agent account.',
              'info'
            )
            this.$router.push('/register-agent')
          }
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
    if(this.currentUser.role_id==3){
      TourGuideService.checkTourGuide().then(
        (response) => {
          if(response.data.message==1){
            this.$swal.fire('Welcome Tour Guide ' + this.currentUser.name);
          }else if(response.data.message==2){
            this.$swal.fire(
              'Not Active',
              'Your Tour Guide account is not active or not yet verified by Tour Agent.',
              'info'
            )
            this.$router.push('/')
          }else if(response.data.message==3){
            this.$swal.fire(
              'Profil Incomplete!',
              'Fill this form to finish creating your Tour Guide account.',
              'info'
            )
            this.$router.push('/register-guide')
          }
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
}
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

#content {
  width: calc(100% - 250px);
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
}

#content.active {
  width: 100%;
}

@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px;
  }

  #sidebar.active {
    margin-left: 0;
  }

  #content {
    width: 100%;
  }

  #content.active {
    width: calc(100% - 250px);
  }

  #sidebarCollapse span {
    display: none;
  }
}
</style>