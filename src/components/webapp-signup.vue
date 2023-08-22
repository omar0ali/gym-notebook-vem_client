<template>
  <div class="main">
    <div v-show="error.length != 0" class="error">{{ error }}</div>
    <table>
      <th colspan="2">
        <h3>{{ title }}</h3>
      </th>
      <tr>
        <td>Display Name: </td>
        <td><input v-model="display_name" name="displayName" autocomplete="off" type="text" placeholder="Display Name" required /></td>
      </tr>
      <tr>
        <td>User Name: </td>
        <td><input v-model="username" type="text" name="username" autocomplete="username" placeholder="Username" required /></td>
      </tr>
      <tr>
        <td>Email: </td>
        <td><input v-model="email" type="text" name="email" autocomplete="email" placeholder="Email" required /></td>
      </tr>
      <tr>
        <td>Password: </td>
        <td><input v-model="password" type="password" name="password" autocomplete="new-password" placeholder="Password"
      required /></td>
      </tr>
      <tr>
        <td>Confirm Password: </td>
        <td><input v-model="confirm_password" type="password" placeholder="Confirm Password" required /><br /></td>
      </tr>
      <tr>
        <td colspan="2"><hr style="width: 100%;"></td>
      </tr>
      <tr>
        <td>Height: </td>
        <td> <input v-model="user_height" name="height" autocomplete="off" type="text" placeholder="Height" /></td>
      </tr>
      <tr>
        <td>Weight: </td>
        <td><input v-model="user_weight" name="weight" autocomplete="off" type="text" placeholder="Weight" /></td>
      </tr>
      <tr>
        <td style="text-align: right;" colspan="2"><button @click="post_signup">Sign up</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Service from "../service";
export default {
  data() {
    return {
      title: "Create a GymNotebook Account",
      name: "SignUp",
      display_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      user_height: "",
      user_weight: "",
      error: "",
    };
  },
  methods: {
    async post_signup() {
      try {
        if (this.password == this.confirm_password) {
          const res = await fetch(Service.url + "/signup", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              displayName: this.display_name,
              userName: this.username,
              email: this.email,
              password: this.password,
              height: this.user_height,
              weight: this.user_weight
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
        } else {
          this.error = "Password must match.";
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

input {
  font-size: 18px;
  width: 50vh;
  height: 40px;
  border: 1px solid #2d2d2d;
  margin-bottom: 10px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}
</style>