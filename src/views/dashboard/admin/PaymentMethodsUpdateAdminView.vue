<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/payment-method">
                            <strong>Payment Methods</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Payment Methods Detail</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Payment Methods Detail</h5>
        </div>
        <div class="card-body">
            <Form @submit="updateMethod" :validation-schema="schema">
                <div v-if="methods">
                    <div class="form-outline mb-4">
                        <label for="method">Payment Method</label>
                        <Field name="method" type="text" class="form-control" v-model="methods.method"/>
                        <ErrorMessage name="method" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description">Description</label>
                        <Field as="textarea" name="description" type="multiline" class="form-control" v-model="methods.description"/>
                        <ErrorMessage name="description" class="error-feedback text-danger" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData(methods.id_payment_methods)">
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
                .max(2048, "Must be maximum 2048 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            methods: null,
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
                            this.$router.push("/dashboard/payment-method");
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
        updateMethod(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            PaymentMethodsService.update(schema, this.$route.params.id_payment_methods).then(
                (data) => {
                    this.message = "Payment method : " + data.data.method + " successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Payment method successfully updated.',
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
                        'Payment method is not updated.',
                        'error'
                    )
                }
            );
        },
        loadPaymentMethod() {
            PaymentMethodsService.getOneById(this.$route.params.id_payment_methods).then(
                (response) => {
                    this.methods = response.data
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