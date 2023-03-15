<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/guide-job-approval">
                            <strong>Guide Job Approval</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Guide Job Detail</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="row mt-4" v-if="transaction">
        <div class="col-md-4">
            <div class="card shadow mb-4">
                <div class="card-header p-3">
                    <div style="display: block;height: 30px;clear: both;">
                        <h4 class="color-main p-2" style="float: left;">Order Detail</h4>
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
                        <ErrorMessage name="package_name" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="id_package_prices">Pricing</label>
                        <Field name="id_package_prices" type="text" :value="transaction.package_price.transportation + ' ('
                        + transaction.package_price.pax_total + ' Person)'" class="form-control" disabled />
                        <ErrorMessage name="id_package_prices" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="agent_name">Costumer Info</label>
                        <Field name="agent_name" type="text"
                            :value="transaction.users.name + ' (' + transaction.users.phone + ')'" class="form-control"
                            disabled />
                        <ErrorMessage name="agent_name" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="note">Note</label>
                        <Field as="textarea" name="note" type="text" v-model="transaction['note']" class="form-control"
                            disabled />
                        <ErrorMessage name="note" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="order_date">Order Date</label>
                        <Field name="order_date" type="text" v-model="transaction['order_date']" class="form-control"
                            disabled />
                        <ErrorMessage name="order_date" class="error-feedback text-danger" />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-8">
            <div class="card shadow mb-4">
                <div class="card-header p-3">
                    <h4 class="color-main p-2">Tour Information</h4>
                </div>
                <div class="card-body p-4">
                    <div class="col-md-12" v-if="tourpackage">
                        <h4 class="">Description</h4>
                        <p>{{ tourpackage.description }}</p>
                        <h4 class="mt-4">Terms and Conditions</h4>
                        <div id="content" v-html="tourpackage.terms"></div>
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
                        <div class="accordion-item" v-if="tourpackage">
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
                                            <div class="card border-0" style="border-radius: 15px;">
                                                <div class="card-body" v-if="tourpackage.package_category['guide_included'] === 'Yes'">
                                                    <div class="row" v-if="selectedGuide">
                                                        <div class="col-sm-12 col-md-3 text-center">
                                                            <img v-if="selectedGuide.users.photo != null" :src="this.$prefix.imgUrl(selectedGuide.users.photo)" alt="Guide"
                                                                class="img-fluid" style="height: 200px;border-radius: 10px;">
                                                            <img v-else src="../../../assets/img/home/photo_placeholder.png" alt="Guide"
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
                    <template v-if="guide">
                        <div v-if="guide.guide_approval == 'Waiting Approval' && guide.status == 'Waiting Approval'">
                            <tr>
                                <td>
                                    <div class="mt-2">
                                <button class="btn btn-success" @click="approval(guide.id_guide_selections, 'Approved')">
                                    <font-awesome-icon icon="check" style="width: 20px; height: 20px;" />
                                    Approve
                                </button>
                            </div>
                                </td>
                                <td>
                                    <div class="mt-2 mx-2">
                                <button class="btn btn-danger" @click="approval(guide.id_guide_selections, 'Rejected')">
                                    <font-awesome-icon icon="times" style="width: 20px; height: 20px;" />
                                    Reject
                                </button>
                            </div>
                                </td>
                            </tr>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import OrderService from "../../../services/order.service";
import TourPackageService from "../../../services/tour-package.service";
import GuideSelectionService from "../../../services/guide-selection.service";
import { Field, ErrorMessage } from "vee-validate";
import TourTimeline from "@/components/global/TourTimeline.vue";

export default {
    name: "GuideJobDetailGuideView",
    components: {
        Field,
        ErrorMessage,
        TourTimeline
    },
    data() {
        return {
            guide: null,
            selectedGuide: null,
            successful: false,
            loading: false,
            message: "",
            transaction: null,
            tourpackage: null,
            tourduration: null,
            enddate: null,
            tourpackagesdetails: null,
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
        this.moment = moment
    },
    methods: {
        loadTransaction() {
            OrderService.getDetailJobAgent(this.$route.params.id_guide_selections).then(
                (response) => {
                    this.transaction = response.data
                    TourPackageService.getByIdDetail(this.transaction.tour_packages['id_tour_packages']).then(
                        (response) => {
                            this.tourpackage = response.data
                            this.tourpackagesdetails = response.package_detail
                            this.tourduration = this.tourpackagesdetails.at(-1).day - 1
                            const date = new Date(this.transaction.order_date)
                            date.setDate(date.getDate() + this.tourduration)
                            this.enddate = this.moment(date).format('YYYY-MM-DD');
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
                    GuideSelectionService.getSingleAssigned(this.transaction["id_orders"], this.$route.params.id_guides).then(
                        (response) => {
                            this.guide = response.data
                            console.log(this.guide)
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
                    GuideSelectionService.getChosenGuide(this.transaction["id_orders"]).then(
                        (response) => {
                            this.selectedGuide = response.data
                            console.log(this.selectedGuide)
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
        approval(id,approve) {
            let txt
            let suctxt
            let errtxt
            let btntxt
            if(approve=="Approved"){
                txt = "You are going to approve this job proposal."
                suctxt = "Job proposal successfully approved."
                errtxt = "Job proposal is not approved."
                btntxt = "Approve"
            }else if(approve=="Rejected"){
                txt = "You are going to reject this job proposal."
                suctxt = "Job proposal successfully rejected."
                errtxt = "Job proposal is not rejected."
                btntxt = "Reject"
            }

            this.$swal.fire({
                title: 'Are you sure?',
                text: txt,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: btntxt
            }).then((result) => {
                if (result.isConfirmed) {
                    GuideSelectionService.verifyByAgent(id, approve).then(
                        () => {
                            this.$swal.fire(
                                'Approved!',
                                suctxt,
                                'success'
                            )
                            this.loadTransaction()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                errtxt,
                                'error'
                            )
                        }
                    );
                }
            })
        },
    }
};

</script>

<style scoped>

</style>