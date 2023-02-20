<template>
  <Transition>
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh" v-if="!true">
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
                <h2>About</h2>
                <p class="text-white">Project Abstract</p>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><span><font-awesome-icon icon="circle"/></span>About</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="container p-4">
        <div class="card shadow border-0 mt-4">
          <div class="card-body">
            <div>
              <div class="row">
                <div class="col-md-12">
                  <div class="dashboard_common_table">
                    <h3 class="mb-4">SIPENGUIDE</h3>
                    <p class="text-muted card-text mb-4">Rancang Bangun Sistem Informasi Penyediaan serta Pemesanan Paket Tour dan Guide dengan Model Layanan SaaS Berbasis Website</p>
                    <p class="text-muted card-text"><strong>Abstract : </strong><span>Information technology, especially in the field of cloud computing, has experienced significant developments in recent years. One of the popular service models from cloud computing is software as a service which allows users to access applications through a web browser interface without having to install certain applications first on certain devices. One of the sectors affected by the development of cloud computing, especially software as a service, is the tourism sector. Tourism in Indonesia continues to experience development which can be seen from the increasing number of foreign tourist visits from year to year. Tourism is an industry that can generate rapid economic growth, as well as create jobs for local people, especially as tour guides. Problems arise when tour guides have difficulty getting jobs guiding tours and travel agents have difficulty finding suitable tour guides to guide tours. There are also many travel agencies that use their respective websites to market their services which will make it difficult for tourists to find suitable tour packages. This study aims to create an information system with a software as a service model that can solve these problems. The information system that will be built will use the Laravel framework as a back-end server that contains the REST API and Vue.js as the front-end website. Vue.js will use the REST API that was created on the back-end server as an intermediary for input and output between the database and the website being built.</span></p>
                  </div>
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
export default {
  name: 'ProfileInformation',
  computed: {

  },
  mounted() {

  }
};
</script>