<template>
    <div class="card shadow">
      <div class="card-header p-3 text-center">
        <h5 class="m-0 font-weight-bold color-main">Manage Tour Destinations</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Address</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="destinations || destinations.length">
              <tr v-for="(destination, index) in destinations" :key="index">
                <td style="width: 50px">{{index+1}}</td>
                <td><img src="../../../assets/image/home/image_placeholder.png" style="width: 100px"></td>
                <!-- <td>{{destination.image_tourist_destination}}</td> -->
                <td>{{destination.name}}</td>
                <td>{{destination.description}}</td>
                <td>{{destination.address}}</td>
                <td>{{destination.latitude}}</td>
                <td>{{destination.longitude}}</td>
                <td>
                    <div style="width: 50px; height: 50px;">
                        <button class="btn btn-success"><font-awesome-icon icon="pencil" /></button>
                    </div>
                    <div style="width: 50px; height: 50px;">
                        <button class="btn btn-danger" @click="deleteData(destination.id_tourist_destinations)"><font-awesome-icon icon="trash" /></button>
                    </div>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="!destinations || !destinations.length">
                <tr>
                    <td colspan="7" class="text-center">Empty Data.</td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <div class="card shadow mt-4">
      <div class="card-header p-3 text-center">
        <h5 class="m-0 font-weight-bold color-main">Add Tour Destinations</h5>
      </div>
      <div class="card-body">
        <Form @submit="addDestination" :validation-schema="schema">
            <p>Fill the form down below to add new tour destination.</p>
            <div>
                <div class="form-outline mb-4">
                    <label for="name">Tour Destination Name</label>
                    <Field name="name" type="text" class="form-control" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>
                <div class="form-outline mb-4">
                    <label for="description">Description</label>
                    <Field as="textarea" name="description" type="multiline" class="form-control" />
                    <ErrorMessage name="description" class="error-feedback" />
                </div>
                <div class="form-outline mb-4">
                    <label for="address">Address</label>
                    <Field as="textarea" name="address" type="text" class="form-control" />
                    <ErrorMessage name="address" class="error-feedback" />
                </div>
                <GMapMap :center="center" :zoom="2" map-type-id="terrain" style="width: 100%; height: 500px" @click="mark">
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
                    <button class="btn btn-primary btn-block color-main-background" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <font-awesome-icon icon="plus" /><span> Add New</span>
                    </button>
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
                .max(255, "Must be maximum 255 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            address: yup
                .string()
                .required("Address is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
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
            destinations: [],
            lat: "",
            long: "",
            center: {lat: -8.409518, lng: 115.188919},
            markers: [
                {
                    id: 'thisMark',
                    position: {
                        lat: -8.409518, lng: 115.188919
                    },
                }
            ]
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
    },
    methods: {
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
                    TourDestinationService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Destination successfully deleted.',
                                'success'
                            )
                            this.loadDestination()
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
        addDestination(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourDestinationService.store(schema).then(
                (data) => {
                    this.message = "New destination : " + data.data.name + " successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New destination successfully created.',
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
                        'Destination is not created.',
                        'error'
                    )
                }
            );
        },
        loadDestination(){
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
        }
    },
    mounted() {

    },
};
</script>

<style scoped>
  .color-main-background {
      background: #184fa7;
  }
  .color-main {
    color: #184fa7;
  }
</style>