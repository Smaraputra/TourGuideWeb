<template>
    <div class="row" v-if="activities && activities.package_detail">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/tour-package">
                            <strong>Tour Package</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link
                            :to="{ name: 'tour-package-see', params: { id_tour_packages: activities.package_detail.id_tour_packages } }">
                            <strong>Tour Package Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link
                        :to="{ name: 'tour-package-detail-see', params: { id_package_details: activities.id_package_details } }">
                            <strong>Tour Activity - Facility Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Tour Activitiy</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4" v-if="activities">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Activity</h5>
        </div>
        <div class="card-body">
            <Form @submit="updateActivity" :validation-schema="schema">
                <div>
                    <div class="form-outline mb-4">
                        <label for="start_time">Start Time</label>
                        <Field name="start_time" type="time" class="form-control" v-model="activities.start_time"/>
                        <ErrorMessage name="start_time" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="end_time">End Time</label>
                        <Field name="end_time" type="time" class="form-control" v-model="activities.end_time"/>
                        <ErrorMessage name="end_time" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="location">Location</label>
                        <Field name="location" type="text" class="form-control" v-model="activities.location"/>
                        <ErrorMessage name="location" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="activity">Activitiy</label>
                        <Field as="textarea" name="activity" type="text" class="form-control" v-model="activities.activity"/>
                        <ErrorMessage name="activity" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData(activities.id_tour_activities)">
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
import TourPackageActivitiesService from "../../../services/tour-package-activities.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageActivitiesUpdateAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            start_time: yup
                .string()
                .required("Start time is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            end_time: yup
                .string()
                .required("End time is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            location: yup
                .string()
                .required("Location is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            activity: yup
                .string()
                .required("Activity is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            activities: null,
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
        this.loadTourActivity()
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
                    TourPackageActivitiesService.delete(id, this.activities.package_detail.id_tour_packages, this.activities.id_package_details).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Tour activity successfully deleted.',
                                'success'
                            )
                            this.$router.push({ name: 'tour-package-detail-see', params: { id_package_details: this.activities.id_package_details } })
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Tour activity is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        updateActivity(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourPackageActivitiesService.update(schema, this.activities.package_detail.id_tour_packages, this.activities.id_package_details, this.$route.params.id_tour_activities).then(
                (data) => {
                    this.message = "Tour activity of " + data.data.activity + " successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Tour activity successfully updated.',
                        'success'
                    )
                    this.loadTourActivity()
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
                        'Tour activity is not updated.',
                        'error'
                    )
                }
            );
        },
        loadTourActivity() {
            TourPackageActivitiesService.getOneById(this.$route.params.id_tour_activities).then(
                (response) => {
                    this.activities = response.data
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