<template>
  <div class="row" v-if="profile">
    <div class="col-md-4 mb-4">
      <div class="dashboard_sidebar">
        <div class="dashboard_sidebar_user">
          <button style="border: 0; background: #F3F6FD;">
            <img v-if="profile.users.photo != null && profile.users.photo != ''" :src="file == null ? profile.users.photo : urlImage"
              @click="$refs.file.click()" alt="img">
            <img v-if="profile.users.photo == null || profile.users.photo == ''" :src="urlImage" @click="$refs.file.click()" alt="img">
          </button>
          <input type="file" ref="file" style="display: none" @change="onChange" accept="image/*" />
          <h3>{{ profile.users.name }}</h3>
          <p>{{ profile.users.phone }}</p>
          <p>{{ profile.users.email }}</p>
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
        <h3>Guide Profile</h3>
        <div class="profile_update_form">
          <Form @submit="handleUpdate" :validation-schema="schema" id="profile_form_area">
            <div class="form-group mb-4">
              <label for="description">Description</label>
              <Field as="textarea" name="description" type="description" class="form-control" v-model="profile.description" />
              <ErrorMessage name="description" class="error-feedback" />
            </div>
            <div class="form-group mb-4">
              <label for="fee_out">Fee (IDR/Day)</label>
              <Field name="fee_out" type="number" class="form-control" v-model="profile.fee_out" />
              <ErrorMessage name="fee_out" class="error-feedback" />
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
import TourGuideService from "../../../services/tour-guide.service";
import previewImage from "../../../assets/img/home/image_placeholder.png"
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: 'GuideProfileAgentView',
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
      description: yup
        .string()
        .required("Description is required!")
        .min(3, "Must be at least 3 characters!")
        .max(2048, "Must be maximum 2048 characters!"),
      fee_out: yup
        .number()
        .required("Fee is required!")
        .min(1, "Must be at least 1 IDR!"),
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
    if (this.currentUser.role_id != 3) {
      this.$router.push("/dashboard");
    }
    this.loadData()
  },
  methods: {
    archiveAccount() {
      TourGuideService.archiveAccount().then(
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
      TourGuideService.getProfile().then(
        (response) => {
          console.log(response.data.data)
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

      TourGuideService.update(schema, this.file).then(
        (user) => {
          this.message = "Guide profile successfully updated.";
          this.successful = true;
          this.loading = false;
          this.$swal.fire(
            'Success!',
            'Guide profile successfully updated.',
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
            'Guide profile is not updated.',
            'error'
          )
        }
      );
    },
  }
};
</script>