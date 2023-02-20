<template>
  <div v-if="currentUser.role_id == 1">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Admin Overview</h5>
          </div>
          <div class="card-body">
            <div class="dashboard_main_top">
              <div class="row">
                <div class="col-lg-4">
                  <div class="dashboard_top_boxed">
                    <div class="dashboard_top_icon">
                      <font-awesome-icon icon="plane" class="services-icon"/>
                    </div>
                    <div class="dashboard_top_text">
                      <h3>Tour Agents Not Verified</h3>
                      <h1>{{ getAgentNotVerifiedData.length }}</h1>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="dashboard_top_boxed">
                    <div class="dashboard_top_icon">
                      <font-awesome-icon icon="compass" class="services-icon"/>
                    </div>
                    <div class="dashboard_top_text">
                      <h3>Total Registered Tour Guide</h3>
                      <h1>{{ indexGuideData.length }}</h1>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="dashboard_top_boxed">
                    <div class="dashboard_top_icon">
                      <font-awesome-icon icon="credit-card-alt" class="services-icon"/>
                    </div>
                    <div class="dashboard_top_text">
                      <h3>Total Transaction</h3>
                      <h1>{{ indexOrderData.length }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="currentUser.role_id == 2">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Agent Overview</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-4">
                <div class="dashboard_top_boxed">
                  <div class="dashboard_top_icon">
                    <font-awesome-icon icon="compass" class="services-icon"/>
                  </div>
                  <div class="dashboard_top_text">
                    <h3>Tour Guides Not Verified</h3>
                    <h1>{{ getGuideNotVerifiedData.length }}</h1>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="dashboard_top_boxed">
                  <div class="dashboard_top_icon">
                    <font-awesome-icon icon="plane" class="services-icon"/>
                  </div>
                  <div class="dashboard_top_text">
                    <h3>Total Tour Packages</h3>
                    <h1>{{ indexTourAgentData.length }}</h1>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="dashboard_top_boxed">
                  <div class="dashboard_top_icon">
                    <font-awesome-icon icon="credit-card-alt" class="services-icon"/>
                  </div>
                  <div class="dashboard_top_text">
                    <h3>Payment Awaiting Approval</h3>
                    <h1>{{ getUnverifiedByIdAgentData.length }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="currentUser.role_id == 3">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Guide Overview</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-6">
                <div class="dashboard_top_boxed">
                  <div class="dashboard_top_icon">
                    <font-awesome-icon icon="check" class="services-icon"/>
                  </div>
                  <div class="dashboard_top_text">
                    <h3>Job Awaiting Approval</h3>
                    <h1>{{ getAllByIdGuideWaitingData.length }}</h1>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="dashboard_top_boxed">
                  <div class="dashboard_top_icon">
                    <font-awesome-icon icon="credit-card-alt" class="services-icon"/>
                  </div>
                  <div class="dashboard_top_text">
                    <h3>Total Job Taken</h3>
                    <h1>{{ getAllByIdGuideChoosenData.length }}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardService from "../../services/dashboard.service";
export default {
  name: "DashboardHome",
  components: {

  },
  data(){
    return {
      getAgentNotVerifiedData: [],
      indexGuideData: [],
      indexOrderData: [],

      getGuideNotVerifiedData: [],
      indexTourAgentData: [],
      getUnverifiedByIdAgentData: [],

      getAllByIdGuideChoosenData: [],
      getAllByIdGuideWaitingData: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      if(this.currentUser.role_id == 1){
        Promise.all([
          DashboardService.getAgentNotVerified(),
          DashboardService.indexGuide(),
          DashboardService.indexOrder()
        ]).then((response) => {
          const [agent, guide, order] = response
          if(agent.data.data){
            this.getAgentNotVerifiedData = agent.data.data
          }
          if(guide.data.data){
            this.indexGuideData = guide.data.data
          }
          if(order.data.data){
            this.indexOrderData = order.data.data
          }
        })
      }else if(this.currentUser.role_id == 2){
        Promise.all([
          DashboardService.getGuideNotVerified(),
          DashboardService.indexTourAgent(),
          DashboardService.getUnverifiedByIdAgent()
        ]).then((response) => {
          const [guide, tourpackage, order] = response
          if(guide.data.data){
            this.getGuideNotVerifiedData = guide.data.data
          }
          if(tourpackage.data.data){
            this.indexTourAgentData = tourpackage.data.data
          }
          if(order.data.data){
            this.getUnverifiedByIdAgentData = order.data.data
          }
        })
      }else if(this.currentUser.role_id == 3){
        Promise.all([
          DashboardService.getAllByIdGuideChoosen(),
          DashboardService.getAllByIdGuideWaiting(),
        ]).then((response) => {
          const [choosen, waiting] = response
          if(choosen.data.data){
            this.getAllByIdGuideChoosenData = choosen.data.data
          }
          if(waiting.data.data){
            this.getAllByIdGuideWaitingData = waiting.data.data
          }
        })
      }
    },
  }
};
</script>

<style></style>