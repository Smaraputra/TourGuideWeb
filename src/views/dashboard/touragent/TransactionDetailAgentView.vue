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
                        <h4 class="color-main mt-2" style="float: left;">Order Detail</h4>
                        <button v-if="transaction['order_status'] == 'Finished'" style="float: right;"
                            class="btn btn-success">{{ transaction['order_status'] }}</button>
                        <button
                            v-else-if="transaction['order_status'] == 'Cancelled' || transaction['order_status'] == 'Refused by Agent'"
                            style="float: right;" class="btn btn-danger">{{ transaction['order_status'] }}</button>
                        <button v-else style="float: right;" class="btn btn-warning">{{ transaction['order_status']
                        }}</button>
                    </div>
                </div>
                <div class="card-body p-4">
                    <div class="form-outline mb-4">
                        <label for="package_name">Package</label>
                        <Field name="package_name" type="text" v-model="transaction.tour_packages.package_name"
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
                        <Field as="textarea" name="note" type="text" v-model="transaction['note']" class="form-control"
                            disabled />
                        <ErrorMessage name="note" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="order_date">Order Date</label>
                        <Field name="order_date" type="text" v-model="transaction['order_date']" class="form-control"
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
                        <Field name="total_price" type="text" :value="$filters.formatPrice(transaction['total_price'])"
                            class="form-control" disabled />
                        <ErrorMessage name="total_price" class="error-feedback" />
                    </div>
                    <hr class="hr">
                    <div class="form-outline mb-4"
                        v-if="transaction['rating_package'] != null && transaction['rating_package'] != 0">
                        <label for="rating_package">Rating</label>
                        <Field name="rating_package" type="text" class="form-control"
                            :value="transaction['rating_package'] + ' Stars'" disabled />
                        <ErrorMessage name="rating_package" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4" v-if="transaction.tour_packages.package_category.guide_included == 'Yes'">
                        <label for="guide_fee">Guide Fee</label>
                        <Field name="guide_fee" type="text" :value="transaction.guide_fee ? $filters.formatPrice(transaction.guide_fee) : 'No guide selected yet.'"
                            class="form-control" disabled />
                        <ErrorMessage name="guide_fee" class="error-feedback" />
                    </div>
                </div>
            </div>
            <div class="card shadow mb-4">
                <div class="card-header p-3">
                    <h4 class="color-main">Tour Information</h4>
                </div>
                <div class="card-body p-4">
                    <div class="col-md-12" v-if="tourpackage">
                        <h4 class="">Description</h4>
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
                                    data-bs-target="#collapseGuide" aria-expanded="true" aria-controls="collapseGuide">
                                    <strong>Tour Guide</strong>
                                </button>
                            </h2>
                            <div id="collapseGuide" class="accordion-collapse collapse" aria-labelledby="headingGuide">
                                <div class="accordion-body">
                                    <div class="row">
                                        <div class="col-md-12 col-lg-12 col-xl-12">
                                            <div class="card border-0" style="border-radius: 15px;" v-if="tourpackage">
                                                <div class="card-body"
                                                    v-if="tourpackage.package_category['guide_included'] === 'Yes'">
                                                    <div v-if="transaction['order_status'] != 'Active'">
                                                        <h5>This order is not active yet.</h5>
                                                    </div>
                                                    <div v-else>
                                                        <h5 class="mb-2 color-main">Guide Selection Process</h5>
                                                        <EasyDataTable
                                                            v-model:items-selected="slt_guide_end"
                                                            show-index
                                                            alternating
                                                            :headers="headers1" 
                                                            :items="alreadyAssigned"
                                                            :theme-color="themeColor"
                                                            buttons-pagination
                                                            :loading="statusLoad"
                                                            >
                                                            <template #loading>
                                                                <div class="d-flex justify-content-center align-items-center">
                                                                    <div class="loader">
                                                                        <div class="box"></div>
                                                                        <div class="box"></div>
                                                                        <div class="box"></div>
                                                                        <div class="box"></div>
                                                                        <div class="box"></div>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                            <template #item-name="item">
                                                                {{ `${item.users.name} (${item.guides.fee_out ? $filters.formatPrice(item.guides.fee_out) : 'Contact for fee.'})` }}
                                                            </template>
                                                            <template #item-agent_name="item">
                                                                {{ `${item.tour_agents_assigned.agent_name} (${item.tour_agents_assigned.phone})` }}
                                                            </template>
                                                            <template #item-photo="item">
                                                                <img class="card-img-top mt-2 mb-2 rounded imgSmallTabel" v-if="item.users.photo != null && item.users.photo != ''" :src=this.$prefix.imgUrl(item.users.photo)
                                                                    style="width: 100px">
                                                                <img class="card-img-top mt-2 mb-2 rounded imgSmallTabel" v-else src="../../../assets/img/home/photo_placeholder.png"
                                                                    style="width: 100px">
                                                            </template>
                                                            <template #item-status="item">
                                                                <button v-if="item.status == 'Chosen'"
                                                                    class="btn btn-success w-100">{{
                                                                        item.status }}</button>
                                                                <button
                                                                    v-else-if="item.status == 'Not Chosen'"
                                                                    class="btn btn-danger w-100">{{
                                                                        item.status }}</button>
                                                                <button v-else class="btn btn-warning w-100">{{
                                                                    item.status }}</button>
                                                            </template>
                                                        </EasyDataTable>
                                                        <!-- <div class="table-responsive">
                                                            <table
                                                                class="table table-bordered table-condensed table-striped"
                                                                id="dataTable" width="100%" cellspacing="0">
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
                                                                    <template v-for="(assigned, index) in alreadyAssigned"
                                                                        :key="index">
                                                                        <tr>
                                                                            <td style="width: 50px">{{ index + 1 }}</td>
                                                                            <td v-if="assigned.users.photo != null">
                                                                                <img :src=assigned.users.photo style="width: 100px">
                                                                            </td>
                                                                            <td v-else>
                                                                                <img src="../../../assets/img/home/photo_placeholder.png"
                                                                                    style="width: 100px">
                                                                            </td>
                                                                            <td>{{ assigned.tour_agents_assigned.agent_name }}
                                                                            </td>
                                                                            <td>{{ assigned.users.name }}</td>
                                                                            <td>{{ assigned.guide_approval }}</td>
                                                                            <td>{{ assigned.agent_approval }}</td>
                                                                            <td>
                                                                                <button v-if="assigned.status == 'Chosen'"
                                                                                    class="btn btn-success w-100">{{
                                                                                        assigned.status }}</button>
                                                                                <button
                                                                                    v-else-if="assigned.status == 'Not Chosen'"
                                                                                    class="btn btn-danger w-100">{{
                                                                                        assigned.status }}</button>
                                                                                <button v-else class="btn btn-warning w-100">{{
                                                                                    assigned.status }}</button>
                                                                            </td>
                                                                        </tr>
                                                                    </template>
                                                                </tbody>
                                                                <tfoot v-if="!alreadyAssigned || !alreadyAssigned.length">
                                                                    <tr>
                                                                        <td colspan="7" class="text-center">No guide assigned.</td>
                                                                    </tr>
                                                                </tfoot>
                                                            </table>
                                                        </div> -->
                                                        <div v-if="choosen == null">
                                                            <hr class="mt-4">
                                                            <h5 class="mb-2 color-main">Select Guide</h5>
                                                            <Form @submit="assignGuide()">
                                                                <EasyDataTable
                                                                    v-model:items-selected="slt_guide_end"
                                                                    show-index
                                                                    alternating
                                                                    :headers="headers" 
                                                                    :items="guidelist"
                                                                    :theme-color="themeColor"
                                                                    buttons-pagination
                                                                    :loading="statusLoad"
                                                                    >
                                                                    <template #loading>
                                                                        <div class="d-flex justify-content-center align-items-center">
                                                                            <div class="loader">
                                                                                <div class="box"></div>
                                                                                <div class="box"></div>
                                                                                <div class="box"></div>
                                                                                <div class="box"></div>
                                                                                <div class="box"></div>
                                                                            </div>
                                                                        </div>
                                                                    </template>
                                                                    <template #item-name="item">
                                                                        {{ `${item.name} (${item.fee_out ? $filters.formatPrice(item.fee_out) : 'Contact for fee.'})` }}
                                                                    </template>
                                                                    <template #item-agent_name="item">
                                                                        {{ `${item.agent_name}(${item.phone})` }}
                                                                    </template>
                                                                    <template #item-photo="item">
                                                                        <img class="card-img-top mt-2 mb-2 rounded imgSmallTabel" v-if="item.guide_photo != null && item.guide_photo != ''" :src=this.$prefix.imgUrl(item.guide_photo)
                                                                            style="width: 100px">
                                                                        <img class="card-img-top mt-2 mb-2 rounded imgSmallTabel" v-else src="../../../assets/img/home/photo_placeholder.png"
                                                                            style="width: 100px">
                                                                    </template>
                                                                    <template #item-rating="item">
                                                                        <font-awesome-icon icon="star" />
                                                                        {{item.rating ? item.rating : 'No rating yet.' }}   
                                                                    </template>
                                                                    <template #item-knowledge="item">
                                                                        <template v-if="item.dest.guide_destination.length>0">
                                                                            <template v-for="(dest, index) in item.dest.guide_destination" :key="index">
                                                                                {{ dest.tourist_destination.name }}
                                                                                <span v-if="index+1 != item.dest.guide_destination.length">, </span>
                                                                            </template>
                                                                        </template>
                                                                        <template v-else>
                                                                            Not set yet.
                                                                        </template>
                                                                    </template>
                                                                </EasyDataTable>
                                                                <!-- <div class="table-responsive">
                                                                    <table
                                                                        class="table table-bordered table-condensed table-striped"
                                                                        id="dataTable" width="100%" cellspacing="0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Photo</th>
                                                                                <th>Tour Agent</th>
                                                                                <th>Guide Name</th>
                                                                                <th>Description</th>
                                                                                <th>Knowledge</th>
                                                                                <th>Rating</th>
                                                                                <th>Action</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody v-if="guidelist || guidelist.length">
                                                                            <tr v-for="(guide, index) in guidelist"
                                                                                :key="index">
                                                                                <td style="width: 50px">{{ index + 1 }}</td>
                                                                                <td v-if="guide.guide_photo != null && guide.guide_photo != ''">
                                                                                    <img :src=guide.guide_photo
                                                                                        style="width: 100px">
                                                                                </td>
                                                                                <td v-else>
                                                                                    <img src="../../../assets/img/home/photo_placeholder.png"
                                                                                        style="width: 100px">
                                                                                </td>
                                                                                <td>{{ guide.agent_name }}</td>
                                                                                <td>{{ guide.name }} (Fee: {{ guide.fee_out ? $filters.formatPrice(guide.fee_out): 'Not Set.' }})</td>
                                                                                <td>{{ guide.guide_description }}</td>
                                                                                <td>
                                                                                    <template v-if="guide.dest.guide_destination.length>0">
                                                                                        <template v-for="(dest, index) in guide.dest.guide_destination" :key="index">
                                                                                            {{ dest.tourist_destination.name }}
                                                                                            <span v-if="index+1 != guide.dest.guide_destination.length">, </span>
                                                                                        </template>
                                                                                    </template>
                                                                                    <template v-else>
                                                                                        Not set yet.
                                                                                    </template>
                                                                                </td>
                                                                                <td>
                                                                                    <template v-if="guide.rating != null">
                                                                                        <font-awesome-icon icon="star" />
                                                                                        {{guide.rating }}   
                                                                                    </template>
                                                                                    <template v-else>
                                                                                        <font-awesome-icon icon="star" />
                                                                                        No rating yet.
                                                                                    </template>
                                                                                </td>
                                                                                <td>
                                                                                    <label for="slt_guide">Assign</label>
                                                                                    <Field name="slt_guide" type="checkbox"
                                                                                        class="form-check-input"
                                                                                        :value="guide.id_guides"
                                                                                        v-model="slt_guide_end" />
                                                                                    <ErrorMessage name="slt_guide"
                                                                                        class="error-feedback" />
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                        <tfoot v-if="!guidelist || !guidelist.length">
                                                                            <tr>
                                                                                <td colspan="8" class="text-center">No guide available.</td>
                                                                            </tr>
                                                                        </tfoot>
                                                                    </table>
                                                                </div> -->
                                                                <div class="form-group mt-2">
                                                                    <button class="btn btn_theme btn-block"
                                                                        :disabled="loading3">
                                                                        <span v-show="loading3"
                                                                            class="spinner-border spinner-border-sm"></span>
                                                                        <font-awesome-icon icon="plus" /><span> Assign
                                                                            Guide</span>
                                                                    </button>
                                                                </div>
                                                                <div v-if="message3" class="alert mt-2"
                                                                    :class="successful3 ? 'alert-success' : 'alert-danger'">
                                                                    {{ message3 }}
                                                                </div>
                                                            </Form>
                                                        </div>
                                                        <!-- <div class="card shadow border-0 h-100">
                                                                <img src="../../../assets/img/home/photo_placeholder.png" alt=""
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
                        <h4 class="color-main mt-2" style="float: left;">Payment</h4>
                        <button v-if="transaction.payments[0].payment_status == 'Paid'" style="float: right;"
                            class="btn btn-success">{{ transaction.payments[0].payment_status }}</button>
                        <button v-else-if="transaction.payments[0].payment_status == 'Cancelled'" style="float: right;"
                            class="btn btn-danger">{{ transaction.payments[0].payment_status
                            }}</button>
                        <button v-else style="float: right;" class="btn btn-warning">{{
                            transaction.payments[0].payment_status
                        }}</button>
                    </div>
                </div>
                <div class="card-body p-4">
                    <img v-if="transaction.payments[0].payment_proof != null" :src="this.$prefix.imgUrl(transaction.payments[0].payment_proof)"
                        alt="" class="card-img-top mt-2 mb-4 rounded">
                    <img v-else src="../../../assets/img/home/image_placeholder.png" alt=""
                        class="card-img-top mt-2 mb-4 rounded">
                    <div v-if="transaction.payments[0].payment_status == 'Uploaded'">
                        <div class="col-sm mt-2">
                            <button class="btn btn-success me-2" @click="approveOrder(1)">
                                <font-awesome-icon icon="check" /><span> Approve </span>
                            </button>
                        </div>
                        <div class="col-sm mt-2">
                            <button class="btn btn-danger me-2" @click="approveOrder(0)">
                                <font-awesome-icon icon="times" /><span> Reject </span>
                            </button>
                        </div>
                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                            {{ message }}
                        </div>
                    </div>
                    <div
                        v-if="transaction.order_status == 'Waiting Payment' && (transaction.payments[0].payment_status == 'Waiting Payment' || transaction.payments[0].payment_status == 'Rejected')">
                        <hr>
                        <div class="col-sm mt-2">
                            <button class="btn btn-danger me-2" @click="rejectOrder">
                                <font-awesome-icon icon="times" /><span> Reject Order </span>
                            </button>
                        </div>
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
import TourTimeline from "../../../components/global/TourTimeline.vue";
import { ref } from 'vue';
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
        TourTimeline
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
        const themeColor = "#184fa7";
        const headers = [
            { text: "Photo", value: "photo" },
            { text: "Guide Name", value: "name" },
            { text: "Guide Phone", value: "guide_phone" },
            { text: "Tour Agent", value: "agent_name" },
            // { text: "Description", value: "guide_description" },
            { text: "Knowledge", value: "knowledge" },
            { text: "Rating", value: "rating" },
        ];
        const headers1 = [
            { text: "Photo", value: "photo" },
            { text: "Guide Name", value: "name" },
            { text: "Guide Phone", value: "users.phone" },
            { text: "Tour Agent", value: "agent_name" },
            { text: "Guide Approval", value: "guide_approval" },
            { text: "Agent Approval", value: "agent_approval" },
            { text: "Status", value: "status" },
        ];
        const slt_guide_end = ref([])
        return {
            themeColor,
            headers,
            headers1,
            statusLoad: false,
            slt_guide_end,
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
        approveOrder(condition) {
            let textIns = ""
            let textOutSuccess = ""
            let textOutFailed = ""
            if (condition == 0) {
                textIns = "You will reject this payment!"
                textOutSuccess = "Payment is successfully rejected!"
                textOutFailed = "Payment is not rejected!"
            } else {
                textIns = "You will approve this payment!"
                textOutSuccess = "Payment is successfully approved!"
                textOutFailed = "Payment is not approved!"
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

                    OrderService.approvalAgent(condition, this.$route.params.id_orders).then(
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
        rejectOrder() {
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
                                    this.guidelist.forEach(guide => {
                                        response.data1.forEach(dest => {
                                            if (guide.id_guides == dest.id_guides) {
                                                guide.dest = dest
                                            }
                                        });
                                    });
                                    console.log(this.guidelist)
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
        assignGuide() {
            this.message3 = "";
            this.successful3 = false;
            this.loading3 = true;
            GuideSelectionService.store(this.$route.params.id_orders, this.slt_guide_end, this.transaction.order_date, this.enddate).then(
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
                    this.slt_guide_end = []
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
                    this.slt_guide_end = []
                }
            )
        }
    }
};

</script>

<style scoped></style>