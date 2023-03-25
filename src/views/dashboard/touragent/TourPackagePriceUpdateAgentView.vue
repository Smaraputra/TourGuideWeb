<template>
    <div class="row" v-if="prices">
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
                            :to="{ name: 'tour-package-see', params: { id_tour_packages: prices.id_tour_packages } }">
                            <strong>Tour Package Detail</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Tour Package Price</strong>
                    </li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="card shadow mt-4" v-if="prices">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Package Pricing</h5>
        </div>
        <div class="card-body">
            <Form @submit="updatePrice" :validation-schema="schema">
                <div>
                    <div class="form-outline mb-4">
                        <label for="pax_total">Pax Total</label>
                        <Field name="pax_total" type="number" class="form-control" v-model="prices.pax_total" />
                        <ErrorMessage name="pax_total" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="transportation">Transportation</label>
                        <Field name="transportation" type="text" class="form-control" v-model="prices.transportation" />
                        <ErrorMessage name="transportation" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="pickup_location">Pickup Location</label>
                        <Field as="textarea" name="pickup_location" type="text" class="form-control"
                            v-model="prices.pickup_location" />
                        <ErrorMessage name="pickup_location" class="error-feedback text-danger" />
                    </div>
                    <GMapMap :center="center" :zoom="2" map-type-id="terrain" style="width: 100%; height: 500px"
                        @click="mark">
                        <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true"
                            :draggable="true" @click="center = m.position" />
                    </GMapMap>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-outline mb-4">
                                <label for="latitude">Latitude</label>
                                <Field name="latitude" id="latIn" type="text" class="form-control" v-model="lat" disabled />
                                <ErrorMessage name="latitude" class="error-feedback text-danger" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-outline mb-4">
                                <label for="longitude">Longitude</label>
                                <Field name="longitude" id="longIn" type="text" class="form-control" v-model="long"
                                    disabled />
                                <ErrorMessage name="longitude" class="error-feedback text-danger" />
                            </div>
                        </div>
                    </div>
                    <div class="form-outline mb-4">
                        <label for="pickup_time">Pickup Time</label>
                        <Field name="pickup_time" type="time" class="form-control" v-model="prices.pickup_time" />
                        <ErrorMessage name="pickup_time" class="error-feedback text-danger" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="price">Price (IDR)</label>
                        <Field name="price" type="number" class="form-control" v-model="prices.price" />
                        <ErrorMessage name="price" class="error-feedback text-danger" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn_theme btn-block me-2" :disabled="loading">
                            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                            <font-awesome-icon icon="check" /><span> Update </span>
                        </button>
                        <a class="btn btn-danger me-2" @click="deleteData(prices.id_package_prices)">
                            <font-awesome-icon icon="trash" /><span> Delete </span>
                        </a>
                    </div>
                </div>
                <div v-if="message2" class="alert mt-2" :class="successful2 ? 'alert-success' : 'alert-danger'">
                    {{ message2 }}
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import TourPackagePriceService from "../../../services/tour-package-price.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackagePriceUpdateAgentView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            pax_total: yup
                .number()
                .required("Pax number is required!")
                .min(1, "Must be at least 1!"),
            transportation: yup
                .string()
                .required("Transportation is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            pickup_location: yup
                .string()
                .required("Location is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
            price: yup
                .number()
                .required("Price is required!")
                .min(1, "Must be at least 1 IDR!"),
            latitude: yup
                .string()
                .required("Latitude is required!"),
            longitude: yup
                .string()
                .required("Longitude is required!"),
            pickup_time: yup
                .string()
                .required("Pickup time is required!")
                .min(3, "Must be at least 3 characters!")
                .max(2048, "Must be maximum 2048 characters!"),
        });

        return {
            prices: null,
            successful: false,
            loading: false,
            message: "",
            successful2: false,
            loading2: false,
            message2: "",
            schema,
            lat: "",
            long: "",
            center: { lat: -8.409518, lng: 115.188919 },
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
        if (this.currentUser.role_id != 2) {
            this.$router.push("/dashboard");
        }
        this.loadPrice()
    },
    methods: {
        mark(event) {
            this.markers = [
                {
                    id: 'thisMark',
                    position: {
                        lat: event.latLng.lat(), lng: event.latLng.lng()
                    },
                }
            ]
            this.lat = event.latLng.lat()
            this.long = event.latLng.lng()
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
                    TourPackagePriceService.delete(id, this.prices.id_tour_packages).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Tour package price successfully deleted.',
                                'success'
                            )
                            this.$router.push({ name: 'tour-package-see', params: { id_tour_packages: this.prices.id_tour_packages } })
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Tour package price is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        updatePrice(schema) {
            this.message2 = "";
            this.successful2 = false;
            this.loading2 = true;
            this.prices.latitude = this.lat
            this.prices.longitude = this.long
            TourPackagePriceService.update(schema, this.prices.id_tour_packages, this.$route.params.id_package_prices).then(
                (data) => {
                    this.message2 = "Tour package price of " + data.data.price + " successfully updated.";
                    this.successful2 = true;
                    this.loading2 = false;
                    this.$swal.fire(
                        'Success!',
                        'Tour package price successfully updated.',
                        'success'
                    )
                    this.loadPrice()
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
                        'Tour package price is not updated.',
                        'error'
                    )
                }
            );
        },
        loadPrice() {
            TourPackagePriceService.getOneById(this.$route.params.id_package_prices).then(
                (response) => {
                    this.prices = response.data
                    this.lat = this.prices.latitude
                    this.long = this.prices.longitude
                    this.markers = [
                        {
                            id: 'thisMark',
                            position: {
                                lat: this.prices.latitude, lng: this.prices.longitude
                            },
                        }
                    ]
                    console.log(response.data)
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

<style scoped></style>