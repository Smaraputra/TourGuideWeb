<template>
    <section class="bg-light">
        <div class="text-center pt-4 pb-2">
            <h2 class="color-main">Transaction Detail</h2>
            <p class="lead text-muted">See your transaction detail and its status.</p>
        </div>
    </section>
    <section class="p-4">
        <div class="row" v-if="transaction">
            <div class="col-md-8 mt-4">
                <div class="card shadow border-0">
                    <div class="card-body p-4">
                    </div>
                </div>
                <div class="card shadow border-0 mt-4">
                    <div class="card-body p-4">
                    </div>
                </div>
            </div>
            <div class="col-md-4 mt-4">
                <div class="card shadow border-0">
                    <div class="card-body">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import OrderService from "../../services/order.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
    name: "TransactionDetailView",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const schemaProof = yup.object().shape({
            id_package_prices: yup
                .string()
                .required("Package price is required!"),
            id_payment_methods: yup
                .string()
                .required("Payment method is required!"),
            order_date: yup
                .string()
                .required("Date is required!"),
            note: yup
                .string()
                .required("Note is required!")
                .min(3, "Must be at least 3 characters!")
                .max(255, "Must be maximum 255 characters!"),
        });

        return {
            successful: false,
            loading: false,
            message: "",
            schemaProof,
            transaction: null,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {

    },
    created() {
        this.loadTransaction()
    },
    methods: {
        loadTransaction(){
            OrderService.getOneByIdUser(this.$route.params.id_orders).then(
                (response) => {
                    this.transaction = response.data.data
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
    }
};

</script>

<style scoped>

</style>