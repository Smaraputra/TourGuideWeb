<template>
    <div class="row">
        <div class="col">
            <nav aria-label="breadcrumb" class="bg-light rounded-3 p-4">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <router-link to="/dashboard/tour-category">
                            <strong>Tour Package Categories</strong>
                        </router-link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        <strong>Tour Package Categories Detail</strong>
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
            <Form @submit="updateCategory" :validation-schema="schema">
                <div v-if="categories">
                    <div class="form-outline mb-4">
                        <label for="category">Tour Package Category</label>
                        <Field name="category" type="text" class="form-control" :value="categories.category"/>
                        <ErrorMessage name="category" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="description">Description</label>
                        <Field as="textarea" name="description" type="multiline" class="form-control" :value="categories.description" />
                        <ErrorMessage name="description" class="error-feedback" />
                    </div>
                    <div class="form-outline mb-4">
                        <label for="guide_included">Guide Included</label>
                        <Field name="guide_included" as="select" class="form-select" v-model="categories.guide_included">
                            <option disabled value>-Select Guide Included Status-</option>
                            <option value="Included" selected >Included</option>
                            <option value="Not Included" >Not Included</option>
                        </Field>
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
                .max(1024, "Must be maximum 1024 characters!"),
            description: yup
                .string()
                .required("Description is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
            guide_included: yup
                .string()
                .required("Guide included status is required!")
                .min(3, "Must be at least 3 characters!")
                .max(1024, "Must be maximum 1024 characters!"),
        });

        return {
            categories: null,
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
        if (this.currentUser.role_id != 1) {
            this.$router.push("/dashboard");
        }
        this.loadPackageCategory()
    },
    methods: {
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
                    TourPackageCategoryService.delete(this.$route.params.id_package_categories).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Category successfully deleted.',
                                'success'
                            )
                            this.$router.push("/dashboard/tour-category");
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
        updateCategory(schema) {
            this.message = "";
            this.successful = false;
            this.loading = true;

            TourPackageCategoryService.update(schema, this.$route.params.id_package_categories).then(
                (data) => {
                    this.message = "Category : " + data.data.category + " successfully updated.";
                    this.successful = true;
                    this.loading = false;
                    this.$swal.fire(
                        'Success!',
                        'Category successfully updated.',
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
                        'Category is not updated.',
                        'error'
                    )
                }
            );
        },
        loadPackageCategory() {
            TourPackageCategoryService.getOneById(this.$route.params.id_package_categories).then(
                (response) => {
                    this.categories = response.data
                    console.log(this.categories)
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