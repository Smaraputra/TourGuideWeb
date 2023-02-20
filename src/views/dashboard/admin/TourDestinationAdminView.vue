<template>
    <div class="card shadow">
      <div class="card-header p-3 text-center">
        <h5 class="m-0 font-weight-bold color-main">Manage Tour Destinations</h5>
      </div>
      <div class="card-body">
        <EasyDataTable
            show-index
            alternating
            :headers="headers" 
            :items="destinations"
            :theme-color="themeColor"
            buttons-pagination
            :loading="statusLoad"
            >
            <template #loading>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="loader">
                        <div class="box"></div>
                        <div class="box"></div>
                        <div class="box"></div>
                        <div class="box"></div>
                        <div class="box"></div>
                    </div>
                </div>
            </template>
            <template #item-description="item">
                {{ item.description.length > 200 ? `${item.description.slice(0,200)} ...` : item.description  }}
            </template>
            <template #item-image="item">
                <img v-if="item.image_tourist_destination != null"
                    :src="item.image_tourist_destination" alt=""
                    class="card-img-top mt-2 rounded imgSmallTabel">
                <img v-else src="../../../assets/img/home/image_placeholder.png" alt=""
                    class="card-img-top mt-2 rounded imgSmallTabel">
            </template>
            <template #item-action="item">
                <div class="operation-wrapper" style="min-width: 100px;">
                    <div class="d-flex justify-content-evenly align-items-center align-middle pr-2 pt-2 pb-2">
                        <router-link :to="{ name: 'tour-destination-update', params: { id_tourist_destinations: item.id_tourist_destinations }}">
                            <button class="btn btn-success">
                                <font-awesome-icon icon="pencil" />
                            </button>
                        </router-link>
                        <button class="btn btn-danger"
                            @click="deleteData(item.id_tourist_destinations)">
                            <font-awesome-icon icon="trash" />
                        </button>
                    </div>
                </div>
            </template>
        </EasyDataTable>
        <!-- <div class="table-responsive">
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
                <td style="width: 100px">
                    <img v-if="destination.image_tourist_destination != null" :src="destination.image_tourist_destination" alt="" class="card-img-top mt-2 rounded imgSmallTabel">
                    <img v-else src="../../../assets/img/home/image_placeholder.png" alt="" class="card-img-top mt-2 rounded imgSmallTabel">
                </td>
                <td>{{destination.name}}</td>
                <td>{{destination.description}}</td>
                <td>{{destination.address}}</td>
                <td>{{destination.latitude}}</td>
                <td>{{destination.longitude}}</td>
                <td>
                    <div style="width: 50px; height: 50px;">
                        <router-link style="width: 50px; height: 50px;" :to="{ name: 'tour-destination-update', params: { id_tourist_destinations: destination.id_tourist_destinations }}">
                            <button class="btn btn-success">
                                <font-awesome-icon icon="pencil" />
                            </button>
                        </router-link>
                    </div>
                    <div style="width: 50px; height: 50px;">
                        <a class="btn btn-danger" @click="deleteData(destination.id_tourist_destinations)">
                            <font-awesome-icon icon="trash" />
                        </a>
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
        </div> -->
      </div>
    </div>

    <div class="card shadow mt-4">
      <div class="card-header p-3 text-center">
        <h5 class="m-0 font-weight-bold color-main">Add Tour Destinations</h5>
      </div>
      <div class="card-body">
        <Form @submit="addDestination" :validation-schema="schema">
            <div class="row">
                <div class="col-md-12">
                    <p>Fill the form down below to add new tour destination.</p>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-outline mb-4">
                                <img v-if="urlImage" :src="urlImage" alt="" class="card-img-top mt-2 rounded img">
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
                            <button class="btn btn_theme btn-block" :disabled="loading">
                                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                <font-awesome-icon icon="plus" /><span> Add New</span>
                            </button>
                        </div>
                    </div>
                    <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                        {{ message }}
                    </div>
                </div>
            </div>
        </Form>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
import previewImage from "../../../assets/img/home/image_placeholder.png"
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

        const themeColor = "#184fa7";
        const headers = [
            { text: "Image", value: "image" },
            { text: "Destination Name", value: "name" },
            { text: "Description", value: "description" },
            { text: "Address", value: "address" },
            { text: "Latitude", value: "latitude" },
            { text: "Longitude", value: "longitude" },
            { text: "Action", value: "action" },
        ];
        return {
            themeColor,
            headers,
            successful: false,
            loading: false,
            message: "",
            schema,
            destinations: [],
            lat: "",
            long: "",
            file: null,
            urlImage: previewImage,
            center: {lat: -8.409518, lng: 115.188919},
            markers: [
                {
                    id: 'thisMark',
                    position: {
                        lat: -8.409518, lng: 115.188919
                    },
                }
            ],
            statusLoad: false
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
            this.urlImage = URL.createObjectURL(this.file);
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

            TourDestinationService.store(schema, this.file).then(
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
            this.statusLoad = true
            TourDestinationService.getAll().then(
                (response) => {
                    this.destinations = response.data.data
                    this.statusLoad = false
                },
                (error) => {
                    this.statusLoad = false
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