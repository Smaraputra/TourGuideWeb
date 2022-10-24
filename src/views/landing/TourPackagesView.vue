<template>
    <section class="bg-light">
        <div class="text-center pt-4 pb-2">
            <h2>Tour Packages</h2>
            <p class="lead text-muted">See all our tour packages.</p>
        </div>
    </section>
    <section class="p-4">
        <div class="row mt-4">
            <div class="col-md-3 mb-4">
                <div class="card shadow border-0 h-100">
                    <div class="card-body">
                        <h4 class="mb-4">Category</h4>
                        <div v-for="(category, index) in categories" :key="index" class="mb-2">
                            <input type="checkbox" class="btn-check w-100" :id=category.category autocomplete="off" />
                            <label class="btn btn-outline-primary w-100" :for=category.category>{{category.category}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9 mb-4">
                <div class="card shadow border-0 h-100">
                    <div class="card-body">
                        <h4 class="mb-4">Packages</h4>
                        <form class="d-flex"><input class="form-control" type="search" placeholder="Search" aria-label="Search"></form>
                        <div class="row mt-4">
                            <div class="col-md-3 mb-4" v-for="(pack, index) in packages" :key="index">
                                <div class="card shadow border-0 h-100"><a href="#"><img src="../../assets/image/home/bedugul.jpg" alt=""
                                            class="card-img-top"></a>
                                    <div class="card-body">
                                        <h5><a href="#" class="text-dark">{{ pack.package_name }}</a></h5>
                                        <span>
                                            <font-awesome-icon icon="star" /> {{ pack.rating }}
                                        </span>
                                        <p class="text-muted card-text">{{ pack.description }}</p>
                                        <p class="card-text"><a class="btn btn-primary" href="#">See more</a></p>
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
        this.packages=response.data.data
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
        this.categories=response.data.data
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

<style>

</style>