<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 color-main-background" style="position: sticky; top:0;">
        <div class="container">
            <router-link to="/" class="navbar-brand me-2"><img src="../assets/logo-white.png" height="30" alt="Logo"
                    style="margin-bottom: 6px; margin-right: 6px;" />
                <strong class="navbar-brand">SIPENGUIDE</strong>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="mx-auto"></div>
                <ul class="navbar-nav">
                    <li class="nav-item px-3">
                        <router-link to="/destinations" class="nav-link text-white">
                            Destinations
                        </router-link>
                    </li>
                    <li class="nav-item px-3">
                        <router-link to="/packages" class="nav-link text-white">
                            Tour Packages
                        </router-link>
                    </li>
                    <li class="nav-item px-3">
                        <router-link to="/about" class="nav-link text-white">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <div v-if="!currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item px-3">
                                <router-link to="/login" class="nav-link text-white">
                                    <font-awesome-icon icon="sign-in-alt" /> Login
                                </router-link>
                            </li>
                            <li class="nav-item px-3">
                                <router-link to="/register" class="nav-link text-white">
                                    <font-awesome-icon icon="user-plus" /> Sign Up
                                </router-link>
                            </li>
                        </div>

                        <div v-if="currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <font-awesome-icon icon="user"/>
                                    <span> {{ currentUser.name }}</span>
                                    <span> ({{ currentUser.role_name }})</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="navbarDropdown">
                                    <router-link to="/profile" class="dropdown-item color-main">
                                        Profile
                                    </router-link>
                                    <router-link v-if="currentUser.role_id==1" to="/dashboard" class="dropdown-item color-main">
                                        Admin Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id==2" to="/dashboard" class="dropdown-item color-main">
                                        Tour Agent Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id==3" to="/dashboard" class="dropdown-item color-main">
                                        Tour Guide Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id==4" to="/transactions" class="dropdown-item color-main">
                                        Transactions
                                    </router-link>
                                    <div class="dropdown-divider"></div>
                                    <router-link to="" class="dropdown-item color-main" @click="logOut">
                                        <font-awesome-icon icon="sign-out-alt" />
                                        Logout
                                    </router-link>
                                </div>
                            </li>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        // logOut() {
        //     this.$store.dispatch('logout').then(
        //         (data) => {
        //             this.message = data.message;
        //             this.$router.push("/login");
        //         },
        //         (error) => {
        //             this.message =
        //                 (error.response &&
        //                     error.response.data &&
        //                     error.response.data.message) ||
        //                 error.message ||
        //                 error.toString();
        //         }
        //     );
        // },
        logOut() {
            this.$store.dispatch('logout').then(
                () => {
                    this.$router.push("/login");
                },
            );
        },
    }
};

</script>

<style scoped>
.color-main-background {
    background: #184fa7;
}
.color-main {
  color: #184fa7;
}

.navbar {
    border: none;
    border-radius: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}
</style>