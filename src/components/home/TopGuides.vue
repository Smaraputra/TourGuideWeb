<template>
    <!-- <section class="p-4">
        <div class="container">
            <div class="text-center">
                <h2>Top Guides</h2>
                <p class="text-muted mb-5">Get to know our tour guides. These are our top tour guides.</p>
            </div>
            <div class="row">
                <div class="col-sm-6 col-lg-4 mb-3 text-center">
                    <img v-if="guides[0].users.photo" :src="guides[0].users.photo" class="guide-photo" alt="">
                    <img v-else src="../../assets/img/home/image_placeholder.png" class="guide-photo" alt="">
                    <h6>{{ guides[0].users.name }}</h6>
                    <p class="text-muted">{{ guides[0].description }}</p>
                </div>
    
                <div class="col-sm-6 col-lg-4 mb-3 text-center">
                    <img v-if="guides[1].users.photo" :src="guides[1].users.photo" class="guide-photo" alt="">
                    <img v-else src="../../assets/img/home/image_placeholder.png" class="guide-photo" alt="">
                    <h6>{{ guides[1].users.name }}</h6>
                    <p class="text-muted">{{ guides[1].description }}</p>
                </div>
    
                <div class="col-sm-6 col-lg-4 mb-3 text-center">
                    <img v-if="guides[2].users.photo" :src="guides[2].users.photo" class="guide-photo" alt="">
                    <img v-else src="../../assets/img/home/image_placeholder.png" class="guide-photo" alt="">
                    <h6>{{ guides[2].users.name }}</h6>
                    <p class="text-muted">{{ guides[2].description }}</p>
                </div>
            </div>
        </div>
    </section> -->
    <section id="tour_guides_area" class="mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>Meet our top tour guide</h2>
                        <p class="mt-3">These are our top tour guides.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="(tourGuide, index) in items" :key="index" class="col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="tour_guides_boxed">
                        <img v-if="tourGuide.users.photo" class="guide-photo" :src="tourGuide.users.photo" alt="">
                        <img v-else src="../../assets/img/home/image_placeholder.png" class="guide-photo" alt="">
                        <div class="tour_guide_content">
                            <ul>
                                <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                            <h3>{{ tourGuide.users.name }}</h3>
                            <p>{{ tourGuide.description }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "TopGuides",
    props: {
        items: {
            type: Object,
            default: () => {}
        },
    },
    mounted() {
        console.log(this.items)
    },
}
</script>

<style>

</style>