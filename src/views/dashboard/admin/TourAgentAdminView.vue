<template>
    <div class="card shadow">
        <div class="card-header p-3 text-center">
            <h5 class="m-0 font-weight-bold color-main">Manage Tour Agents</h5>
        </div>
        <div class="card-body">
            <EasyDataTable
                show-index
                alternating
                :headers="headers" 
                :items="agents"
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
                <template #item-action="item">
                    <div class="operation-wrapper" style="min-width: 100px;">
                        <div class="d-flex justify-content-evenly align-items-center align-middle pr-2 pt-2 pb-2">
                            <button class="btn btn-success" @click="verify(item.id_tour_agents,item.verified)">
                                <font-awesome-icon icon="pencil" />
                            </button>
                            <button class="btn btn-danger" @click="deleteData(item.id_tour_agents)">
                                <font-awesome-icon icon="trash" />
                            </button>
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
                            <th>Tour Agent Name</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="agents || agents.length">
                        <tr v-for="(agent, index) in agents" :key="index">
                            <td style="width: 50px">{{index+1}}</td>
                            <td>{{agent.agent_name}}</td>
                            <td>{{agent.description}}</td>
                            <td>{{agent.email}}</td>
                            <td>{{agent.phone}}</td>
                            <td>{{agent.address}}</td>
                            <td>{{agent.verified}}</td>
                            <td>
                                <div style="width: 50px; height: 50px;">
                                    <button class="btn btn-success" @click="verify(agent.id_tour_agents,agent.verified)">
                                        <font-awesome-icon icon="pencil" />
                                    </button>
                                </div>
                                <div style="width: 50px; height: 50px;">
                                    <button class="btn btn-danger" @click="deleteData(agent.id_tour_agents)">
                                        <font-awesome-icon icon="trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot v-if="!agents || !agents.length">
                        <tr>
                            <td colspan="8" class="text-center">Empty Data.</td>
                        </tr>
                    </tfoot>
                </table>
            </div> -->
        </div>
    </div>
</template>

<script>
import TourAgentService from "../../../services/tour-agent.service";
export default {
    name: "TourAgentAdminView",
    components: {

    },
    data() {
        const themeColor = "#184fa7";
        const headers = [
            { text: "Tour Agent Name", value: "agent_name" },
            { text: "Description", value: "description" },
            { text: "Email", value: "email" },
            { text: "Phone", value: "phone" },
            { text: "Address", value: "address" },
            { text: "Status", value: "verified" },
            { text: "Action", value: "action" },
        ];
        return {
            themeColor,
            headers,
            statusLoad: false,
            successful: false,
            loading: false,
            message: "",
            agents: [],
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
        this.loadTourAgent()
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
                    TourAgentService.adminDelete(id).then(
                        () => {
                            this.$swal.fire(
                                'Deleted!',
                                'Tour agent successfully deleted.',
                                'success'
                            )
                            this.loadTourAgent()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Tour agent is not deleted.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        verify(id,verified) {
            let txt
            if(verified=="Yes"){
                this.verified="No";
                txt = "You are going to change the status of this tour guide to nonactive."
            }else if(verified=="No"){
                this.verified="Yes";
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
                    TourAgentService.verify(id,this.verified).then(
                        () => {
                            this.$swal.fire(
                                'Success!',
                                'Tour agent status successfully updated.',
                                'success'
                            )
                            this.loadTourAgent()
                        },
                        () => {
                            this.$swal.fire(
                                'Fail!',
                                'Tour agent status not updated.',
                                'error'
                            )
                        }
                    );
                }
            })
        },
        loadTourAgent(){
            this.statusLoad=true
            TourAgentService.getAll().then(
                (response) => {
                    this.agents = response.data.data
                    this.statusLoad=false
                },
                (error) => {
                    this.statusLoad=false
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