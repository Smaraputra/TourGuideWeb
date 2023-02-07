<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Manage Tour Destination Requests</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="destinations || destinations.length">
                        <tr v-for="(destination, index) in destinations" :key="index">
                            <td style="width: 50px">{{ index+ 1}}</td>
                            <td style="width: 100px">
                                <img v-if="destination.image_tourist_destination != null"
                                    :src="destination.image_tourist_destination" alt=""
                                    class="card-img-top mt-2 rounded imgSmallTabel">
                                <img v-else src="../../../assets/image/home/image_placeholder.png" alt=""
                                    class="card-img-top mt-2 rounded imgSmallTabel">
                            </td>
                            <td>{{ destination.name }}</td>
                            <td>{{ destination.description }}</td>
                            <td>{{ destination.address }}</td>
                            <td>{{ destination.latitude }}</td>
                            <td>{{ destination.longitude }}</td>
                            <td>
                                <button v-if="destination.approval_status == 'Yes'" class="btn btn-success">{{
                                    destination.approval_status
                                }}</button>
                                <button v-else-if="destination.approval_status == 'No'" class="btn btn-danger">
                                    {{ destination.approval_status }}</button>
                                <button v-else class="btn btn-warning">{{
                                    destination.approval_status
                                }}</button>
                            </td>
                            <td>
                                <div class="row" v-if="destination.approval_status == 'Waiting Approval'">
                                    <div class="col-sm mt-2">
                                        <button class="btn btn-success"
                                            @click="approveRequest(destination.id_tourist_destination_requests, 1)">
                                            <font-awesome-icon icon="check" style="width: 20px; height: 20px;" />
                                            Approve
                                        </button>
                                    </div>
                                    <div class="col-sm mt-2">
                                        <button class="btn btn-danger"
                                            @click="approveRequest(destination.id_tourist_destination_requests, 0)">
                                            <font-awesome-icon icon="times" style="width: 20px; height: 20px;" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-if="!destinations || !destinations.length">
                        <tr>
                            <td colspan="9" class="text-center">Empty Data.</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import previewImage from "../../../assets/image/home/image_placeholder.png"
import TourDestinationRequestService from "../../../services/tour-destination-request.service";
export default {
    name: "TourDestinationRequestAdminView",
    components: {

    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            destinations: [],
            urlImage: previewImage,
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
        this.loadTourDestination()
    },
    methods: {
        approveRequest(id, condition) {
            let textIns = ""
            let textOutSuccess = ""
            let textOutFailed = ""
            if (condition == 0) {
                textIns = "You will reject this request!"
                textOutSuccess = "Request is successfully rejected!"
                textOutFailed = "Request is not rejected!"
            } else {
                textIns = "You will approve this request!"
                textOutSuccess = "Request is successfully approved!"
                textOutFailed = "Request is not approved!"
            }
            this.$swal.fire({
                title: 'Are you sure?',
                text: textIns,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, continue!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.message = "";
                    this.successful = false;
                    this.loading = true;

                    TourDestinationRequestService.approvalAgent(condition, id).then(
                        () => {
                            this.message = textOutSuccess;
                            this.successful = true;
                            this.loading = false;
                            this.$swal.fire(
                                'Success!',
                                textOutSuccess,
                                'success'
                            )
                            this.loadTourDestination()
                        },
                        (error) => {
                            this.message =
                                (error.response &&
                                    error.response.data &&
                                    error.response.data.message) ||
                                error.message ||
                                error.toString();
                            this.successful2 = false;
                            this.loading2 = false;
                            this.$swal.fire(
                                'Fail!',
                                textOutFailed,
                                'error'
                            )
                        }
                    );
                }
            })
        },
        loadTourDestination() {
            TourDestinationRequestService.getAll().then(
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
        }
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>