<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Manage Tour Guide</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
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
                            <td style="width: 50px">{{index+1}}</td>
                            <td><img src="../../../assets/image/home/photo_placeholder.png" style="width: 100px"></td>
                            <td>{{guide.users.name}}</td>
                            <td>{{guide.users.email}}</td>
                            <td>{{guide.description}}</td>
                            <td>{{guide.users.phone}}</td>
                            <td>{{guide.users.address}}</td>
                            <td v-if="guide.rating != null">
                                <font-awesome-icon icon="star" />{{ guide.rating }}
                            </td>
                            <td v-else>
                                <font-awesome-icon icon="star" />No rating yet
                            </td>
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
                            <td colspan="10" class="text-center">Empty Data.</td>
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
        this.loadGuide()
    },
    methods: {
        verify(id,verified) {
            let txt
            if(verified=="Active"){
                this.verified="Nonactive"
                txt = "You are going to change the status of this tour guide to nonactive."
            }else if(verified=="Awaiting Confirmation"){
                this.verified="Active"
                txt = "You are going to change the status of this tour guide to active."
            }else if(verified=="Nonactive"){
                this.verified="Active"
                txt = "You are going to change the status of this tour guide to active."
            }

            this.$swal.fire({
                title: 'Are you sure?',
                text: txt,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    TourGuideService.verify(id,this.verified).then(
                        () => {
                            this.$swal.fire(
                                'Success!',
                                'Tour guide status successfully updated.',
                                'success'
                            )
                            this.loadGuide()
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
        loadGuide(){
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
        }
    },
    mounted() {

    },
};
</script>

<style scoped>
 
</style>