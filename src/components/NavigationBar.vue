<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 gradient-custom-2">
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
                        <a href="/login" class="btn btn-outline-light me-3">Login</a>
                        <a href="/register" class="btn btn-primary me-3">Signup</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {

}
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