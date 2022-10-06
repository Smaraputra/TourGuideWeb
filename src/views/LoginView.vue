<template>
    <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">
                                    <div class="text-center">
                                        <!-- <img src="../assets/logo.png" href="/" style="width: 185px;" alt="logo"> -->
                                        <h1 class="mt-1 mb-5 pb-1 color-main"><strong>Login</strong></h1>
                                    </div>
                                    <Form @submit="handleLogin" :validation-schema="schema">
                                        <h4>Welcome!</h4>
                                        <p>Please login using your account.</p>
                                        
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <Field name="email" type="text" class="form-control" />
                                            <ErrorMessage name="email" class="error-feedback" />
                                        </div>

                                        <div class="form-group pt-4">
                                            <label for="password">Password</label>
                                            <Field name="password" type="password" class="form-control" />
                                            <ErrorMessage name="password" class="error-feedback" />
                                        </div>

                                        <div class="form-group pt-4">
                                            <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
                                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                                <font-awesome-icon icon="sign-in-alt" /><span> Login</span>
                                            </button>
                                        </div>
                                    
                                        <div class="form-group mt-2">
                                            <div v-if="message" class="alert alert-danger" role="alert">
                                                {{ message }}
                                            </div>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center mt-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <a href="/register">
                                                <button type="button"  class="btn btn-primary text-white color-main-background">Create Account</button>
                                            </a>
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
    </section>
</template>

<style scoped>
    section  {
        background-image: url("../assets/login/image/login.jpg");
    }
    .gradient-custom-2 {
        background: #fccb90;
        background: -webkit-linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
        background: linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
    }
    .color-main-background {
        background-color: #184fa7;
    }

    /* @media (min-width: 768px) {
        .gradient-form {
            height: 100vh !important;
        }
    }

    @media (min-width: 769px) {
        .gradient-custom-2 {
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
        }
    } */
</style>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as yup from "yup";

    export default {
        name: "LoginUser",
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        data() {
            const schema = yup.object().shape({
                email: yup.string().required("Email is required!"),
                password: yup.string().required("Password is required!"),
            });

            return {
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
        created() {
            if (this.loggedIn) {
                this.$router.push("/");
            }
        },
        methods: {
            handleLogin(user) {
                this.loading = true;

                this.$store.dispatch("login", user).then(
                    () => {
                        this.$router.push("/");
                    },
                    (error) => {
                        this.loading = false;
                        this.message =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                    }
                );
            },
        },
    };
</script>