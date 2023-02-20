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
      <BannerHome />
      <FormHome />
      <TopService />
      <ExploreDeals :packages="packages"/>
      <TopGuides :items="guides"/>
      <MapHome :markers="markers" :destinations="destinations" />
    </div>
  </Transition>
</template>

<script>
import TourDestinationService from "../../services/tour-destination.service";
import TourPackageService from "../../services/tour-package.service";
import TourGuideService from "../../services/tour-guide.service";
import BannerHome from '@/components/home/BannerHome.vue'
import FormHome from '@/components/home/FormHome.vue'
import TopService from '@/components/home/TopService.vue'
import ExploreDeals from '@/components/home/ExploreDeals.vue'
import TopGuides from '@/components/home/TopGuides.vue'
import MapHome from '@/components/home/MapHome.vue'

export default {
  name: "HomeView",
  components: {
    BannerHome, FormHome, TopService, ExploreDeals, TopGuides, MapHome,
  },
  data() {
    return {
      packages: [],
      guides: [],
      statusLoad: false,

      destName: null,
      destinations: [],
      markers: [],
      package_name: null,
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
  },
  mounted() {

  },
};
</script>

<style scoped>

</style>