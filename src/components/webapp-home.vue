<template>
  <div class="main">
    <webapp-error :error="error" />
    <div v-show="loggedIn" class="account">
      <table>
        <tr>
          <td style="width: 70%">
            <h4>Hello {{ userData.displayName }},</h4>
            <p>
              ID: <strong>{{ userData._id }}</strong>
            </p>
            <p>
              Email: <strong>{{ userData.email }}</strong>
            </p>
            <p>
              Username: <strong>{{ userData.userName }}</strong>
            </p>
            <p>
              Height: <strong>{{ userData.height || "Not specified" }}</strong>
            </p>
            <p>
              weight: <strong>{{ userData.weight || "Not specified" }}</strong>
            </p>
            <p>
              Account Type: <strong>{{ userData.accountType }}</strong>
            </p>
            <p>
              Admin: <strong>{{ userData.admin }}</strong>
            </p>
          </td>
          <td>
            <div v-show="userData.admin">
              <button style="width: 400px" @click="goToMachines">
                Add Machine</button
              ><br />
              <button style="width: 400px">Add User</button>
            </div>
            <button style="width: 400px">Update/upgrade Account</button><br />
            <button style="width: 400px">My Profile</button><br />
            <button style="width: 400px" @click="logout">Logout</button><br />
            <button
            style="width: 400px"
              class="btnDelete"
              @click="deleteAccount"
            >
              Delete My Account
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div v-show="!loggedIn" class="home">
      <img src="@/assets/2.png" alt="Home Page" />
      <h3>Welcome to Gym Notebook – Your Ultimate Fitness Companion!</h3>
      <p>
        Are you ready to take your fitness journey to the next level? Look no
        further! Gym Notebook is here to empower you on your path to a stronger,
        healthier you. Our platform is designed with one goal in mind – to
        provide you with a seamless and intuitive way to track, monitor, and
        visualize your progress at the gym.
      </p>
      <h4>Why Choose Gym Notebook?</h4>
      <h5>🏋️‍♂️ Effortless Workout Tracking</h5>
      <p>
        Say goodbye to the days of struggling to remember your last workout.
        With Gym Notebook, you can effortlessly log your daily workouts. Whether
        you're hitting the weights, using cardio equipment, or practicing yoga,
        our user-friendly interface makes recording your exercises, weights,
        reps, and sets a breeze.
      </p>
      <h5>📈 Track Your Progress</h5>
      <p>
        Witness your growth in action. Keep tabs on your daily, weekly, and
        monthly progress with visually appealing graphs that showcase your
        journey towards your fitness goals. Our graphing feature allows you to
        identify patterns, set targets, and celebrate your achievements.
      </p>

      <h5>🤝 Community Support</h5>
      <p>
        Join a community of like-minded individuals who are also committed to
        their fitness endeavors. Share your accomplishments, exchange workout
        tips, and encourage one another to stay motivated. Together, we thrive!
      </p>

      <h5>🔒 Data Privacy and Security</h5>
      <p>
        We understand the importance of keeping your personal information
        secure. Gym Notebook employs top-notch security measures to ensure that
        your workout data remains private and confidential.
      </p>

      <h5>🌟 Personalized Experience</h5>
      <p>
        Tailor your experience to match your fitness regimen. Create custom
        workout routines, add new exercises, and set your preferred units for
        weights and reps. Your fitness journey, your way.
      </p>

      <h4>Get Started Today!</h4>
      <p>
        Embark on a fitness adventure like never before. Register for free and
        begin your journey with Gym Notebook. Say hello to simplified workout
        tracking, insightful progress visualization, and a supportive community
        that has your back every step of the way.
      </p>
      <p>
        Remember, your fitness achievements are just a click away. Start using
        Gym Notebook today and witness the transformation firsthand.
      </p>

      <p>
        Let's make every rep count. Start tracking, start achieving, with Gym
        Notebook!
      </p>
    </div>
    <div v-show="!loggedIn" style="text-align: right; padding: 10px">
      <button style="width: 400px" @click="goToPage('signup')">Sign Up Now!</button
      ><br />
      <button style="width: 400px" @click="goToPage('login')">or Login</button>
    </div>
  </div>
</template>

<script>
import Service from "../ServicesAPI/service";
import ErrorView from "../views/webapp-error.vue";
export default {
  props: ["uData"],
  components: {
    "webapp-error": ErrorView,
  },
  data: function () {
    return {
      error: "",
      userData: {},
      loggedIn: false,
    };
  },
  methods: {
    goToPage(location){
      Service.goToPage(location);
    },
    goToMachines() {
      this.$router.push({
        name: "Create Machine",
        stats: { uData: JSON.stringify(this.userData) },
      });

    },
    async deleteAccount() {
      if (!confirm("Are you sure?, this will remove your accounts data.")) {
        return;
      }
      try {
        const data = await Service.deleteCurrentUser(this.userData);
        if (data.message) {
          this.error =
            "Sucessfully " + data.message + " Rediricting to login page...";
          setTimeout(function () {
            Service.goToPage("login");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      try {
        const data = await Service.logOutUser();
        if (data.ok) {
          Service.goToPage("login");
          return;
        }
        if(data.message){
          this.error= data.message;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    if (Object.keys(this.uData).length != 0) {
      this.userData = this.uData;
      this.loggedIn = true;
    }
  },
  watch: {
    uData(newVal) {
      this.userData = newVal;
      this.loggedIn = true;
    },
  },
};
</script>

<style scoped>
table {
  width: 0;
  margin: auto;
}

.account {
  padding: 10px;
  border-radius: 10px;
}

.account h3 {
  color: rgb(0, 0, 0);
  text-align: center;
  border-radius: 10px;
}

.logo {
  text-align: center;
}

.home {
  text-align: center;
}

img {
  padding: 10px;
  margin: 10px;
}

h3 {
  font-size: 30px;
}

p {
  font-size: 20px;
  text-align: left;
}

h4,
h5 {
  text-align: left;
}

h4 {
  font-size: 30px;
  text-decoration: underline brown;
}

h5 {
  font-size: 25px;
}

p,
h4,
h5 {
  padding: 5px;
  margin: 25px;
}

.btnDelete{
background-color: rgb(148, 31, 31);
  color: rgb(255, 255, 255);
}

.btnDelete:hover {
background-color: #ffd7d7;
  color: rgb(0, 0, 0);
}
</style>