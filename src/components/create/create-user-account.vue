<template>
  <div class="main">
    <webapp-error :error="error" />
    <h3>Add User Account</h3>
    <div class="table" v-show="main">
      <table>
        <tr>
          <td>Display Name: </td>
          <td>
            <input
              v-model="displayName"
              type="text"
              placeholder="john doe"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Username: </td>
          <td>
            <input
              v-model="userName"
              type="text"
              placeholder="johndoe"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Password: </td>
          <td>
            <input
              v-model="passWord"
              type="password"
              placeholder="*****"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Email: </td>
          <td>
            <input
              v-model="email"
              type="text"
              placeholder="johndoe@example.com"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Heigh: </td>
          <td>
            <input
              v-model="height"
              type="text"
              placeholder="130"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Weight: </td>
          <td>
            <input
              v-model="weight"
              type="text"
              placeholder="130"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Admin Account: </td>
          <td>
            <input style="width: 25px; height: 25px"
              v-model="admin"
              type="checkbox"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Account Type: </td>
          <td>
            <input
              v-model="accountType"
              type="text"
              placeholder="basic"
              required
            />
          </td>
        </tr>
        <tr>
          <td style="width: 250px; font-weight: 100; font-size: 14px;">Only admin users are allowed to create different types of accounts.</td>
          <td><button @click="createUser()">Add user</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import UserAPI from "../../ServicesAPI/UsersAPI";
import ErrorView from "../../views/webapp-error.vue";
export default {
  props: ["uData"],
  components: {
    "webapp-error": ErrorView,
  },
  data() {
    return {
      main: false,
      loggedIn: false,
      error: "",
      userData: {},
      displayName: "",
      userName: "",
      passWord: "",
      email: "",
      weight: 0,
      height: 0,
      admin: false,
      accountType: ""
    };
  },
  async beforeMount() {
    if(Object.keys(this.uData).length!=0){
      this.userData = this.uData;
      this.loggedIn = true;
    }
  },
  methods: {
    async createUser() {
      const data = await UserAPI.createUser(
        this.displayName,
        this.userName,
        this.email,
        this.passWord, 
        this.height,
        this.weight,
        this.admin,
        this.accountType
      );
      if (data.message) {
        this.error = data.message;
        return;
      }
      if(data) {
        this.$router.push({
        name: "View Users",
        stats: { uData: JSON.stringify(this.userData) },
      });
      }
    },
  },
  async mounted() {
    setTimeout(() => {
      if (this.loggedIn) {
        if (!this.userData.admin) {
          this.error =
            "You must be an admin user to be able to view this page. In 5 seconds, you will be redirected to the home page.";
          setTimeout(() => {
            UserAPI.goToPage("");
          }, 5000);
          return;
        }
        this.main = true;
      } else {
      UserAPI.goToPage("login");
      }
    }, 100);
  },
};
</script>

<style scoped>
table,
td {
  font-size: 20px;
  padding: 10px;
  font-weight: 600;
}

table {
  width: 50%;
}

input {
  font-size: 20px;
  padding: 10px;
  width: 100%;
}

.table {
  display: flex;
  justify-content: center;
}

button {
  width: 200px;
}
</style>