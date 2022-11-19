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
          <h2 class="color-main">Tour Packages</h2>
          <p class="lead text-muted">See all our tour packages.</p>
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
                  <strong>Tour Package</strong>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mt-4">
            <div class="card shadow border-0">
              <div class="card-body">
                <h4 class="mb-4 color-main">Category</h4>
                <hr>
                <div v-for="(category, index) in categories" :key="index" class="mb-2">
                  <input type="checkbox" class="btn-check w-100" autocomplete="off" :id=category.category
                    :value="category.id_package_categories" v-model="slt_categories" @change="searchFilter" />
                  <label class="btn btn-outline-primary w-100" :for=category.category>{{ category.category }}</label>
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
              <div class="card-body">
                <h4 class="mb-4 color-main">Packages</h4>
                <hr>
                <div class="row">
                  <div class="col-md-12 mx-auto">
                    <div class="input-group">
                      <input class="form-control border-end-0 border" type="search" placeholder="Package name"
                        id="example-search-input" v-model="package_name" @input="searchFilter">
                      <span class="input-group-append">
                        <button class="btn btn-primary border-start-0 border-bottom-0 border ms-n5" type="button"
                          @click="searchFilter">
                          <font-awesome-icon icon="search" />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="packages || packages.length">
                  <div class="row mt-4">
                    <div class="col-md-4 col-sm-6 mb-4" v-for="(pack, index) in packages" :key="index">
                      <div class="card shadow border-0 h-100"><img src="../../assets/image/home/bedugul.jpg" alt=""
                          class="card-img-top">
                        <div class="card-body">
                          <h5 class="text-dark">{{ pack.package_name }}</h5>
                          <span v-if="pack.rating">
                            <font-awesome-icon icon="star" /> {{ pack.rating }}
                          </span>
                          <span v-else>
                            <font-awesome-icon icon="star" /> No rating yet
                          </span>
                          <p class="text-muted card-text mt-2">{{ pack.description }}</p>
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
      package_name: null,
      slt_categories: [],
      statusLoad: false,
      statusPackage: false,
      statusCategory: false,
      statusDestination: false,
    };
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
  mounted() {
    this.getAllPackage()
    this.getAllCategory()
    this.getAllDestination()
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