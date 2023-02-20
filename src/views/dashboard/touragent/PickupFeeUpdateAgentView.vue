<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/pickup-fee">
                            <strong>Pickup Fee</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Pickup Fee Detail</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Pickup Fee Detail</h5>
        </div>
        <div class="card-body">
            <Form @submit="updateFee" :validation-schema="schema">
                <div v-if="fees">
                    <div class="form-outline mb-4">
                        <label for="distance">Distances in Kilometer(Km)</label>
                        <Field name="distance" type="text" class="form-control" v-model="fees.distance"/>
                        <ErrorMessage name="distance" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="fee">Additional Fee</label>
                        <Field name="fee" type="multiline" class="form-control" v-model="fees.fee"/>
                        <ErrorMessage name="fee" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData(fees.id_pickup_fees)">
                            <font-awesome-icon icon="trash" /><span> Delete </span>
                        </a>
                    </div>
                </div>
                <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                    {{ message }}
                </div>
            </Form>
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

        return {
            fees: null,
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
                            this.$router.push("/dashboard/pickup-fee")
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
        updateFee(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            PickupFeeService.update(schema, this.$route.params.id_pickup_fees).then(
                (data) => {
                    this.message = "Pickup fee of Rp. " + data.data.fee + " for " + data.data.distance + "Km successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Pickup fee successfully updated.',
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
                        'Pickup fee is not updated.',
                        'error'
                    )
                }
            );
        },
        loadPickupFee() {
            PickupFeeService.getOneById(this.$route.params.id_pickup_fees).then(
                (response) => {
                    this.fees = response.data
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
        }
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>