<template>
    <section id="theme_search_form">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="theme_search_form_area">
                        <div class="theme_search_form_tabbtn">
                            <ul class="nav nav-tabs" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="package-tab" data-bs-toggle="tab"
                                        data-bs-target="#package" type="button" role="tab" aria-controls="package"
                                        aria-selected="true"><i class="fas fa-globe"></i>Tour Package</button>
                                </li>
                            </ul>
                        </div>

                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="package" role="tabpanel"
                                aria-labelledby="package-tab">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="flight_categories_search">
                                            <ul class="nav nav-tabs" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link active" id="full-tab" data-bs-toggle="tab"
                                                        data-bs-target="#full" type="button" role="tab"
                                                        aria-controls="full" aria-selected="true">Full Course</button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="standard-tab" data-bs-toggle="tab"
                                                        data-bs-target="#standard" type="button" role="tab"
                                                        aria-controls="standard"
                                                        aria-selected="false">Standard Accomodation</button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="guide-tab" data-bs-toggle="tab"
                                                        data-bs-target="#guide" type="button" role="tab"
                                                        aria-controls="guide" aria-selected="false">Guide Only</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content" id="myTabContent1">
                                    <div class="tab-pane fade show active" id="full" role="tabpanel"
                                        aria-labelledby="full-tab">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <p>Search your desired tour packages based on category and destination.</p>
                                                <div class="full_search_form">
                                                    <form action="#!"> 
                                                        <input class="form-control border" type="search" placeholder="Tour Destination" v-model="destinationName">
                                                        <div class="top_form_search_button">
                                                            <button class="btn btn_theme btn_md">Search</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="standard" role="tabpanel"
                                        aria-labelledby="standard-tab">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <p>Search your desired tour packages based on category and destination.</p>
                                                <div class="full_search_form">
                                                    <form action="#!">
                                                        <input class="form-control border" type="search" placeholder="Tour Destination" v-model="destinationName">
                                                        <div class="top_form_search_button">
                                                            <button class="btn btn_theme btn_md">Search</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane fade" id="guide" role="tabpanel"
                                        aria-labelledby="guide-tab">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <p>Search your desired tour packages based on category and destination.</p>
                                                <div class="full_search_form">
                                                    <form action="#!">
                                                        <input class="form-control border" type="search" placeholder="Tour Destination" v-model="destinationName">
                                                        <div class="top_form_search_button">
                                                            <button class="btn btn_theme btn_md">Search</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: "FormHome",

    components: {
        
    },

    data() {
        return {
            destinationName: "",
        };
    },
    methods: {
        
    }
};
</script>