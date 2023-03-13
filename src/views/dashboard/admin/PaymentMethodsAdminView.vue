<template>
    <div class="row">
        <div class="col-md-8 mb-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Payment Methods</h5>
                </div>
                <div class="card-body">
                    <EasyDataTable
                        show-index
                        alternating
                        :headers="headers" 
                        :items="methods"
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
                                <div class="d-flex pr-2 pt-2 pb-2">
                                    <router-link class="btn btn-success"
                                        :to="{ name: 'payment-method-detail', params: { id_payment_methods: item.id_payment_methods }}">
                                        <font-awesome-icon icon="pencil" />
                                    </router-link>
                                    <button class="btn btn-danger mx-2"
                                        @click="deleteData(item.id_payment_methods)">
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
                                            <router-link style="width: 50px; height: 50px;" :to="{ name: 'payment-method-detail', params: { id_payment_methods: method.id_payment_methods }}">
                                                <button class="btn btn-success">
                                                    <font-awesome-icon icon="pencil" />
                                                </button>
                                            </router-link>
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
                    </div> -->
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Payment Methods</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addCategory" :validation-schema="schema">
                        <p class="mb-4">Fill the form down below to add new payment methods.</p>
                        <div>
                            <div class="form-outline mb-4">
                                <label for="method">Payment Method</label>
                                <Field name="method" type="text" class="form-control" />
                                <ErrorMessage name="method" class="error-feedback text-danger" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="description">Description</label>
                                <Field as="textarea" name="description" type="multiline" class="form-control" />
                                <ErrorMessage name="description" class="error-feedback text-danger" />
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
        const themeColor = "#184fa7";
        const headers = [
            { text: "Name", value: "method" },
            { text: "Description", value: "description" },
            { text: "Action", value: "action" },
        ];
        const schema = yup.object().shape({
            method: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            themeColor,
            headers,
            statusLoad: false,
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
            this.statusLoad = true
            PaymentMethodsService.getAll().then(
                (response) => {
                    this.statusLoad = false
                    this.methods = response.data.data
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