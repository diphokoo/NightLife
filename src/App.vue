<template>
  <div class="container">
    <NavBar />
    <Header />
    <Search />
    <UpcomingEvent />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import Search from './components/Search.vue'
import UpcomingEvent from './components/UpcomingEvent.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Header,
    Search,
    UpcomingEvent
  }
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
