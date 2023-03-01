<template>
    <nav id="sidebar">
        <div class="sidebar-header">
            <img src="../assets/img/logo-white.png" height="30" alt="Logo" style="height: 55px; margin-bottom: 6px; margin-right: 6px;" />
            <h4 v-if="this.currentUser.role_id == '1'">Admin Panel</h4>
            <h4 v-if="this.currentUser.role_id == '2'">Agent Panel</h4>
            <h4 v-if="this.currentUser.role_id == '3'">Guide Panel</h4>
        </div>
        <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id == '1'">
            <li>
                <router-link class="link-dash link" to="/dashboard/"><span>Dashboard</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-destination"><span>Tour Destinations</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/verify-tour-destination"><span>Verify Destination Request</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-category"><span>Tour Category</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/verify-agent"><span>Tour Agent</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/payment-method"><span>Payment Methods</span></router-link>
            </li>
        </ul>
        <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id == '2'">
            <li>
                <router-link class="link-dash link" to="/dashboard/"><span>Dashboard</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-agent-profile"><span>Profile</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/manage-tour-guide"><span>Tour Guide</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/guide-job-approval"><span>Guide Job Approval</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-destination-request"><span>Request Tour Destination</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-package"><span>Tour Package</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/pickup-fee"><span>Pickup Fee</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/payment-detail"><span>Payment Method Details</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/verify-transactions"><span>Check Transactions</span></router-link>
            </li>
        </ul>
        <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id == '3'">
            <li>
                <router-link class="link-dash link" to="/dashboard/"><span>Dashboard</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/tour-guide-profile"><span>Profile</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/guide-destination"><span>Guide Destination</span></router-link>
            </li>
            <li>
                <router-link class="link-dash link" to="/dashboard/job-offer"><span>Job Offer / History</span></router-link>
            </li>
            <!-- <li>
                <router-link class="link-dash link" to="/dashboard/job-history"><span>Job History</span></router-link>
            </li> -->
        </ul>
        <router-link to="/" class="btn btn-light w-100 mt-2" style="border-radius: 0%; "><span class="color-main">Exit Panel</span></router-link>
    </nav>
</template>

<script>
export default {
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    }

}
</script>

<style scoped>
#sidebar {
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: #184fa7;
    color: #fff;
    transition: all 0.3s;
}

a,
a:hover,
a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar.active {
    margin-left: -250px;
}

#sidebar .sidebar-header {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0c3b85;
}

#sidebar ul.components {
    border-bottom: 2px solid #ffffff;
}

#sidebar ul p {
    color: #ffffff;
}

#sidebar ul li a {
    color: #ffffff;
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #ffffff;
    background: #5b82c1;
}

#sidebar ul li.active>a,
a[aria-expanded="true"] {
    color: #fff;
    background: #5b82c1;
}

a[data-toggle="collapse"] {
    position: relative;
}

/* .dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
} */
</style>