<template>
  <div class="container">
    <NavBar />
    <Header />
    <SearchBox />
    <UpcomingEvent />
    <Brand />
  </div>
</template>

<script>


import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import SearchBox from './components/searchBox.vue'
import UpcomingEvent from './components/UpcomingEvent.vue'
import Brand from './components/Brand.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Header,
    SearchBox,
    UpcomingEvent,
    Brand
}
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
