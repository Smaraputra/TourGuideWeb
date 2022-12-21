<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/tour-destination">
                            <strong>Tour Destination</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Tour Destination Detail</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Tour Destination Detail</h5>
        </div>
        <div class="card-body">
            <Form @submit="updateDestination" :validation-schema="schema">
                <div class="row" v-if="destinations">
                    <div class="col-md-6">
                        <div class="form-outline mb-4">
                            <img v-if="destinations.image_tourist_destination != null" :src="destinations.image_tourist_destination" alt="" class="card-img-top mt-2 rounded img">
                            <img v-else src="../../../assets/image/home/image_placeholder.png" alt="" class="card-img-top mt-2 rounded img">
                            <label for="image_tourist_destination" class="mt-2">Cover Image</label>
                            <Field name="image_tourist_destination">
                                <input name="image_tourist_destination" type="file" v-on:change="onChange" class="form-control" accept="image/*" />
                            </Field>
                            <ErrorMessage name="image_tourist_destination" class="error-feedback" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-outline mb-4">
                            <label for="name">Tour Destination Name</label>
                            <Field name="name" type="text" class="form-control" :value="destinations.name" />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                        <div class="form-outline mb-4">
                            <label for="description">Description</label>
                            <Field as="textarea" name="description" type="multiline" class="form-control" :value="destinations.description"/>
                            <ErrorMessage name="description" class="error-feedback" />
                        </div>
                        <div class="form-outline mb-4">
                            <label for="address">Address</label>
                            <Field as="textarea" name="address" type="text" class="form-control" :value="destinations.address" />
                            <ErrorMessage name="address" class="error-feedback" />
                        </div>
                    </div>
                    <GMapMap :center="center" :zoom="2" map-type-id="terrain" style="width: 100%; height: 400px" @click="mark">
                        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true"
                            @click="center=m.position" />
                    </GMapMap>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-outline mb-4">
                                <label for="latitude">Latitude</label>
                                <Field name="latitude" id="latIn" type="text" class="form-control" v-model="lat" disabled/>
                                <ErrorMessage name="latitude" class="error-feedback" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-outline mb-4">
                                <label for="longitude">Longitude</label>
                                <Field name="longitude" id="longIn" type="text" class="form-control" v-model="long" disabled/>
                                <ErrorMessage name="longitude" class="error-feedback" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block color-main-background me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2"
                            @click="deleteData">
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
import moment from 'moment'
import TourDestinationService from "../../../services/tour-destination.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourDestinationAdminView",
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
                .max(1024, "Must be maximum 1024 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            address: yup
                .string()
                .required("Address is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            latitude: yup
                .string()
                .required("Latitude is required!"),
            longitude: yup
                .string()
                .required("Longitude is required!"),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            schema,
            destinations: null,
            lat: "",
            long: "",
            file: null,
            center: {lat: -8.409518, lng: 115.188919},
            markers: []
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
        if (this.currentUser.role_id!=1) {
            this.$router.push("/dashboard");
        }
        this.loadDestination()
        this.moment = moment
    },
    methods: {
        onChange(e) {
            this.file = e.target.files[0];
        },
        mark(event) {
            this.markers=[
                {
                    id: 'thisMark',
                    position: {
                        lat: event.latLng.lat(), lng: event.latLng.lng()
                    },
                }
            ]
            this.lat=event.latLng.lat()
            this.long=event.latLng.lng()
        },
        loadMarkerData() {
            const post = {
                lat: this.destinations.latitude,
                lng: this.destinations.longitude
            }
            const mark = {
                id: this.destinations.id_tourist_destinations,
                position: post,
            }
            this.markers.push(mark);
        },
        deleteData() {
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
                    TourDestinationService.delete(this.$route.params.id_tourist_destinations).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Destination successfully deleted.',
                                'success'
                            )
                            this.$router.push("/dashboard/tour-destination");
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Destination is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        updateDestination(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourDestinationService.update(schema, this.file, this.$route.params.id_tourist_destinations).then(
                (data) => {
                    this.message = "Destination : " + data.data.name + " successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Destination successfully updated.',
                        'success'
                    )
                    this.loadDestination()
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
                        'Destination is not updated.',
                        'error'
                    )
                }
            );
        },
        loadDestination(){
            TourDestinationService.getOneById(this.$route.params.id_tourist_destinations).then(
                (response) => {
                    this.destinations = response.data
                    this.lat = this.destinations.latitude
                    this.long = this.destinations.longitude
                    this.markers = []
                    this.loadMarkerData()
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