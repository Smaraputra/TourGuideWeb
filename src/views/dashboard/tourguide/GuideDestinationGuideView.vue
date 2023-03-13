<template>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Guide Destination Details</h5>
                </div>
                <div class="card-body">
                    <EasyDataTable
                        show-index
                        alternating
                        :headers="headers" 
                        :items="details"
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
                        <template #item-action="item">
                            <div class="operation-wrapper" style="min-width: 100px;">
                                <div class="d-flex align-items-center align-middle pr-2 pt-2 pb-2">
                                    <button class="btn btn-danger"
                                        @click="deleteData(item.id_guide_destinations)">
                                        <font-awesome-icon icon="trash" />
                                    </button>
                                </div>
                            </div>
                        </template>
                    </EasyDataTable>
                    <!-- <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tour Destinations</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="details || details.length">
                                <tr v-for="(dest, index) in details" :key="index">
                                    <td style="width: 50px">{{ index + 1 }}</td>
                                    <td>{{ dest.tourist_destination.name }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger" @click="deleteData(dest.id_guide_destinations)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!details || !details.length">
                                <tr>
                                    <td colspan="3" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Guide Destination Details</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addDetail" :validation-schema="schema">
                        <p>Fill the form down below to add new guide destination details.</p>
                        <div>
                            <div class="form-outline mb-4" v-if="destinations || destinations.length">
                                <label for="id_tourist_destinations">Tour Destination</label>
                                <Field name="id_tourist_destinations" as="select" class="form-control form-select">
                                    <option disabled selected value>-Select Tour Destination-</option>
                                    <option v-for="(destination, index) in destinations" :key="index"
                                        :value="destination.id_tourist_destinations">
                                        {{ destination.name }}
                                    </option>
                                </Field>
                                <ErrorMessage name="id_payment_methods" class="error-feedback text-danger" />
                            </div>
                            <div class="form-group">
                                <button class="btn btn_theme btn-block" :disabled="loading">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <font-awesome-icon icon="plus" /><span> Add New</span>
                                </button>
                            </div>
                        </div>
                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                            {{ message }}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GuideDestinationService from "../../../services/guide-destination.service";
import TourDestinationService from "../../../services/tour-destination.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "GuideDestinationGuideView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            id_payment_methods: yup
                .string()
                .notOneOf(['-Select Tour Destination-'], 'Tourist destination is required!'),
        });

        const themeColor = "#184fa7";
        const headers = [
            { text: "Tour Destinations", value: "tourist_destination.name" },
            { text: "Action", value: "action" },
        ];

        return {
            themeColor,
            headers,
            statusLoad: false,
            details: [],
            destinations: [],
            successful: false,
            loading: false,
            message: "",
            schema,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    created() {
        if (!this.loggedIn) {
            this.$router.push("/login");
        }
        if (this.currentUser.role_id != 3) {
            this.$router.push("/dashboard");
        }
        this.loadData()
    },
    methods: {
        deleteData(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    GuideDestinationService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Guide destination detail successfully deleted.',
                                'success'
                            )
                            this.loadData()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Guide destination detail is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        addDetail(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            GuideDestinationService.store(schema).then(
                () => {
                    this.message = "New guide destination detail successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New guide destination detail successfully created.',
                        'success'
                    )
                    this.loadData()
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
                        'Guide destination detail is not created.',
                        'error'
                    )
                }
            );
        },
        loadData() {
            this.statusLoad = true
            Promise.all([
                GuideDestinationService.indexGuide(),
                TourDestinationService.getAll(),
            ]).then((response) => {
                this.statusLoad = false
                const [guidedest, dest] = response
                if(dest.data.data){
                    this.destinations = dest.data.data
                }
                if(guidedest.data.data){
                    this.details = guidedest.data.data
                }
            }).catch(() => {
                this.statusLoad = false
                alert('error')
            })
        },
    },

    mounted() {

    },
};
</script>

<style scoped>

</style>