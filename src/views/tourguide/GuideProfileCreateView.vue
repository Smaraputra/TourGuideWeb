<template>
    <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-12">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">
                                    <div class="text-center">
                                        <h1 class="mt-1 mb-5 pb-1 color-main"><strong>Tour Guide Profile</strong></h1>
                                    </div>
                                    <Form @submit="handleProfileCreate" :validation-schema="schema">
                                        <h4>Welcome!</h4>
                                        <p>Fill the form down below to finish creating your Tour Guide account.</p>
                                        <div>
                                            <div class="form-outline mb-4">
                                                <label for="id_tour_agents">Affiliated Tour Agent</label>
                                                <Field name="id_tour_agents" as="select" class="form-select">
                                                    <option disabled selected value>-Affiliated Tour Agent-</option>
                                                    <option v-for="(agent, index) in agents" :key="index" :value="agent.id_tour_agents">
                                                        {{agent.agent_name}}
                                                    </option>
                                                </Field>
                                            </div>
                                            <div class="form-outline mb-4">
                                                <label for="description">Professional Summary</label>
                                                <Field name="description" type="text" class="form-control" />
                                                <ErrorMessage name="description" class="error-feedback" />
                                            </div>
                                            <div class="form-group">
                                                <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
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
    </section>
</template>

<style scoped>
    section  {
        background-image: url("../../assets/image/login/login.jpg");
    }
</style>

<script>
import TourAgentService from "../../services/tour-agent.service";
import TourGuideService from "../../services/tour-guide.service";
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
            id_tour_agents: yup
                .string()
                .notOneOf(['-Affiliated Tour Agent-'], 'Account type is required!'),
            description: yup
                .string()
                .required("Summary is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
        });

        return {
            id: "",
            agents: [],
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
        TourAgentService.getVerifiedTourAgent().then(
            (response) => {
                this.agents = response.data.data
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
    },
    methods: {
        handleProfileCreate(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourGuideService.createProfile(schema,this.id).then(
                () => {
                    this.message = "Tour guide profile successfully created.";
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
                        'Your tour guide account creation is not complete.',
                        'error'
                    )
                }
            );
        },
    },
};
</script>