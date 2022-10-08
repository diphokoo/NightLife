<template>
    <div class="container">
    <NavBar />
    <Headers />
    <SearchB />
    <UpcomingEvent />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Headers from './components/Headers.vue'
import SearchB from './components/Search.vue'
import UpcomingEvent from './components/UpcomingEvent.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Headers,
    SearchB,
    UpcomingEvent
  }
}
</script>
<style scoped>
  @import './sass/main.css';
</style>
