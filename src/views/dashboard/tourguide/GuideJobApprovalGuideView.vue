<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Guide Job Offer</h5>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                    cellspacing="0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Guide Name</th>
                            <th>Tour Agent (Requesting)</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Guide Approval</th>
                            <th>Tour Agent Approval</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="guides || guides.length">
                        <tr v-for="(guide, index) in guides" :key="index">
                            <td style="width: 50px">{{index+1}}</td>
                            <td v-if="guide.users.photo !=null">
                                <img :src=guide.users.photo style="width: 100px">
                            </td>
                            <td v-else>
                                <img src="../../../assets/image/home/photo_placeholder.png" style="width: 100px">
                            </td>
                            <td>{{guide.users.name}}</td>
                            <td>{{guide.tour_agents.agent_name}}</td>
                            <td>{{guide.start_date}}</td>
                            <td>{{guide.end_date}}</td>
                            <td>
                                <button v-if="guide.guide_approval == 'Approved'"
                                    class="btn btn-success w-100">{{ guide.guide_approval }}</button>
                                <button v-else-if="guide.guide_approval == 'Rejected'"
                                    class="btn btn-danger w-100">{{ guide.guide_approval }}</button>
                                <button v-else
                                    class="btn btn-warning w-100">{{ guide.guide_approval }}</button>
                            </td>
                            <td>
                                <button v-if="guide.agent_approval == 'Approved'"
                                    class="btn btn-success w-100">{{ guide.agent_approval }}</button>
                                <button v-else-if="guide.agent_approval == 'Rejected'"
                                    class="btn btn-danger w-100">{{ guide.agent_approval }}</button>
                                <button v-else
                                    class="btn btn-warning w-100">{{ guide.agent_approval }}</button>
                            </td>
                            <td>
                                <button v-if="guide.status == 'Chosen'"
                                    class="btn btn-success w-100">{{ guide.status }}</button>
                                <button v-else-if="guide.status == 'Not Chosen'"
                                    class="btn btn-danger w-100">{{ guide.status }}</button>
                                <button v-else
                                    class="btn btn-warning w-100">{{ guide.status }}</button>
                            </td>
                            <td>
                                <div v-if="guide.guide_approval == 'Waiting Approval' && guide.status == 'Waiting Approval'">
                                    <div style="width: 50px; height: 50px;">
                                        <button class="btn btn-success" @click="approval(guide.id_guide_selections, 'Approved')">
                                            <font-awesome-icon icon="check" style="width: 20px; height: 20px;" />
                                        </button>
                                    </div>
                                    <div style="width: 50px; height: 50px;">
                                        <button class="btn btn-danger" @click="approval(guide.id_guide_selections, 'Rejected')">
                                            <font-awesome-icon icon="times" style="width: 20px; height: 20px;" />
                                        </button>
                                    </div>
                                </div>
                                <div style="width: 50px; height: 50px;">
                                    <router-link
                                        :to="{ name: 'job-offer-detail', params: { id_guide_selections: guide.id_guide_selections, id_guides: guide.id_guides }}">
                                        <button class="btn btn-primary color-main-background">
                                            <font-awesome-icon icon="eye" />
                                        </button>
                                    </router-link>
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
import GuideSelectionService from "../../../services/guide-selection.service";
export default {
    name: "GuideJobApprovalAgentView",
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
        if (this.currentUser.role_id!=3) {
            this.$router.push("/dashboard");
        }
        this.loadGuide()
    },
    methods: {
        approval(id,approve) {
            let txt
            let suctxt
            let errtxt
            let btntxt
            if(approve=="Approved"){
                txt = "You are going to approve this job proposal."
                suctxt = "Job proposal successfully approved."
                errtxt = "Job proposal is not approved."
                btntxt = "Approve"
            }else if(approve=="Rejected"){
                txt = "You are going to reject this job proposal."
                suctxt = "Job proposal successfully rejected."
                errtxt = "Job proposal is not rejected."
                btntxt = "Reject"
            }

            this.$swal.fire({
                title: 'Are you sure?',
                text: txt,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: btntxt
            }).then((result) => {
                if (result.isConfirmed) {
                    GuideSelectionService.verifyByGuide(id, approve).then(
                        () => {
                            this.$swal.fire(
                                'Approved!',
                                suctxt,
                                'success'
                            )
                            this.loadGuide()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                errtxt,
                                'error'
                            )
                        }
                    );
                }
            })
        },
        loadGuide(){
            GuideSelectionService.getAllByIdGuide().then(
                (response) => {
                    this.guides = response.data.data
                    console.log(this.guides)
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