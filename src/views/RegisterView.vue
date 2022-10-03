<template>
    <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6 rounded-3 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">We are more than just tour packages provider.</h4>
                                    <p class="small mb-0">We provide the best services for both tour agents and guide to offer their product and services across the country.</p>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">
                                    <div class="text-center">
                                        <h1 class="mt-1 mb-5 pb-1 color-main"><strong>Register</strong></h1>
                                    </div>
                                    <form>
                                        <h4>Welcome!</h4>
                                        <p>Fill the form down below to create your account.</p>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example1">Full Name</label>
                                            <input type="text" id="form3Example1" class="form-control" v-model="name" />
                                        </div>
    
                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example3">Email</label>
                                                    <input type="email" id="form3Example3" class="form-control"
                                                        v-model="email" />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example4">Password</label>
                                                    <input type="password" id="form3Example4" class="form-control"
                                                        v-model="password" />
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example2">Phone Number</label>
                                            <input type="text" id="form3Example2" class="form-control" v-model="phone" />
                                        </div>
    
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example2">Address</label>
                                            <input type="text" id="form3Example2" class="form-control" v-model="address" />
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-primary w-100 fa-lg gradient-custom-2 mb-3" @click="signUp" type="button">Register</button>
                                        </div>
    
                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Already have an account?</p>
                                            <a href="/login">
                                                <button type="button"  class="btn btn-primary gradient-custom-2 text-white">Login</button>
                                            </a>
                                        </div>
                                    </form>
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
            password_repeat: '',
            msg: ''
        };
    },
    methods: {
        async signUp() {
            try {
                const credentials = {
                    username: this.username,
                    password: this.password,
                    password_repeat: this.password_repeat
                };
                const response = await AuthService.signUp(credentials);
                this.msg = response.msg;
            } catch (error) {
                this.msg = error.response.data.msg;
            }
        }
    }
};
</script>