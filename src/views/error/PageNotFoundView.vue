<template>
    <section class="p-0 gradient-custom-2">
        <div class="container-fluid d-flex flex-column">
            <div class="row align-items-center justify-content-center min-vh-100">
                <div class="col-md-6 col-lg-6">
                    <div class="text-center error-page">
                        <h2 class="mb-0 text-white">404</h2>
                        <h3 class="mb-4 text-white">Sorry, something went wrong!</h3>
                        <p class="w-sm-80 mx-auto mb-4 text-white">This page does not exist. Please reload the page or go back to home page.</p>
                        <div>
                            <router-link to="/" class="btn btn-light btn-lg me-sm-2 mb-2 mb-sm-0 color-main">Return Home</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "PageNotFound",
}
</script>

<style scoped>
body {
    margin-top: 20px;
}

.p-0 {
    padding: 0 !important;
}

.error-page {
    background-color: #BABABA4A;
    -webkit-backdrop-filter: blur(9px);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(234, 234, 235, 0.2);
    padding: 80px 20px;
    border-radius: 10px;
}

.text-center {
    text-align: center !important;
}

.error-page h2 {
    font-size: 150px;
    line-height: 1;
    font-weight: 600;
}

.text-secondary {
    color: #15395A !important;
}
</style>