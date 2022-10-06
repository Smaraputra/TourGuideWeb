<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 gradient-custom-2" style="position: sticky; top:0;">
        <div class="container">
            <a class="navbar-brand me-2" href="/">
                <img src="../assets/logo.png" height="30" alt="Logo" style="margin-bottom: 6px; margin-right: 6px;" />
                <strong class="navbar-brand color-main"><span class="text-white">SI</span>PENGUIDE</strong>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
    
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="mx-auto"></div>
                <ul class="navbar-nav">
                    <li class="nav-item px-3">
                        <a class="nav-link text-white" href="#">Destinations</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link text-white" href="#">Tour Packages</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link text-white" href="#">About</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link text-white" href="#">Contact</a>
                    </li>
                    <li class="nav-item px-3">
                        <div v-if="!currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <router-link to="/login" class="nav-link text-white">
                                    <font-awesome-icon icon="sign-in-alt" /> Login
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/register" class="nav-link text-white">
                                    <font-awesome-icon icon="user-plus" /> Sign Up
                                </router-link>
                            </li>
                        </div>
                        
                        <div v-if="currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <router-link to="/profile" class="nav-link text-white">
                                    <font-awesome-icon icon="user" />
                                    {{ currentUser.name }}
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="" class="nav-link text-white" @click="logOut">
                                    <font-awesome-icon icon="sign-out-alt" />
                                    Logout
                                </router-link>
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
        showAdminBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_ADMIN');
            }

            return false;
        },
        showModeratorBoard() {
            if (this.currentUser && this.currentUser['roles']) {
                return this.currentUser['roles'].includes('ROLE_MODERATOR');
            }

            return false;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('logout');
            this.$router.push('login');
        }
    }
};
</script>

<style>
.gradient-custom-2 {
    background: #fccb90;
    background: -webkit-linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
    background: linear-gradient(to right, #5b82c1, #3866af, #0c3b85, #082d69);
}
.color-main {
  color: #184fa7;
}
</style>