<template>
  <div class="main">
    <webapp-error :error="error" />
    <h3>Add Machine</h3>
    <div class="table" v-show="main">
      <table>
        <tr>
          <td>Name:</td>
          <td>
            <input
              v-model="machineName"
              type="text"
              placeholder="Machine Name"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Type:</td>
          <td>
            <input
              v-model="machineType"
              type="text"
              placeholder="Machine Type"
              required
            />
          </td>
        </tr>
        <tr>
          <td>Description:</td>
          <td>
            <input
              v-model="description"
              type="text"
              placeholder="Description"
              required
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            Focused Muscles: <br />
            <input
              v-model="fm"
              type="text"
              placeholder="(i.e 'upper chest, shoulders, core' ) seperated with commas."
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <button @click="createMachine">Add</button>
          </td>
          <td style="font-weight: 100; font-size: 15px;">Only admin users are allowed to add machines to the database. </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MachineAPI from "../../ServicesAPI/MachineAPI";
import ErrorView from "../../views/webapp-error.vue";
export default {
  props:['uData'],
  components: {
    'webapp-error':ErrorView
  },
  data() {
    return {
      main: false,
      loggedIn: false,
      error: "",
      userData: {},
      name: "",
      machineName: "",
      machineType: "",
      description: "",
      fm: "",
    };
  },
  methods: {
    async createMachine() {
      const data = await MachineAPI.createMachine(
        this.machineName,
        this.machineType,
        this.description,
        this.fm
      );
      if (data.message) {
        this.error = data.message;
        return;
      }
      if(data) {
        this.$router.push({
        name: "View Machines",
        stats: { uData: JSON.stringify(this.userData) },
      });
      }
    },
  },
  async beforeMount() {
    if(Object.keys(this.uData).length!=0){
      this.userData = this.uData;
      this.loggedIn = true;
    }
  },
  async mounted() {
    setTimeout(() => {
      if (this.loggedIn) {
        if (!this.userData.admin) {
          this.error =
            "You must be an admin user to be able to view this page. In 5 seconds, you will be redirected to the home page.";
          setTimeout(() => {
            MachineAPI.goToPage("");
          }, 5000);
          return;
        }
        this.main = true;
      } else {
      //MachineAPI.goToPage("login");
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