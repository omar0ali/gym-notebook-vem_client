<template>
  <div>
    <webapp-title :title="title" />
    <ul class="topnav">
      <li v-show="!loggedIn">
        <router-link
          @click="activateSelectionHome()"
          to="/"
          >Home</router-link
        >
      </li>
      <li v-show="loggedIn">
        <router-link
          @click="activateSelectionAccount()"
          to="/"
          >{{ userData.displayName }}</router-link
        >
      </li>

      <li v-show="loggedIn">
        <router-link
          @click="activateSelectionMachines()"
          to="/"
          >All Machines</router-link
        >
      </li>
      <li v-show="!loggedIn" class="right">
        <router-link
          @click="activateSelectionSignUp()"
          to="signup"
          >Sign Up</router-link
        >
      </li>
      <li v-show="!loggedIn" class="right">
        <router-link
          @click="activateSelectionLogin()"
          to="login"
          >Login</router-link
        >
      </li>
      <li v-show="loggedIn" class="right">
        <router-link
          @click="activateSelectionLogout()"
          to="#"
          >Logout</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
import WebappTitle from "./webapp-title.vue";
export default {
  props: ["uData"],
  components: {
    "webapp-title": WebappTitle,
  },
  data() {
    return {
      title: "",
      activeSignUp: false,
      activeLogin: false,
      activeHome: false,
      activeAccount: false,
      activeMachines: false,
      loggedIn: false,
      userData: {},
      error: "",
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
      this.title = "View all available machines";
      this.$router.push("/machines");
    },
    activateSelectionLogin() {
      this.deactiveSelection();
      this.title = "Login to your account";
      this.activeLogin = true;
    },
    activateSelectionSignUp() {
      this.deactiveSelection();
      this.title = "Create a new account";
      this.activeSignUp = true;
    },
    activateSelectionHome() {
      this.deactiveSelection();
      this.title = "You can sign up for free if you don't  have an account";
      this.activeHome = true;
    },
    activateSelectionAccount() {
      this.deactiveSelection();
      this.activeAccount = true;
      this.title = "Account Details";
    },
    async activateSelectionLogout() {
      try {
        const data = await Service.logOutUser();
        if (data.ok) {
          Service.goToPage("login");
          return;
        }
        if (data.message) {
          this.error = data.message;
        }
      } catch (err) {
        this.error = err.message;
        console.log(err);
      }
    },
  },
  watch: {
    uData(newVal) {
      this.userData = newVal;
      this.activateSelectionAccount();
      this.loggedIn = true;
    },
  },
};
</script>

<style scoped>

ul.topnav {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  list-style-type: none;
  margin: 0;
  padding: 0;
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