<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold text-primary">Manage Tour Guide</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Tour Guide Name</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="guides || guides.length">
                        <tr v-for="(guide, index) in guides" :key="index">
                            <td><img src="../../../assets/image/home/photo_placeholder.png" style="width: 100px"></td>
                            <td>{{guide.users.name}}</td>
                            <td>{{guide.users.email}}</td>
                            <td>{{guide.description}}</td>
                            <td>{{guide.users.phone}}</td>
                            <td>{{guide.users.address}}</td>
                            <td>{{guide.rating}}</td>
                            <td>{{guide.status}}</td>
                            <td>
                                <div style="width: 50px; height: 50px;">
                                    <button class="btn btn-success" @click="verify(guide.id_guides,guide.status)">
                                        <font-awesome-icon icon="pencil" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-if="!guides || !guides.length">
                        <tr>
                            <td colspan="7" class="text-center">Empty Data.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import TourGuideService from "../../../services/tour-guide.service";
export default {
    name: "TourGuideagentView",
    components: {

    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            verified: "",
            guides: [],
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
        if (this.currentUser.role_id!=2) {
            this.$router.push("/dashboard");
        }
    },
    methods: {
        verify(id,verified) {
            if(verified=="Active"){
                this.verified="Nonactive";
            }else if(verified=="Awaiting Confirmation"){
                this.verified="Active";
            }else if(verified=="Nonactive"){
                this.verified="Active";
            }

            this.$swal.fire({
                title: 'Are you sure?',
                text: "You are going to change the status of this tour guide.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Change'
            }).then((result) => {
                if (result.isConfirmed) {
                    TourGuideService.verify(id,this.verified).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Tour guide status successfully updated.',
                                'success'
                            )
                            TourGuideService.getAll().then(
                                (response) => {
                                    this.guides = response.data.data
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
                                'Tour guide status not updated.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
    },
    mounted() {
        TourGuideService.getAll().then(
            (response) => {
                this.guides = response.data.data
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