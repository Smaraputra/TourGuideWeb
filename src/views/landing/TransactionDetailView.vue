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
                    <h2 class="color-main">Transaction Detail</h2>
                    <p class="lead text-muted">See your transaction detail and its status.</p>
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
                                    <router-link to="/transactions">
                                        <strong>Transaction</strong>
                                    </router-link>
                                </li>
                                <li class="breadcrumb-item active" aria-current="page">
                                    <strong>Transaction Detail</strong>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div class="row" v-if="transaction">
                    <div class="col-md-8 mt-4">
                        <div class="card shadow border-0">
                            <div class="card-body p-4">
                                <div style="display: block;height: 30px;clear: both;">
                                    <h4 class="mb-4 color-main" style="float: left;">Order Detail</h4>
                                    <button v-if="transaction['order_status'] == 'Finished'" style="float: right;"
                                        class="btn btn-success">{{ transaction['order_status'] }}</button>
                                    <button v-else-if="transaction['order_status'] == 'Cancelled'" style="float: right;"
                                        class="btn btn-danger">{{ transaction['order_status'] }}</button>
                                    <button v-else style="float: right;" class="btn btn-warning">{{
                                            transaction['order_status']
                                    }}</button>
                                </div>
                                <hr class="mt-4">
                                <div class="form-outline mb-4">
                                    <label for="package_name">Package</label>
                                    <Field name="package_name" type="text"
                                        :value="transaction.tour_packages.package_name" class="form-control" disabled />
                                    <ErrorMessage name="package_name" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="id_package_prices">Pricing</label>
                                    <Field name="id_package_prices" type="text" :value="transaction.package_price.transportation + ' ('
                                    + transaction.package_price.pax_total + ' Person)'" class="form-control" disabled />
                                    <ErrorMessage name="id_package_prices" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="agent_name">Tour Agents</label>
                                    <Field name="agent_name" type="text" :value="transaction.tour_agents.agent_name"
                                        class="form-control" disabled />
                                    <ErrorMessage name="agent_name" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="note">Note</label>
                                    <Field as="textarea" name="note" type="text" :value="transaction['note']"
                                        class="form-control" disabled />
                                    <ErrorMessage name="note" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="order_date">Order Date</label>
                                    <Field name="order_date" type="text" :value="transaction['order_date']"
                                        class="form-control" disabled />
                                    <ErrorMessage name="order_date" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="additional_fee">Additional Fee</label>
                                    <Field name="additional_fee" type="text"
                                        :value="'Rp. ' + transaction['additional_fee']" class="form-control" disabled />
                                    <ErrorMessage name="additional_fee" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="total_price">Total Price</label>
                                    <Field name="total_price" type="text" :value="'Rp. ' + transaction['total_price']"
                                        class="form-control" disabled />
                                    <ErrorMessage name="total_price" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="total_price">Rating</label>
                                    <Field name="total_price" type="text" class="form-control" disabled />
                                    <ErrorMessage name="total_price" class="error-feedback" />
                                </div>
                            </div>
                        </div>
                        <div class="card shadow border-0 mt-4">
                            <div class="card-body p-4">
                                <h4 class="color-main">Tour Information</h4>
                                <hr>
                                <div class="col-md-12 mt-4" v-if="tourpackage">
                                    <h6>Description</h6>
                                    <p>{{ tourpackage.description }}</p>
                                    <h6>Terms and Conditions</h6>
                                    <p>{{ tourpackage.terms }}</p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h6>Pickup Location</h6>
                                            <p v-if="transaction.order_details[0]">{{
                                                    transaction.order_details[0].location
                                            }}
                                            </p>
                                            <p v-else>{{ transaction.package_price.pickup_location }}</p>
                                        </div>
                                        <div class="col-md-6">
                                            <h6>Pickup Time</h6>
                                            <p>{{ transaction.package_price.pickup_time }} WITA</p>
                                        </div>
                                    </div>
                                    <h6>Start - End Date</h6>
                                    <p>{{ transaction.order_date }} to {{ enddate }}</p>
                                </div>
                                <div id="myGroup">
                                    <button class="btn btn-primary color-main-background me-2 mb-2" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseDetails"
                                        aria-expanded="false" aria-controls="collapseDetails">
                                        Tour Rundown
                                    </button>
                                    <button class="btn btn-primary color-main-background me-2 mb-2" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#collapseGuide" aria-expanded="false"
                                        aria-controls="collapseGuide">
                                        Tour Guide
                                    </button>
                                    <div class="collapse" id="collapseDetails" data-bs-parent="#myGroup">
                                        <div class="card card-body">
                                            <div class="container">
                                                <div class="main-timeline-2">
                                                    <div v-for="(detail, index) in tourpackagesdetails" :key="index">
                                                        <div class="timeline-2 left-2" v-if="index % 2 == 0">
                                                            <div class="card">
                                                                <img src="../../assets/image/home/image_placeholder.png"
                                                                    class="card-img-top img2" alt="Responsive image">
                                                                <div class="card-body p-4">
                                                                    <h4 class="fw-bold">
                                                                        {{ detail.tourist_destination.name }}</h4>
                                                                    <p class="text-muted">Day {{ detail.day }} |
                                                                        Duration {{
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
                                                                <img src="../../assets/image/home/image_placeholder.png"
                                                                    class="card-img-top img2" alt="Responsive image">
                                                                <div class="card-body p-4">
                                                                    <h4 class="fw-bold">
                                                                        {{ detail.tourist_destination.name }}</h4>
                                                                    <p class="text-muted">Day {{ detail.day }} |
                                                                        Duration {{
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
                                    <div class="collapse" id="collapseGuide" data-bs-parent="#myGroup">
                                        <div class="card card-body">
                                            <div class="container h-100">
                                                <div class="row">
                                                    <div class="col-md-12 col-lg-12 col-xl-12">
                                                        <div class="card border-0" style="border-radius: 15px;">
                                                            <div class="card-body"
                                                                v-if="tourpackage.package_category['guide_included'] === 'Included'">
                                                                <div v-if="selectedGuide != null">
                                                                    <div class="profile-column left">
                                                                        <img v-if="selectedGuide.users.photo != null"
                                                                            :src="selectedGuide.users.photo" alt="Guide"
                                                                            class="img-fluid"
                                                                            style="height: 200px;border-radius: 10px;">
                                                                        <img v-else
                                                                            src="../../assets/image/home/photo_placeholder.png"
                                                                            alt="Guide" class="img-fluid"
                                                                            style="height: 200px;border-radius: 10px;">
                                                                    </div>
                                                                    <div class="profile-column right mt-2">
                                                                        <h5 class="mb-1">{{ selectedGuide.users.name }}
                                                                        </h5>
                                                                        <p class="mb-2 pb-1" style="color: #2b2a2a;">
                                                                            Affiliated with
                                                                            {{ selectedGuide.tour_agents.agent_name }}</p>
                                                                        <div class="rounded-3 p-2 mb-2"
                                                                            style="background-color: #efefef;">
                                                                            <p>{{ selectedGuide.guides.description }}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="card-body" v-else>
                                                                    <h5>No tour guide has been assigned yet.</h5>
                                                                </div>
                                                            </div>
                                                            <div class="card-body" v-else>
                                                                <h5>This package does not include tour guide.</h5>
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
                    <div class="col-md-4 mt-4">
                        <div class="card shadow border-0">
                            <div class="card-body p-4">
                                <div style="display: block;height: 30px;clear: both;">
                                    <h4 class="mb-4 color-main" style="float: left;">Payment</h4>
                                    <button v-if="transaction.payments[0].payment_status == 'Paid'"
                                        style="float: right;" class="btn btn-success">{{
                                                transaction.payments[0].payment_status
                                        }}</button>
                                    <button
                                        v-else-if="transaction.payments[0].payment_status == 'Cancelled' || transaction.payments[0].payment_status == 'Rejected'"
                                        style="float: right;" class="btn btn-danger">{{
                                                transaction.payments[0].payment_status
                                        }}</button>
                                    <button v-else style="float: right;" class="btn btn-warning">{{
                                            transaction.payments[0].payment_status
                                    }}</button>
                                </div>
                                <hr class="mt-4">
                                <img v-if="transaction.payments[0].payment_proof != null"
                                    :src="transaction.payments[0].payment_proof" alt=""
                                    class="card-img-top mt-2 rounded">
                                <img v-else src="../../assets/image/home/image_placeholder.png" alt=""
                                    class="card-img-top mt-2 rounded">
                                <hr>
                                <p class="mt-2"><strong>Total Payment : </strong><span> Rp. {{ transaction.total_price
                                }} </span>
                                </p>
                                <p class="mt-2"><strong>Complete Your Payment before : </strong><span>
                                        {{ transaction.payments[0].payment_date }} </span></p>
                                <hr>
                                <Form @submit="uploadPayment" enctype="multipart/form-data"
                                    v-if="transaction.payments[0].payment_status != 'Cancelled' && transaction.payments[0].payment_status != 'Paid'">
                                    <div class="form-outline mb-4">
                                        <label for="payment_proof">Payment Proof</label>
                                        <Field name="payment_proof">
                                            <input name="payment_proof" type="file" v-on:change="onChange"
                                                class="form-control" accept="image/*" />
                                        </Field>
                                        <ErrorMessage name="payment_proof" class="error-feedback" />
                                    </div>
                                    <div class="form-group mt-4">
                                        <button class="btn btn-primary btn-block color-main-background"
                                            :disabled="loading">
                                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                            <font-awesome-icon icon="credit-card" /><span> Upload</span>
                                        </button>
                                    </div>
                                    <div v-if="message" class="alert mt-2"
                                        :class="successful ? 'alert-success' : 'alert-danger'">
                                        {{ message }}
                                    </div>
                                </Form>
                                <div
                                    v-if="transaction.order_status == 'Waiting Payment' && (transaction.payments[0].payment_status == 'Waiting Payment' || transaction.payments[0].payment_status == 'Rejected')">
                                    <hr>
                                    <a class="btn btn-danger me-2" @click="cancelOrder()" :disabled="loading2">
                                        <span v-show="loading2" class="spinner-border spinner-border-sm"></span>
                                        <font-awesome-icon icon="times" /><span> Cancel Order </span>
                                    </a>
                                    <div v-if="message2" class="alert mt-2"
                                        :class="successful2 ? 'alert-success' : 'alert-danger'">
                                        {{ message2 }}
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
import moment from 'moment'
import OrderService from "../../services/order.service";
import TourPackageService from "../../services/tour-package.service";
import GuideSelectionService from "../../services/guide-selection.service";
import { Form, Field, ErrorMessage } from "vee-validate";
// import * as rules from "@vee-validate/rules";

// Object.keys(rules).forEach((rule) => {
//   defineRule(rule, rules[rule]);
// });

export default {
    name: "TransactionDetailView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            successful2: false,
            loading2: false,
            message2: "",
            file: '',
            selectedGuide: null,
            transaction: null,
            tourpackage: null,
            tourduration: null,
            enddate: null,
            tourpackagesdetails: [],
            statusLoad: false,
            statusPac: false,
            statusGuide: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {

    },
    created() {
        this.loadTransaction()
        this.moment = moment;
    },
    methods: {
        cancelOrder() {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, cancel the order!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.message2 = "";
                    this.successful2 = false;
                    this.loading2 = true;

                    OrderService.cancelOrderByCustomer(this.$route.params.id_orders).then(
                        () => {
                            this.message2 = "Order is successfully cancelled.";
                            this.successful2 = true;
                            this.loading2 = false;
                            this.$swal.fire(
                                'Success!',
                                'Order is successfully cancelled.',
                                'success'
                            )
                            this.loadTransaction()
                        },
                        (error) => {
                            this.message2 =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful2 = false;
                            this.loading2 = false;
                            this.$swal.fire(
                                'Fail!',
                                'Order is not cancelled.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        onChange(e) {
            this.file = e.target.files[0];
        },
        loadTransaction() {
            OrderService.getOneByIdUser(this.$route.params.id_orders).then(
                (response) => {
                    this.transaction = response.data
                    TourPackageService.getByIdDetail(this.transaction.tour_packages.id_tour_packages).then(
                        (response) => {
                            this.tourpackage = response.data
                            this.tourpackagesdetails = response.package_detail
                            this.tourduration = this.tourpackagesdetails.at(-1).day - 1
                            const date = new Date(this.transaction.order_date)
                            date.setDate(date.getDate() + this.tourduration)
                            this.enddate = this.moment(date).format('YYYY-MM-DD');
                            this.statusPac = true
                            if (this.statusPac && this.statusGuide) {
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
            GuideSelectionService.getChosenGuide(this.$route.params.id_orders).then(
                (response) => {
                    this.selectedGuide = response.data
                    this.statusGuide = true
                    if (this.statusPac && this.statusGuide) {
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
        },
        uploadPayment() {
            this.message = "";
            this.successful = false;
            this.loading = true;
            console.log(this.file);

            OrderService.uploadPayment(this.file, this.$route.params.id_orders).then(
                () => {
                    this.message = "Payment Uploaded";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Payment successfully uploaded.',
                        'success'
                    )
                    this.loadTransaction()
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
                        'Payment is not uploaded.',
                        'error'
                    )
                }
            );
        },
    }
};

</script>

<style scoped>
.profile-column {
    float: left;
    padding: 10px;
}

.left {
    width: 25%;
}

.right {
    width: 75%;
}

.img2 {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: bottom;
}
</style>