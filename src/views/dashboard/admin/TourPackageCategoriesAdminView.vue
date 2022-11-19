<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Manage Tour Package Categories</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Guide Included</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="categories || categories.length">
                        <tr v-for="(category, index) in categories" :key="index">
                            <td style="width: 50px">{{index+1}}</td>
                            <td>{{category.category}}</td>
                            <td>{{category.description}}</td>
                            <td>{{category.guide_included}}</td>
                            <td>
                                <div style="width: 50px; height: 50px;">
                                    <button class="btn btn-success">
                                        <font-awesome-icon icon="pencil" />
                                    </button>
                                </div>
                                <div style="width: 50px; height: 50px;">
                                    <button class="btn btn-danger" @click="deleteData(category.id_package_categories)">
                                        <font-awesome-icon icon="trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-if="!categories || !categories.length">
                        <tr>
                            <td colspan="5" class="text-center">Empty Data.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Add Tour Package Category</h5>
        </div>
        <div class="card-body">
            <Form @submit="addCategory" :validation-schema="schema">
                <p>Fill the form down below to add new tour package category.</p>
                <div>
                    <div class="form-outline mb-4">
                        <label for="category">Tour Package Category</label>
                        <Field name="category" type="text" class="form-control" />
                        <ErrorMessage name="category" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description">Description</label>
                        <Field as="textarea" name="description" type="multiline" class="form-control" />
                        <ErrorMessage name="description" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="guide_included">Guide Included</label>
                        <Field name="guide_included" as="select" class="form-select">
                            <option disabled selected value>-Select Guide Included Status-</option>
                            <option value="Included">Included</option>
                            <option value="Not Included">Not Included</option>
                        </Field>
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
import TourPackageCategoryService from "../../../services/tour-package-category.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TourPackageCategoryAdminView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schema = yup.object().shape({
            category: yup
                .string()
                .required("Name is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
            guide_included: yup
                .string()
                .required("Guide included status is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
        });

        return {
            categories: [],
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
        if (this.currentUser.role_id!=1) {
            this.$router.push("/dashboard");
        }
        this.loadPackageCategory()
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
                    TourPackageCategoryService.delete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Category successfully deleted.',
                                'success'
                            )
                            this.loadPackageCategory()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Category is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        addCategory(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourPackageCategoryService.store(schema).then(
                (data) => {
                    this.message = "New category : " + data.data.category + " successfully created.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'New category successfully created.',
                        'success'
                    )
                    this.loadPackageCategory()
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
                        'Category is not created.',
                        'error'
                    )
                }
            );
        },
        loadPackageCategory(){
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

<style scoped>
  .color-main-background {
      background: #184fa7;
  }
  .color-main {
    color: #184fa7;
  }
</style>