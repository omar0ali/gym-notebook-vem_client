<template>
  <ul class="topnav">
    <webapp-header/>
    <li v-show="!loggedIn">
      <router-link
        @click="activateSelectionHome()"
        :class="{ active: activeHome }"
        to="/"
        >Home</router-link
      >
    </li>
    <li v-show="loggedIn">
      <router-link
        @click="activateSelectionAccount()"
        :class="{ active: activeAccount }"
        to="/"
        >{{ userData.displayName }}</router-link
      >
    </li>

     <li v-show="loggedIn">
      <router-link
        @click="activateSelectionMachines()"
        :class="{ active: activeMachines }"
        to="/"
        >All Machines</router-link
      >
    </li>
    <li v-show="!loggedIn" class="right">
      <router-link
        @click="activateSelectionSignUp()"
        :class="{ active: activeSignUp }"
        to="signup"
        >Sign Up</router-link
      >
    </li>
    <li v-show="!loggedIn" class="right">
      <router-link
        @click="activateSelectionLogin()"
        :class="{ active: activeLogin }"
        to="login"
        >Login</router-link
      >
    </li>
    <li v-show="loggedIn" class="right">
      <router-link
        @click="activateSelectionLogout()"
        :class="{ active: activeLogin }"
        to="#"
        >Logout</router-link
      >
    </li>
  </ul>
</template>

<script>
import header from '@/views/webapp-header.vue';
import Service from "../service";
export default {
  components: {
    'webapp-header':header
  },
  data() {
    return {
      name: "Navbar",
      activeSignUp: false,
      activeLogin: false,
      activeHome: false,
      activeAccount: false,
      activeMachines: false,
      loggedIn: false,
      userData: {},
    };
  },
  methods: {
    deactiveSelection: function () {
      this.activeLogin = false;
      this.activeSignUp = false;
      this.activeHome = false;
      this.activeAccount = false;
      this.activeMachines = false;
    },
    activateSelectionMachines() {
      this.deactiveSelection();
      this.activeMachines = true;
      this.$router.push("/machines");
    },
    activateSelectionLogin() {
      this.deactiveSelection();
      this.activeLogin = true;
    },
    activateSelectionSignUp() {
      this.deactiveSelection();
      this.activeSignUp = true;
    },
    activateSelectionHome() {
      this.deactiveSelection();
      this.activeHome = true;
    },
    activateSelectionAccount() {
      this.deactiveSelection();
      this.activeAccount = true;
    },
    async activateSelectionLogout() {
      try {
        const res = await fetch(Service.url + "/logout", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if(res.ok){
          window.location.href = "/login";
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      this.loggedIn = false;
    },
  },
  async created() {
    try {
      const res = await fetch(Service.url + "/checkUser", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      this.userData = await res.json();
      this.activateSelectionAccount();
      this.loggedIn = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

<style scoped>
ul.topnav {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  position: sticky;
  top: 0;
  z-index: 5;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin: -10px;
  overflow: hidden;
  background-color: rgb(76, 92, 118);
  margin-bottom: 50px;
}

ul.topnav li {
  padding: 10px;
  float: left;
}

ul.topnav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 900;
}

ul.topnav li a:hover:not(.active) {
  background-color: #6c86c9;
  border-radius: 30px;
}

ul.topnav li a.active {
  background-color: #448cd0;
  border-radius: 30px;
}

ul.topnav li.right {
  float: right;
}

@media screen and (max-width: 600px) {
  ul.topnav li.right,
  ul.topnav li {
    float: none;
  }
}
</style>