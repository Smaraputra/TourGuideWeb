<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Guide Job Offer</h5>
        </div>
        <div class="card-body">
            <EasyDataTable
                show-index
                alternating
                :headers="headers" 
                :items="guides"
                :theme-color="themeColor"
                buttons-pagination
                :loading="statusLoad"
                >
                <template #loading>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="loader">
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="box"></div>
                        </div>
                    </div>
                </template>
                <template #item-photo="item">
                    <img v-if="item.users.photo != null"
                        :src="item.users.photo" alt=""
                        class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
                    <img v-else src="../../../assets/img/home/image_placeholder.png" alt=""
                        class="card-img-top mt-2 mb-2 rounded imgSmallTabel">
                </template>
                <template #item-status="item">
                    <button v-if="item.status == 'Chosen'"
                        class="btn btn-success w-100">{{ item.status }}</button>
                    <button v-else-if="item.status == 'Not Chosen'"
                        class="btn btn-danger w-100">{{ item.status }}</button>
                    <button v-else
                        class="btn btn-warning w-100">{{ item.status }}</button>
                </template>
                <template #item-agent_approval="item">
                    <button v-if="item.agent_approval == 'Approved'"
                        class="btn btn-success w-100">{{ item.agent_approval }}</button>
                    <button v-else-if="item.agent_approval == 'Rejected'"
                        class="btn btn-danger w-100">{{ item.agent_approval }}</button>
                    <button v-else
                        class="btn btn-warning w-100">{{ item.agent_approval }}</button>
                </template>
                <template #item-guide_approval="item">
                    <button v-if="item.guide_approval == 'Approved'"
                        class="btn btn-success w-100">{{ item.guide_approval }}</button>
                    <button v-else-if="item.guide_approval === 'Rejected'"
                        class="btn btn-danger w-100">{{ item.guide_approval }}</button>
                    <button v-else
                        class="btn btn-warning w-100">{{ item.guide_approval }}</button>
                </template>
                <template #item-action="item">
                    <div class="operation-wrapper" style="min-width: 150px;">
                        <div class="d-flex align-items-center align-middle pr-2 pt-2 pb-2" :class="item.guide_approval == 'Waiting Approval' && item.status == 'Waiting Approval' ? 'justify-content-evenly' : ''">
                            <button v-if="item.guide_approval == 'Waiting Approval' && item.status == 'Waiting Approval'" class="btn btn-success" @click="approval(item.id_guide_selections, 'Approved')">
                                <font-awesome-icon icon="check" style="width: 20px; height: 20px;" />
                            </button>
                            <button v-if="item.guide_approval == 'Waiting Approval' && item.status == 'Waiting Approval'" class="btn btn-danger" @click="approval(item.id_guide_selections, 'Rejected')">
                                <font-awesome-icon icon="times" style="width: 20px; height: 20px;" />
                            </button>
                            <router-link class="btn btn_theme"
                                :to="{ name: 'job-offer-detail', params: { id_guide_selections: item.id_guide_selections, id_guides: item.id_guides } }">
                                <font-awesome-icon icon="eye" class="m-1"/>
                            </router-link>
                        </div>
                    </div>
                </template>
            </EasyDataTable>
            <!-- <div class="table-responsive">
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
                                <img src="../../../assets/img/home/photo_placeholder.png" style="width: 100px">
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
                                    <div class="col-sm mt-2">
                                        <button class="btn btn-success" @click="approval(guide.id_guide_selections, 'Approved')">
                                            <font-awesome-icon icon="check" style="width: 20px; height: 20px;" />
                                        </button>
                                    </div>
                                    <div class="col-sm mt-2">
                                        <button class="btn btn-danger" @click="approval(guide.id_guide_selections, 'Rejected')">
                                            <font-awesome-icon icon="times" style="width: 20px; height: 20px;" />
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm mt-2">
                                    <router-link
                                        :to="{ name: 'job-offer-detail', params: { id_guide_selections: guide.id_guide_selections, id_guides: guide.id_guides }}">
                                        <button class="btn btn_theme">
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
            </div> -->
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
        const themeColor = "#184fa7";
        const headers = [
            { text: "Photo", value: "photo" },
            { text: "Guide Name", value: "users.name" },
            { text: "Tour Agent (Requesting)", value: "tour_agents.agent_name" },
            { text: "Start Date", value: "start_date" },
            { text: "End Date", value: "end_date" },
            { text: "Guide Approval", value: "guide_approval" },
            { text: "Tour Agent Approval", value: "agent_approval" },
            { text: "Status", value: "status" },
            { text: "Action", value: "action" },
        ];

        return {
            themeColor,
            headers,
            statusLoad: false,
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
            this.statusLoad = true
            GuideSelectionService.getAllByIdGuide().then(
                (response) => {
                    this.guides = response.data.data
                    this.statusLoad = false
                    console.log(this.guides)
                },
                (error) => {
                    this.statusLoad = false
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