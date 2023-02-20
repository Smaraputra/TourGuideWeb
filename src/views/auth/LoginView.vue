<template>
    <section id="common_banner">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="common_bannner_text">
                        <h2>Login Page</h2>
                        <ul>
                            <li><router-link to="/">Home</router-link></li>
                            <li><span><font-awesome-icon icon="circle" /></span>Login</li>
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
                            <h2>Login your account</h2>
                            <h3 class="mt-2">Please login using your account to continue.</h3>
                        </div>
                        <div class="common_author_form">
                            <Form @submit="handleLogin" :validation-schema="schema">                                
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

                                <div class="common_form_submit pt-4">
                                    <button class="btn btn_theme btn_md" :disabled="loading">
                                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                        <font-awesome-icon icon="sign-in-alt" /><span> Login</span>
                                    </button>
                                </div>
                            
                                <div class="form-group mt-2">
                                    <div v-if="message" class="alert alert-danger" role="alert">
                                        {{ message }}
                                    </div>
                                </div>

                                <div class="have_acount_area">
                                    <p>Dont have an account? <router-link to="/register">Register now</router-link></p>
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
                                    <p class="text-white">We provide the best services for both tour agents and guide to offer their product and services across the country.</p>
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
                    (data) => {
                        const Toast = this.$swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully.'
                        })
                        
                        if(data.role_id==1){
                            this.$router.push("/dashboard");
                        }else if(data.role_id==2){
                            this.$router.push("/dashboard");
                        }else if(data.role_id==3){
                            this.$router.push("/dashboard");
                        }else if(data.role_id==4){
                            this.$router.push("/packages");
                        }
                        
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