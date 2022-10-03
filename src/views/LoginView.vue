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
                                    <form>
                                        <h4>Welcome!</h4>
                                        <p>Please login using your account.</p>
                                        <div class="form-outline mb-4" style="margin-top=5px">
                                            <label class="form-label" for="form2Example11">Email Address</label>
                                            <input type="email" id="form2Example11" class="form-control" placeholder="Your email" v-model="username"/>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example22">Password</label>
                                            <input type="password" id="form2Example22" class="form-control" placeholder="Your password" v-model="password"/>
                                        </div>
    
                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-primary w-100 fa-lg gradient-custom-2 mb-3" @click="login" type="button">Login</button>
                                        </div>
    
                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <a href="/register">
                                                <button type="button"  class="btn btn-primary gradient-custom-2 text-white">Create Account</button>
                                            </a>
                                        </div>
                                    </form>
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

    @media (min-width: 768px) {
        .gradient-form {
            height: 100vh !important;
        }
    }

    @media (min-width: 769px) {
        .gradient-custom-2 {
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
        }
    }
</style>

<script>
    import AuthService from '@/services/AuthService.js';
    export default {
        data() {
            return {
                username: '',
                password: '',
                msg: ''
            };
        },
        methods: {
            async login() {
                try {
                    const credentials = {
                        username: this.username,
                        password: this.password
                    };
                    const response = await AuthService.login(credentials);
                    this.msg = response.msg;
                    const token = response.token;
                    const user = response.user;
                    this.$store.dispatch('login', { token, user });
                    this.$router.push('/');
                } catch (error) {
                    this.msg = error.response.data.msg;
                }
            }
        }
    };
</script>