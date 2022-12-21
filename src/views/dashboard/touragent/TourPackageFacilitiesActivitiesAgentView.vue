<template>
    <div class="row" v-if="tourpackagesdetails">
        <div class="col">
        <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
            <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
                <router-link to="/dashboard/tour-package">
                <strong>Tour Package</strong>
                </router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link :to="{ name: 'tour-package-see', params: { id_tour_packages: this.tourpackagesdetails.id_tour_packages }}">
                <strong>Tour Package Detail</strong>
                </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                <strong>Tour Package Detail</strong>
            </li>
            </ol>
        </nav>
        </div>
    </div>
    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Package Detail</h5>
        </div>
        <div class="card-body">
            <Form @submit="updatePackageDetail" :validation-schema="schemaDetail" >
                <div v-if="tourpackagesdetails" class="row">
                    <div class="col-md-4">
                        <img v-if="tourpackagesdetails.image_package_detail != null" :src="tourpackagesdetails.image_package_detail" alt="" class="card-img-top mt-2 rounded img">
                        <img v-else src="../../../assets/image/home/image_placeholder.png" alt="" class="card-img-top mt-2 rounded img">
                        <div class="form-outline mb-4">
                        <label for="image_package_detail " class="mt-2">Package Detail Image</label>
                        <Field name="image_package_detail ">
                            <input name="image_package_detail " type="file" v-on:change="onChange" class="form-control" accept="image/*" />
                        </Field>
                        <ErrorMessage name="image_package_detail " class="error-feedback" />
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-outline mb-4" v-if="destinations || destinations.length">
                            <label for="id_tourist_destinations">Tour Destination</label>
                            <Field name="id_tourist_destinations" as="select" class="form-select" v-model="tourpackagesdetails.id_tourist_destinations">
                                <option disabled selected value>-Tour Destinations-</option>
                                <option v-for="(destination, index) in destinations" :key="index"
                                    :value="destination.id_tourist_destinations"
                                    :selected="destination.id_tourist_destinations">
                                    {{ destination.name }}
                                </option>
                            </Field>
                        </div>
                        <div class="form-outline mb-4">
                            <label for="day">Day (Number)</label>
                            <Field name="day" type="number" class="form-control" 
                                :value="tourpackagesdetails.day" />
                            <ErrorMessage name="day" class="error-feedback" />
                        </div>
                        <div class="form-outline mb-4">
                            <label for="tour_sequence">Tour Sequence</label>
                            <Field name="tour_sequence" type="number" class="form-control"
                                :value="tourpackagesdetails.tour_sequence" />
                            <ErrorMessage name="tour_sequence" class="error-feedback" />
                        </div>
                        <div class="form-outline mb-4">
                            <label for="duration">Duration</label>
                            <Field name="duration" type="time" class="form-control"
                                :value="tourpackagesdetails.duration" />
                            <ErrorMessage name="duration" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary btn-block color-main-background me-2" :disabled="loading">
                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                <font-awesome-icon icon="check" /><span> Update </span>
                            </button>
                            <a class="btn btn-danger me-2"
                                @click="deleteDataPackagesDetail(tourpackagesdetails.id_tour_packages)">
                                <font-awesome-icon icon="trash" /><span> Delete </span>
                            </a>
                        </div>
                        <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                            {{ message }}
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6 mt-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Tour Packages Activities</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Location</th>
                                    <th>Activitiy</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="tourpackagesactivities || tourpackagesactivities.length">
                                <tr v-for="(tourpackagesactivitie, index) in tourpackagesactivities" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ tourpackagesactivitie.start_time }}</td>
                                    <td>{{ tourpackagesactivitie.end_time }}</td>
                                    <td>{{ tourpackagesactivitie.location }}</td>
                                    <td>{{ tourpackagesactivitie.activity }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <router-link to="#">
                                                <button class="btn btn-success">
                                                    <font-awesome-icon icon="pencil" />
                                                </button>
                                            </router-link>
                                        </div>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger" @click="deleteDataPackagesActivities(tourpackagesactivitie.id_tour_activities)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!tourpackagesactivities || !tourpackagesactivities.length">
                                <tr>
                                    <td colspan="6" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mt-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Tour Package Activitiy</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addPackageActivity" :validation-schema="schemaActivity">
                        <p>Fill the form down below to add new tour package activity.</p>
                        <div>
                            <div class="form-outline mb-4">
                                <label for="start_time">Start Time</label>
                                <Field name="start_time" type="time" class="form-control" />
                                <ErrorMessage name="start_time" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="end_time">End Time</label>
                                <Field name="end_time" type="time" class="form-control" />
                                <ErrorMessage name="end_time" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="location">Location</label>
                                <Field name="location" type="text" class="form-control" />
                                <ErrorMessage name="location" class="error-feedback" />
                            </div>
                            <div class="form-outline mb-4">
                                <label for="activity">Activitiy</label>
                                <Field as="textarea" name="activity" type="text" class="form-control" />
                                <ErrorMessage name="activity" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block color-main-background" :disabled="loading2">
                                    <span v-show="loading2" class="spinner-border spinner-border-sm"></span>
                                    <font-awesome-icon icon="plus" /><span> Add New</span>
                                </button>
                            </div>
                        </div>
                        <div v-if="message2" class="alert mt-2" :class="successful2 ? 'alert-success' : 'alert-danger'">
                            {{ message2 }}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        <div class="col-md-6 mt-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Manage Tour Packages Facility</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Facility</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="tourpackagesfacilities || tourpackagesfacilities.length">
                                <tr v-for="(tourpackagesfacility, index) in tourpackagesfacilities" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ tourpackagesfacility.facilities }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <router-link to="#">
                                                <button class="btn btn-success">
                                                    <font-awesome-icon icon="pencil" />
                                                </button>
                                            </router-link>
                                        </div>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-danger"
                                                @click="deleteDataPackagesFacilities(tourpackagesfacility.id_package_facilities)">
                                                <font-awesome-icon icon="trash" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!tourpackagesfacilities || !tourpackagesfacilities.length">
                                <tr>
                                    <td colspan="3" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mt-4">
            <div class="card shadow">
                <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold color-main">Add Tour Package Facility</h5>
                </div>
                <div class="card-body">
                    <Form @submit="addPackageFacility" :validation-schema="schemaFacility">
                        <p>Fill the form down below to add new tour package facility.</p>
                        <div>
                            <div class="form-outline mb-4">
                                <label for="facilities">Facility</label>
                                <Field name="facilities" type="text" class="form-control" />
                                <ErrorMessage name="facilities" class="error-feedback" />
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block color-main-background" :disabled="loading3">
                                    <span v-show="loading3" class="spinner-border spinner-border-sm"></span>
                                    <font-awesome-icon icon="plus" /><span> Add New</span>
                                </button>
                            </div>
                        </div>
                        <div v-if="message3" class="alert mt-2" :class="successful3 ? 'alert-success' : 'alert-danger'">
                            {{ message3 }}
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import TourPackageDetailService from "../../../services/tour-package-detail.service";
import TourDestinationService from "../../../services/tour-destination.service";
import TourPackageActivitiesService from "../../../services/tour-package-activities.service";
import TourPackageFacilitiesService from "../../../services/tour-package-facilities.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageFacilitiesActivitiesAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schemaDetail = yup.object().shape({
            day: yup
                .number()
                .required("Day is required!")
                .min(1, "Must be at least 1!"),
            id_tourist_destinations: yup
                .string()
                .notOneOf(['-Tour Destinations-'], 'Tourist destination is required!'),
            tour_sequence: yup
                .number()
                .required("Tour sequence is required!")
                .min(1, "Must be at least 1!"),
            duration: yup
                .string()
                .required("Duration is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        const schemaFacility = yup.object().shape({
            facilities: yup
                .string()
                .required("Facility is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        const schemaActivity = yup.object().shape({
            start_time: yup
                .string()
                .required("Start time is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            end_time: yup
                .string()
                .required("End time is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            location: yup
                .string()
                .required("Location is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            activity: yup
                .string()
                .required("Activity is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            successful2: false,
            loading2: false,
            message2: "",
            successful3: false,
            loading3: false,
            message3: "",
            schemaActivity,
            schemaDetail,
            schemaFacility,
            file: null,
            tourpackagesdetails: null,
            tourpackagesfacilities: [],
            tourpackagesactivities: [],
            destinations: [],
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
        this.loadDestination(),
        this.loadPackageDetailId()
        this.loadPackageActivitiyId(),
        this.loadPackageFacilitiesId()
        this.moment = moment
    },
    methods: {
        onChange(e) {
            this.file = e.target.files[0];
        },
        addPackageActivity(schemaActivity) {
            this.message2 = "";
            this.successful2 = false;
            this.loading2 = true;

            TourPackageActivitiesService.store(schemaActivity, this.tourpackagesdetails.id_tour_packages, this.$route.params.id_package_details).then(
                () => {
                this.message2 = "New package activity successfully created.";
                this.successful2 = true;
                this.loading2 = false;
                this.$swal.fire(
                    'Success!',
                    'New package activity successfully created.',
                    'success'
                )
                this.loadPackageActivitiyId()
                },
                (error) => {
                this.message2 =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful2 = false;
                this.loading2 = false;
                this.$swal.fire(
                    'Fail!',
                    'Package activity is not created.',
                    'error'
                )
                }
            );
        },
        addPackageFacility(schemaFacility) {
            this.message3 = "";
            this.successful3 = false;
            this.loading3 = true;

            TourPackageFacilitiesService.store(schemaFacility, this.tourpackagesdetails.id_tour_packages, this.$route.params.id_package_details).then(
                () => {
                this.message3 = "New package facility successfully created.";
                this.successful3 = true;
                this.loading3 = false;
                this.$swal.fire(
                    'Success!',
                    'New package facility successfully created.',
                    'success'
                )
                this.loadPackageFacilitiesId()
                },
                (error) => {
                this.message3 =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
                this.successful3 = false;
                this.loading3 = false;
                this.$swal.fire(
                    'Fail!',
                    'Package facility is not created.',
                    'error'
                )
                }
            );
        },
        updatePackageDetail(schemaDetail) {
            this.message = "";
            this.successful = false;
            this.loading = true;
            TourPackageDetailService.update(schemaDetail, this.tourpackagesdetails.id_package_details ,this.tourpackagesdetails.id_tour_packages, this.file).then(
                () => {
                this.message = "Package detail successfully updated.";
                this.successful = true;
                this.loading = false;
                this.$swal.fire(
                    'Success!',
                    'Package detail successfully updated.',
                    'success'
                )
                this.loadPackageDetailId()
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
                    'Package detail is not updated.',
                    'error'
                )
                }
            );
        },
        deleteDataPackagesDetail(id) {
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
                    TourPackageDetailService.delete(this.$route.params.id_package_details, id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Package detail successfully deleted.',
                                'success'
                            )
                            this.$router.push({ name: 'tour-package-see', params: { id_tour_packages: id } });
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Package detail is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        deleteDataPackagesActivities(id) {
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
                    TourPackageActivitiesService.delete(id, this.tourpackagesdetails.id_tour_packages, this.$route.params.id_package_details).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Package activity successfully deleted.',
                                'success'
                            )
                            this.loadPackageActivitiyId()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Package activity is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        deleteDataPackagesFacilities(id) {
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
                    TourPackageFacilitiesService.delete(id, this.tourpackagesdetails.id_tour_packages, this.$route.params.id_package_details).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Package facility successfully deleted.',
                                'success'
                            )
                            this.loadPackageFacilitiesId()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Package facility is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        loadDestination() {
            TourDestinationService.getAll().then(
                (response) => {
                    this.destinations = response.data.data
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
        loadPackageDetailId() {
            TourPackageDetailService.getById(this.$route.params.id_package_details).then(
                (response) => {
                    this.tourpackagesdetails = response.data
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
        loadPackageActivitiyId() {
            TourPackageActivitiesService.getById(this.$route.params.id_package_details).then(
                (response) => {
                    this.tourpackagesactivities = response.data
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
        loadPackageFacilitiesId() {
            TourPackageFacilitiesService.getById(this.$route.params.id_package_details).then(
                (response) => {
                    this.tourpackagesfacilities = response.data
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
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>