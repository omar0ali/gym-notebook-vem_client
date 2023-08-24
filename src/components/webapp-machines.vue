<template>
  <div>
    <h3>Machines</h3>
    <div>
      <div v-show="error.length != 0">
        <p class="error">{{ error }}</p>
      </div>
    </div>
    <div class="screen">
      <div v-for="machine in allMachines" :key="machine.id">
        <div class="item">
          <table>
            <tr>
              <td v-show="this.userData.admin" colspan="2"><strong>ID: </strong> {{ machine._id }}</td>
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
              <td><button v-show="this.userData.admin" @click="deleteMachine(machine._id)" class="btnDelete">Delete</button><button class="btnUse">Use Machine</button></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MachineAPI from "../ServicesAPI/MachineAPI";
export default {
  data() {
    return {
      allMachines: [Object],
      error: "",
      loggedIn: false,
      userData: {}
    };
  },
  methods: {
    async deleteMachine(id) {
      if(!this.userData.admin) {
        this.error = "Action is not allowed. In 5 seconds, you will be redirected to the home page.";
        setTimeout(()=>{
          MachineAPI.goToPage("");
        },5000);
        return;
      }

      //delete
      try {
        const data = await MachineAPI.deleteCurrentMachine(id);
        if(data.message) {
          this.error = data.message;
          return;
        }
        MachineAPI.goToPage("machines");
      }catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    }
  },
  async beforeCreate() {
    try {
      this.userData = await MachineAPI.checkUser();
      this.loggedIn = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  async beforeMount() {
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
  },
};
</script>

<style scoped>
.screen {
  overflow: scroll;
  max-height: 57vh;
  min-height: 57vh;
  margin: 50px;
  font-size: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}

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

h3 {
  font-size: 28px;
}
div {
  text-align: center;
}

.btnDelete {
  background-color: rgb(225, 67, 67);
}

.btnUse {
  background-color: rgb(134, 255, 134);
}
button {
  width: 200px;
}
</style>