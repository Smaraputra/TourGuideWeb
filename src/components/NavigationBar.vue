<template>
    <!-- <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 color-main-background"
        style="position: sticky; top:0;">
        <div class="container">
            <router-link to="/" class="navbar-brand me-2"><img src="../assets/img/logo-white.png" height="30" alt="Logo"
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
                        <router-link to="/destinations" class="link nav-link text-white">
                            Destinations
                        </router-link>
                    </li>
                    <li class="nav-item px-3">
                        <router-link to="/packages" class="link nav-link text-white">
                            Tour Packages
                        </router-link>
                    </li>
                    <li class="nav-item px-3">
                        <router-link to="/about" class="link nav-link text-white">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <div v-if="!currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item px-3">
                                <router-link to="/login" class="link nav-link text-white">
                                    <font-awesome-icon icon="sign-in-alt" /> Login
                                </router-link>
                            </li>
                            <li class="nav-item px-3">
                                <router-link to="/register" class="link nav-link text-white">
                                    <font-awesome-icon icon="user-plus" /> Sign Up
                                </router-link>
                            </li>
                        </div>

                        <div v-if="currentUser" class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a class="link nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <font-awesome-icon icon="user"/>
                                    <span> {{' ' + currentUser.name }}</span>
                                    <span> ({{ currentUser.role_name }})</span>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="navbarDropdown">
                                    <router-link to="/profile" class="dropdown-item color-main">
                                        Profile
                                    </router-link>
                                    <router-link v-if="currentUser.role_id == 1" to="/dashboard" class="dropdown-item color-main">
                                        Admin Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id == 2" to="/dashboard" class="dropdown-item color-main">
                                        Tour Agent Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id == 3" to="/dashboard" class="dropdown-item color-main">
                                        Tour Guide Panel
                                    </router-link>
                                    <router-link v-if="currentUser.role_id == 4" to="/transactions" class="dropdown-item color-main">
                                        Transactions
                                    </router-link>
                                    <div class="dropdown-divider"></div>
                                    <button class="dropdown-item color-main" @click="logOut">
                                        <font-awesome-icon icon="sign-out-alt" />
                                        Logout
                                    </button>
                                </div>
                            </li>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav> -->
    <div>
        <header class="main_header_arae">
            <!-- Top Bar -->
            <div class="topbar-area">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12 col-md-12">
                            <ul class="topbar-list">
                                <li>
                                    <a href="#!"><i class="fab fa-facebook"></i></a>
                                    <a href="#!"><i class="fab fa-twitter-square"></i></a>
                                    <a href="#!"><i class="fab fa-instagram"></i></a>
                                    <a href="#!"><i class="fab fa-linkedin"></i></a>
                                </li>
                                <li><a href="#!"><span>Sistem Informasi Penyediaan serta Pemesanan Paket Tour dan Guide dengan Model Layanan SaaS</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Navbar Bar -->
            <div class="navbar-area" :class="{ 'is-sticky': isSticky }">
                <div class="main-responsive-nav">
                    <div class="container">
                        <div class="main-responsive-menu mean-container">
                            <nav class="navbar">
                                <div class="container">
                                    <div class="logo">
                                        <router-link to="/">
                                            <img src="../assets/img/logo-white.png" alt="logo" style="height: 55px; margin-bottom: 6px; margin-right: 6px;"> <strong class="navbar-brand text-white">SIPENGUIDE</strong>
                                        </router-link>
                                    </div>
                                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbar-content">
                                        <div class="hamburger-toggle">
                                            <div class="hamburger">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </button>
                                    <div class="collapse navbar-collapse mean-nav" id="navbar-content">
                                        <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                                            <li class="nav-item">
                                                <router-link to="/destinations" class="dropdown-item">Destinations</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/packages" class="dropdown-item">Tour Packages</router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/about" class="dropdown-item">About</router-link>
                                            </li>
                                            <template v-if="!currentUser" >
                                            <li class="nav-item">
                                                <router-link to="/login" class="dropdown-item">
                                                    <font-awesome-icon icon="sign-in-alt" /> Login
                                                </router-link>
                                            </li>
                                            <li class="nav-item">
                                                <router-link to="/register" class="dropdown-item">
                                                    <font-awesome-icon icon="user-plus" /> Sign Up
                                                </router-link>
                                            </li>
                                            </template>
                                            <template v-else>
                                                <li class="nav-item dropdown">
                                                    <a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                                        <font-awesome-icon icon="user" />
                                                        <span> {{' ' + currentUser.name }}</span>
                                                        <span> ({{ currentUser.role_name }})</span>
                                                    </a>
                                                    <ul class="dropdown-menu animate slideIn">
                                                        <li class="nav-item">
                                                            <router-link to="/profile" class="dropdown-item">
                                                                Profile
                                                            </router-link>
                                                        </li>
                                                        <li class="nav-item">
                                                            <router-link v-if="currentUser.role_id == 1" to="/dashboard" class="dropdown-item">
                                                                Admin Panel
                                                            </router-link>
                                                        </li>
                                                        <li class="nav-item">
                                                            <router-link v-if="currentUser.role_id == 2" to="/dashboard" class="dropdown-item">
                                                                Tour Agent Panel
                                                            </router-link>
                                                        </li>
                                                        <li class="nav-item">
                                                            <router-link v-if="currentUser.role_id == 3" to="/dashboard" class="dropdown-item">
                                                                Tour Guide Panel
                                                            </router-link>
                                                        </li>
                                                        <li class="nav-item">
                                                            <router-link v-if="currentUser.role_id == 4" to="/transactions" class="dropdown-item">
                                                                Transactions
                                                            </router-link>
                                                        </li>
                                                        <li class="nav-item">
                                                            <router-link to="/login" @click="logOut" class="dropdown-item">
                                                                <font-awesome-icon icon="sign-out-alt" /> Logout
                                                            </router-link>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </template>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="main-navbar">
                    <div class="container">
                        <nav class="navbar navbar-expand-md navbar-light">
                            <router-link class="navbar-brand" to="/">
                                <img src="../assets/img/logo-white.png" alt="logo" style="height: 55px;  margin-bottom: 6px; margin-right: 6px;"> <strong class="navbar-brand pt-2">SIPENGUIDE</strong>
                            </router-link>

                            <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item px-3">
                                        <router-link to="/destinations" class="link nav-link text-white">
                                            Destinations
                                        </router-link>
                                    </li>
                                    <li class="nav-item px-3">
                                        <router-link to="/packages" class="link nav-link text-white">
                                            Tour Packages
                                        </router-link>
                                    </li>
                                    <li class="nav-item px-3">
                                        <router-link to="/about" class="link nav-link text-white">
                                            About
                                        </router-link>
                                    </li>
                                    <li class="nav-item">
                                        <div v-if="!currentUser" class="navbar-nav ml-auto">
                                            <li class="nav-item px-3">
                                                <router-link to="/login" class="link nav-link text-white">
                                                    <font-awesome-icon icon="sign-in-alt" /> Login
                                                </router-link>
                                            </li>
                                            <li class="nav-item px-3">
                                                <router-link to="/register" class="link nav-link text-white">
                                                    <font-awesome-icon icon="user-plus" /> Sign Up
                                                </router-link>
                                            </li>
                                        </div>

                                        <div v-if="currentUser" class="navbar-nav ml-auto">
                                            <li class="nav-item dropdown">
                                                <a class="link nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                                                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <font-awesome-icon icon="user"/>
                                                    <span> {{' ' + currentUser.name }}</span>
                                                    <span> ({{ currentUser.role_name }})</span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-end animate slideIn" aria-labelledby="navbarDropdown">
                                                    <li class="nav-item">
                                                        <router-link to="/profile">
                                                            Profile
                                                        </router-link>
                                                    </li>
                                                    <li v-if="currentUser.role_id == 1" class="nav-item">
                                                        <router-link to="/dashboard">
                                                            Admin Panel
                                                        </router-link>
                                                    </li>
                                                    <li v-if="currentUser.role_id == 2" class="nav-item">
                                                        <router-link to="/dashboard">
                                                            Tour Agent Panel
                                                        </router-link>
                                                    </li>
                                                    <li v-if="currentUser.role_id == 3" class="nav-item">
                                                        <router-link to="/dashboard">
                                                            Tour Guide Panel
                                                        </router-link>
                                                    </li>
                                                    <li v-if="currentUser.role_id == 4" class="nav-item">
                                                        <router-link to="/transactions" class="nav-item">
                                                            Transactions
                                                        </router-link>
                                                    </li>
                                                    <li class="nav-item">
                                                        <router-link to="/login" class="nav-item" @click="logOut">
                                                            <font-awesome-icon icon="sign-out-alt" /> Logout
                                                        </router-link>
                                                    </li>
                                                </div>
                                            </li>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'NavigationBar',
    data() {
        return {
            isSticky: false,
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    mounted() {
        window.addEventListener('scroll', () => {
            let scroll = window.scrollY
            if (scroll >= 200) {
                this.isSticky = true
            } else {
                this.isSticky = false
            }
        })

        document.addEventListener('click', function (e) {
            // Hamburger menu
            if (e.target.classList.contains('hamburger-toggle')) {
                e.target.children[0].classList.toggle('active');
            }
        })
    },
    methods: {
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
/* .navbar {
    border: none;
    border-radius: 0;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
} */

/* .nav-link {
  color: white;
  width: 100%;
} */
</style>