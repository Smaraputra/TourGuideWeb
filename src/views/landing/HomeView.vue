<template>
  <!-- Carousel-->
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
      <section class="">
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleInterval" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
              <img src="../../assets/image/home/image-slider-1.jpg" class=""
                style="width: 100%; height: 80vh; min-height: 350px; object-fit: cover; object-position: 100% 0;"
                alt="slider1">
              <div class="carousel-caption d-none d-md-block">
                <h5>Explore The World</h5>
                <p>Find & Get Tour Packages as Customer.</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src="../../assets/image/home/image-slider-2.jpg" class=""
                style="width: 100%; height: 80vh; min-height: 350px; object-fit: cover; object-position: 100% 0;"
                alt="slider2">
              <div class="carousel-caption d-none d-md-block">
                <h5>Increase Customer Affection</h5>
                <p>Provide Your Own Tour Packages as Tour Agent</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src="../../assets/image/home/image-slider-3.jpg" class=""
                style="width: 100%; height: 80vh; min-height: 350px; object-fit: cover; object-position: 100% 0;"
                alt="slider3">
              <div class="carousel-caption d-none d-md-block">
                <h5>Become The Guide!</h5>
                <p>Provide Guide Services as Tour Guide</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section class="p-4">
        <div class="container">
          <div class="text-center">
            <h2>Services</h2>
            <p class="text-muted mb-5">These are our top feature and services for customers, tour agents, and tour
              guides.
            </p>
          </div>
          <div class="row">
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <font-awesome-icon icon="credit-card-alt" class="services-icon" />
              <h6>Find & Get Tour Packages as Customer</h6>
              <p class="text-muted">Find the best tour packages available on the system.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <font-awesome-icon icon="plane" class="services-icon" />
              <h6>Provide Your Own Tour Packages as Tour Agent</h6>
              <p class="text-muted">Provide and sell your tour packages on the system.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <font-awesome-icon icon="compass" class="services-icon" />
              <h6>Provide Guide Services as Tour Guide</h6>
              <p class="text-muted">Sell your guiding services as a tour guide on the system.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light p-4">
        <div class="container">
          <div class="text-center">
            <h2>Best Tour Packages</h2>
            <p class="lead text-muted mb-4">See the best tour packages provided based on the user rating.</p>
          </div>
          <div class="row">
            <div class="col-md-4 mb-4" v-for="(pack, index) in packages" :key="index">
              <div class="card shadow border-0 h-100">
                <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
                <img v-else src="../../assets/image/home/image_placeholder.png" class="card-img-top rounded img" alt="">
                <div class="card-body">
                  <h5 class="text-dark">{{ pack.package_name }}</h5>
                  <span v-if="pack.rating">
                    <font-awesome-icon icon="star" /> {{ pack.rating }}
                  </span>
                  <span v-else>
                    <font-awesome-icon icon="star" /> No rating yet
                  </span>
                  <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null" :max-chars="250">
                  </read-more>
                  <!-- <p class="text-muted card-text mt-2">{{ pack.description }}</p> -->
                  <router-link
                    :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                    <button class="btn btn-primary btn-block color-main-background">
                      <font-awesome-icon icon="eye" /><span> See more</span>
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="p-4">
        <div class="container">
          <div class="text-center">
            <h2>Top Guides</h2>
            <p class="text-muted mb-5">Get to know our tour guides. These are our top tour guides.</p>
          </div>
          <div class="row">
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img v-if="guides[0].users.photo" :src="guides[0].users.photo" class="guide-photo" alt="">
              <img v-else src="../../assets/image/home/image_placeholder.png" class="guide-photo" alt="">
              <h6>{{ guides[0].users.name }}</h6>
              <p class="text-muted">{{ guides[0].description }}</p>
            </div>

            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img v-if="guides[1].users.photo" :src="guides[1].users.photo" class="guide-photo" alt="">
              <img v-else src="../../assets/image/home/image_placeholder.png" class="guide-photo" alt="">
              <h6>{{ guides[1].users.name }}</h6>
              <p class="text-muted">{{ guides[1].description }}</p>
            </div>

            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img v-if="guides[2].users.photo" :src="guides[2].users.photo" class="guide-photo" alt="">
              <img v-else src="../../assets/image/home/image_placeholder.png" class="guide-photo" alt="">
              <h6>{{ guides[2].users.name }}</h6>
              <p class="text-muted">{{ guides[2].description }}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light p-4">
        <div class="container">
          <div class="text-center">
            <h2>See Tour Destinations on Map</h2>
            <p class="lead text-muted mb-4">See the our tour destinations that is available.</p>
          </div>
          <div class="card-body">
            <GMapMap :center="center" :zoom="9" map-type-id="terrain" style="width: 100%; height: 600px"
              v-if="markers != null && markers.length">
              <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                :draggable="false" @click="openMarker(m.id)">
                <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id">
                  <div>
                    <h6>{{ destName }}</h6>
                    <button class="btn btn-primary color-main-background"><span>
                      <font-awesome-icon icon="eye" />
                    </span> See More</button>
                  </div>
                </GMapInfoWindow>
              </GMapMarker>
            </GMapMap>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script>
import TourDestinationService from "../../services/tour-destination.service";
import TourPackageService from "../../services/tour-package.service";
import TourGuideService from "../../services/tour-guide.service";
export default {
  name: "HomeView",
  components: {

  },
  data() {
    return {
      packages: [],
      guides: [],
      statusLoad: false,

      openedMarkerID: null,
      destName: null,
      searcname: null,
      destinations: [],
      center: { lat: -8.409518, lng: 115.188919 },
      markers: [],
      package_name: null
    };
  },
  computed: {

  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      Promise.all([
        TourPackageService.getTopSix(),
        TourGuideService.getTopThree(),
        TourDestinationService.getAll()
      ]).then((response) => {
        this.statusLoad = true
        const [pack, guide, dest] = response
        if(pack.data.data){
          this.packages = pack.data.data
        }
        if(guide.data.data){
          this.guides = guide.data.data
        }
        if(dest.data.data){
          this.destinations = dest.data.data
          this.markers = []
          this.loadMarkerData()
        }
      })
    },
    loadMarkerData() {
      this.destinations.forEach(dest => {
        const post = {
          lat: dest.latitude,
          lng: dest.longitude
        }
        const mark = {
          id: dest.id_tourist_destinations,
          position: post,
        }
        this.markers.push(mark);
      });
    },
    openMarker(id) {
      this.openedMarkerID = id
      this.destinations.forEach(dest => {
        if (dest.id_tourist_destinations == id) {
          this.destName = dest.name
        }
      });
    },
  },
  mounted() {

  },
};
</script>

<style scoped>

</style>