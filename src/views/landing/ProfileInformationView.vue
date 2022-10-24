<template>
  <div class="container text-center" style="height: 100vh">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.jwt}}
    </p>
    <p>
      <strong>Name:</strong>
      {{currentUser.name}}
    </p>
    <p>
      <strong>Role:</strong>
      {{currentUser.role_name}}
    </p>
  </div>
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