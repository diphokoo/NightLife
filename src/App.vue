<template>
    <div class="container">
    <NavBar />
    <Headers />
    <SearchB />
    <UpcomingEvent />
    <Brand />
    <Blog />
  </div>
</template>

<script>


import NavBar from './components/NavBar.vue'
import Headers from './components/Headers.vue'
import SearchB from './components/Search.vue'
import UpcomingEvent from './components/UpcomingEvent.vue'
import Brand from './components/Brand.vue'
import Blog from './components/Blog.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Headers,
    SearchB,
    UpcomingEvent,
    Brand,
    Blog
}
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
