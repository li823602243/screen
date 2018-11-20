<template>
  <div id="app" :class='[pageNum ? "page-other" : "page"]'>
    <top-bar></top-bar>
    <router-view/>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
export default {
  name: 'App',
  components: {
      TopBar,
  },
  computed: {
    pageNum() {
      return this.$store.state.pageNum;
    }
  },
}
</script>
<style>
.page{
  background: url('../static/images/index-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
.page-other {
 background: url('../static/images/nomal-bg.jpg');
 background-size: cover;
 background-repeat: no-repeat;
}
</style>

