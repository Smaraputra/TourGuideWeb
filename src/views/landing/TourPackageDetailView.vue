<template>
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
    <section class="bg-light">
        <div class="text-center pt-4 pb-2">
            <h2 class="color-main">Package Detail</h2>
            <p class="lead text-muted">See what this tour package offers.</p>
        </div>
    </section>
    <section class="p-4">
        <div class="row">
            <div class="col">
                <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link to="/">
                                <strong>Home</strong>
                            </router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/packages">
                                <strong>Tour Package</strong>
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <strong>Package Detail</strong>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="row" v-if="tourpackages">
            <div class="col-md-8 mt-4">
                <div class="card shadow border-0">
                    <div class="card-body p-4">
                        <div class="col-md-12">
                            <img v-if="tourpackages.cover_image != null" :src="tourpackages.cover_image" alt="" class="card-img-top img">
                            <img v-else src="../../assets/image/home/image_placeholder.png" alt="" class="card-img-top img">
                        </div>
                        <div class="col-md-12 mt-4">
                            <h3 class="mb-2 color-main">{{ tourpackages.package_name }}</h3>
                            <h5 class="mb-2">{{ tourpackages.tour_agent.agent_name }}</h5>
                            <div class="btn btn-primary color-main-background" style="border-radius: 10px">{{
                                    tourpackages.package_category.category
                            }}</div>
                            <div class="btn btn-primary color-main-background m-2" style="border-radius: 10px">
                                <span v-if="tourpackages.rating">
                                    <font-awesome-icon icon="star" /> {{ tourpackages.rating }}
                                </span>
                                <span v-else>
                                    <font-awesome-icon icon="star" /> No rating yet
                                </span>
                            </div>
                            <h6 class="mt-4">Description</h6>
                            <hr class="hr" />
                            <p>{{ tourpackages.description }}</p>
                        </div>
                        <div class="accordion" id="accordionDetail">
                            <div v-if="tourpackagesdetails" class="mb-4">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingDetail">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDetail"
                                            aria-expanded="true" aria-controls="collapseDetail">
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
                                                            <img v-if="detail.image_package_detail" :src="detail.image_package_detail" class="card-img-top img2" alt="">
                                                            <img v-else src="../../assets/image/home/image_placeholder.png" class="card-img-top img2" alt="">
                                                            <div class="card-body p-4">
                                                                <h4 class="fw-bold">
                                                                    {{ detail.tourist_destination.name }}</h4>
                                                                <p class="text-muted">Day {{ detail.day }} | Duration {{
                                                                        detail.duration
                                                                }}</p>
                                                                <h6 class="mt-4">Facility</h6>
                                                                <hr class="hr" />
                                                                <div v-for="(facility, index2) in detail.package_facilities"
                                                                    :key="index2">
                                                                    <p>- {{ facility.facilities }}</p>
                                                                </div>
                                                                <h6 class="mt-4">Activity</h6>
                                                                <hr class="hr" />
                                                                <div v-for="(act, index2) in detail.tour_activity"
                                                                    :key="index2">
                                                                    <p>- {{ act.activity }} |
                                                                        {{ act.start_time }}-{{ act.end_time }}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="timeline-2 right-2" v-else>
                                                        <div class="card">
                                                            <img v-if="detail.image_package_detail" :src="detail.image_package_detail" class="card-img-top img2" alt="">
                                                            <img v-else src="../../assets/image/home/image_placeholder.png" class="card-img-top img2" alt="">
                                                            <div class="card-body p-4">
                                                                <h4 class="fw-bold">
                                                                    {{ detail.tourist_destination.name }}</h4>
                                                                <p class="text-muted">Day {{ detail.day }} | Duration {{
                                                                        detail.duration
                                                                }}</p>
                                                                <h6 class="mt-4">Facility</h6>
                                                                <hr class="hr" />
                                                                <div v-for="(facility, index2) in detail.package_facilities"
                                                                    :key="index2">
                                                                    <p>- {{ facility.facilities }}</p>
                                                                </div>
                                                                <h6 class="mt-4">Activity</h6>
                                                                <hr class="hr" />
                                                                <div v-for="(act, index2) in detail.tour_activity"
                                                                    :key="index2">
                                                                    <p>- {{ act.activity }} |
                                                                        {{ act.start_time }}-{{ act.end_time }}</p>
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
                        </div>
                        <div>
                            <div class="mt-4">
                                <h6 class="mt-4">Package Pricing</h6>
                                <hr class="hr" />
                                <div class="card card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Pax Total</th>
                                                    <th>Transportation</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(price, index) in tourpackages.package_price" :key="index">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ price.pax_total }}</td>
                                                    <td>{{ price.transportation }}</td>
                                                    <td>Rp. {{ price.price }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot v-if="!tourpackages.package_price || !tourpackages.package_price.length">
                                                <tr>
                                                    <td colspan="4" class="text-center">Empty Data.</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 class="mt-4">Terms and Conditions</h6>
                        <hr class="hr" />
                        <p>{{ tourpackages.terms }}</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mt-4">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h4 class="mb-2 color-main">Order Detail</h4>
                        <Form @submit="addTransaction" :validation-schema="schemaTransaction">
                            <p>Fill the form down below to add new tour package activity.</p>
                            <div>
                                <div class="form-outline mb-4">
                                    <label for="id_package_prices">Choose Your Pax Price</label>
                                    <Field name="id_package_prices" as="select" class="form-select" v-model="id_package_prices" @change="getPrice">
                                        <option disabled selected value>-Pax-</option>
                                        <option v-for="(price, index) in tourpackages.package_price" :key="index"
                                            :value="price.id_package_prices">
                                            {{ price.pax_total }} Person (Rp. {{ price.price }})
                                        </option>
                                    </Field>
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="order_date">Date</label>
                                    <Field name="order_date" type="date" :min=mindate id="datefield" class="form-control" />
                                    <ErrorMessage name="order_date" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="note">Order Note</label>
                                    <Field as="textarea" name="note" type="text" class="form-control" />
                                    <ErrorMessage name="note" class="error-feedback" />
                                </div>
                                <div class="accordion">
                                    <div v-if="fees.length" class="mb-4">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingPickup">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                    data-bs-target="#collapsePickup" aria-expanded="true"
                                                    aria-controls="collapsePickup">
                                                    Custom Pickup Location (Incur Additional Fee)
                                                </button>
                                            </h2>
                                            <div id="collapsePickup" class="accordion-collapse collapse" aria-labelledby="headingPickup">
                                                <div class="accordion-body">
                                                    <div class="form-outline mb-4">
                                                        <label for="location">Location</label>
                                                        <Field as="textarea" name="location" type="text" class="form-control" />
                                                        <ErrorMessage name="location" class="error-feedback" />
                                                    </div>
                                                    <div class="form-outline" id="form_custom">
                                                        <GMapMap :center="center" :zoom="2" map-type-id="terrain" style="width: 100%; height: 500px" @click="mark">
                                                            <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                                                                :draggable="true" @click="center = m.position" />
                                                        </GMapMap>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-outline mb-4">
                                                                    <label for="latitude">Latitude</label>
                                                                    <Field name="latitude" id="latIn" type="text" class="form-control" v-model="lat" disabled />
                                                                    <ErrorMessage name="latitude" class="error-feedback" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-outline mb-4">
                                                                    <label for="longitude">Longitude</label>
                                                                    <Field name="longitude" id="longIn" type="text" class="form-control" v-model="long" disabled />
                                                                    <ErrorMessage name="longitude" class="error-feedback" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <a class="btn btn-primary btn-block color-main-background" @click="clearLatLong">Clear Custom Pickup Location</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <strong>Summary</strong>
                                <hr class="hr" />
                                <p>Package price: Rp. <span v-if="initial">{{ initial }}</span><span v-else>0</span></p>
                                <p>Additional fee: Rp. <span v-if="addFee">{{ addFee }}</span><span v-else>0</span></p>
                                <div v-if="distances">
                                    <p v-for="(distance, index) in distances" :key="index">- Day {{index+1}}: {{distance}} Km.</p>
                                </div>
                                <hr class="hr" />
                                <p>Total price: Rp. <span v-if="total">{{ total }}</span><span v-else>0</span></p>
                                <div class="form-outline mb-4" v-if="methods || methods.length">
                                    <label for="id_payment_method_details">Choose Your Payment Methods</label>
                                    <Field name="id_payment_method_details" as="select" class="form-select">
                                        <option disabled selected value>-Payment Methods-</option>
                                        <option v-for="(method, index) in methods" :key="index"
                                            :value="method.id_payment_method_details">
                                            {{ method.payment_method.method }} ({{method.payment_number}})
                                        </option>
                                    </Field>
                                </div>
                                <div class="form-group mt-4">
                                    <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
                                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                        <font-awesome-icon icon="credit-card" /><span> Order Now</span>
                                    </button>
                                </div>
                            </div>
                            <div v-if="message" class="alert mt-2"
                                :class="successful ? 'alert-success' : 'alert-danger'">
                                {{ message }}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div></Transition>
</template>

<script>
import PaymentMethodDetailService from "../../services/payment-method-detail.service";
import TourPackageService from "../../services/tour-package.service";
import TourAgentService from "../../services/tour-agent.service";
import OrderService from "../../services/order.service";
import HaversineGeolocation from 'haversine-geolocation';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageDetailView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schemaTransaction = yup.object().shape({
            id_package_prices: yup
                .string()
                .required("Package price is required!"),
            id_payment_method_details: yup
                .string()
                .required("Payment method is required!"),
            order_date: yup
                .string()
                .required("Date is required!"),
            note: yup
                .string()
                .required("Note is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            schemaTransaction,
            tourpackages: null,
            tourpackagesdetails: [],
            fees: [],
            id_package_prices: 0,
            mindate: null,
            initial: 0,
            categories: [],
            methods: [],
            destinationsCoord: [],
            distances: [],
            total: 0,
            addFee: 0,
            lat: "",
            long: "",
            center: { lat: -8.409518, lng: 115.188919 },
            markers: [
                {
                    id: 'thisMark',
                    position: {
                        lat: -8.409518, lng: 115.188919
                    },
                }
            ],
            statusLoad: false,
            statusFee: false,
            statusMethod: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {
        this.setMinDate()
    },
    created() {
        this.loadPackageId()
    },
    methods: {
        setMinDate(){
            var today = new Date();
            var dd = today.getDate()+8;
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }

            if (mm < 10) {
                mm = "0" + mm;
            }

            this.mindate = yyyy + "-" + mm + "-" + dd;
            console.log(this.mindate)
        },
        getPrice() {
            this.tourpackages.package_price.forEach(price => {
                if (price.id_package_prices == this.id_package_prices) {
                    this.initial = price.price
                    this.total = this.initial + this.addFee
                }
            });
        },
        clearLatLong(){
            this.lat = null
            this.long = null
            this.addFee= 0
            this.distances= []
            this.total = this.initial
        },
        // async fetchDistanceAPI(lat, long, lat1, long1) {
        //     var response
        //     return new Promise((resolve, reject) => {
        //         var origin = new google.maps.LatLng(lat,long); //eslint-disable-line
        //         var destination = new google.maps.LatLng(lat1,long1); //eslint-disable-line
        //         var service = new google.maps.DistanceMatrixService(); //eslint-disable-line
        //         service.getDistanceMatrix(
        //             {
        //                 origins: [origin],
        //                 destinations: [destination],
        //                 travelMode: "DRIVING",
        //                 unitSystem: google.maps.UnitSystem.IMPERIAL, //eslint-disable-line
        //                 avoidHighways: false,
        //                 avoidTolls: false
        //             },
        //             function(resp, status) {                     
        //                 if (status !== google.maps.DistanceMatrixStatus.OK) { //eslint-disable-line
        //                     response = reject(status);
        //                 } else {
        //                     response = resolve(resp);
        //                 }
        //             }
        //         );
        //         this.distance.push(response)
        //         return response
        //     });
        // },
        mark(event) {
            this.markers = [
                {
                    id: 'thisMark',
                    position: {
                        lat: event.latLng.lat(), lng: event.latLng.lng()
                    },
                }
            ]
            this.lat = event.latLng.lat()
            this.long = event.latLng.lng()
            this.distances = []
            // this.destinationsCoord.forEach(coord => {
            //     this.fetchDistanceAPI(this.lat, this.long, coord.lat, coord.long)
            // });
            this.destinationsCoord.forEach(coord => {
                const points = [
                    {
                        latitude: coord.lat,
                        longitude: coord.long
                    },
                    {
                        latitude: this.lat,
                        longitude: this.long
                    }
                ];
                this.distances.push(HaversineGeolocation.getDistanceBetween(points[0], points[1]))
            });
            this.addFee=0
            this.distances.forEach(distance => {
                var currentPrice = 0
                this.fees.forEach(fee => {
                    if(distance<fee.distance){
                        this.continue
                    }else if(distance>=fee.distance){
                        currentPrice=fee.fee
                    }
                });
                this.addFee=this.addFee+currentPrice
            });
            this.total=this.addFee+this.initial
        },
        addTransaction(schemaTransaction){
            if (this.currentUser.role_id == 4 & this.total!=0) {
                this.message = "";
                this.successful = false;
                this.loading = true;

                OrderService.store(schemaTransaction, this.addFee, this.total).then(
                    () => {
                    this.message = "New order successfully placed.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New order successfully placed.',
                        'success'
                    )
                    this.$router.push("/transactions")
                    },
                    (error) => {
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful = false;
                    this.loading = false;
                    this.$swal.fire(
                        'Fail!',
                        'Order is not placed.',
                        'error'
                    )
                    }
                );
            }else if(this.currentUser.role_id != 4){
                this.$swal.fire(
                    'Action Aborted!',
                    'You are not a customer.',
                    'error'
                )
            }else if(!this.currentUser){
                this.$swal.fire(
                    'Action Aborted!',
                    'You are not logged in.',
                    'error'
                )
                this.$router.push("/login");
            }
 
        },
        loadPackageId() {
            TourPackageService.getByIdDetail(this.$route.params.id_tour_packages).then(
                (response) => {
                    this.tourpackages = response.data
                    this.tourpackagesdetails = response.package_detail
                    TourAgentService.getById(this.tourpackages.id_tour_agents).then(
                        (response) => {
                            this.fees = response.data.pickup_fee
                            this.statusFee = true
                            if(this.statusFee && this.statusMethod){
                                this.statusLoad = true
                            }
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
                    PaymentMethodDetailService.getAllById(this.tourpackages.id_tour_agents).then(
                        (response) => {
                            this.methods = response.data
                            this.statusMethod = true
                            if(this.statusFee && this.statusMethod){
                                this.statusLoad = true
                            }
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
                    this.tourpackagesdetails.forEach(det => {
                        var currentDay;
                        if (this.currentDay !== det.day) {
                            this.currentDay = det.day
                            this.destinationsCoord.push({ lat: det.tourist_destination.latitude, long: det.tourist_destination.longitude })
                        } else if (currentDay === det.day) {
                            this.continue;
                        }
                    });
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
        },
    }
};

</script>

<style scoped>

</style>