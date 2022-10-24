<template>
<nav id="sidebar">
    <div class="sidebar-header">
        <img src="../assets/logo-white.png" height="30" alt="Logo" style="margin-bottom: 6px; margin-right: 6px;" />
        <h4 v-if="this.currentUser.role_id=='1'">Admin Panel</h4>
        <h4 v-if="this.currentUser.role_id=='2'">Agent Panel</h4>
        <h4 v-if="this.currentUser.role_id=='3'">Guide Panel</h4>
    </div>
    <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id=='1'">
        <li class="active">
            <router-link to="/dashboard/"><span>Dashboard</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/tour-destination"><span>Tour Destinations</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/tour-category"><span>Tour Category</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/verify-agent"><span>Tour Agent</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/payment-method"><span>Payment Methods</span></router-link>
        </li>
    </ul>
    <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id=='2'">
        <li class="active">
            <router-link to="/dashboard/"><span>Dashboard</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/tour-agent-profile"><span>Profile</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/manage-tour-guide"><span>Tour Guide</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/tour-package"><span>Tour Package</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/pickup-fee"><span>Pickup Fee</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/verify-transactions"><span>Check Transactions</span></router-link>
        </li>
    </ul>
    <ul class="list-group list-group-flush components" v-if="this.currentUser.role_id=='3'">
        <li class="active">
            <router-link to="/dashboard/"><span>Dashboard</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/tour-guide-profile"><span>Profile</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/job-offer"><span>See Job Offer</span></router-link>
        </li>
        <li>
            <router-link to="/dashboard/job-history"><span>Job History</span></router-link>
        </li>
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
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0c3b85;
}

#sidebar ul.components {
    border-bottom: 2px solid #ffffff;
}

#sidebar ul p {
    color: #fff;
}

#sidebar ul li a {
    color: #ffffff;
    padding: 10px;
    font-size: 1.1em;
    display: block;
}

#sidebar ul li a:hover {
    color: #0c3b85;
    background: #fff;
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