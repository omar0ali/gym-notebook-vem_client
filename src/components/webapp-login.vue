<template>
  <div class="main">
    <div v-show="error.length != 0" class="error">{{ error }}</div>
    <table>
      <th colspan="2"><h3>{{ title }}</h3></th>
      <tr>
        <td>User Name: </td>
        <td><input
        v-model="username" autocomplete="username"
        name="username"
        type="text"
        placeholder="Enter Username"
      /></td>
      </tr>
      <tr>
        <td>Password: </td>
        <td><input
        v-model="password" autocomplete="current-password"
        name="password"
        type="password"
        placeholder="Enter Password"
      /></td>
      </tr>
      <tr>
        <td colspan="2" style="text-align: right;"><button @click="post_login">Login</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
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
        const data = await Service.loginUser(this.username, this.password);
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
table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

td {
  font-weight: 900;
  text-align: left;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

input {
  font-size: 18px;
  width: 50vh;
  height: 40px;
  border: 1px solid #2d2d2d;
  margin-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}


</style>