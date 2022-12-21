<template>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Payment Method Details</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Payment Method</th>
                                    <th>Payment Number/ID</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody v-if="details || details.length">
                                <tr v-for="(detail, index) in details" :key="index">
                                    <td style="width: 50px">{{ index + 1 }}</td>
                                    <td>{{ detail.payment_method.method }}</td>
                                    <td>{{ detail.payment_number }}</td>
                                    <td>{{ detail.description }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-success">
                                                <font-awesome-icon icon="pencil" />
                                            </button>
                                        </div>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger" @click="deleteData(detail.id_payment_method_details)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!details || !details.length">
                                <tr>
                                    <td colspan="4" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Pickup Fee</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addDetail" :validation-schema="schema">
                        <p>Fill the form down below to add new pickup fee.</p>
                        <div>
                            <div class="form-outline mb-4" v-if="methods || methods.length">
                                <label for="id_payment_methods">Payment Methods</label>
                                <Field name="id_payment_methods" as="select" class="form-select">
                                    <option disabled selected value>-Payment Methods-</option>
                                    <option v-for="(method, index) in methods" :key="index"
                                        :value="method.id_payment_methods">
                                        {{ method.method }}
                                    </option>
                                </Field>
                            </div>
                            <div class="form-outline mb-4">
                                <label for="payment_number">Payment Number/ID</label>
                                <Field name="payment_number" type="text" class="form-control" />
                                <ErrorMessage name="payment_number" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="description">Description</label>
                                <Field as="textarea" name="description" type="multiline" class="form-control" />
                                <ErrorMessage name="description" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
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
import PaymentMethodsService from "../../../services/payment-method.service";
import PaymentMethodDetailsService from "../../../services/payment-method-detail.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "PaymentMethodDetailAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            id_payment_methods: yup
                .string()
                .required("Distance is required!"),
            payment_number: yup
                .string()
                .required("Payment Number/ID is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        return {
            details: [],
            methods: [],
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
        this.loadPaymentMethodDetail()
        this.loadMethod()
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
                    PaymentMethodDetailsService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Payment method detail successfully deleted.',
                                'success'
                            )
                            this.loadPaymentMethodDetail()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Payment method detail is not deleted.',
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

            PaymentMethodDetailsService.store(schema).then(
                () => {
                    this.message = "New payment method detail successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New payment method detail successfully created.',
                        'success'
                    )
                    this.loadPaymentMethodDetail()
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
                        'Payment method detail is not created.',
                        'error'
                    )
                }
            );
        },
        loadPaymentMethodDetail() {
            PaymentMethodDetailsService.indexTourAgent().then(
                (response) => {
                    this.details = response.data.data
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
        loadMethod() {
            PaymentMethodsService.getAll().then(
                (response) => {
                    this.methods = response.data.data
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