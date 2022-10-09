<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Night Life</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="#">{{ navHome }}</a>
                    <a class="nav-link" href="#">{{ navGalary }}</a>
                    <a class="nav-link" href="#">{{ navContact }}</a>
                    <a class="nav-link border border-primary rounded-pill" href="#">{{ navLogin }}</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
 export default {
    name: 'NavBar',
    props: {
        nav: Array,
    },
    data() {
        return {
            navHome: "Home",
            navGalary: "Galary",
            navContact: "Contact",
            navLogin: "Login"
        }
    }
 }
</script>
