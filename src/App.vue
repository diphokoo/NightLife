<template>
  <div class="container">
    <NavBar />
    <Header />
    <SearchBox />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import SearchBox from './components/searchBox.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Header,
    SearchBox
  }
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
