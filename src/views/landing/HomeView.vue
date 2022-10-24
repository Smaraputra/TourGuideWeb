<template>
  <!-- Carousel-->
  <section class="">
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" style="background-image: url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
          <div class="carousel-caption">
            <h5>Explore The World</h5>
            <p>Find & Get Tour Packages as Customer.</p>
          </div>
        </div>
        <div class="carousel-item" style="background-image: url(https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
          <div class="carousel-caption">
            <h5>Increase Customer Affection</h5>
            <p>Provide Your Own Tour Packages as Tour Agent</p>
          </div>
        </div>
        <div class="carousel-item" style="background-image: url(https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80)">
          <div class="carousel-caption">
            <h5>Become The Guide!</h5>
            <p>Provide Guide Services as Tour Guide</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <!-- Services-->
  <section class="p-4">
    <div class="container">
      <div class="text-center">
        <h2>Services</h2>
        <p class="text-muted mb-5">These are our top feature and services for customers, tour agents, and tour guides.</p>
      </div>
      <div class="row">
        <div class="col-sm-6 col-lg-4 mb-3 text-center">
          <font-awesome-icon icon="credit-card-alt" class="services-icon"/>
          <h6>Find & Get Tour Packages as Customer</h6>
          <p class="text-muted">Ex cupidatat eu officia consequat incididunt labore occaecat ut veniam labore et cillum idet.</p>
        </div>
        <div class="col-sm-6 col-lg-4 mb-3 text-center">
          <font-awesome-icon icon="plane" class="services-icon"/>
          <h6>Provide Your Own Tour Packages as Tour Agent</h6>
          <p class="text-muted">Tempor aute occaecat pariatur esse aute amet.</p>
        </div>
        <div class="col-sm-6 col-lg-4 mb-3 text-center">
          <font-awesome-icon icon="compass" class="services-icon"/>
          <h6>Provide Guide Services as Tour Guide</h6>
          <p class="text-muted">Voluptate ex irure ipsum ipsum ullamco ipsum reprehenderit non ut mollit commodo.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Packages-->
  <section class="bg-light p-4">
    <div class="container">
      <div class="text-center">
        <h2>Best Tour Packages</h2>
        <p class="lead text-muted mb-4">See the best tour packages provided based on the user rating.</p>
      </div>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="(pack, index) in packages" :key="index">
          <div class="card shadow border-0 h-100"><a href="#"><img src="../../assets/image/home/bedugul.jpg" alt=""
                class="card-img-top"></a>
            <div class="card-body">
              <h5><a href="#" class="text-dark">{{ pack.package_name }}</a></h5>
              <span><font-awesome-icon icon="star"/> {{ pack.rating }}</span>
              <p class="text-muted card-text">{{ pack.description }}</p>
              <p class="card-text"><a class="btn btn-primary" href="#">See more</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Portfolio-->
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
          <p class="text-muted">Ex cupidatat eu officia consequat incididunt labore occaecat ut veniam labore et cillum id
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
          <p class="text-muted">Voluptate ex irure ipsum ipsum ullamco ipsum reprehenderit non ut mollit commodo.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- Motto-->
  <section class="bg-light p-4">
    <div class="container">
      <div class="text-center">
        <h2>See Our Tour Packages on Map</h2>
        <p class="lead text-muted mb-4">See the our tour packages provided based on the location.</p>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46607.41569979358!2d115.31990144532571!3d-8.605876063969824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd21446b81f7d39%3A0x34b39c786c2e54ec!2sBali%20Safari%20%26%20Marine%20Park!5e0!3m2!1sid!2sid!4v1665846133250!5m2!1sid!2sid" width="100%" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </section>
</template>

<style scoped>
  body {
    height: 100%;
  }

  .services-icon {
    font-size:100px;
    margin-bottom: 20px;
  }

  .guide-photo {
    height: 200px;
    margin-bottom: 20px;
    border-radius: 50%;
    background: no-repeat center center scroll;
  }

  .carousel-item {
    height: 80vh;
    min-height: 350px;
    width: 100%;
    background: no-repeat center center scroll;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
  }
</style>

<script>
import TourPackageService from "../../services/tour-package.service";
export default {
  name: "HomeView",
  components: {

  },
  data() {
    return {
      packages: [],
    };
  },
  computed: {
    
  },
  mounted() {
    TourPackageService.getTopSix().then(
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
  },
};
</script>
