<template>
  <div>
    <h3>{{ title }}</h3>
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
              <td><strong>Name: </strong>{{ machine.name }}</td>
              <td><strong>Type: </strong>{{ machine.machineType }}</td>
            </tr>
            <tr>
              <td><strong>Description: </strong>{{ machine.description }}</td>
              <td><strong>Focus: </strong>{{ machine.focusedMuscles }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "../service";
export default {
  data() {
    return {
      title: "Machines",
      allMachines: [Object],
      error: "",
    };
  },
  methods: {
    isObjectEmpty(obj) {
      return Object.keys(obj).length === 0;
    },
  },
  async created() {
    try {
      const res = await fetch(Service.url + "/api/gym_machines", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
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
</style>