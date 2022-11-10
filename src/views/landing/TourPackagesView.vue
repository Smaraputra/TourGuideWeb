<template>
  <section class="bg-light">
    <div class="text-center pt-4 pb-2">
      <h2 class="color-main">Tour Packages</h2>
      <p class="lead text-muted">See all our tour packages.</p>
    </div>
  </section>
  <section class="p-4">
    <div class="row">
      <div class="col-md-3 mt-4">
        <div class="card shadow border-0">
          <div class="card-body">
            <h4 class="mb-4 color-main">Category</h4>
            <div v-for="(category, index) in categories" :key="index" class="mb-2">
              <input type="checkbox" class="btn-check w-100" name="category[]" :id=category.category autocomplete="off" />
              <label class="btn btn-outline-primary w-100" :for=category.category>{{ category.category }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9 mt-4">
        <div class="card shadow border-0 h-100">
          <div class="card-body">
            <h4 class="mb-4 color-main">Packages</h4>
            <form class="d-flex"><input class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
            <div class="row mt-4">
              <div class="col-md-4 mb-4" v-for="(pack, index) in packages" :key="index">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TourPackageService from "../../services/tour-package.service";
import TourPackageCategoryService from "../../services/tour-package-category.service";
export default {
  name: "TourPackagesView",
  components: {

  },
  data() {
    return {
      categories: [],
      packages: [],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    TourPackageService.getAll().then(
      (response) => {
        this.packages = response.data.data
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
    TourPackageCategoryService.getAll().then(
      (response) => {
        this.categories = response.data.data
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