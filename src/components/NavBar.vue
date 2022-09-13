<template>
    <div>
        <div class="nav-menu">
            <i class="fas fas-bars" @click="showMenu()"></i>

            <div class="nav-content" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
                <div class="logo">Night Life</div>

                <ul class="nav-items">
                    <li>Home</li>
                    <li>galary</li>
                    <li>contact</li>
                </ul>

                <div class="login-button">Login</div>

            </div>
        </div>
    </div>
</template>

<script>
 export default {
    name: 'NavBar',
    props: {
        nav: Array,
    }
 }
</script>
