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
            logo: "https://db3pap002files.storage.live.com/y4mZGbH-d-G7Es4W_SIy2a71Si9RMpALxe6uvZoXGcQ5OJ8rXhaVsFMKJeIV9vFniDeOeVmJ1kLkftFnswUnn8lr2nv1VkYPEIGImZKGsHlmqVSba7rYMvTVpdHDTTy4EhPB0STt7PTDMZ_zQxFsUG1oKglKgp5E9cWxpo90eS9CLw-S2bOk9dOyXBOoN6gXQgs?width=225&height=58&cropmode=none"
        }
    }
 }
</script>
