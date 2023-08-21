<template>
  <div>
    <webapp-header />
    <webapp-navbar />
    <router-view/>
    <webapp-footer />
  </div>
</template>

<script>
import header from "@/views/webapp-header.vue";
import footer from "@/views/webapp-footer.vue";
import navbar from "@/views/webapp-navbar.vue";
export default {
  name: "App",
  components: {
    "webapp-header": header,
    "webapp-footer": footer,
    "webapp-navbar": navbar
  },data() {
    return {
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.error {
  justify-content: center; /* Center horizontally */
  display: flex;

  align-items: center; /* Center vertically */
  height: 50px;
  border-radius: 10px;
  color: #460000;
  background-color: rgba(183, 1, 1, 0.506);
}
</style>
