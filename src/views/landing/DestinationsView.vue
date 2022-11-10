<template>
  <section class="bg-light">
    <div class="text-center pt-4 pb-2">
      <h2 class="color-main">Tour Destinations</h2>
      <p class="lead text-muted">See our tour packages destination.</p>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46607.41569979358!2d115.31990144532571!3d-8.605876063969824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd21446b81f7d39%3A0x34b39c786c2e54ec!2sBali%20Safari%20%26%20Marine%20Park!5e0!3m2!1sid!2sid!4v1665846133250!5m2!1sid!2sid"
      width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"></iframe>
  </section>
  <section>
    <div class="container">
      <form class="d-flex searchitem"><input class="form-control mt-4" type="search" placeholder="Search"
          aria-label="Search"></form>
      <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="(destination, index) in destinations" :key="index">
          <div class="card shadow border-0 h-100"><img src="../../assets/image/home/bedugul.jpg" alt=""
              class="card-img-top">
            <div class="card-body">
              <h5>{{ destination.name }}</h5>
              <p class="text-muted card-text">{{ destination.description }}</p>
              <p class="btn btn-primary btn-block color-main-background">See more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TourDestinationService from "../../services/tour-destination.service";
export default {
  name: "DestinationsView",
  components: {

  },
  data() {
    return {
      destinations: [],
    };
  },
  computed: {

  },
  created() {
    this.loadTourDestination()
  },
  methods: {
    loadTourDestination() {
      TourDestinationService.getAll().then(
        (response) => {
          this.destinations = response.data.data
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      )
    }
  },
  mounted() {

  },
};
</script>

<style scoped>
.color-main {
  color: #184fa7;
}

.color-main-background {
  background-color: #184fa7;
}
</style>
