<template>
  <div class="row">
    <div class="col">
      <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <router-link to="/dashboard/tour-package">
              <strong>Tour Package</strong>
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
      <h5 class="m-0 font-weight-bold color-main">Tour Package</h5>
    </div>
    <div class="card-body">
      <Form @submit="updatePackage" :validation-schema="schemaPackage">
        <div class="row" v-if="tourpackages">
          <div class="col-md-4">
            <img v-if="tourpackages.cover_image != null" :src="this.$prefix.imgUrl(tourpackages.cover_image)" alt="" class="card-img-top mt-2 mb-2 rounded img">
            <img v-else src="../../../assets/img/home/image_placeholder.png" alt="" class="card-img-top mt-2 mb-2 rounded img">
            <div class="form-outline mb-4">
              <label for="cover_image" class="mt-2">Cover Image</label>
              <Field name="cover_image">
                <input name="cover_image" type="file" v-on:change="onChange" class="form-control" accept="image/*" />
              </Field>
              <ErrorMessage name="cover_image" class="error-feedback text-danger" />
            </div>
          </div>
          <div class="col-md-8">
            <div>
              <div class="form-outline mb-4">
                <label for="package_name">Tour Packages Name</label>
                <Field name="package_name" type="text" class="form-control" v-model="tourpackages.package_name" />
                <ErrorMessage name="package_name" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4" v-if="categories || categories.length">
                <label for="id_package_categories">Tour Packages Category</label>
                <Field as="select" name="id_package_categories" class="form-control form-select"
                  v-model="tourpackages.id_package_categories">
                  <option disabled value>-Package Category-</option>
                  <option v-for="(category, index) in categories" :key="index" :value="category.id_package_categories"
                    :selected="tourpackages.id_package_categories">
                    {{ category.category }}</option>
                </Field>
              </div>
              <div class="form-outline mb-4">
                <label for="description">Description</label>
                <Field as="textarea" name="description" type="multiline" class="form-control"
                  v-model=tourpackages.description />
                <ErrorMessage name="description" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
              <label for="terms">Terms and Conditions</label>
              <Field name="terms" class="form-control" v-model="tourpackages.terms">
                <VueEditor v-model="tourpackages.terms" theme="snow"/>
              </Field>
              <ErrorMessage name="terms" class="error-feedback text-danger" />
            </div>
              <div class="form-outline mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="published" id="flexCheckDefault" v-model="checkeds">
                  <label class="form-check-label" for="flexCheckDefault" v-if="checkeds">Published</label>
                  <label class="form-check-label" for="flexCheckDefault" v-else>Not Published</label>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn_theme btn-block me-2 mt-2" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <font-awesome-icon icon="check" /><span> Update </span>
                </button>
                <a class="btn btn-success me-2 mt-2" @click="copyDataPackages(tourpackages.id_tour_packages)">
                  <font-awesome-icon icon="copy" /><span> Copy </span>
                </a>
                <a class="btn btn-danger me-2 mt-2" @click="deleteDataPackages(tourpackages.id_tour_packages)">
                  <font-awesome-icon icon="trash" /><span> Delete </span>
                </a>
              </div>
              <div v-if="message" class="alert mt-2" :class="successful ? 'alert-success' : 'alert-danger'">
                {{ message }}
              </div>
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
          <h5 class="m-0 font-weight-bold color-main">Manage Tour Packages Detail</h5>
        </div>
        <div class="card-body">
          <EasyDataTable show-index alternating :headers="headers" :items="tourpackagesdetails" :theme-color="themeColor" style="z-index: 1;"
            buttons-pagination :loading="statusLoad">
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
            <template #item-image="item">
              <img v-if="item.image_package_detail != null" :src="this.$prefix.imgUrl(item.image_package_detail)" alt="" class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
              <img v-else src="../../../assets/img/home/image_placeholder.png" alt="" class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
            </template>
            <template #item-action="item">
              <div class="operation-wrapper" style="min-width: 100px;">
                <div class="d-flex pr-2 pt-2 pb-2">
                  <router-link class="btn btn-success"
                    :to="{ name: 'tour-package-detail-see', params: { id_package_details: item.id_package_details } }">
                    <font-awesome-icon icon="pencil" />
                  </router-link>
                  <button class="btn btn-danger mx-2" @click="deleteDataPackagesDetail(item.id_package_details)">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </div>
            </template>
          </EasyDataTable>
          <!-- <div class="table-responsive">
            <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
              cellspacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Destination</th>
                  <th>Day</th>
                  <th>Sequence</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="tourpackagesdetails || tourpackagesdetails.length">
                <tr v-for="(tourpackagesdetail, index) in tourpackagesdetails" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td style="width: 150px">
                    <img v-if="tourpackagesdetail.image_package_detail != null" :src="tourpackagesdetail.image_package_detail" alt="" class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
                    <img v-else src="../../../assets/img/home/image_placeholder.png" alt="" class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
                  </td>
                  <td>{{ tourpackagesdetail.tourist_destination.name }}</td>
                  <td>{{ tourpackagesdetail.day }}</td>
                  <td>{{ tourpackagesdetail.tour_sequence }}</td>
                  <td>{{ tourpackagesdetail.duration }}</td>
                  <td>
                    <div style="width: 50px; height: 50px;">
                      <router-link
                        :to="{ name: 'tour-package-detail-see', params: { id_package_details: tourpackagesdetail.id_package_details } }">
                        <button class="btn btn-success">
                          <font-awesome-icon icon="pencil" />
                        </button>
                      </router-link>
                    </div>
                    <div style="width: 50px; height: 50px;">
                      <button class="btn btn-danger"
                        @click="deleteDataPackagesDetail(tourpackagesdetail.id_package_details)">
                        <font-awesome-icon icon="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot v-if="!tourpackagesdetails || !tourpackagesdetails.length">
                <tr>
                  <td colspan="7" class="text-center">Empty Data.</td>
                </tr>
              </tfoot>
            </table>
          </div> -->
        </div>
      </div>
    </div>
    <div class="col-md-6 mt-4">
      <div class="card shadow">
        <div class="card-header p-3 text-center">
          <h5 class="m-0 font-weight-bold color-main">Add Tour Package Detail</h5>
        </div>
        <div class="card-body">
          <Form @submit="addDetail" :validation-schema="schemaDetail">
            <p>Fill the form down below to add new tour package detail.</p>
            <div>
              <div class="form-outline mb-4">
                <img v-if="urlImage" :src="urlImage" alt="" class="card-img-top mt-2 mb-2 rounded img">
                <label for="image_package_detail" class="mt-2">Package Detail Image</label>
                <Field name="image_package_detail">
                  <input name="image_package_detail" type="file" v-on:change="onChange2" class="form-control" accept="image/*" />
                </Field>
                <ErrorMessage name="image_package_detail" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4" v-if="destinations || destinations.length">
                <label for="id_tourist_destinations">Tour Destination</label>
                <Field name="id_tourist_destinations" as="select" class="form-control form-select">
                  <option disabled selected value>-Tour Destinations-</option>
                  <option v-for="(destination, index) in destinations" :key="index"
                    :value="destination.id_tourist_destinations">
                    {{ destination.name }}
                  </option>
                </Field>
              </div>
              <div class="form-outline mb-4">
                <label for="day">Day (Number)</label>
                <Field name="day" type="number" class="form-control" />
                <ErrorMessage name="day" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
                <label for="tour_sequence">Tour Sequence</label>
                <Field name="tour_sequence" type="number" class="form-control" />
                <ErrorMessage name="tour_sequence" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
                <label for="duration">Duration</label>
                <Field name="duration" type="time" class="form-control" />
                <ErrorMessage name="duration" class="error-feedback text-danger" />
              </div>
              <div class="form-group">
                <button class="btn btn_theme btn-block" :disabled="loading2">
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
      <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
          <h5 class="m-0 font-weight-bold color-main">Manage Tour Packages Pricing</h5>
        </div>
        <div class="card-body">
          <EasyDataTable show-index alternating :headers="headers1" :items="prices" :theme-color="themeColor" style="z-index: 1;"
            buttons-pagination :loading="statusLoad">
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
            <template #item-price="item">
              {{ $filters.formatPrice(item.price) }}
            </template>
            <template #item-action="item">
              <div class="operation-wrapper" style="min-width: 100px;">
                <div class="d-flex pr-2 pt-2 pb-2">
                  <router-link class="btn btn-success"
                    :to="{ name: 'tour-package-price-see', params: { id_package_prices: item.id_package_prices } }">
                    <font-awesome-icon icon="pencil" />
                  </router-link>
                  <button class="btn btn-danger mx-2" @click="deleteDataPackagesPrice(item.id_package_prices)">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </div>
            </template>
          </EasyDataTable>
          <!-- <div class="table-responsive">
            <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
              cellspacing="0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pax Total</th>
                  <th>Transportation</th>
                  <th>Pickup Location</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Pickup Time</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="prices || prices.length">
                <tr v-for="(price, index) in prices" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ price.pax_total }}</td>
                  <td>{{ price.transportation }}</td>
                  <td>{{ price.pickup_location }}</td>
                  <td>{{ price.latitude }}</td>
                  <td>{{ price.longitude }}</td>
                  <td>{{ price.pickup_time }}</td>
                  <td>{{ $filters.formatPrice(price.price) }}</td>
                  <td>
                    <div style="width: 50px; height: 50px;">
                      <router-link to="#">
                        <button class="btn btn-success">
                          <font-awesome-icon icon="pencil" />
                        </button>
                      </router-link>
                    </div>
                    <div style="width: 50px; height: 50px;">
                      <button class="btn btn-danger" @click="deleteDataPackagesPrice(price.id_package_prices)">
                        <font-awesome-icon icon="trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot v-if="!prices || !prices.length">
                <tr>
                  <td colspan="9" class="text-center">Empty Data.</td>
                </tr>
              </tfoot>
            </table>
          </div> -->
        </div>
      </div>
    </div>

    <div class="col-md-6 mt-4">
      <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
          <h5 class="m-0 font-weight-bold color-main">Add Tour Package Price</h5>
        </div>
        <div class="card-body">
          <Form @submit="addPrice" :validation-schema="schemaPrice">
            <p>Fill the form down below to add new pricing to your tour package.</p>
            <div>
              <div class="form-outline mb-4">
                <label for="pax_total">Pax Total</label>
                <Field name="pax_total" type="number" class="form-control" />
                <ErrorMessage name="pax_total" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
                <label for="transportation">Transportation</label>
                <Field name="transportation" type="text" class="form-control" />
                <ErrorMessage name="transportation" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
                <label for="pickup_location">Pickup Location</label>
                <Field as="textarea" name="pickup_location" type="text" class="form-control" />
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
                    <Field name="longitude" id="longIn" type="text" class="form-control" v-model="long" disabled />
                    <ErrorMessage name="longitude" class="error-feedback text-danger" />
                  </div>
                </div>
              </div>
              <div class="form-outline mb-4">
                <label for="pickup_time">Pickup Time</label>
                <Field name="pickup_time" type="time" class="form-control" />
                <ErrorMessage name="pickup_time" class="error-feedback text-danger" />
              </div>
              <div class="form-outline mb-4">
                <label for="price">Price (IDR)</label>
                <Field name="price" type="number" class="form-control" />
                <ErrorMessage name="price" class="error-feedback text-danger" />
              </div>
              <div class="form-group">
                <button class="btn btn_theme btn-block" :disabled="loading3">
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
import moment from 'moment'
import { VueEditor } from "vue3-editor";
import previewImage from "../../../assets/img/home/image_placeholder.png"
import TourPackageService from "../../../services/tour-package.service";
import TourPackageCategoryService from "../../../services/tour-package-category.service";
import TourPackageDetailService from "../../../services/tour-package-detail.service";
import TourDestinationService from "../../../services/tour-destination.service";
import TourPackagePriceService from "../../../services/tour-package-price.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "TourPackageDetailPriceAgentView",
  components: {
    Form,
    Field,
    ErrorMessage,
    VueEditor
  },
  data() {
    const schemaPackage = yup.object().shape({
      package_name: yup
        .string()
        .required("Package name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(2048, "Must be maximum 2048 characters!"),
      id_package_categories: yup
        .string()
        .notOneOf(['-Package Category-'], 'Package category is required!'),
      description: yup
        .string()
        .required("Description is required!")
        .min(3, "Must be at least 3 characters!")
        .max(2048, "Must be maximum 2048 characters!"),
      terms: yup
        .string()
        .required("Terms and Conditions is required!")
        .min(1, "Terms and Conditions is required!")
        .max(2048, "Must be maximum 2048 characters!"),
    });

    const schemaPrice = yup.object().shape({
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
        .max(2048, "Must be maximum 2048 characters!"),
    });

    const themeColor = "#184fa7";
    const headers = [
      { text: "Image", value: "image" },
      { text: "Destination", value: "tourist_destination.name" },
      { text: "Day", value: "day" },
      { text: "Sequence", value: "tour_sequence" },
      { text: "Duration", value: "duration" },
      { text: "Action", value: "action" },
    ];

    const headers1 = [
      { text: "Pax Total", value: "pax_total" },
      { text: "Transportation", value: "transportation" },
      { text: "Pickup Location", value: "pickup_location" },
      { text: "Latitude", value: "latitude" },
      { text: "Longitude", value: "longitude" },
      { text: "Pickup Time", value: "pickup_time" },
      { text: "Price", value: "price" },
      { text: "Action", value: "action" },
    ];

    return {
      themeColor,
      headers,
      headers1,
      statusLoad: false,
      successful: false,
      loading: false,
      message: "",
      successful2: false,
      loading2: false,
      message2: "",
      successful3: false,
      loading3: false,
      message3: "",
      schemaPackage,
      schemaDetail,
      schemaPrice,
      tourpackages: null,
      tourpackagesdetails: [],
      categories: [],
      destinations: [],
      prices: [],
      checkeds: null,
      file: null,
      file2: null,
      urlImage: previewImage,
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
  // watch: {
  //   "$route.params.id_tour_packages": {
  //     handler: function () {
  //       this.loadPackageId()
  //     },
  //   },
  // },
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
    this.loadPackageId(),
    this.loadCategory(),
    this.loadDestination(),
    this.loadPackageDetailId(),
    this.loadPackagePriceId(),
    this.moment = moment
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
    },
    onChange2(e) {
      this.file2 = e.target.files[0];
      let base64img = ''
      const reader = new FileReader()
      reader.readAsDataURL(this.file2)
      reader.onload = function () {
        base64img = reader.result
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
      setTimeout(() => {
        this.urlImage = base64img
      }, 2000)
    },
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
    updatePackage(schemaPackage) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      TourPackageService.update(schemaPackage, this.checkeds, this.file, this.$route.params.id_tour_packages).then(
        () => {
          this.message = "Package successfully updated.";
          this.successful = true;
          this.loading = false;
          this.$swal.fire(
            'Success!',
            'Package successfully updated.',
            'success'
          )
          this.loadPackageId()
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
            'Package is not updated.',
            'error'
          )
        }
      );
    },
    deleteDataPackages(id) {
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
          TourPackageService.delete(id).then(
            () => {
              this.$swal.fire(
                'Deleted!',
                'Package successfully deleted.',
                'success'
              )
              this.$router.push("/dashboard/tour-package");
            },
            () => {
              this.$swal.fire(
                'Fail!',
                'Package is not deleted.',
                'error'
              )
            }
          );
        }
      })
    },
    copyDataPackages(id) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You will create another copy of this package!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, create a copy!'
      }).then((result) => {
        if (result.isConfirmed) {
          TourPackageService.copyById(id).then(
            (response) => {
              this.$swal.fire(
                'Copied!',
                'Package successfully copied.',
                'success'
              )
              this.$router.push({ name: 'tour-package-see', params: { id_tour_packages: response.data["id_tour_packages"] } });
              this.loadPackageId()
            },
            () => {
              this.$swal.fire(
                'Fail!',
                'Package is not copied.',
                'error'
              )
            }
          );
        }
      })
    },
    addDetail(schemaDetail) {
      this.message2 = "";
      this.successful2 = false;
      this.loading2 = true;

      TourPackageDetailService.store(schemaDetail, this.file2, this.$route.params.id_tour_packages).then(
        () => {
          this.message2 = "New package detail successfully created.";
          this.successful2 = true;
          this.loading2 = false;
          this.$swal.fire(
            'Success!',
            'New package detail successfully created.',
            'success'
          )
          this.loadPackageDetailId()
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
            'Package detail is not created.',
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
          TourPackageDetailService.delete(id, this.$route.params.id_tour_packages).then(
            () => {
              this.loadPackageDetailId()
              this.loadPackageId()
              this.$swal.fire(
                'Deleted!',
                'Package detail successfully deleted.',
                'success'
              )
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
    addPrice(schemaPrice) {
      this.message3 = "";
      this.successful3 = false;
      this.loading3 = true;

      TourPackagePriceService.store(schemaPrice, this.$route.params.id_tour_packages).then(
        () => {
          this.message3 = "New package price successfully created.";
          this.successful3 = true;
          this.loading3 = false;
          this.$swal.fire(
            'Success!',
            'New package price successfully created.',
            'success'
          )
          this.loadPackagePriceId()
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
            'Package price is not created.',
            'error'
          )
        }
      );
    },
    deleteDataPackagesPrice(id) {
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
          TourPackagePriceService.delete(id, this.$route.params.id_tour_packages).then(
            () => {
              this.loadPackagePriceId()
              this.loadPackageId()
              this.$swal.fire(
                'Deleted!',
                'Package price successfully deleted.',
                'success'
              )
            },
            () => {
              this.$swal.fire(
                'Fail!',
                'Package price is not deleted.',
                'error'
              )
            }
          );
        }
      })
    },
    loadPackageId() {
      TourPackageService.getById(this.$route.params.id_tour_packages).then(
        (response) => {
          this.tourpackages = response.data
          if(this.tourpackages.published=='Yes'){
            this.checkeds = true
          }else if(this.tourpackages.published=='No'){
            this.checkeds = false
          }
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
    loadCategory() {
      TourPackageCategoryService.getAll().then(
        (response) => {
          this.categories = response.data.data
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
      this.statusLoad = true
      TourPackageDetailService.getAllById(this.$route.params.id_tour_packages).then(
        (response) => {
          this.statusLoad = false
          this.tourpackagesdetails = response.data
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
    },
    loadPackagePriceId() {
      this.statusLoad = true
      TourPackagePriceService.getById(this.$route.params.id_tour_packages).then(
        (response) => {
          this.statusLoad = false
          this.prices = response.data
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