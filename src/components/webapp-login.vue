<template>
  <div class="main">
    <webapp-error :error="error"/>
    <table>
      <tr>
        <td>Username <br><input
        v-model="username" autocomplete="username"
        name="username"
        type="text"
        placeholder="i.o johndoe"
      /></td>
      </tr>
      <tr>
        <td>Password <br><input
        v-model="password" autocomplete="current-password"
        name="password"
        type="password"
        placeholder="********"
      /></td>
      </tr>
      <tr>
        <td><span>If you forgot your password click <a href="">@Forgot password</a></span></td>
      </tr>
      <tr>
        <td style="text-align: right;"><button @click="post_login">Login</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
import ErrorView from "../views/webapp-error.vue";
export default {
  components: {
    'webapp-error':ErrorView
  },
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
}

td {
  font-weight: 900;
   text-align: left;
  vertical-align: baseline;
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
span {
  font-size: 16px;
}

</style>