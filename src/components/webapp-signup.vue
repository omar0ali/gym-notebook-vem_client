<template>
  <div class="main">
    <div v-show="error.length != 0" class="error">{{ error }}</div>
    <table>
      <th colspan="2">
        <h3>{{ title }}</h3>
      </th>
      <tr>
        <td>Display Name:</td>
        <td>
          <input
            v-model="displayName"
            name="displayName"
            autocomplete="off"
            type="text"
            placeholder="Display Name"
            required
          />
        </td>
      </tr>
      <tr>
        <td>User Name:</td>
        <td>
          <input
            v-model="userName"
            type="text"
            name="username"
            autocomplete="username"
            placeholder="Username"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Email:</td>
        <td>
          <input
            v-model="email"
            type="text"
            name="email"
            autocomplete="email"
            placeholder="Email"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Password:</td>
        <td>
          <input
            v-model="password"
            type="password"
            name="password"
            autocomplete="new-password"
            placeholder="Password"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Confirm Password:</td>
        <td>
          <input
            v-model="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
          /><br />
        </td>
      </tr>
      <tr>
        <td colspan="2"><hr style="width: 100%" /></td>
      </tr>
      <tr>
        <td>Height:</td>
        <td>
          <input
            v-model="height"
            name="height"
            autocomplete="off"
            type="text"
            placeholder="Height"
          />
        </td>
      </tr>
      <tr>
        <td>Weight:</td>
        <td>
          <input
            v-model="weight"
            name="weight"
            autocomplete="off"
            type="text"
            placeholder="Weight"
          />
        </td>
      </tr>
      <tr>
        <td style="text-align: right" colspan="2">
          <button @click="post_signup">Sign up</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
export default {
  data() {
    return {
      title: "Create a GymNotebook Account",
      name: "SignUp",
      displayName: "",
      userName: "",
      email: "",
      password: "",
      confirm_password: "",
      height: "",
      weight: "",
      error: "",
    };
  },
  methods: {
    async post_signup() {
      try {
        if (this.password != this.confirm_password) {
          this.error = "Passwords must match.";
          return;
        }
        const data = await Service.signUpUser(
          this.displayName,
          this.userName,
          this.email,
          this.password,
          this.weight,
          this.height
        );
        if (data.message) {
          this.error = data.message;
        }
        if (data.user) {
          location.assign("/");
        }
      } catch (err) {
        this.error = this.error + " " + err;
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