<template>
    <section id="common_banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="common_bannner_text">
                        <h2>Profile Filling Page</h2>
                        <ul>
                            <li><router-link to="/">Home</router-link></li>
                            <li><span><font-awesome-icon icon="circle" /></span>Profile Filling</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section id="common_author_area" class="mt-5">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <div class="common_author_boxed">
                        <div class="common_author_heading">
                            <h2>Tour Agent Profile</h2>
                            <h3 class="mt-2">Fill the required field to complete your registration.</h3>
                        </div>
                        <div class="common_author_form">
                            <Form @submit="handleProfileCreate" :validation-schema="schema">
                                <div>
                                    <div class="form-outline mb-4">
                                        <label for="agent_name">Tour Agent Name</label>
                                        <Field name="agent_name" type="text" class="form-control" />
                                        <ErrorMessage name="agent_name" class="error-feedback text-danger" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label for="description">Tour Agent Description</label>
                                        <Field name="description" type="text" class="form-control" />
                                        <ErrorMessage name="description" class="error-feedback text-danger" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label for="email">Tour Agent Email</label>
                                        <Field name="email" type="email" class="form-control" />
                                        <ErrorMessage name="email" class="error-feedback text-danger" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label for="phone">Tour Agent Phone Number</label>
                                        <Field name="phone" type="number" class="form-control" />
                                        <ErrorMessage name="phone" class="error-feedback text-danger" />
                                    </div>
                                    <div class="form-outline mb-4">
                                        <label for="address">Tour Agent Address</label>
                                        <Field name="address" type="text" class="form-control" />
                                        <ErrorMessage name="address" class="error-feedback text-danger" />
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn_theme btn-block" :disabled="loading">
                                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                            <font-awesome-icon icon="user-plus" /><span> Finish</span>
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
        </div>
    </section>
    <!-- <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-12">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">
                                    <div class="text-center">
                                        <h1 class="mt-1 mb-5 pb-1 color-main"><strong>Tour Agent Profile</strong></h1>
                                    </div>
                                    <Form @submit="handleProfileCreate" :validation-schema="schema">
                                        <h4>Welcome!</h4>
                                        <p>Fill the form down below to finish creating your Tour Agent account.</p>
                                        <div>
                                            <div class="form-outline mb-4">
                                                <label for="agent_name">Tour Agent Name</label>
                                                <Field name="agent_name" type="text" class="form-control" />
                                                <ErrorMessage name="agent_name" class="error-feedback text-danger" />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="description">Description</label>
                                                <Field name="description" type="text" class="form-control" />
                                                <ErrorMessage name="description" class="error-feedback text-danger" />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="email">Email</label>
                                                <Field name="email" type="email" class="form-control" />
                                                <ErrorMessage name="email" class="error-feedback text-danger" />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="phone">Phone Number</label>
                                                <Field name="phone" type="text" class="form-control" />
                                                <ErrorMessage name="phone" class="error-feedback text-danger" />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="address">Address</label>
                                                <Field name="address" type="text" class="form-control" />
                                                <ErrorMessage name="address" class="error-feedback text-danger" />
                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn_theme btn-block" :disabled="loading">
                                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                                    <font-awesome-icon icon="user-plus" /><span> Finish</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                                            {{ message }}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                            <div class="col-lg-6 rounded-3 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">We are more than just tour packages provider.</h4>
                                    <p class="small mb-0">We provide the best services for both tour agents and guide to offer their product and services across the country.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
</template>

<style scoped>
    /* section  {
        background-image: url("../../assets/img/login/login.jpg");
    } */
</style>

<script>
import TourAgentService from "../../services/tour-agent.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    name: "RegisterUser",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            agent_name: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            description: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            email: yup
                .string()
                .required("Email is required!")
                .email("Email is invalid!")
                .max(255, "Must be maximum 255 characters!"),
            address: yup
                .string()
                .required("Address is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            phone: yup
                .number()
                .required("Phone number is required!"),
        });

        return {
            id: "",
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
        }
    },
    mounted() {
        if (!this.loggedIn) {
            this.$router.push("/");
        }
        if(this.currentUser){
            this.id=this.currentUser.id
        }
    },
    methods: {
        handleProfileCreate(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourAgentService.createProfile(schema,this.id).then(
                (data) => {
                    this.message = "Tour agent " + data.data.agent_name + " successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Your account is successfully created.',
                        'success'
                    )
                    this.$router.push("/");
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
                        'Your tour agent account creation is not complete.',
                        'error'
                    )
                }
            );
        },
    },
};
</script>