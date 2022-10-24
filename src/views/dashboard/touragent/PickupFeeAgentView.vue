<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold text-primary">Manage Tour Package Categories</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>Distance</th>
                            <th>Fee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="categories || categories.length">
                        <tr v-for="(category, index) in categories" :key="index">
                            <td>{{category.category}}</td>
                            <td>{{category.description}}</td>
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
                            <td colspan="3" class="text-center">Empty Data.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    <div class="card shadow mt-4">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold text-primary">Add Tour Package Category</h5>
        </div>
        <div class="card-body">
            <Form @submit="addCategory" :validation-schema="schema">
                <p>Fill the form down below to add new tour package category.</p>
                <div>
                    <div class="form-outline mb-4">
                        <label for="distance">Distances in Kilometer(Km)</label>
                        <Field name="distance" type="text" class="form-control" />
                        <ErrorMessage name="distance" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="fee">Additional Fee</label>
                        <Field name="fee" type="multiline" class="form-control" />
                        <ErrorMessage name="fee" class="error-feedback" />
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
            distance: yup
                .number()
                .required("Distance is required!")
                .min(1, "Must be at least 1 Km!"),
                fee: yup
                .number()
                .required("Description is required!")
                .min(1, "Must be at least 1 IDR!"),
        });

        return {
            fees: [],
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
                            TourPackageCategoryService.getAll().then(
                                (response) => {
                                    this.fees = response.data.data
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
                    TourPackageCategoryService.getAll().then(
                        (response) => {
                            this.fees = response.data.data
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
    },
    mounted() {
        TourPackageCategoryService.getAll().then(
            (response) => {
                this.fees = response.data.data
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
};
</script>

<style scoped>

</style>