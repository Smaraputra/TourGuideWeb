<template>
  <Transition>
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh" v-if="!statusLoad">
      <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div v-else>
      <section class="bg-light">
        <div class="text-center pt-4 pb-2">
          <h2 class="color-main">Tour Destinations</h2>
          <p class="lead text-muted">See tour destinations details.</p>
        </div>
      </section>
      <section class="p-4">
        <div class="row">
          <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <router-link to="/">
                    <strong>Home</strong>
                  </router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/destinations">
                    <strong>Tour Destination</strong>
                  </router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <strong>Detail</strong>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="card shadow border-0 mt-4">
          <div class="card-body">
            <div v-if="destinations != null">
              <div class="row">
                <div class="col-md-4">
                  <img v-if="destinations.image_tourist_destination != null"
                  :src="destinations.image_tourist_destination" alt="" class="card-img-top imgTourPackage">
                <img v-else src="../../assets/image/home/image_placeholder.png" alt=""
                  class="card-img-top imgTourPackage">
                </div>
                <div class="col-md-8">
                  <h5 class="color-main">{{ destinations.name }}</h5>
                  <p class="text-muted card-text">{{ destinations.description }}</p>
                  <p class="text-muted card-text"><strong>Latitude : </strong><span>{{ destinations.latitude }}</span></p>
                  <p class="text-muted card-text"><strong>Longitude : </strong><span>{{ destinations.longitude }}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script>
import TourDestinationService from "../../services/tour-destination.service";
export default {
  name: "DestinationsDetailView",
  components: {

  },
  data() {
    return {
      destinations: null,
      statusLoad: false,
      package_name: null
    };
  },
  computed: {

  },
  created() {
    this.loadTourDestination()
  },
  methods: {
    loadTourDestination() {
      TourDestinationService.getOneById(this.$route.params.id_tourist_destinations).then(
        (response) => {
          this.destinations = response.data
          this.statusLoad = true
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

</style>
