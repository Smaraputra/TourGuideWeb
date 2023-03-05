<template>
    <div class="accordion mt-4" id="accordionDetail">
        <div v-if="tourpackagesdetails" class="mb-4">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingDetail">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseDetail" aria-expanded="true" aria-controls="collapseDetail">
                        <strong>Tour Details</strong>
                    </button>
                </h2>
                <div id="collapseDetail" class="accordion-collapse collapse" aria-labelledby="headingOne"
                    data-bs-parent="#accordionDetail">
                    <div class="accordion-body">
                        <div class="main-timeline-2">
                            <div v-for="(detail, index) in tourpackagesdetails" :key="index">
                                <div class="timeline-2 left-2" v-if="index % 2 == 0">
                                    <div class="card">
                                        <img v-if="detail.image_package_detail" :src="this.$prefix.imgUrl(detail.image_package_detail)"
                                            class="card-img-top img2" alt="">
                                        <img v-else src="../../assets/img/home/image_placeholder.png"
                                            class="card-img-top img2" alt="">
                                        <div class="card-body p-4">
                                            <h4 class="fw-bold">
                                                {{ detail.tourist_destination.name }}
                                            </h4>
                                            <p class="text-muted">Day {{ detail.day }}  (Duration {{
                                                detail.duration
                                            }})</p>
                                            <h4 class="mt-4">Facility</h4>
                                            <hr class="hr" />
                                            <template v-if="detail.package_facilities.length>0">
                                                <div v-for="(facility, index2) in detail.package_facilities" :key="index2">
                                                    <p>- {{ facility.facilities }}</p>
                                                    <p>{{ facility.description_public }}</p>
                                                    <template v-if="facility.description_agent">
                                                        <div id="content" v-html="facility.description_agent"></div>
                                                    </template>
                                                </div>
                                            </template>
                                            <template v-else>
                                                No facility provided.
                                            </template>
                                            <h4 class="mt-4">Activity</h4>
                                            <hr class="hr" />
                                            <template v-if="detail.tour_activity.length>0">
                                                <div v-for="(act, index2) in detail.tour_activity" :key="index2">
                                                    <p>- {{ act.activity }} (
                                                        {{ act.start_time }}-{{ act.end_time }})
                                                    </p>
                                                </div>
                                            </template>
                                            <template v-else>
                                                No activity provided.
                                            </template>
                                        </div>
                                    </div>
                                </div>
                                <div class="timeline-2 right-2" v-else>
                                    <div class="card">
                                        <img v-if="detail.image_package_detail" :src="this.$prefix.imgUrl(detail.image_package_detail)"
                                            class="card-img-top img2" alt="">
                                        <img v-else src="../../assets/img/home/image_placeholder.png"
                                            class="card-img-top img2" alt="">
                                        <div class="card-body p-4">
                                            <h4 class="fw-bold">
                                                {{ detail.tourist_destination.name }}
                                            </h4>
                                            <p class="text-muted">Day {{ detail.day }}  (Duration {{
                                                detail.duration
                                            }})</p>
                                            <h4 class="mt-4">Facility</h4>
                                            <hr class="hr" />
                                            <template v-if="detail.package_facilities.length>0">
                                                <div v-for="(facility, index2) in detail.package_facilities" :key="index2">
                                                    <p>- {{ facility.facilities }}</p>
                                                    <p>{{ facility.description_public }}</p>
                                                    <template v-if="facility.description_agent">
                                                        <div id="content" v-html="facility.description_agent"></div>
                                                    </template>
                                                </div>
                                            </template>
                                            <template v-else>
                                                No facility provided.
                                            </template>
                                            <h4 class="mt-4">Activity</h4>
                                            <hr class="hr" />
                                            <template v-if="detail.tour_activity.length>0">
                                                <div v-for="(act, index2) in detail.tour_activity" :key="index2">
                                                    <p>- {{ act.activity }} (
                                                        {{ act.start_time }}-{{ act.end_time }})
                                                    </p>
                                                </div>
                                            </template>
                                            <template v-else>
                                                No activity provided.
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "TourTimeline",
    props: {
        tourpackagesdetails: {
            type: Array,
            default: () => []
        },
    },
    mounted() {

    },
};
</script>