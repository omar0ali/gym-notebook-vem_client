<template>
  <div>
    <webapp-error :error="error" />
    <div v-show="loggedIn" class="main">
      <div v-for="machine in allMachines" :key="machine.id">
        <div class="item">
          <table>
            <tr>
              <td v-show="this.userData.admin" colspan="2">
                <strong>ID: </strong> {{ machine._id }}
              </td>
            </tr>
            <tr>
              <td><strong>Name: </strong>{{ machine.name }}</td>
              <td><strong>Type: </strong>{{ machine.machineType }}</td>
            </tr>
            <tr>
              <td><strong>Description: </strong>{{ machine.description }}</td>
              <td><strong>Focus: </strong>{{ machine.focusedMuscles }}</td>
            </tr>
            <tr>
              <td>
                <button
                  v-show="this.userData.admin"
                  @click="deleteMachine(machine._id)"
                  class="btnDelete"
                >
                  Delete</button
                ><button class="btnUse">Use Machine</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MachineAPI from "../ServicesAPI/MachineAPI";
import webappError from "../views/webapp-error.vue";
export default {
  components: { webappError },
  data() {
    return {
      allMachines: [Object],
      error: "",
      loggedIn: false,
      userData: {},
    };
  },
  methods: {
    async deleteMachine(id) {
      try {
        if (!this.userData.admin) {
          this.error = "Action is not allowed.";
          return;
        }
        const data = await MachineAPI.deleteCurrentMachine(id);
        if (data.message) {
          this.error = data.message;
          return;
        }
        MachineAPI.goToPage("machines");
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    },
  },
  async beforeMount() {
    try {
      const user = await MachineAPI.checkUser();
      if (user) {
        this.loggedIn = true;
        this.userData = user;
        console.log(this.userData.admin);
      }
      if(user.message) {
        this.error = user.message;
      }
    } catch (err) {
      this.error = err.message;
    }
  },
  async mounted() {
    try {
      const data = await MachineAPI.getMachines();
      if (data.message) {
        this.error = data.message;
        return;
      }
      if (data) {
        this.allMachines = data;
      }
    } catch (err) {
      this.error = err;
      console.log(err);
    }
  }
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