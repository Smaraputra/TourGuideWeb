<template>
    <!-- <section class="bg-light p-4">
        <div class="container">
            <div class="text-center">
                <h2>See Tour Destinations on Map</h2>
                <p class="lead text-muted mb-4">See the our tour destinations that is available.</p>
            </div>
            <div class="card-body">
                <GMapMap :center="center" :zoom="9" map-type-id="terrain" style="width: 100%; height: 600px"
                    v-if="markers != null && markers.length">
                    <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                        :draggable="false" @click="openMarker(m.id)">
                        <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id">
                            <div>
                                <h6>{{ destName }}</h6>
                                <router-link :to="{ name: 'destinations-see', params: { id_tourist_destinations: m.id } }">
                                    <button class="btn btn-primary btn-block color-main-background">
                                        <span>
                                            <font-awesome-icon icon="eye" />
                                        </span> See more
                                    </button>
                                </router-link>
                            </div>
                        </GMapInfoWindow>
                    </GMapMarker>
                </GMapMap>
            </div>
        </div>
    </section> -->
    <section id="cta_area" class="mt-5">
        <div class="container">
            <!-- Section Heading -->
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>Map of tour destinations</h2>
                        <p class="mt-3">See the location of each tour destination that is available for you to enjoy.</p>
                    </div>
                </div>
            </div>
            <GMapMap :center="center" :zoom="9" map-type-id="terrain" style="width: 100%; height: 600px"
                v-if="markers != null && markers.length">
                <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="false"
                    @click="openMarker(m.id)">
                    <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === m.id">
                        <div>
                            <h6>{{ destName }}</h6>
                            <router-link class="btn btn_theme btn_md"
                                :to="{ name: 'destinations-see', params: { id_tourist_destinations: m.id } }">
                                <font-awesome-icon icon="eye" /><span> See more</span>
                            </router-link>
                        </div>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapMap>
        </div>
    </section>
</template>
<script>

export default {
    name: "MapHome",
    props: {
        markers: {
            type: Object,
            default: () => {}
        },
        destinations: {
            type: Object,
            default: () => {}
        },
    },
    data(){
        return {
            center: { lat: -8.409518, lng: 115.188919 },
            destName: '',
            openedMarkerID: null,
        }
    },
    mounted() {

    },
    methods: {
        openMarker(id) {
            this.openedMarkerID = id
            this.destinations.forEach(dest => {
                if (dest.id_tourist_destinations == id) {
                    this.destName = dest.name
                }
            });
        },
    }
}
</script>