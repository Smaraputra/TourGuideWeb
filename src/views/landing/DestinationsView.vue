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
                <h2>Tour Destinations</h2>
                <p class="text-white">See our tour packages destination.</p>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><span><font-awesome-icon icon="circle"/></span>Tour Destination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container p-4">
        <div class="row">
          <div class="col-md-3 mt-4">
            <div class="card shadow border-0">
              <div class="dashboard_common_table">
                <h3 class="mb-4">Maps</h3>
                <GMapMap :center="center" :zoom="9" map-type-id="terrain" style="width: 100%; height: 300px"
                  v-if="markers != null && markers.length">
                  <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                    :draggable="false" @click="openMarker(m.id)">
                    <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id">
                      <div>
                        <h6>{{ destName }}</h6>
                        <router-link class="btn btn_theme" style="size: 50%;"
                              :to="{ name: 'destinations-see', params: { id_tourist_destinations: m.id } }">
                              <font-awesome-icon icon="eye" /><span> See more</span>
                            </router-link>
                      </div>
                    </GMapInfoWindow>
                  </GMapMarker>
                </GMapMap>
              </div>
            </div>
          </div>
          <div class="col-md-9 mt-4">
            <div class="card shadow border-0">
              <div class="dashboard_common_table">
                <h3 class="mb-4">Destinations</h3>
                <div class="row">
                  <div class="col-md-12 mx-auto">
                    <form id="cta_form_wrappper" @submit.prevent="searchFilter()">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Destination name" v-model="destinationFilter">
                        <button
                          class="btn btn_theme btn_md" type="submit">Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div v-if="destinations || destinations.length">
                  <div class="row mt-4">
                    <template v-for="(destination, index) in destinations" :key="index">
                      <div class="col-lg-4 col-md-6 col-sm-12 col-12">
                        <div class="theme_common_box_two img_hover">
                          <div class="theme_two_box_img">
                            <router-link :to="{ name: 'destinations-see', params: { id_tourist_destinations: destination.id_tourist_destinations } }">
                              <img v-if="destination.image_tourist_destination != null" :src="destination.image_tourist_destination" alt="" class="card-img-top imgTourPackage">
                              <img v-else src="../../assets/img/home/image_placeholder.png" alt="" class="card-img-top imgTourPackage">
                            </router-link>
                          </div>
                          <div class="theme_two_box_content">
                            <h5>{{ destination.name }}</h5>
                            <read-more class="text-muted card-text" :more-str="null" :text="destination.description"
                              link="#" :less-str="null" :max-chars="200">
                            </read-more>
                            <router-link class="btn btn_theme btn_md"
                              :to="{ name: 'destinations-see', params: { id_tourist_destinations: destination.id_tourist_destinations } }">
                              <font-awesome-icon icon="eye" /><span> See more</span>
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div v-if="!destinations || !destinations.length">
                  <h6>0 tour destination found.</h6>
                  <p>Please try another keyword.</p>
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
  name: "DestinationsView",
  components: {

  },
  data() {
    return {
      openedMarkerID: null,
      destName: null,
      searcname: null,
      destinations: [],
      center: { lat: -8.409518, lng: 115.188919 },
      markers: [],
      statusLoad: false,
      destinationFilter: null
    };
  },
  computed: {

  },
  created() {
    this.loadTourDestination()
  },
  methods: {
    searchFilter() {
      TourDestinationService.searchFilter(this.destinationFilter).then(
        (response) => {
          this.destinations = response.data
          this.markers = []
          this.loadMarkerData()
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
    },
    openMarker(id) {
      this.openedMarkerID = id
      this.destinations.forEach(dest => {
        if (dest.id_tourist_destinations == id) {
          this.destName = dest.name
        }
      });
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
    loadTourDestination() {
      TourDestinationService.getAll().then(
        (response) => {
          this.destinations = response.data.data
          this.markers = []
          this.loadMarkerData()
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
.btn-primary {
  background-color: #184fa7;
  border-color: #184fa7;
  outline-color: #184fa7;
}

.btn-outline-primary {
  border-color: #184fa7;
  outline-color: #184fa7;
  color: #184fa7;
}

.ms-n5 {
  margin-left: -40px;
}
</style>
