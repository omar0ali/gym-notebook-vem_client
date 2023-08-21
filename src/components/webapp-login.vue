<template>
  <div>
    <img class="logo" alt="Gym notebook logo" src="../assets/1.png" />
    <h3>{{ title }}</h3>
    <div v-show="error.length != 0">
      <p class="error">{{ error }}</p>
    </div>
    <div class="login">
      <input
        v-model="username" autocomplete="username"
        name="username"
        type="text"
        placeholder="Enter Username"
      />
      <input
        v-model="password" autocomplete="current-password"
        name="password"
        type="password"
        placeholder="Enter Password"
      />
      <button @click="post_login">Login</button>
    </div>
  </div>
</template>

<script>
import Service from "../service";
export default {
  data() {
    return {
      title: "Login Page",
      name: "Login",
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async post_login() {
      try {
        const res = await fetch(Service.url + "/login", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            userName: this.username,
            password: this.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.message) {
          this.error = data.message;
        }
        if (data.user) {
          location.assign("/");
        }
      } catch (err) {
        this.error = this.error + "<br>" + err;
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
div {
  text-align: center;
}
.logo {
  width: 400px;
  height: 400px;
}
* {
  font-size: 18px;
}
h3 {
  font-size: 30px;
}
.logo {
  width: 300px;
  height: 300px;
}
.login {
  padding: 10px;
  margin: 10px;
}
.login input {
  border-radius: 10px;
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid rgb(45, 45, 45);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}
button {
  width: 140px;
  height: 45px;
  font-weight: 500;
  color: #000;
  background-color: rgb(177, 207, 255);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-bottom: 50px;
}

button:hover {
  background-color: #6b6b6b;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>