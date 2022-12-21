<template>
  <div v-if="currentUser.role_id == 1">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow">
          <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold text-primary">Admin Overview</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <div class="card text-center">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Agent Awaiting Verification</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Tour Agent</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Tour Guide</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Consumer</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
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
            <h5 class="m-0 font-weight-bold text-primary">Tour Agent Overview</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Guide Awaiting Verification</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Tour Guide</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Packages</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Consumer</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
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
            <h5 class="m-0 font-weight-bold text-primary">Tour Guide Overview</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Job Awaiting Confirmation</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card text-center mb-4">
                  <div class="card-header p-3">
                    <h5 class="m-0 font-weight-bold text-primary">Total Job Taken</h5>
                  </div>
                  <div class="card-body">
                    <h3>Not Implemented Yet.</h3>
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
export default {
  name: "DashboardHome",
  components: {

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

  },
};
</script>

<style>

</style>