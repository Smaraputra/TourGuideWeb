<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/verify-transactions">
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
    <div class="row mt-4" v-if="transaction">
        <div class="col-md-8">
            <div class="card shadow mb-4">
                <div class="card-header p-3">
                    <div style="display: block;height: 30px;clear: both;">
                        <h4 class="color-main" style="float: left;">Order Detail</h4>
                        <button v-if="transaction['order_status'] == 'Finished'" style="float: right;"
                            class="btn btn-success">{{ transaction['order_status'] }}</button>
                        <button v-else-if="transaction['order_status'] == 'Cancelled' || transaction['order_status'] == 'Refused by Agent'" style="float: right;"
                            class="btn btn-danger">{{ transaction['order_status'] }}</button>
                        <button v-else style="float: right;" class="btn btn-warning">{{ transaction['order_status']
                        }}</button>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="form-outline mb-4">
                        <label for="package_name">Package</label>
                        <Field name="package_name" type="text" :value="transaction.tour_packages.package_name"
                            class="form-control" disabled />
                        <ErrorMessage name="package_name" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="id_package_prices">Pricing</label>
                        <Field name="id_package_prices" type="text" :value="transaction.package_price.transportation + ' ('
                        + transaction.package_price.pax_total + ' Person)'" class="form-control" disabled />
                        <ErrorMessage name="id_package_prices" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="agent_name">Costumer Info</label>
                        <Field name="agent_name" type="text"
                            :value="transaction.users.name + ' (' + transaction.users.phone + ')'" class="form-control"
                            disabled />
                        <ErrorMessage name="agent_name" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="note">Note</label>
                        <Field as="textarea" name="note" type="text" :value="transaction['note']" class="form-control"
                            disabled />
                        <ErrorMessage name="note" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="order_date">Order Date</label>
                        <Field name="order_date" type="text" :value="transaction['order_date']" class="form-control"
                            disabled />
                        <ErrorMessage name="order_date" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="additional_fee">Additional Fee</label>
                        <Field name="additional_fee" type="text" :value="'Rp. ' + transaction['additional_fee']"
                            class="form-control" disabled />
                        <ErrorMessage name="additional_fee" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="total_price">Total Price</label>
                        <Field name="total_price" type="text" :value="'Rp. ' + transaction['total_price']"
                            class="form-control" disabled />
                        <ErrorMessage name="total_price" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4" v-if="transaction['rating_package'] != null && transaction['rating_package'] > 0">
                        <label for="rating_package">Rating</label>
                        <Field name="rating_package" type="text" class="form-control" :value="transaction['rating_package'] + ' Stars'" disabled/>
                        <ErrorMessage name="rating_package" class="error-feedback" />
                    </div>
                </div>
            </div>
            <div class="card shadow mb-4">
                <div class="card-header p-3">
                    <h4 class="color-main">Tour Information</h4>
                </div>
                <div class="card-body p-4">
                    <div class="col-md-12" v-if="tourpackage">
                        <h6>Description</h6>
                        <p>{{ tourpackage.description }}</p>
                        <h6>Terms and Conditions</h6>
                        <p>{{ tourpackage.terms }}</p>
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Pickup Location</h6>
                                <p v-if="transaction.order_details[0]">{{ transaction.order_details[0].location }}
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
                    <div class="accordion">
                        <div class="accordion-item" v-if="tourpackagesdetails">
                            <h2 class="accordion-header" id="headingDetail">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseDetail" aria-expanded="true" aria-controls="collapseDetail">
                                    <strong>Tour Details</strong>
                                </button>
                            </h2>
                            <div id="collapseDetail" class="accordion-collapse collapse" aria-labelledby="headingDetail">
                                <div class="accordion-body">
                                    <div class="main-timeline-2">
                                        <div v-for="(detail, index) in tourpackagesdetails" :key="index">
                                            <div class="timeline-2 left-2" v-if="index % 2 == 0">
                                                <div class="card">
                                                    <img v-if="detail.image_package_detail" :src="detail.image_package_detail"
                                                        class="card-img-top img2" alt="">
                                                    <img v-else src="../../../assets/image/home/image_placeholder.png"
                                                        class="card-img-top img2" alt="">
                                                    <div class="card-body p-4">
                                                        <h4 class="fw-bold">
                                                            {{ detail.tourist_destination.name }}</h4>
                                                        <p class="text-muted">Day {{ detail.day }} |
                                                            Duration {{
                                                            detail.duration
                                                            }}</p>
                                                        <h6 class="mt-4">Facility</h6>
                                                        <hr class="hr" />
                                                        <div v-for="(facility, index2) in detail.package_facilities" :key="index2">
                                                            <p>- {{ facility.facilities }}</p>
                                                        </div>
                                                        <h6 class="mt-4">Activity</h6>
                                                        <hr class="hr" />
                                                        <div v-for="(act, index2) in detail.tour_activity" :key="index2">
                                                            <p>- {{ act.activity }} |
                                                                {{ act.start_time }}-{{ act.end_time }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="timeline-2 right-2" v-else>
                                                <div class="card">
                                                    <img v-if="detail.image_package_detail" :src="detail.image_package_detail"
                                                        class="card-img-top img2" alt="">
                                                    <img v-else src="../../../assets/image/home/image_placeholder.png"
                                                        class="card-img-top img2" alt="">
                                                    <div class="card-body p-4">
                                                        <h4 class="fw-bold">
                                                            {{ detail.tourist_destination.name }}</h4>
                                                        <p class="text-muted">Day {{ detail.day }} |
                                                            Duration {{
                                                            detail.duration
                                                            }}</p>
                                                        <h6 class="mt-4">Facility</h6>
                                                        <hr class="hr" />
                                                        <div v-for="(facility, index2) in detail.package_facilities" :key="index2">
                                                            <p>- {{ facility.facilities }}</p>
                                                        </div>
                                                        <h6 class="mt-4">Activity</h6>
                                                        <hr class="hr" />
                                                        <div v-for="(act, index2) in detail.tour_activity" :key="index2">
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
                    <div class="accordion mt-2">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingGuide">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseGuide" aria-expanded="true" aria-controls="collapseGuide">
                                    <strong>Tour Guide</strong>
                                </button>
                            </h2>
                            <div id="collapseGuide" class="accordion-collapse collapse" aria-labelledby="headingGuide">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-md-12 col-lg-12 col-xl-12">
                                            <div class="card border-0" style="border-radius: 15px;" v-if="tourpackage">
                                                <div class="card-body" v-if="tourpackage.package_category['guide_included']==='Included'">
                                                    <div v-if="transaction['order_status'] != 'Active'">
                                                        <h5>This order is not active yet.</h5>
                                                    </div>
                                                    <div v-else>
                                                        <h5 class="mb-2 color-main">Guide Selection Process</h5>
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%" cellspacing="0">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Photo</th>
                                                                        <th>Tour Agent</th>
                                                                        <th>Guide Name</th>
                                                                        <th>Guide Approval</th>
                                                                        <th>Agent Approval</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody v-if="alreadyAssigned || alreadyAssigned.length">
                                                                    <tr v-for="(assigned, index) in alreadyAssigned" :key="index">
                                                                        <td style="width: 50px">{{index+1}}</td>
                                                                        <td v-if="assigned.users.photo !=null">
                                                                            <img :src=guide.photo style="width: 100px">
                                                                        </td>
                                                                        <td v-else>
                                                                            <img src="../../../assets/image/home/photo_placeholder.png" style="width: 100px">
                                                                        </td>
                                                                        <td>{{ assigned.tour_agents_assigned.agent_name }}</td>
                                                                        <td>{{ assigned.users.name}}</td>
                                                                        <td>{{ assigned.guide_approval }}</td>
                                                                        <td>{{ assigned.agent_approval }}</td>
                                                                        <td>
                                                                            <button v-if="assigned.status == 'Chosen'"
                                                                                class="btn btn-success w-100">{{ assigned.status }}</button>
                                                                            <button v-else-if="assigned.status == 'Not Chosen'"
                                                                                class="btn btn-danger w-100">{{ assigned.status }}</button>
                                                                            <button v-else
                                                                                class="btn btn-warning w-100">{{ assigned.status }}</button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                                <tfoot v-if="!alreadyAssigned || !alreadyAssigned.length">
                                                                    <tr>
                                                                        <td colspan="7" class="text-center">Empty Data.</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div>
                                                        <div v-if="choosen == null">
                                                            <hr class="mt-4">
                                                            <h5 class="mb-2 color-main">Select Guide</h5>
                                                            <Form @submit="assignGuide(slt_guide_end)">
                                                                <div class="table-responsive">
                                                                    <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%" cellspacing="0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Photo</th>
                                                                                <th>Tour Agent</th>
                                                                                <th>Guide Name</th>
                                                                                <th>Description</th>
                                                                                <th>Rating</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody v-if="guidelist || guidelist.length">
                                                                            <tr v-for="(guide, index) in guidelist" :key="index">
                                                                                <td style="width: 50px">{{index+1}}</td>
                                                                                <td v-if="guide.photo !=null">
                                                                                    <img :src=guide.photo style="width: 100px">
                                                                                </td>
                                                                                <td v-else>
                                                                                    <img src="../../../assets/image/home/photo_placeholder.png" style="width: 100px">
                                                                                </td>
                                                                                <td>{{ guide.agent_name }}</td>
                                                                                <td>{{ guide.name}}</td>
                                                                                <td>{{ guide.description }}</td>
                                                                                <td v-if="guide.rating != null">
                                                                                    <font-awesome-icon icon="star" />{{ guide.rating }}
                                                                                </td>
                                                                                <td v-else>
                                                                                    <font-awesome-icon icon="star" />No rating yet
                                                                                </td>
                                                                                <td>
                                                                                    <label for="slt_guide">Assign</label>
                                                                                    <Field name="slt_guide" type="checkbox" class="form-check-input" :value="guide.id_guides" v-model="slt_guide_end" unchecked/>
                                                                                    <ErrorMessage name="slt_guide" class="error-feedback" />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                        <tfoot v-if="!guidelist || !guidelist.length">
                                                                            <tr>
                                                                                <td colspan="7" class="text-center">Empty Data.</td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                </div>
                                                                <div class="form-group">
                                                                    <button class="btn btn-primary btn-block color-main-background" :disabled="loading3">
                                                                        <span v-show="loading3" class="spinner-border spinner-border-sm"></span>
                                                                        <font-awesome-icon icon="plus" /><span> Assign Guide</span>
                                                                    </button>
                                                                </div>
                                                                <div v-if="message3" class="alert mt-2" :class="successful3 ? 'alert-success' : 'alert-danger'">
                                                                    {{ message3 }}
                                                                </div>
                                                            </Form>
                                                        </div>
                                                        <!-- <div class="card shadow border-0 h-100">
                                                            <img src="../../../assets/image/home/photo_placeholder.png" alt=""
                                                            class="card-img-top">
                                                            <div class="card-body">
                                                                <h5 class="text-dark">{{ guide.name }}</h5>
                                                                <span v-if="guide.rating">
                                                                    <font-awesome-icon icon="star" /> {{ guide.rating }}
                                                                </span>
                                                                <span v-else>
                                                                    <font-awesome-icon icon="star" /> No rating yet
                                                                </span>
                                                                <p class="text-muted card-text mt-2">{{ guide.description }}</p>
                                                            </div>
                                                        </div> -->
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
        <div class="col-md-4 mb-4">
            <div class="card shadow">
                <div class="card-header p-3">
                    <div style="display: block;height: 30px;clear: both;">
                        <h4 class="color-main" style="float: left;">Payment</h4>
                        <button v-if="transaction.payments[0].payment_status == 'Paid'" style="float: right;"
                            class="btn btn-success">{{ transaction.payments[0].payment_status }}</button>
                        <button
                            v-else-if="transaction.payments[0].payment_status == 'Cancelled'"
                            style="float: right;" class="btn btn-danger">{{ transaction.payments[0].payment_status
                            }}</button>
                        <button v-else style="float: right;" class="btn btn-warning">{{
                                transaction.payments[0].payment_status
                        }}</button>
                    </div>
                </div>
                <div class="card-body p-4">
                    <img v-if="transaction.payments[0].payment_proof != null"
                        :src="transaction.payments[0].payment_proof" alt="" class="card-img-top mt-2 mb-4 rounded">
                    <img v-else src="../../../assets/image/home/image_placeholder.png" alt=""
                        class="card-img-top mt-2 mb-4 rounded">
                    <div v-if="transaction.payments[0].payment_status == 'Uploaded'">
                        <a class="btn btn-success me-2" @click="approveOrder(1)">
                            <font-awesome-icon icon="check" /><span> Approve </span>
                        </a>
                        <a class="btn btn-danger me-2" @click="approveOrder(0)">
                            <font-awesome-icon icon="times" /><span> Reject </span>
                        </a>
                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                            {{ message }}
                        </div>
                    </div>
                    <div v-if="transaction.order_status == 'Waiting Payment' && (transaction.payments[0].payment_status == 'Waiting Payment' || transaction.payments[0].payment_status == 'Rejected')">
                        <hr>
                        <a class="btn btn-danger me-2" @click="rejectOrder">
                            <font-awesome-icon icon="times" /><span> Reject Order </span>
                        </a>
                        <div v-if="message2" class="alert mt-2" :class="successful2 ? 'alert-success' : 'alert-danger'">
                            {{ message2 }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import OrderService from "../../../services/order.service";
import TourPackageService from "../../../services/tour-package.service";
import GuideSelectionService from "../../../services/guide-selection.service";
import { Form, Field, ErrorMessage } from "vee-validate";
// import * as yup from "yup";
// import { Form, Field, ErrorMessage } from "vee-validate";
// import * as rules from "@vee-validate/rules";

// Object.keys(rules).forEach((rule) => {
//   defineRule(rule, rules[rule]);
// });

export default {
    name: "TransactionDetailAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        // const schema = {
        //     slt_guide: (value) => {
        //         if (value && value.length) {
        //             return true;
        //         }
        //         return "Assign at least 1 guide."
        //     },
        // };
        // const schema = yup.object().shape({
        //     slt_guide: yup.array()
        //         .required("Assign at least 1 guide.").nullable(),
        // });
        return {
            // schema,
            choosen: null,
            selectedGuide: [],
            alreadyAssigned: [],
            successful: false,
            loading: false,
            message: "",
            successful2: false,
            loading2: false,
            message2: "",
            successful3: false,
            loading3: false,
            message3: "",
            transaction: null,
            tourpackage: null,
            tourduration: null,
            enddate: null,
            tourpackagesdetails: [],
            guidelist: []
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
        approveOrder(condition){
            let textIns = ""
            let textOutSuccess = ""
            let textOutFailed = ""
            if(condition==0){
                textIns="You will reject this payment!"
                textOutSuccess="Payment is successfully rejected!"
                textOutFailed="Payment is not rejected!"
            }else{
                textIns="You will approve this payment!"
                textOutSuccess="Payment is successfully approved!"
                textOutFailed="Payment is not approved!"
            }
            this.$swal.fire({
                title: 'Are you sure?',
                text: textIns,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.message = "";
                    this.successful = false;
                    this.loading = true;

                    OrderService.approvalAgent(condition,this.$route.params.id_orders).then(
                        () => {
                            this.message = textOutSuccess;
                            this.successful = true;
                            this.loading = false;
                            this.$swal.fire(
                                'Success!',
                                textOutSuccess,
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
                            this.successful2 = false;
                            this.loading2 = false;
                            this.$swal.fire(
                                'Fail!',
                                textOutFailed,
                                'error'
                            )
                        }
                    );
                }
            })
        },
        rejectOrder(){
            this.$swal.fire({
                title: 'Are you sure?',
                text: 'You will reject this order.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.message2 = "";
                    this.successful2 = false;
                    this.loading2 = true;

                    OrderService.cancelOrderByAgent(this.$route.params.id_orders).then(
                        (response) => {
                            this.message2 = response.message;
                            this.successful2 = true;
                            this.loading2 = false;
                            this.$swal.fire(
                                'Success!',
                                'Order successfully rejected.',
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
                                'Order is not rejected.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        loadTransaction() {
            OrderService.getOneByIdAgent(this.$route.params.id_orders).then(
                (response) => {
                    this.transaction = response.data
                    console.log(this.transaction)
                    TourPackageService.getByIdDetail(this.transaction.tour_packages.id_tour_packages).then(
                        (response) => {
                            this.tourpackage = response.data
                            this.tourpackagesdetails = response.package_detail
                            this.tourduration = this.tourpackagesdetails.at(-1).day - 1
                            const date = new Date(this.transaction.order_date)
                            date.setDate(date.getDate() + this.tourduration)
                            this.enddate = this.moment(date).format('YYYY-MM-DD');
                            GuideSelectionService.getAvailableGuide(this.$route.params.id_orders, this.transaction.order_date, this.enddate).then(
                                (response) => {
                                    this.guidelist = response.data
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
                            GuideSelectionService.getAllAssigned(this.$route.params.id_orders).then(
                                (response) => {
                                    this.alreadyAssigned = response.data
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
                                    this.choosen = response.data
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
        assignGuide(slt_guide_end) {
            this.message3 = "";
            this.successful3 = false;
            this.loading3 = true;
            GuideSelectionService.store(this.$route.params.id_orders, slt_guide_end, this.transaction.order_date, this.enddate).then(
                (response) => {
                    this.message3 = response.message;
                    this.successful3 = true;
                    this.loading3 = false;
                    this.$swal.fire(
                        'Success!',
                        response.message,
                        'success'
                    )
                    this.loadTransaction()
                    this.slt_guide_end=null
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
                        'Guide is not assigned.',
                        'error'
                    )
                    this.slt_guide_end=null
                }
            )
        }
    }
};

</script>

<style scoped>

</style>