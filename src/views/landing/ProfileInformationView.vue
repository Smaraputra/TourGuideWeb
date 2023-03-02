<template>
  <Transition>
    <div class="d-flex justify-content-center align-items-center" style="height: 90vh" v-if="!true">
      <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div v-else>
      <section id="common_banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="common_bannner_text">
                <h2>Profile</h2>
                <p class="text-white">Configure your profile.</p>
                <ul>
                  <li><router-link to="/">Home</router-link></li>
                  <li><span><font-awesome-icon icon="circle" /></span>Profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="dashboard_main_arae" class="mt-5" v-if="currentUser != null">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="dashboard_sidebar">
                <div class="dashboard_sidebar_user">
                  <button style="border: 0; background: #F3F6FD;">
                    <img v-if="currentUser.data.photo != null" :src="file == null ? this.$prefix.imgUrl(currentUser.data.photo) : urlImage"
                      @click="$refs.file.click()" alt="img">
                    <img v-if="currentUser.data.photo == null" :src="urlImage" @click="$refs.file.click()" alt="img">
                  </button>
                  <input type="file" ref="file" style="display: none" @change="onChange" accept="image/*" />
                  <h3>{{ currentUser.name }}</h3>
                  <p>{{ currentUser.data.phone }}</p>
                  <p>{{ currentUser.data.email }}</p>
                </div>
                <div class="dashboard_menu_area">
                  <ul>
                    <li v-if="currentUser.role_id == 4"><router-link to="/transactions"><font-awesome-icon
                          icon="credit-card" /> Transactions</router-link></li>
                    <li v-if="currentUser.role_id != 4"><router-link to="/dashboard"><font-awesome-icon
                          icon="dashboard" /> Panel</router-link></li>
                    <li><router-link to="/login" @click="logOut" class="dropdown-item">
                        <font-awesome-icon icon="sign-out-alt" /> Logout
                      </router-link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="dashboard_common_table">
                <h3>My Profile</h3>
                <div class="profile_update_form">
                  <Form @submit="handleUpdate" :validation-schema="schema" id="profile_form_area">
                    <div class="form-group mb-4">
                      <label for="name">Full Name</label>
                      <Field name="name" type="text" class="form-control" v-model="currentUser.data.name" />
                      <ErrorMessage name="name" class="error-feedback" />
                    </div>
                    <div class="form-group mb-4">
                      <label for="email">Email</label>
                      <Field name="email" disabled type="email" class="form-control" v-model="currentUser.data.email" />
                      <ErrorMessage name="email" class="error-feedback" />
                    </div>
                    <div class="form-group mb-4">
                      <label for="phone">Phone Number</label>
                      <Field name="phone" type="text" class="form-control" v-model="currentUser.data.phone" />
                      <ErrorMessage name="phone" class="error-feedback" />
                    </div>
                    <div class="form-group mb-4">
                      <label for="address">Address</label>
                      <Field name="address" type="text" class="form-control" v-model="currentUser.data.address" />
                      <ErrorMessage name="address" class="error-feedback" />
                    </div>

                    <div class="pt-2">
                      <button class="btn btn_theme btn_md" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <font-awesome-icon icon="pencil" /><span> Update</span>
                      </button>
                    </div>

                    <div class="form-group mt-2">
                      <div v-if="message" :class="!successful ? 'alert alert-danger' : 'alert alert-success'"
                        role="alert">
                        {{ message }}
                      </div>
                    </div>
                  </Form>
                </div>

                <div class="change_password_input_boxed mt-4">
                  <Form @submit="handlePassword" :validation-schema="schemaPassword" id="profile_form_area">
                    <h3>Change password</h3>
                    <div class="row">
                      <div class="col-lg-6">
                        <div class="form-group mb-4">
                          <label for="oldpassword">Old Password</label>
                          <Field name="oldpassword" type="password" class="form-control"/>
                          <ErrorMessage name="oldpassword" class="error-feedback" />
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="form-group mb-4">
                          <label for="newpassword">New Password</label>
                          <Field name="newpassword" type="password" class="form-control"/>
                          <ErrorMessage name="newpassword" class="error-feedback" />
                        </div>
                      </div>
                    </div>
                    <div class="pt-2">
                      <button class="btn btn_theme btn_md" :disabled="loading2">
                        <span v-show="loading2" class="spinner-border spinner-border-sm"></span>
                        <font-awesome-icon icon="pencil" /><span> Change</span>
                      </button>
                    </div>

                    <div class="form-group mt-2">
                      <div v-if="message2" :class="!successful2 ? 'alert alert-danger' : 'alert alert-success'"
                        role="alert">
                        {{ message2 }}
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Transition>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "../../services/auth.service";
import previewImage from "../../assets/img/home/image_placeholder.png"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: 'ProfileInformation',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  data() {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required("Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      address: yup
        .string()
        .required("Address is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      phone: yup
        .number()
        .required("Phone number is required!"),
    });
    const schemaPassword = yup.object().shape({
      newpassword: yup
        .string()
        .required("New password is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      oldpassword: yup
        .string()
        .required("Old password is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
    });
    return {
      schema,
      schemaPassword,
      file: null,
      urlImage: previewImage,
      successful: false,
      loading: false,
      message: "",
      successful2: false,
      loading2: false,
      message2: "",
    };
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      this.urlImage = URL.createObjectURL(this.file);
    },
    logOut() {
      this.$store.dispatch('logout').then(
        () => {
          this.$router.push("/login");
        },
      );
    },
    handleUpdate(schema) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      AuthService.update(schema, this.currentUser.jwt, this.file).then(
        (user) => {
          this.message = "User profile successfully updated.";
          this.successful = true;
          this.loading = false;
          this.$swal.fire(
            'Success!',
            'User profile successfully updated.',
            'success'
          )
          console.log(user)
          this.$store.dispatch('updateData', user)
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
            'User profile is not updated.',
            'error'
          )
        }
      );
    },
    handlePassword(schemaPassword) {
      this.message2 = "";
      this.successful2 = false;
      this.loading2 = true;

      AuthService.changePassword(schemaPassword).then(
        () => {
          this.message2 = "User password successfully updated.";
          this.successful2 = true;
          this.loading2 = false;
          this.$swal.fire(
            'Success!',
            'User password successfully updated.',
            'success'
          )
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
            'User password is not updated.',
            'error'
          )
        }
      );
    }
  }
};
</script>