<template>
    <div class="row" v-if="facilities && facilities.package_detail">
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
                            :to="{ name: 'tour-package-see', params: { id_tour_packages: facilities.package_detail.id_tour_packages } }">
                            <strong>Tour Package Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item">
                        <router-link
                        :to="{ name: 'tour-package-detail-see', params: { id_package_details: facilities.id_package_details } }">
                            <strong>Tour Activity - Facility Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Tour Facility</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4" v-if="facilities">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Facility</h5>
        </div>
        <div class="card-body">
            <Form @submit="updateFacility" :validation-schema="schema">
                <div>
                    <div class="form-outline mb-4">
                        <label for="facilities">Facility</label>
                        <Field name="facilities" type="text" class="form-control" v-model="facilities.facilities"/>
                        <ErrorMessage name="facilities" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description_public">Description (Public)</label>
                        <Field as="textarea" name="description_public" type="text" class="form-control" v-model="facilities.description_public"/>
                        <ErrorMessage name="description_public" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description_agent">Note (Only Agent)</label>
                        <Field name="terms" class="form-control" v-model="facilities.description_agent">
                            <VueEditor v-model="facilities.description_agent" theme="snow"/>
                        </Field>
                        <ErrorMessage name="description_agent" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData(facilities.id_package_facilities)">
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
import { VueEditor } from "vue3-editor";
import TourPackageFacilitiesService from "../../../services/tour-package-facilities.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageFacilitiesUpdateAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
        VueEditor
    },
    data() {
        const schema = yup.object().shape({
            facilities: yup
                .string()
                .required("Facility is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            description_agent: yup
                .string()
                .nullable()
                .max(2048, "Must be maximum 2048 characters!"),
            description_public: yup
                .string()
                .nullable()
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            facilities: null,
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
                    TourPackageFacilitiesService.delete(id, this.facilities.package_detail.id_tour_packages, this.facilities.id_package_details).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Facility successfully deleted.',
                                'success'
                            )
                            this.$router.push({ name: 'tour-package-detail-see', params: { id_package_details: this.facilities.id_package_details } })
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Facility is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        updateFacility(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourPackageFacilitiesService.update(schema, this.facilities.package_detail.id_tour_packages, this.facilities.id_package_details, this.$route.params.id_package_facilities, this.facilities.description_agent).then(
                (data) => {
                    this.message = "Facility of " + data.data.facilities + " successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Facility successfully updated.',
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
                        'Facility is not updated.',
                        'error'
                    )
                }
            );
        },
        loadTourActivity() {
            TourPackageFacilitiesService.getOneById(this.$route.params.id_package_facilities).then(
                (response) => {
                    this.facilities = response.data
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