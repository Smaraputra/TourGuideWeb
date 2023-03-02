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
            <section id="common_banner">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="common_bannner_text">
                                <h2>Transaction Detail</h2>
                                <p class="text-white">See your transaction details.</p>
                                <ul>
                                    <li><router-link to="/">Home</router-link></li>
                                    <li><span><font-awesome-icon icon="circle" /></span><router-link to="/transactions">Transaction</router-link></li>
                                    <li><span><font-awesome-icon icon="circle" /></span>Transaction Detail</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container p-4">
                <div class="row" v-if="transaction">
                    <div class="col-md-12 mt-4" v-if="transaction['order_status'] == 'Active' || transaction['order_status'] == 'Finished' && (this.moment(new Date()).format('YYYY-MM-DD') > this.moment(new Date(transaction.end_date)).format('YYYY-MM-DD'))">
                        <div class="card shadow border-0">
                            <div class="dashboard_common_table">
                                <h3 class="mb-4">Thank you for trusting us. We tried our best to provide the best tour package dan guide!</h3>
                                <div class="row" :class="transaction['order_status'] == 'Active' ? 'justify-content-md-center' : ''">
                                    <div class="col-md-6 mb-2" v-if="transaction['order_status'] =='Active'">
                                        <form @submit.prevent="handleFinishTour()" class="card shadow border-0 dashboard_common_table">
                                            <h4 class="text-center">Have fun with your trip? Remember to finish your transaction by clicking the button below.</h4>
                                            <button type="submit" class="mt-2 btn btn_theme btn-block text-white"
                                                :disabled="loading5">
                                                <span v-show="loading5" class="spinner-border spinner-border-sm"></span>
                                                <font-awesome-icon icon="star" /><span> Finish Order</span>
                                            </button>
                                        </form>
                                        <div v-if="message5" class="alert mt-2"
                                            :class="successful5 ? 'alert-success' : 'alert-danger'">
                                            {{ message5 }}
                                        </div>
                                    </div>
                                    <template v-if="transaction['order_status'] == 'Finished'">
                                        <div class="col-md-6 mb-2">
                                            <form @submit.prevent="handleSaveTour()" class="card shadow border-0 dashboard_common_table">
                                                <p class="text-center">Rate your tour package!</p>
                                                <fieldset class="rating"> 
                                                    <input type="radio" name="tourRating" value="5" id="tourRating5" v-model="tourRating" required :disabled="tourRatingStatus"><label for="tourRating5">☆</label> 
                                                    <input type="radio" name="tourRating" value="4" id="tourRating4" v-model="tourRating" required :disabled="tourRatingStatus"><label for="tourRating4">☆</label> 
                                                    <input type="radio" name="tourRating" value="3" id="tourRating3" v-model="tourRating" required :disabled="tourRatingStatus"><label for="tourRating3">☆</label> 
                                                    <input type="radio" name="tourRating" value="2" id="tourRating2" v-model="tourRating" required :disabled="tourRatingStatus"><label for="tourRating2">☆</label> 
                                                    <input type="radio" name="tourRating" value="1" id="tourRating1" v-model="tourRating" required :disabled="tourRatingStatus"><label for="tourRating1">☆</label>
                                                </fieldset>
                                                <button type="submit" class="mt-2 btn btn_theme btn-block text-white" v-if="!tourRatingStatus"
                                                    :disabled="loading3">
                                                    <span v-show="loading3" class="spinner-border spinner-border-sm"></span>
                                                    <font-awesome-icon icon="star" /><span> Give Tour Package Rating</span>
                                                </button>
                                            </form>
                                            <div v-if="message3" class="alert mt-2"
                                                :class="successful3 ? 'alert-success' : 'alert-danger'">
                                                {{ message3 }}
                                            </div>
                                        </div>
                                        <div class="col-md-6" v-if="transaction.tour_packages.package_category.guide_included == 'Yes'">
                                            <form @submit.prevent="handleSaveGuide()" class="card shadow border-0 dashboard_common_table">
                                                <p class="text-center">Rate your guide!</p>
                                                <fieldset class="rating"> 
                                                    <input type="radio" name="guideRating" value="5" id="guideRating5" v-model="guideRating" required :disabled="guideRatingStatus"><label for="guideRating5">☆</label> 
                                                    <input type="radio" name="guideRating" value="4" id="guideRating4" v-model="guideRating" required :disabled="guideRatingStatus"><label for="guideRating4">☆</label> 
                                                    <input type="radio" name="guideRating" value="3" id="guideRating3" v-model="guideRating" required :disabled="guideRatingStatus"><label for="guideRating3">☆</label> 
                                                    <input type="radio" name="guideRating" value="2" id="guideRating2" v-model="guideRating" required :disabled="guideRatingStatus"><label for="guideRating2">☆</label> 
                                                    <input type="radio" name="guideRating" value="1" id="guideRating1" v-model="guideRating" required :disabled="guideRatingStatus"><label for="guideRating1">☆</label>
                                                </fieldset>
                                                <button type="submit" class="mt-2 btn btn_theme btn-block text-white" v-if="!guideRatingStatus"
                                                    :disabled="loading4">
                                                    <span v-show="loading4" class="spinner-border spinner-border-sm"></span>
                                                    <font-awesome-icon icon="star" /><span> Give Guide Rating</span>
                                                </button>
                                            </form>
                                            <div v-if="message4" class="alert mt-2"
                                                :class="successful4 ? 'alert-success' : 'alert-danger'">
                                                {{ message4 }}
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 mt-4">
                        <div class="card shadow border-0">
                            <div class="dashboard_common_table">
                                <button v-if="transaction['order_status'] == 'Finished'" style="float: right; padding-bottom: 2px;"
                                    class="btn btn-success">{{ transaction['order_status'] }}</button>
                                <button v-else-if="transaction['order_status'] == 'Cancelled' || transaction['order_status'] == 'Refused by Agent'" style="float: right; padding-bottom: 2px;"
                                    class="btn btn-danger">{{ transaction['order_status'] }}</button>
                                <button v-else style="float: right; padding-bottom: 2px;" class="btn btn-warning">{{
                                        transaction['order_status']
                                }}</button>
                                <h3 class="mb-4">Order Detail</h3>
                                <div class="form-outline mb-4">
                                    <label for="package_name">Package</label>
                                    <Field name="package_name" type="text"
                                        v-model="transaction.tour_packages.package_name" class="form-control" disabled />
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
                                    <Field name="agent_name" type="text" v-model="transaction.tour_agents.agent_name"
                                        class="form-control" disabled />
                                    <ErrorMessage name="agent_name" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="note">Note</label>
                                    <Field as="textarea" name="note" type="text" v-model="transaction['note']"
                                        class="form-control" disabled />
                                    <ErrorMessage name="note" class="error-feedback" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="order_date">Order Date</label>
                                    <Field name="order_date" type="text" v-model="transaction['order_date']"
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
                                    <Field name="total_price" type="text" :value="$filters.formatPrice(transaction['total_price'])"
                                        class="form-control" disabled />
                                    <ErrorMessage name="total_price" class="error-feedback" />
                                </div>
                                <!-- <div class="form-outline mb-4" v-if="transaction['rating_package'] != null && transaction['rating_package'] > 0 && transaction['order_status'] == 'Finished'">
                                    <label for="rating_package">Rating</label>
                                    <Field name="rating_package" type="text" class="form-control" :value="transaction['rating_package'] + ' Stars'" disabled/>
                                    <ErrorMessage name="rating_package" class="error-feedback" />
                                </div> -->
                            </div>
                        </div>
                        <div class="card shadow border-0 mt-4">
                            <div class="dashboard_common_table">
                                <h3 class="mb-4">Tour Information</h3>
                                <div class="col-md-12 mt-4" v-if="tourpackage">
                                    <h4 class="mt-4">Description</h4>
                                    <p>{{ tourpackage.description }}</p>
                                    <h4 class="mt-4">Terms and Conditions</h4>
                                    <p>{{ tourpackage.terms }}</p>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="mt-4">Pickup Location</h4>
                                            <p v-if="transaction.order_details[0]">{{
                                                    transaction.order_details[0].location
                                            }}
                                            </p>
                                            <p v-else>{{ transaction.package_price.pickup_location }}</p>
                                        </div>
                                        <div class="col-md-6">
                                            <h4 class="mt-4">Pickup Time</h4>
                                            <p>{{ transaction.package_price.pickup_time }} WITA</p>
                                        </div>
                                    </div>
                                    <h4 class="mt-4">Start - End Date</h4>
                                    <p>{{ transaction.order_date }} to {{ enddate }}</p>
                                </div>
                                <TourTimeline :tourpackagesdetails="tourpackagesdetails"></TourTimeline>
                                <div class="accordion mt-2">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="headingGuide">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseGuide" aria-expanded="true"
                                                aria-controls="collapseGuide">
                                                <strong>Tour Guide</strong>
                                            </button>
                                        </h2>
                                        <div id="collapseGuide" class="accordion-collapse collapse"
                                            aria-labelledby="headingGuide">
                                            <div class="accordion-body">
                                                <div class="row">
                                                    <div class="col-md-12 col-lg-12 col-xl-12">
                                                        <div class="card border-0" style="border-radius: 15px;">
                                                            <div class="card-body" v-if="tourpackage.package_category['guide_included'] === 'Yes'">
                                                                <div v-if="selectedGuide != null" class="row">
                                                                    <div class="col-sm-12 col-md-3 text-center">
                                                                        <img v-if="selectedGuide.users.photo != null" :src="this.$prefix.imgUrl(selectedGuide.users.photo)" alt="Guide"
                                                                            class="img-fluid" style="height: 200px;border-radius: 10px;">
                                                                        <img v-else src="../../assets/img/home/photo_placeholder.png" alt="Guide"
                                                                            class="img-fluid" style="height: 200px;border-radius: 10px;">
                                                                    </div>
                                                                    <div class="col-sm-12 col-md-9 mt-2">
                                                                        <h5 class="mb-1">{{ selectedGuide.users.name }}
                                                                        </h5>
                                                                        <p class="mb-2 pb-1" style="color: #2b2a2a;">
                                                                            Affiliated with
                                                                            {{ selectedGuide.tour_agents.agent_name }}</p>
                                                                        <div class="rounded-3 p-2 mb-2" style="background-color: #efefef;">
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
                            <div class="dashboard_common_table">
                                <button v-if="transaction.payments[0].payment_status == 'Paid'"
                                    style="float: right; padding-bottom: 2px;" class="btn btn-success">{{
                                            transaction.payments[0].payment_status
                                    }}</button>
                                <button
                                    v-else-if="transaction.payments[0].payment_status == 'Cancelled' || transaction.payments[0].payment_status == 'Rejected'"
                                    style="float: right; padding-bottom: 2px;" class="btn btn-danger">{{
                                            transaction.payments[0].payment_status
                                    }}</button>
                                <button v-else style="float: right; padding-bottom: 2px;" class="btn btn-warning">{{
                                        transaction.payments[0].payment_status
                                }}</button>
                                <h3 class="mb-4">Payment</h3>
                                <template v-if="transaction.payments[0].payment_status != 'Cancelled' && transaction['order_status'] != 'Refused by Agent'">
                                    <img v-if="transaction.payments[0].payment_proof != null"
                                    :src="this.$prefix.imgUrl(transaction.payments[0].payment_proof)" alt=""
                                    class="card-img-top mt-2 rounded">
                                    <img v-else src="../../assets/img/home/image_placeholder.png" alt=""
                                        class="card-img-top mt-2 rounded">
                                    <div v-if="transaction.payments[0].payment_status != 'Paid'">
                                        <hr>
                                        <p class="mt-2"><strong>Payment Method : </strong><span> {{ transaction.payments[0].payment_method_detail.payment_method.method + ' (' + transaction.payments[0].payment_method_detail.payment_number + ')'
                                                }} </span>
                                        </p>
                                        <p class="mt-2"><strong>Total Payment : </strong><span> {{ $filters.formatPrice(transaction.total_price)
                                                }} </span>
                                        </p>
                                        <p class="mt-2"><strong>Complete Your Payment before : </strong><span>
                                                {{ transaction.payments[0].payment_date }} </span></p>
                                        <hr>
                                    </div> 
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
                                            <button class="btn btn_theme btn-block"
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
                                </template>
                                <template v-else>
                                    The order is {{ transaction['order_status'] }}.
                                </template>
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
import TourTimeline from '@/components/global/TourTimeline.vue';
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
        TourTimeline
    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            successful2: false,
            loading2: false,
            message2: "",
            successful3: false,
            loading3: false,
            message3: "",
            successful4: false,
            loading4: false,
            message4: "",
            successful5: false,
            loading5: false,
            message5: "",
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

            tourRating: 0,
            guideRating: 0,

            tourRatingStatus: false,
            guideRatingStatus: false,

        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
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
                    this.transaction.guideRating = response.data.guide_selections.filter(function(items) {
                        return items.status == 'Chosen';
                    })
                    this.tourRating = this.transaction.rating_package ? this.transaction.rating_package : 0
                    this.tourRatingStatus = this.tourRating != 0 ? true : false
                    this.guideRating = this.transaction.guideRating[0] && this.transaction.guideRating[0].guide_services[0] ? this.transaction.guideRating[0].guide_services[0].rating_guide : 0
                    this.guideRatingStatus = this.guideRating != 0 ? true : false
                    console.log(this.transaction)
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

        handleFinishTour() {
            this.message5 = "";
            this.successful5 = false;
            this.loading5 = true;

            OrderService.finishTour(this.$route.params.id_orders).then(
                () => {
                    this.message5 = "Order Finished";
                    this.successful5 = true;
                    this.loading5 = false;
                    this.$swal.fire(
                        'Success!',
                        'Order successfully finished.',
                        'success'
                    )
                    this.loadTransaction()
                },
                (error) => {
                    this.message5 =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful5 = false;
                    this.loading5 = false;
                    this.$swal.fire(
                        'Fail!',
                        'Order is not finished.',
                        'error'
                    )
                }
            );
        },

        handleSaveTour() {
            this.message3 = "";
            this.successful3 = false;
            this.loading3 = true;

            OrderService.saveRating(this.tourRating, this.$route.params.id_orders).then(
                () => {
                    this.message3 = "Tour Package Rating Uploaded";
                    this.successful3 = true;
                    this.loading3 = false;
                    this.$swal.fire(
                        'Success!',
                        'Tour package rating successfully uploaded.',
                        'success'
                    )
                    this.loadTransaction()
                },
                (error) => {
                    this.message3 =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful3 = false;
                    this.loading3 = false;
                    this.$swal.fire(
                        'Fail!',
                        'Tour package rating is not uploaded.',
                        'error'
                    )
                }
            );
        },

        handleSaveGuide() {
            this.message4 = "";
            this.successful4 = false;
            this.loading4 = true;

            OrderService.saveGuideRating(this.guideRating, this.$route.params.id_orders, this.transaction.guideRating[0].id_guide_selections, this.transaction.guideRating[0].id_guides).then(
                () => {
                    this.message4 = "Guide Rating Uploaded";
                    this.successful4 = true;
                    this.loading4 = false;
                    this.$swal.fire(
                        'Success!',
                        'Guide rating successfully uploaded.',
                        'success'
                    )
                    this.loadTransaction()
                },
                (error) => {
                    this.message4 =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.successful4 = false;
                    this.loading4 = false;
                    this.$swal.fire(
                        'Fail!',
                        'Guide rating is not uploaded.',
                        'error'
                    )
                }
            );
        },
    }
};

</script>

<style scoped>

</style>