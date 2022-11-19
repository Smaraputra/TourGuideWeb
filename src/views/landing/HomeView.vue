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
              <p class="text-muted">Ex cupidatat eu officia consequat incididunt labore occaecat ut veniam labore et
                cillum
                idet.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <font-awesome-icon icon="plane" class="services-icon" />
              <h6>Provide Your Own Tour Packages as Tour Agent</h6>
              <p class="text-muted">Tempor aute occaecat pariatur esse aute amet.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <font-awesome-icon icon="compass" class="services-icon" />
              <h6>Provide Guide Services as Tour Guide</h6>
              <p class="text-muted">Voluptate ex irure ipsum ipsum ullamco ipsum reprehenderit non ut mollit commodo.
              </p>
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
      </section>
      <section class="p-4">
        <div class="container">
          <div class="text-center">
            <h2>Top Guides</h2>
            <p class="text-muted mb-5">Get to know our tour guides. These are our top tour guides.</p>
          </div>
          <div class="row">
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img src="../../assets/image/home/photo_placeholder.png" class="guide-photo">
              <h6>Ex cupidatat eu</h6>
              <p class="text-muted">Ex cupidatat eu officia consequat incididunt labore occaecat ut veniam labore et
                cillum
                id
                et.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img src="../../assets/image/home/photo_placeholder.png" class="guide-photo">
              <h6>Tempor aute occaecat</h6>
              <p class="text-muted">Tempor aute occaecat pariatur esse aute amet.</p>
            </div>
            <div class="col-sm-6 col-lg-4 mb-3 text-center">
              <img src="../../assets/image/home/photo_placeholder.png" class="guide-photo">
              <h6>Voluptate ex irure</h6>
              <p class="text-muted">Voluptate ex irure ipsum ipsum ullamco ipsum reprehenderit non ut mollit commodo.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light p-4">
        <div class="container">
          <div class="text-center">
            <h2>See Our Tour Packages on Map</h2>
            <p class="lead text-muted mb-4">See the our tour packages provided based on the location.</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46607.41569979358!2d115.31990144532571!3d-8.605876063969824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd21446b81f7d39%3A0x34b39c786c2e54ec!2sBali%20Safari%20%26%20Marine%20Park!5e0!3m2!1sid!2sid!4v1665846133250!5m2!1sid!2sid"
            width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script>
import TourPackageService from "../../services/tour-package.service";
export default {
  name: "HomeView",
  components: {

  },
  data() {
    return {
      packages: [],
      statusLoad: false
    };
  },
  computed: {

  },
  created() {
    this.loadTopSix()
  },
  methods: {
    loadTopSix() {
      TourPackageService.getTopSix().then(
        (response) => {
          this.packages = response.data.data
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