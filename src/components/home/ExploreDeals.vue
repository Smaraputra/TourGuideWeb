<template>
    <!-- <section class="bg-light p-4">
        <div class="container">
            <div class="text-center">
                <h2>Best Tour Packages</h2>
                <p class="lead text-muted mb-4">See the best tour packages provided based on the user rating.</p>
            </div>
            <div class="row">
                <div class="col-md-4 mb-4" v-for="(pack, index) in packages" :key="index">
                    <div class="card shadow border-0 h-100">
                        <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
                        <img v-else src="../../assets/img/home/image_placeholder.png" class="card-img-top rounded img"
                            alt="">
                        <div class="card-body">
                            <h5 class="text-dark">{{ pack.package_name }}</h5>
                            <span v-if="pack.rating">
                                <font-awesome-icon icon="star" /> {{ pack.rating }}
                            </span>
                            <span v-else>
                                <font-awesome-icon icon="star" /> No rating yet
                            </span>
                            <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#"
                                :less-str="null" :max-chars="200">
                            </read-more>
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
    </section> -->
    <section id="explore_area" class="mt-5">
        <div class="container">
            <!-- Section Heading -->
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>Explore our top tour packages</h2>
                        <p class="mt-3">See the best tour packages provided based on the user rating.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-sm-12 offset-lg-3">
                    <div class="theme_nav_tab">
                        <nav class="theme_nav_tab_item">
                            <div class="nav nav-tabs" id="nav-tab1" role="tablist">
                                <button class="nav-link active" id="nav-all-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all"
                                    aria-selected="true">All</button>
                                <button class="nav-link" id="nav-full-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-full" type="button" role="tab" aria-controls="nav-full"
                                    aria-selected="false">Full Course</button>
                                <button class="nav-link" id="nav-standard-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-standard" type="button" role="tab" aria-controls="nav-standard"
                                    aria-selected="false">Standard</button>
                                <button class="nav-link" id="nav-guide-tab" data-bs-toggle="tab"
                                    data-bs-target="#nav-guide" type="button" role="tab" aria-controls="nav-guide"
                                    aria-selected="false">Guide Only</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade" id="nav-full" role="tabpanel" aria-labelledby="nav-full-tab">
                            <div class="row">
                                <template v-for="(pack, index) in packages" :key="index">
                                    <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-if="pack.id_package_categories==1">
                                        <div class="theme_common_box_two img_hover">
                                            <div class="theme_two_box_img">
                                                <router-link :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
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
                                                <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null" :max-chars="200">
                                                </read-more>
                                                <router-link class="btn btn_theme btn_md"
                                                    :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <font-awesome-icon icon="eye" /><span> See more</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="tab-pane fade show active" id="nav-all" role="tabpanel"
                            aria-labelledby="nav-all-tab">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-for="(pack, index) in packages" :key="index">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <router-link :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
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
                                            <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null" :max-chars="200">
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
                        <div class="tab-pane fade" id="nav-standard" role="tabpanel" aria-labelledby="nav-standard-tab">
                            <div class="row">
                                <template v-for="(pack, index) in packages" :key="index">
                                    <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-if="pack.id_package_categories==2">
                                        <div class="theme_common_box_two img_hover">
                                            <div class="theme_two_box_img">
                                                <router-link :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
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
                                                <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null" :max-chars="200">
                                                </read-more>
                                                <router-link class="btn btn_theme btn_md"
                                                    :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <font-awesome-icon icon="eye" /><span> See more</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-guide" role="tabpanel" aria-labelledby="nav-guide-tab">
                            <div class="row">
                                <template v-for="(pack, index) in packages" :key="index">
                                    <div class="col-lg-3 col-md-6 col-sm-12 col-12" v-if="pack.id_package_categories==3">
                                        <div class="theme_common_box_two img_hover">
                                            <div class="theme_two_box_img">
                                                <router-link :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <img v-if="pack.cover_image" :src="pack.cover_image" class="card-img-top rounded img" alt="">
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
                                                <read-more class="text-muted card-text" :more-str="null" :text="pack.description" link="#" :less-str="null" :max-chars="200">
                                                </read-more>
                                                <router-link class="btn btn_theme btn_md"
                                                    :to="{ name: 'packages-detail-see', params: { id_tour_packages: pack.id_tour_packages } }">
                                                    <font-awesome-icon icon="eye" /><span> See more</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "ExploreDeals",
    props: {
        packages: {
            type: Object,
            default: () => {}
        },
    },
    mounted() {
        console.log(this.packages)
    },
};

</script>