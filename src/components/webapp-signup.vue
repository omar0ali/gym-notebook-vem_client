<template>
  <div class="main">
    <webapp-error :error="error"/>
    <table>
      <tr>
        <td>Display Name<br>
          <input
            v-model="displayName"
            name="displayName"
            autocomplete="off"
            type="text"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Username<br>
          <input
            v-model="userName"
            type="text"
            name="username"
            autocomplete="username"
            placeholder="i.e johndoe"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Email<br>
          <input
            v-model="email"
            type="text"
            name="email"
            autocomplete="email"
            placeholder="i.e johndoe@gmail.com"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Password<br>
          <input
            v-model="password"
            type="password"
            name="password"
            autocomplete="new-password"
            required
          />
        </td>
      </tr>
      <tr>
        <td>Confirm Password<br>
          <input
            v-model="confirm_password"
            type="password"
            required
          /><br />
        </td>
      </tr>
      <tr>
        <td><hr /></td>
      </tr>
      <tr>
        <td>Height<br>
          <input
            v-model="height"
            name="height"
            autocomplete="off"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td>Weight<br>
          <input
            v-model="weight"
            name="weight"
            autocomplete="off"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <td style="text-align: left">
          <button @click="post_signup">Sign up</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
import webappError from '../views/webapp-error.vue';
export default {
  components: { webappError },
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
}

td {
  font-weight: 900;
  text-align: left;
  vertical-align: baseline;
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