<template>
  <div class="card shadow">
    <div class="card-header p-3 text-center">
      <h5 class="m-0 font-weight-bold color-main">Manage Tour Packages</h5>
    </div>
    <div class="card-body">
      <EasyDataTable show-index alternating :headers="headers" :items="tourpackages" :theme-color="themeColor" style="z-index: 1;"
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
          <img v-if="item.cover_image != null" :src="this.$prefix.imgUrl(item.cover_image)" alt="" style="min-width: 100px;"
            class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
          <img v-else src="../../../assets/img/home/image_placeholder.png" alt="" style="min-width: 100px;"
            class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
        </template>
        <template #item-published="item">
          <button v-if="item.published === 'Yes'" style="float: right;" class="btn btn-success w-100">
            {{ item.published }}
          </button>
          <button v-else-if="item.published === 'No'" style="float: right;" class="btn btn-danger w-100">
            {{ item.published }}
          </button>
        </template>
        <template #item-rating="item">
          <span v-if="item.rating != null">{{ item.rating }}</span>
          <span v-else>-</span>
        </template>
        <template #item-action="item">
          <div class="operation-wrapper" style="min-width: 100px;">
            <div class="d-flex pr-2 pt-2 pb-2">
              <router-link class="btn btn-success"
                :to="{ name: 'tour-package-see', params: { id_tour_packages: item.id_tour_packages } }">
                <font-awesome-icon icon="pencil" />
              </router-link>
              <button class="btn btn-danger mx-2" @click="deleteData(item.id_tour_packages)">
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
              <th>Package Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Terms</th>
              <th>Rating</th>
              <th>Published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="tourpackages || tourpackages.length">
            <tr v-for="(tourpackage, index) in tourpackages" :key="index">
              <td style="width: 50px">{{ index + 1 }}</td>
              <td style="width: 100px">
                <img v-if="tourpackage.cover_image != null" :src="tourpackage.cover_image" alt=""
                  class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
                <img v-else src="../../../assets/img/home/image_placeholder.png" alt=""
                  class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
              </td>
              <td>{{ tourpackage.package_name }}</td>
              <td>{{ tourpackage.package_category.category }}</td>
              <td>{{ tourpackage.description }}</td>
              <td>{{ tourpackage.terms }}</td>
              <td>
                <span v-if="tourpackage.rating != null">{{ tourpackage.rating }}</span>
                <span v-else>-</span>
              </td>
              <td>
                <button v-if="tourpackage.published === 'Yes'" style="float: right;" class="btn btn-success w-100">
                  {{ tourpackage.published }}
                </button>
                <button v-else-if="tourpackage.published === 'No'" style="float: right;" class="btn btn-danger w-100">
                  {{ tourpackage.published }}
                </button>
              </td>
              <td>
                <div style="width: 50px; height: 50px;">
                  <router-link
                    :to="{ name: 'tour-package-see', params: { id_tour_packages: tourpackage.id_tour_packages } }">
                    <button class="btn btn-success">
                      <font-awesome-icon icon="pencil" />
                    </button>
                  </router-link>
                </div>
                <div style="width: 50px; height: 50px;">
                  <button class="btn btn-danger" @click="deleteData(tourpackage.id_tour_packages)">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="!tourpackages || !tourpackages.length">
            <tr>
              <td colspan="9" class="text-center">Empty Data.</td>
            </tr>
          </tfoot>
        </table>
      </div> -->
    </div>
  </div>

  <div class="card shadow mt-4">
    <div class="card-header p-3 text-center">
      <h5 class="m-0 font-weight-bold color-main">Add Tour Package</h5>
    </div>
    <div class="card-body">
      <Form @submit="addPackage" :validation-schema="schema" class="row">
        <div class="col-md-4">
          <div class="form-outline mb-4">
            <img v-if="urlImage" :src="urlImage" alt="" class="card-img-top mt-2 mb-2 rounded img">
            <label for="cover_image" class="mt-2">Cover Image</label>
            <Field name="cover_image">
              <input name="cover_image" type="file" v-on:change="onChange" class="form-control" accept="image/*" />
            </Field>
            <ErrorMessage name="cover_image" class="error-feedback text-danger" />
          </div>
        </div>
        <div class="col-md-8">
          <p>Fill the form down below to add new tour package.</p>
          <div>
            <div class="form-outline mb-4">
              <label for="package_name">Tour Packages Name</label>
              <Field name="package_name" type="text" class="form-control" />
              <ErrorMessage name="package_name" class="error-feedback text-danger" />
            </div>
            <div class="form-outline mb-4" v-if="categories || categories.length">
              <label for="id_package_categories">Tour Package Category</label>
              <Field name="id_package_categories" as="select" class="form-control form-select">
                <option disabled selected value="">-Package Category-</option>
                <option v-for="(category, index) in categories" :key="index" :value="category.id_package_categories">
                  {{ category.category }}
                </option>
              </Field>
            </div>
            <div class="form-outline mb-4">
              <label for="description">Description</label>
              <Field as="textarea" name="description" type="multiline" class="form-control" />
              <ErrorMessage name="description" class="error-feedback text-danger" />
            </div>
            <div class="form-outline mb-4">
              <label for="terms">Terms and Conditions</label>
              <Field name="terms" class="form-control" v-model="termCond">
                <VueEditor v-model="termCond" theme="snow"/>
              </Field>
              <ErrorMessage name="terms" class="error-feedback text-danger" />
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
      </Form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { VueEditor } from "vue3-editor";
import previewImage from "../../../assets/img/home/image_placeholder.png"
import TourPackageService from "../../../services/tour-package.service";
import TourPackageCategoryService from "../../../services/tour-package-category.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "TourPackageAgentView",
  components: {
    Form,
    Field,
    ErrorMessage,
    VueEditor
  },
  data() {
    const schema = yup.object().shape({
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

    const themeColor = "#184fa7";
    const headers = [
      { text: "Image", value: "image" },
      { text: "Package Name", value: "package_name" },
      { text: "Category", value: "package_category.category" },
      { text: "Description", value: "description" },
      // { text: "Terms", value: "terms" },
      { text: "Rating", value: "rating" },
      { text: "Published", value: "published" },
      { text: "Action", value: "action" },
    ];

    return {
      termCond: "",
      themeColor,
      headers,
      statusLoad: false,
      successful: false,
      loading: false,
      message: "",
      schema,
      tourpackages: [],
      categories: [],
      file: null,
      urlImage: previewImage
    };
  },
  watch:{
    termCond(newSelected,oldSelected){
      console.log(newSelected)
      console.log(oldSelected)
    }
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
    this.loadPackage(),
    this.loadCategory()
    this.moment = moment
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      let base64img = ''
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
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
          TourPackageService.delete(id).then(
            () => {
              this.$swal.fire(
                'Deleted!',
                'Package successfully deleted.',
                'success'
              )
              this.loadPackage()
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
    addPackage(schema) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      TourPackageService.store(schema, this.file).then(
        (data) => {
          this.message = "New package : " + data.data.package_name + " successfully created.";
          this.successful = true;
          this.loading = false;
          this.$swal.fire(
            'Success!',
            'New package successfully created.',
            'success'
          )
          this.loadPackage()
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
            'Package is not created.',
            'error'
          )
        }
      );
    },
    loadPackage() {
      this.statusLoad = true
      TourPackageService.getIndexTour().then(
        (response) => {
          this.statusLoad = false
          this.tourpackages = response.data.data
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
    }
  },
  mounted() {

  },
};
</script>

<style scoped></style>