<template>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Tour Package Pickup Fee</h5>
                </div>
                <div class="card-body">
                    <EasyDataTable
                        show-index
                        alternating
                        :headers="headers" 
                        :items="fees"
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
                        <template #item-fee="item">
                            {{ $filters.formatPrice(item.fee) }}
                        </template>
                        <template #item-action="item">
                            <div class="operation-wrapper" style="min-width: 100px;">
                                <div class="d-flex pr-2 pt-2 pb-2">
                                    <router-link class="btn btn-success"
                                        :to="{ name: 'pickup-fee-detail', params: { id_pickup_fees: item.id_pickup_fees }}">
                                        <font-awesome-icon icon="pencil" />
                                    </router-link>
                                    <button class="btn btn-danger mx-2"
                                        @click="deleteData(item.id_pickup_fees)">
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
                                    <th>Distance (Km)</th>
                                    <th>Fee (Rp)</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="fees || fees.length">
                                <tr v-for="(fee, index) in fees" :key="index">
                                    <td style="width: 50px">{{ index + 1 }}</td>
                                    <td>{{ fee.distance }}</td>
                                    <td>{{ fee.fee }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <router-link style="width: 50px; height: 50px;" :to="{ name: 'pickup-fee-detail', params: { id_pickup_fees: fee.id_pickup_fees }}">
                                                <button class="btn btn-success">
                                                    <font-awesome-icon icon="pencil" />
                                                </button>
                                            </router-link>
                                        </div>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger" @click="deleteData(fee.id_pickup_fees)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!fees || !fees.length">
                                <tr>
                                    <td colspan="4" class="text-center">Empty Data.</td>
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
                    <h5 class="m-0 font-weight-bold color-main">Add Pickup Fee</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addFee" :validation-schema="schema">
                        <p>Fill the form down below to add new pickup fee.</p>
                        <div>
                            <div class="form-outline mb-4">
                                <label for="distance">Distances in Kilometer(Km)</label>
                                <Field name="distance" type="number" class="form-control" />
                                <ErrorMessage name="distance" class="error-feedback text-danger" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="fee">Additional Fee (IDR)</label>
                                <Field name="fee" type="number" class="form-control" />
                                <ErrorMessage name="fee" class="error-feedback text-danger" />
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
import PickupFeeService from "../../../services/pickup-fee.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "PickupFeeAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            distance: yup
                .number()
                .required("Distance is required!")
                .min(1, "Must be at least 1 Km!"),
            fee: yup
                .number()
                .required("Fee is required!")
                .min(1, "Must be at least 1 IDR!"),
        });

        const themeColor = "#184fa7";
        const headers = [
            { text: "Distance (Km)", value: "distance" },
            { text: "Fee (Rp)", value: "fee" },
            { text: "Action", value: "action" },
        ];

        return {
            themeColor,
            headers,
            statusLoad: false,
            fees: [],
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
        if (this.currentUser.role_id != 2) {
            this.$router.push("/dashboard");
        }
        this.loadPickupFee()
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
                    PickupFeeService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Pickup fee successfully deleted.',
                                'success'
                            )
                            this.loadPickupFee()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Pickup fee is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        addFee(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            PickupFeeService.store(schema).then(
                (data) => {
                    this.message = "New pickup fee of Rp. " + data.data.fee + " for " + data.data.distance + "Km successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New pickup fee successfully created.',
                        'success'
                    )
                    this.loadPickupFee()
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
                        'Pickup fee is not created.',
                        'error'
                    )
                }
            );
        },
        loadPickupFee() {
            this.statusLoad = true
            PickupFeeService.getById().then(
                (response) => {
                    this.fees = response.data.data
                    this.statusLoad = false
                },
                (error) => {
                    this.statusLoad = false
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            )
        }
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>