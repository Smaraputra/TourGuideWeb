<template>
    <section class="bg-light">
        <div class="text-center pt-4 pb-2">
            <h2 class="color-main">Tour Packages</h2>
            <p class="lead text-muted">See all our tour packages.</p>
        </div>
    </section>
    <div class="row m-4">
        <div class="col-md-3 mt-4">
            <div class="card shadow border-0">
                <div class="card-body">
                    <h4 class="mb-4 color-main">Transaction Type</h4>
                    <input type="checkbox" class="btn-check w-100" name="type[]" id="active" autocomplete="off" />
                    <label class="btn btn-outline-primary w-100 mb-2" for="active">Active</label>
                    <input type="checkbox" class="btn-check w-100" name="type[]" id="finished" autocomplete="off" />
                    <label class="btn btn-outline-primary w-100 mb-2" for="finished">Finished</label>
                    <input type="checkbox" class="btn-check w-100" name="type[]" id="cancelled" autocomplete="off" />
                    <label class="btn btn-outline-primary w-100 mb-2" for="cancelled">Cancelled</label>
                    <input type="checkbox" class="btn-check w-100" name="type[]" id="waiting_payment" autocomplete="off" />
                    <label class="btn btn-outline-primary w-100 mb-2" for="waiting_payment">Waiting Payment</label>
                </div>
            </div>
        </div>
        <div class="col-md-9 mt-4">
            <div class="card shadow border-0">
                <!-- <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold text-primary">Manage Transaction</h5>
                </div> -->
                <div class="card-body">
                    <h4 class="mb-4 color-main">List of Transactions</h4>
                    <div class="table-responsive">
                        <table class="table table-bordered table-condensed table-striped" id="dataTable" width="100%"
                            cellspacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Package</th>
                                    <th>Pricing</th>
                                    <th>Tour Agent</th>
                                    <th>Note</th>
                                    <th>Start Date</th>
                                    <th>Add. Fee</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="transacts || transacts.length">
                                <tr v-for="(transaction, index) in transacts" :key="index">
                                    <td style="width: 50px">{{ index + 1 }}</td>
                                    <td>{{ packagess.package_name }}</td>
                                    <td>{{ transaction.package_price.transportation }}
                                        ({{ transaction.package_price.pax_total }} Person)</td>
                                    <td>{{ packagess.tour_agent.agent_name }}</td>
                                    <td>{{ transaction.note }}</td>
                                    <td>{{ transaction.order_date }}</td>
                                    <td>Rp. {{ transaction.additional_fee }}</td>
                                    <td>Rp. {{ transaction.total_price }}</td>
                                    <td>{{ transaction.order_status }}</td>
                                    <td>
                                        <div style="width: 50px; height: 50px;">
                                            <button class="btn btn-primary color-main-background">
                                                <font-awesome-icon icon="eye" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-if="!transacts || !transacts.length">
                                <tr>
                                    <td colspan="10" class="text-center">Empty Data.</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderService from "../../services/order.service";
export default {
    name: "TransactionAgentView",
    components: {

    },
    data() {
        return {
            successful: false,
            loading: false,
            message: "",
            packagess: null,
            transacts: [],
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
        if (this.currentUser.role_id != 4) {
            this.$router.push("/");
        }
        this.loadTransaction()
    },
    methods: {
        loadTransaction() {
            OrderService.getByIdUser().then(
                (response) => {
                    this.transacts = response.data.data
                    this.packagess = response.data.package
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
.color-main-background {
    background: #184fa7;
}

.color-main {
    color: #184fa7;
}
</style>