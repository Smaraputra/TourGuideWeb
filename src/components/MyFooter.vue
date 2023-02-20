<template>
  <div class="shadow mt-5">
    <footer id="footer_area">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="footer_heading_area">
              <p>
                We provide the best services for both tour agents and guides to offer their product and services across the
                country.
              </p>
            </div>
            <div class="footer_first_area">
              <div class="footer_inquery_area">
                <router-link to="/" class="navbar-brand">
                  <h2 class="main-color">SIPENGUIDE</h2>
                </router-link>
              </div>
              
            </div>
          </div>
          <div class="col-lg-2 offset-lg-4 col-md-6 col-sm-6 col-12">
            <div class="footer_heading_area">
              <h5>Usefull Link</h5>
            </div>
            <div class="footer_link_area">
              <ul>
                <li><router-link to="/destinations">Destinations</router-link></li>
                <li><router-link to="/packages">Tour Packages</router-link></li>
                <li><router-link to="/about">About</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
                <li><router-link to="/register">Register</router-link></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 col-12">
            <div class="footer_heading_area">
              <h5>More Information</h5>
            </div>
            <div class="footer_link_area">
              <ul>
                <li><font-awesome-icon icon="map" /> Denpasar, Bali</li>
                <li><font-awesome-icon icon="phone" /> +6282237396688</li>
                <li><font-awesome-icon icon="envelope" /> smara.putra2001@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div class="copyright_area">
      <div class="container">
        <div class="row align-items-center">
          <div class="co-lg-6 col-md-6 col-sm-12 col-12">
            <div class="copyright_left">
              <!-- <p>Copyright © 2023 All Rights Reserved</p> -->
            </div>
          </div>
          <!-- <div class="co-lg-6 col-md-6 col-sm-12 col-12">
            <div class="copyright_right">
              <img src="../assets/img/common/cards.png" alt="img">
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFooter'
}
</script>

<style>

</style>