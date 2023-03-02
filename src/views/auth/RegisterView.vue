<template>
    <section id="common_banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="common_bannner_text">
                        <h2>Register Page</h2>
                        <ul>
                            <li><router-link to="/">Home</router-link></li>
                            <li><span><font-awesome-icon icon="circle" /></span>Register</li>
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
                            <h2>Register new account</h2>
                            <h3 class="mt-2">Create your account to continue.</h3>
                        </div>
                        <div class="mt-4">
                            <Form @submit="handleRegister" :validation-schema="schema">                                
                                <div class="form-group mb-4">
                                    <label for="name">Full Name</label>
                                    <Field name="name" type="text" class="form-control" />
                                    <ErrorMessage name="name" class="error-feedback" />
                                </div>
                                <div class="form-group mb-4">
                                    <label for="email">Email</label>
                                    <Field name="email" type="email" class="form-control" />
                                    <ErrorMessage name="email" class="error-feedback" />
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="form-group">
                                            <label for="password">Password</label>
                                            <Field name="password" type="password" class="form-control" />
                                            <ErrorMessage name="password" class="error-feedback" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="form-group">
                                            <label for="password_confirmed">Password Confirmation</label>
                                            <Field name="password_confirmed" type="password" class="form-control" />
                                            <ErrorMessage name="password_confirmed" class="error-feedback" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="form-group">
                                            <label for="phone">Phone Number</label>
                                            <Field name="phone" type="text" class="form-control" />
                                            <ErrorMessage name="phone" class="error-feedback" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <label for="id_roles">Account Type</label>
                                        <Field name="id_roles" as="select" class="form-control form-select">
                                            <option disabled selected value>-Account Type-</option>
                                            <option value="2">Tour Agent</option>
                                            <option value="3">Tour Guide</option>
                                            <option value="4">Tourist</option>
                                        </Field>
                                    </div>
                                </div>
                                <div class="form-group mb-4">
                                    <label for="address">Address</label>
                                    <Field name="address" type="text" class="form-control" />
                                    <ErrorMessage name="address" class="error-feedback" />
                                </div>

                                <div class="common_form_submit pt-4">
                                    <button class="btn btn_theme btn_md" :disabled="loading">
                                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                        <font-awesome-icon icon="user-plus" /><span> Register</span>
                                    </button>
                                </div>
                            
                                <div class="form-group mt-2">
                                    <div v-if="message" class="alert alert-danger" role="alert">
                                        {{ message }}
                                    </div>
                                </div>

                                <div class="have_acount_area">
                                    <p>Already have an account? <router-link to="/login">Login now</router-link></p>
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
                                        <h1 class="mt-1 mb-5 pb-1 color-main"><strong>Register</strong></h1>
                                    </div>
                                    <Form @submit="handleRegister" :validation-schema="schema">
                                        <h4>Welcome!</h4>
                                        <p>Fill the form down below to create your account.</p>
                                        <div>
                                            <div class="form-outline mb-4">
                                                <label for="name">Full Name</label>
                                                <Field name="name" type="text" class="form-control" />
                                                <ErrorMessage name="name" class="error-feedback" />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="email">Email</label>
                                                <Field name="email" type="email" class="form-control" />
                                                <ErrorMessage name="email" class="error-feedback" />
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-4">
                                                    <div class="form-outline">
                                                        <label for="password">Password</label>
                                                        <Field name="password" type="password" class="form-control" />
                                                        <ErrorMessage name="password" class="error-feedback" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-4">
                                                    <div class="form-outline">
                                                        <label for="password_confirmed">Password Confirmation</label>
                                                        <Field name="password_confirmed" type="password" class="form-control" />
                                                        <ErrorMessage name="password_confirmed" class="error-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 mb-4">
                                                    <div class="form-outline">
                                                        <label for="phone">Phone Number</label>
                                                        <Field name="phone" type="text" class="form-control" />
                                                        <ErrorMessage name="phone" class="error-feedback" />
                                                    </div>
                                                </div>
                                                <div class="col-md-6 mb-4">
                                                    <label for="id_roles">Account Type</label>
                                                    <Field name="id_roles" as="select" class="form-select">
                                                        <option disabled selected value>-Account Type-</option>
                                                        <option value="2">Tour Agent</option>
                                                        <option value="3">Tour Guide</option>
                                                        <option value="4">Tourist</option>
                                                    </Field>
                                                </div>
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="address">Address</label>
                                                <Field name="address" type="text" class="form-control" />
                                                <ErrorMessage name="address" class="error-feedback" />
                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
                                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                                    <font-awesome-icon icon="user-plus" /><span> Signup</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                                            {{ message }}
                                        </div>
                                    </Form>
                                    <div class="d-flex align-items-center justify-content-center mt-4">
                                        <p class="mb-0 me-2">Already have an account?</p>
                                        <a href="/login">
                                            <button type="button" class="btn btn-primary color-main-background text-white">Login</button>
                                        </a>
                                    </div>
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
            name: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            id_roles: yup
                .string()
                .notOneOf(['-Account Type-'], 'Account type is required!'),
            email: yup
                .string()
                .required("Email is required!")
                .email("Email is invalid!")
                .max(255, "Must be maximum 255 characters!"),
            password: yup
                .string()
                .required("Password is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            password_confirmed: yup
                .string()
                .required("Please retype your password.")
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/");
        }
    },
    methods: {
        handleRegister(user) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            this.$store.dispatch("register", user).then(
                (data) => {
                    this.message = "Account email: " + data.email + " successfully created.";
                    this.successful = true;
                    this.loading = false;
                    if(data.id_roles==2){
                        this.$swal.fire(
                            'Profil Incomplete',
                            'Log in and complete your registration on Tour Agent panel.',
                            'info'
                        )
                    }else if(data.id_roles==3){
                        this.$swal.fire(
                            'Hold Up!',
                            'Log in and complete your registration on Tour Guide panel.',
                            'info'
                        )
                    }else if(data.id_roles==4){
                        this.$swal.fire(
                            'Success!',
                            'Your account is successfully created.',
                            'success'
                        )
                        this.$router.push("/login");
                    }
                    this.$router.push("/login");
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
                        'Your account is not created.',
                        'error'
                    )
                }
            );
        },
    },
};
</script>