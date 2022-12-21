<template>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Payment Methods</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="methods || methods.length">
                                <tr v-for="(method, index) in methods" :key="index">
                                    <td style="width: 50px">{{ index + 1 }}</td>
                                    <td>{{ method.method }}</td>
                                    <td>{{ method.description }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-success">
                                                <font-awesome-icon icon="pencil" />
                                            </button>
                                        </div>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger"
                                                @click="deleteData(method.id_payment_methods)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!methods || !methods.length">
                                <tr>
                                    <td colspan="4" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Tour Package Category</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addCategory" :validation-schema="schema">
                        <p>Fill the form down below to add new tour package category.</p>
                        <div>
                            <div class="form-outline mb-4">
                                <label for="method">Payment Method</label>
                                <Field name="method" type="text" class="form-control" />
                                <ErrorMessage name="method" class="error-feedback" />
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageCategoryAdminView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            method: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        return {
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
        if (this.currentUser.role_id != 1) {
            this.$router.push("/dashboard");
        }
        this.loadPaymentMethod()
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
                    PaymentMethodsService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Payment method successfully deleted.',
                                'success'
                            )
                            this.loadPaymentMethod()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Payment method is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        addCategory(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            PaymentMethodsService.store(schema).then(
                (data) => {
                    this.message = "New payment method : " + data.data.method + " successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New payment method successfully created.',
                        'success'
                    )
                    this.loadPaymentMethod()
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
                        'Payment method is not created.',
                        'error'
                    )
                }
            );
        },
        loadPaymentMethod() {
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