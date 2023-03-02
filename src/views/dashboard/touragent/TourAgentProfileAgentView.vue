<template>
  <div class="row">
    <div class="col-md-4 mb-4">
      <div class="dashboard_sidebar">
        <div class="dashboard_sidebar_user">
          <button style="border: 0; background: #F3F6FD;">
            <img v-if="profile.photo != null && profile.photo != ''" :src="file == null ? this.$prefix.imgUrl(profile.photo) : urlImage"
              @click="$refs.file.click()" alt="img">
            <img v-if="profile.photo == null || profile.photo == ''" :src="urlImage" @click="$refs.file.click()" alt="img">
          </button>
          <input type="file" ref="file" style="display: none" @change="onChange" accept="image/*" />
          <h3>{{ profile.name }}</h3>
          <p>{{ profile.phone }}</p>
          <p>{{ profile.email }}</p>
        </div>
        <div class="dashboard_menu_area">
          <ul>
            <li>
              <router-link to="/login" @click="archiveAccount" class="dropdown-item">
                <font-awesome-icon icon="sign-out-alt" /> Archive This Account (Make Nonactive)
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-8 mb-4">
      <div class="dashboard_common_table">
        <h3>Tour Agent Profile</h3>
        <div class="profile_update_form">
          <Form @submit="handleUpdate" :validation-schema="schema" id="profile_form_area">
            <div class="form-group mb-4">
              <label for="agent_name">Tour Agent Name</label>
              <Field name="agent_name" type="text" class="form-control" v-model="profile.agent_name" />
              <ErrorMessage name="agent_name" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
              <label for="description">Description</label>
              <Field as="textarea" name="description" type="description" class="form-control" v-model="profile.description" />
              <ErrorMessage name="description" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
              <label for="email">Email</label>
              <Field name="email" disabled type="email" class="form-control" v-model="profile.email" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
              <label for="phone">Phone Number</label>
              <Field name="phone" type="text" class="form-control" v-model="profile.phone" />
              <ErrorMessage name="phone" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
              <label for="address">Address</label>
              <Field name="address" type="text" class="form-control" v-model="profile.address" />
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
      </div>
    </div>
  </div>
</template>

<script>
import TourAgentService from "../../../services/tour-agent.service";
import previewImage from "../../../assets/img/home/image_placeholder.png"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: 'TourAgentProfileAgentView',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    const schema = yup.object().shape({
      agent_name: yup
        .string()
        .required("Agent Name is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      description: yup
        .string()
        .required("Description is required!")
        .min(3, "Must be at least 3 characters!")
        .max(2048, "Must be maximum 2048 characters!"),
      address: yup
        .string()
        .required("Address is required!")
        .min(3, "Must be at least 3 characters!")
        .max(255, "Must be maximum 255 characters!"),
      phone: yup
        .string()
        .required("Phone number is required!"),
    });
    return {
      profile: '',
      schema,
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
    if (!this.loggedIn) {
      this.$router.push("/login");
    }
    if (this.currentUser.role_id != 2) {
      this.$router.push("/dashboard");
    }
    this.loadData()
  },
  methods: {
    archiveAccount() {
      TourAgentService.archiveAccount().then(
        () => {
          this.$store.dispatch('logout').then(
            () => {
              this.$router.push("/login");
            },
          );
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.message) ||
            error.message ||
            error.toString();
        }
      )
    },
    loadData() {
      TourAgentService.getProfile().then(
        (response) => {
          this.profile = response.data.data
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.message) ||
            error.message ||
            error.toString();
        }
      )
    },
    onChange(e) {
      this.file = e.target.files[0];
      this.urlImage = URL.createObjectURL(this.file);
    },
    handleUpdate(schema) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      TourAgentService.update(schema, this.file).then(
        (user) => {
          this.message = "Tour agent profile successfully updated.";
          this.successful = true;
          this.loading = false;
          this.$swal.fire(
            'Success!',
            'Tour agent profile successfully updated.',
            'success'
          )
          console.log(user)
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
          this.$swal.fire(
            'Fail!',
            'Tour agent profile is not updated.',
            'error'
          )
        }
      );
    },
  }
};
</script>