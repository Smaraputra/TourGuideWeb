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
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
                <h2>Tour Destination Details</h2>
                <p class="text-white">See our tour packages destination details.</p>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><span><font-awesome-icon icon="circle"/></span><router-link to="/destinations">Tour Destination</router-link></li>
                  <li><span><font-awesome-icon icon="circle"/></span>Detail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container p-4">
        <div class="card shadow border-0 mt-4">
          <div class="card-body">
            <div v-if="destinations != null">
              <div class="row">
                <div class="col-md-4 mb-2">
                  <img v-if="destinations.image_tourist_destination != null"
                  :src="this.$prefix.imgUrl(destinations.image_tourist_destination)" alt="" class="card-img-top imgTourPackage">
                <img v-else src="../../assets/img/home/image_placeholder.png" alt=""
                  class="card-img-top imgTourPackage">
                </div>
                <div class="col-md-8">
                  <div class="dashboard_common_table">
                    <h3 class="mb-4">{{ destinations.name }}</h3>
                    <p class="text-muted card-text mb-4">{{ destinations.description }}</p>
                    <p class="text-muted card-text"><strong>Latitude : </strong><span>{{ destinations.latitude }}</span></p>
                    <p class="text-muted card-text"><strong>Longitude : </strong><span>{{ destinations.longitude }}</span></p>
                  </div>
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
