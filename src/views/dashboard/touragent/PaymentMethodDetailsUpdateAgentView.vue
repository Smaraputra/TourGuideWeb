<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/payment-detail">
                            <strong>Payment Method Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Payment Method Detail</strong>
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
            <Form @submit="updateDetail" :validation-schema="schema">
                <div v-if="details">
                    <div class="form-outline mb-4" v-if="methods || methods.length">
                        <label for="id_payment_methods">Payment Methods</label>
                        <Field name="id_payment_methods" as="select" class="form-control form-select" v-model="details.id_payment_methods">
                            <option disabled selected value>-Payment Methods-</option>
                            <option v-for="(method, index) in methods" :key="index"
                                :value="method.id_payment_methods">
                                {{ method.method }}
                            </option>
                        </Field>
                    </div>
                    <div class="form-outline mb-4">
                        <label for="payment_number">Payment Number/ID</label>
                        <Field name="payment_number" type="text" class="form-control" v-model="details.payment_number"/>
                        <ErrorMessage name="payment_number" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description">Description</label>
                        <Field as="textarea" name="description" type="multiline" class="form-control" v-model="details.description"/>
                        <ErrorMessage name="description" class="error-feedback text-danger" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData(details.id_payment_method_details)">
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
                .notOneOf(['-Payment Methods-'], 'Payment method is required!'),
            payment_number: yup
                .string()
                .required("Payment Number/ID is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            details: [],
            methods: [],
            statusLoad: false,
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
                            this.$router.push("/dashboard/payment-detail");
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
        updateDetail(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            PaymentMethodDetailsService.update(schema, this.$route.params.id_payment_method_details).then(
                () => {
                    this.message = "Payment method detail successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Payment method detail successfully updated.',
                        'success'
                    )
                    this.loadMethod()
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
                        'Payment method detail is not updated.',
                        'error'
                    )
                }
            );
        },
        loadMethod() {
            Promise.all([
                PaymentMethodsService.getAll(),
                PaymentMethodDetailsService.getOneById(this.$route.params.id_payment_method_details),
            ]).then((response) => {
                this.statusLoad = true
                const [method, detail] = response
                console.log(response)
                if(method.data.data != null){
                    this.methods = method.data.data
                }
                if(detail.data != null){
                    this.details = detail.data
                    console.log(detail.data)
                }
            })
        }
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>