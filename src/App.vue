<template>
  <div>
    <webapp-navbar :uData="userData"/>
    <router-view :uData="userData"/>
    <webapp-footer />
  </div>
</template>

<script>
import Service from "./ServicesAPI/service";
import footer from "@/views/webapp-footer.vue";
import navbar from "@/views/webapp-navbar.vue";
export default {
  name: "App",
  components: {
    "webapp-footer": footer,
    "webapp-navbar": navbar
  }, data() {
    return {
      userData: {}
    }
  },
  async created() {
    try {
      const res = await fetch(Service.url + "/checkUser", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      this.userData = await res.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};
</script>

<style>
h3 {
  font-size: 30px;
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  border-radius: 10px;
  margin-bottom: 10px;
}

button:hover {
  background-color: #555555;
  color: white;
}

.main {
  padding-top: 150px;
  padding-bottom: 70px;
}

td {
  font-size: 20px;
}
</style>
