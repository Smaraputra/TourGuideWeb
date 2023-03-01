<template>
    <Transition>
        <div class="d-flex justify-content-center align-items-center" style="height: 90vh" v-if="!statusLoad">
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
                                <h2>Transactions</h2>
                                <p class="text-white">See all your transactions.</p>
                                <ul>
                                    <li><router-link to="/">Home</router-link></li>
                                    <li><span><font-awesome-icon icon="circle" /></span>Transaction</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="container p-4">
                <div class="row">
                    <div class="col-md-3 mt-4">
                        <div class="card shadow border-0">
                            <div class="dashboard_common_table">
                                <h3 class="mb-4">Transaction Type</h3>
                                <input type="checkbox" value="Active" v-model="slt_status" @change="searchFilter"
                                    class="btn-check w-100" id="active" autocomplete="off" />
                                <label class="btn btn_theme_white w-100 mb-2" for="active">Active</label>
                                <input type="checkbox" value="Finished" v-model="slt_status" @change="searchFilter"
                                    class="btn-check w-100" id="finished" autocomplete="off" />
                                <label class="btn btn_theme_white w-100 mb-2" for="finished">Finished</label>
                                <input type="checkbox" value="Cancelled" v-model="slt_status" @change="searchFilter"
                                    class="btn-check w-100" id="cancelled" autocomplete="off" />
                                <label class="btn btn_theme_white w-100 mb-2" for="cancelled">Cancelled</label>
                                <input type="checkbox" value="Waiting Payment" v-model="slt_status"
                                    @change="searchFilter" class="btn-check w-100" id="waiting_payment"
                                    autocomplete="off" />
                                <label class="btn btn_theme_white w-100 mb-2" for="waiting_payment">Waiting
                                    Payment</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9 mt-4">
                        <div class="card shadow border-0">
                            <!-- <div class="card-header p-3 text-center">
                    <h5 class="m-0 font-weight-bold">Manage Transaction</h5>
                </div> -->
                            <div class="dashboard_common_table">
                                <h3 class="mb-4">List of Transactions</h3>
                                <EasyDataTable
                                    show-index
                                    alternating
                                    :headers="headers" 
                                    :items="transacts"
                                    :theme-color="themeColor"
                                    buttons-pagination
                                    :loading="!statusLoad"
                                    >
                                    <template #item-additional_fee="item">
                                        {{ $filters.formatPrice(item.additional_fee) }}
                                    </template>
                                    <template #item-total_price="item">
                                        {{ $filters.formatPrice(item.total_price) }}
                                    </template>
                                    <template #item-pricing="item">
                                        {{ item.package_price.transportation }} - 
                                        ({{ item.package_price.pax_total }} Person)
                                    </template>
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
                                    <template #item-order_status="item">
                                        <button v-if="item.order_status == 'Finished'" style="border-radius: 10px;" class="btn btn-success w-100">{{
                                            item.order_status
                                            }}</button>
                                        <button v-else-if="item.order_status == 'Cancelled'" style="border-radius: 10px;" class="btn btn-danger w-100">{{
                                            item.order_status
                                            }}</button>
                                        <button v-else style="border-radius: 10px;" class="btn btn-warning w-100">{{
                                            item.order_status
                                            }}</button>
                                    </template>
                                    <template #item-action="item">
                                        <div class="operation-wrapper" style="min-width: 100px;">
                                            <div class="d-flex align-items-center align-middle pr-2 pt-2 pb-2">
                                                <router-link
                                                    :to="{ name: 'transactions-see', params: { id_orders: item.id_orders } }">
                                                    <button class="btn btn_theme">
                                                        <font-awesome-icon icon="eye" />
                                                    </button>
                                                </router-link>
                                            </div>
                                        </div>
                                    </template>
                                </EasyDataTable>
                                <!-- <div class="table-responsive">
                                    <table class="table table-bordered table-condensed table-striped" id="dataTable"
                                        width="100%" cellspacing="0">
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
                                                <td>{{ transaction.tour_packages.package_name }}</td>
                                                <td>{{ transaction.package_price.transportation }}
                                                    ({{ transaction.package_price.pax_total }} Person)</td>
                                                <td>{{ transaction.tour_agents.agent_name }}</td>
                                                <td>{{ transaction.note }}</td>
                                                <td>{{ transaction.order_date }}</td>
                                                <td>Rp. {{ transaction.additional_fee }}</td>
                                                <td>Rp. {{ transaction.total_price }}</td>
                                                <td>
                                                    <button v-if="transaction.order_status == 'Finished'"
                                                        style="border-radius: 10px;" class="btn btn-success w-100">{{
                                                            transaction.order_status
                                                        }}</button>
                                                    <button v-else-if="transaction.order_status == 'Cancelled'"
                                                        style="border-radius: 10px;" class="btn btn-danger w-100">{{
                                                            transaction.order_status
                                                        }}</button>
                                                    <button v-else style="border-radius: 10px;"
                                                        class="btn btn-warning w-100">{{
                                                            transaction.order_status
                                                        }}</button>
                                                </td>
                                                <td>
                                                    <div style="width: 50px; height: 50px;">
                                                        <router-link
                                                            :to="{ name: 'transactions-see', params: { id_orders: transaction.id_orders } }">
                                                            <button class="btn btn_theme w-100">
                                                                <font-awesome-icon icon="eye" />
                                                            </button>
                                                        </router-link>
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
                                </div> -->
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    </Transition>
</template>

<script>
import OrderService from "../../services/order.service";
export default {
    name: "TransactionAgentView",
    components: {

    },
    data() {
        const themeColor = "#184fa7";
        const headers = [
            { text: "Package", value: "tour_packages.package_name" },
            { text: "Pricing", value: "pricing" },
            { text: "Tour Agent", value: "tour_agents.agent_name", sortable: true },
            { text: "Note", value: "note" },
            { text: "Order Date", value: "order_date", sortable: true },
            { text: "Add. Fee", value: "additional_fee" },
            { text: "Total", value: "total_price" },
            { text: "Status", value: "order_status", sortable: true},
            { text: "Action", value: "action" },
        ];
        return {
            themeColor,
            headers,
            successful: false,
            loading: false,
            message: "",
            transacts: [],
            statusLoad: false,
            slt_status: [],
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
                    this.statusLoad = true
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
        searchFilter() {
            OrderService.searchFilterUser(this.slt_status).then(
                (response) => {
                    this.transacts = response.data
                },
                (error) => {
                    this.content =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
        },
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>