<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <img :src="logo" class="navbar-brand">
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
            navLogin: "Login",
            logo: "https://db3pap002files.storage.live.com/y4myssw1DRIDem4QyfvlnK-0I3Q4hzH0KGTlqhs75oO5KxgNUzBEze94SmSPcC7b2V_dZKP9tqKv6limPCNuCIWrItv8oNhSkvbpsc63CcWetS74212Cvx3g9oAIEWyJT7u_nRrbCdQnFYmlspjFu13QaJdr7lbRNPJ4ZnoKsRhCgqNTIUpVN3o3qoezd89DyUp?width=225&height=58&cropmode=none"
        }
    }
 }
</script>
