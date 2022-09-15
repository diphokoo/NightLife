<template>
  <div class="container">
    <NavBar />
    <Header />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Header
  }
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
