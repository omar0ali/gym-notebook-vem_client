<template>
  <div>
    <img class="logo" alt="Gym notebook logo" src="../assets/3.png" />
    <h3>{{ title }}</h3>
    <div class="register">
      <div v-show="error.length != 0">
        <p class="error">{{ error }}</p>
      </div>
      <input
        v-model="display_name"
        name="displayName"
        autocomplete="off"
        type="text"
        placeholder="Display Name"
      />
      <input
        v-model="username"
        type="text"
        name="username"
        autocomplete="username"
        placeholder="Username"
      />
      <input
        v-model="email"
        type="text"
        name="email"
        autocomplete="email"
        placeholder="Enter Email"
      />
      <input
        v-model="password"
        type="password"
        name="password"
        autocomplete="new-password"
        placeholder="Enter Password"
      />
      <input
        v-model="confirm_password"
        type="password"
        placeholder="Confirm Password"
      />
      <button @click="post_signup">Sign up</button>
    </div>
  </div>
</template>

<script>
import Service from "../service";
export default {
  data() {
    return {
      title: "Sign Up Page",
      name: "SignUp",
      display_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
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
div {
  text-align: center;
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
.register {
  padding: 10px;
  margin: 10px;
}
.register input {
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