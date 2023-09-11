<template>
  <div>
    <p v-show="loggedIn && !userData.admin">
      This page is only available for admin users.
    </p>
    <webapp-error :error="error" />
    <div v-show="loggedIn && userData.admin" class="main">
      <div v-for="user in allUsers" :key="user.id">
        <div class="item">
          <table>
            <tr>
              <td colspan="2"><strong>ID: </strong> {{ user._id }}</td>
            </tr>
            <tr>
              <td><strong>Display name: </strong>{{ user.displayName }}</td>
              </tr>
              <tr>
              <td><strong>Email: </strong>{{ user.email }}</td>
              </tr>
              <tr>
              <td><strong>Username: </strong>{{ user.userName }}</td>
              </tr>
              <tr>
              <td><strong>Weight: </strong>{{ user.weight }}</td>
              </tr>
              <tr>
              <td><strong>Height: </strong>{{ user.height }}</td>
              </tr>
              <tr>
              <td><strong>Account Admin: </strong>{{ user.admin }}</td>
              </tr>
              <tr>
              <td><strong>Account Type: </strong>{{ user.accountType }}</td>
            </tr>
            <tr>
              <td>
                <button
                  v-show="this.userData.admin"
                  @click="deleteUser(user._id)"
                  class="btnDelete"
                >
                  Delete
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAPI from "../ServicesAPI/UsersAPI";
import webappErrorVue from "../views/webapp-error.vue";
export default {
  components: { 'webapp-error':webappErrorVue },
  data() {
    return {
      allUsers: [Object],
      error: "",
      loggedIn: false,
      userData: {},
    };
  },
  methods: {
    async deleteUser(id) {
      try {
        if (!this.userData.admin) {
          this.error = "Action is not allowed.";
          return;
        }
        const data = await UserAPI.deleteCurrentUser(id);
        if (data.message) {
          this.error = data.message;
          setTimeout(function() {
            UserAPI.goToPage("users");
          }, 1000)
          return;
        }
      } catch (err) {
        console.log(err.message);
        this.error = err.nessage;
      }
    },
  },
  async beforeMount() {
    try {
      const user = await await UserAPI.checkUser();
      if (user) {
        this.loggedIn = true;
        this.userData = user;
        console.log(this.userData.admin);
      }
      if (user.message) {
        this.error = user.message;
      }
    } catch (err) {
        this.error = err;
        console.log(err)
    }
  },
  async mounted() {
    try {
      const data = await UserAPI.getUsers();
      if (data.message) {
        this.error = data.message;
        return;
      }
      if(data) {
        this.allUsers = data;
      }
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  },
};
</script>

<style scoped>
.item {
  border-radius: 10px;
  padding: 10px;
  margin: 30px;
  text-align: left;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
td {
  width: 50%;
}
div {
  text-align: center;
}
.btnDelete {
  background-color: rgb(134, 0, 0);
  color: rgb(250, 175, 175);
  width: 200px;
}
.btnUse {
  background-color: rgb(0, 135, 0);
  color: rgb(195, 248, 189);
  width: 200px;
}

.btnUse:hover,
.btnDelete:hover {
  background-color: rgb(0, 0, 0);
  color: white;
}

button {
  margin: 10px;
}
</style>