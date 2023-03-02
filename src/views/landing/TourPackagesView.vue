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
                <h2>Tour Packages</h2>
                <p class="text-white">See our available tour packages.</p>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><span><i class="fas fa-circle"></i></span>Tour Packages</li>
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
                <h3 class="mb-4">Categories</h3>
                <div v-for="(category, index) in categories" :key="index" class="mb-2">
                  <input type="checkbox" class="btn-check w-100" autocomplete="off" :id=category.category
                    :value="category.id_package_categories" v-model="slt_categories" @change="searchFilter" />
                  <label class="btn btn_theme_white w-100" :for=category.category>{{ category.category }}</label>
                </div>
                <!-- <h4 class="mb-4 color-main mt-4">Destinations</h4>
              <hr>
              <div v-for="(dest, index) in destinations" :key="index" class="mb-2">
                <input type="checkbox" class="btn-check w-100" name="destination[]" :id=dest.id_tourist_destinations
                  autocomplete="off" />
                <label class="btn btn-outline-primary w-100" :for=dest.id_tourist_destinations>{{ dest.name }}</label>
              </div> -->
              </div>
            </div>
          </div>
          <div class="col-md-9 mt-4">
            <div class="card shadow border-0 h-100">
              <div class="dashboard_common_table">
                <h3 class="mb-4">Packages</h3>
                <div class="row">
                  <div class="col-md-12 mx-auto">
                    <form id="cta_form_wrappper" @submit.prevent="searchFilter()">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Package name" v-model="package_name">
                        <button
                          class="btn btn_theme btn_md" type="submit">Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div v-if="packages || packages.length">
                  <div class="row mt-4">
                    <div class="col-lg-4 col-md-6 col-sm-6 col-12" v-for="(pack, index) in packages" :key="index">
                      <div class="theme_common_box_two img_hover">
                        <div class="theme_two_box_img">
                          <router-link :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                            <img v-if="pack.cover_image" :src="this.$prefix.imgUrl(pack.cover_image)" class="card-img-top rounded img" alt="">
                            <img v-else src="../../assets/img/home/image_placeholder.png" class="card-img-top rounded img" alt="">
                          </router-link>
                          <p>{{ pack.tour_agent.agent_name }}</p>
                        </div>
                        <div class="theme_two_box_content">
                          <h5 class="text-dark">{{ pack.package_name }}</h5>
                          <span v-if="pack.rating">
                            <font-awesome-icon icon="star" /> {{ pack.rating }}
                          </span>
                          <span v-else>
                            <font-awesome-icon icon="star" /> No rating yet.
                          </span>
                          <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null"
                            :max-chars="200">
                          </read-more>
                          <router-link class="btn btn_theme btn_md"
                            :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                            <font-awesome-icon icon="eye" /><span> See more</span>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="!packages || !packages.length">
                  <h6>0 tour package found.</h6>
                  <p>Please try another keyword or category.</p>
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
import TourPackageService from "../../services/tour-package.service";
import TourPackageCategoryService from "../../services/tour-package-category.service";
import TourDestinationService from "../../services/tour-destination.service";
export default {
  name: "TourPackagesView",
  components: {

  },
  data() {
    return {
      categories: [],
      packages: [],
      destinations: [],
      package_name: '',
      slt_categories: [],
      statusLoad: false,
      statusPackage: false,
      statusCategory: false,
      statusDestination: false,
    };
  },
  mounted() {
    this.getAllPackage()
    this.getAllCategory()
    this.getAllDestination()
    this.package_name = this.$route.query.package_name
    this.searchFilter()
  },
  methods: {
    getAllPackage() {
      TourPackageService.getAll().then(
        (response) => {
          this.packages = response.data.data
          this.statusPackage = true
          if(this.statusDestination && this.statusCategory && this.statusPackage){
            this.statusLoad = true
          }
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
    getAllCategory() {
      TourPackageCategoryService.getAll().then(
        (response) => {
          this.categories = response.data.data
          this.statusCategory = true
          if(this.statusDestination && this.statusCategory && this.statusPackage){
            this.statusLoad = true
          }
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
    searchFilter() {
      TourPackageService.searchFilter(this.package_name, this.slt_categories).then(
        (response) => {
          this.packages = response.data
          console.log(response.data.data)
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
    getAllDestination() {
      TourDestinationService.getAll().then(
        (response) => {
          this.destinations = response.data.data
          this.statusDestination = true
          if(this.statusDestination && this.statusCategory && this.statusPackage){
            this.statusLoad = true
          }
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
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
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