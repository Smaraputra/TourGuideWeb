<template>
  <section class="p-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow">
          <!-- <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Transaction Type</h5>
          </div> -->
          <div class="card-body">
            
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card shadow">
          <!-- <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Transaction Type</h5>
          </div> -->
          <div class="card-body">
            <div class="container text-center" style="height: 100vh">
              <header class="jumbotron">
                <h3>
                  <strong>{{ currentUser.username }}</strong> Profile
                </h3>
              </header>
              <p>
                <strong>Token:</strong>
                {{ currentUser.jwt }}
              </p>
              <p>
                <strong>Name:</strong>
                {{ currentUser.name }}
              </p>
              <p>
                <strong>Role:</strong>
                {{ currentUser.role_name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProfileInformation',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>