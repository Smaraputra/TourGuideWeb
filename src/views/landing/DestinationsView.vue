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
          <p class="lead text-muted">See our tour packages destination.</p>
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
                <li class="breadcrumb-item active" aria-current="page">
                  <strong>Tour Destination</strong>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mt-4">
            <div class="card shadow border-0">
              <div class="card-body">
                <h4 class="mb-4 color-main">Maps</h4>
                <hr>
                <GMapMap :center="center" :zoom="9" map-type-id="terrain" style="width: 100%; height: 300px"
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
          </div>
          <div class="col-md-9 mt-4">
            <div class="card shadow border-0">
              <div class="card-body">
                <h4 class="mb-4 color-main">Destinations</h4>
                <hr>
                <div class="row">
                  <div class="col-md-12 mx-auto">
                    <div class="input-group">
                      <input class="form-control border-end-0 border" type="search" placeholder="Destination name"
                        id="example-search-input" v-model="package_name" @input="searchFilter">
                      <span class="input-group-append">
                        <button class="btn btn-primary border-start-0 border-bottom-0 border ms-n5" type="button"
                          @input="searchFilter">
                          <font-awesome-icon icon="search" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="destinations || destinations.length">
                  <div class="row mt-4">
                    <div class="col-md-4 mb-4" v-for="(destination, index) in destinations" :key="index">
                      <div class="card shadow border-0 h-100">
                        <img v-if="destination.image_tourist_destination != null"
                          :src="destination.image_tourist_destination" alt="" class="card-img-top imgTourPackage">
                        <img v-else src="../../assets/image/home/image_placeholder.png" alt=""
                          class="card-img-top imgTourPackage">
                        <div class="card-body">
                          <h5>{{ destination.name }}</h5>
                          <read-more class="text-muted card-text" :more-str="null" :text="destination.description"
                            link="#" :less-str="null" :max-chars="250"></read-more>
                          <div class="btn btn-primary btn-block color-main-background"><span>
                              <font-awesome-icon icon="eye" />
                            </span> See more</div>
                        </div>
                      </div>
                    </div>
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
      package_name: null
    };
  },
  computed: {

  },
  created() {
    this.loadTourDestination()
  },
  methods: {
    searchFilter() {
      TourDestinationService.searchFilter(this.package_name).then(
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
