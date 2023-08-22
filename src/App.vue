<template>
  <div>
    <webapp-navbar />
    <router-view />
    <webapp-footer />
  </div>
</template>

<script>
import footer from "@/views/webapp-footer.vue";
import navbar from "@/views/webapp-navbar.vue";
export default {
  name: "App",
  components: {
    "webapp-footer": footer,
    "webapp-navbar": navbar
  }, data() {
    return {
    }
  }
};
</script>

<style>
h3 {
  font-size: 30px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.error {
  font-size: 18px;
  position: fixed;
  padding: 20px;
  height: auto;
  width: 25%;
  bottom: 10%;
  border-radius: 10px;
  color: #460000;
  background-color: rgba(183, 1, 1, 0.506);
}

button {
  font-size: 25px;
  padding: 10px;
  width: auto;
  cursor: pointer;
  background-color: white;
  color: black;
  border: 2px solid #555555;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

button:hover {
  background-color: #555555;
  color: white;
}

.main {
  padding-bottom: 70px;
}
</style>
