<template>
  <div>
    <div class="logo"><img src="../assets/1.png" alt="" /></div>
    <div v-show="loggedIn" class="account">
      <h3>Account Details</h3>
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
            <div class="admin">
              <button v-show="userData.admin">Add Machine</button><br />
              <button v-show="userData.admin">Add User</button>
            </div>
            <button>Update/upgrade Account</button><br />
            <button>My Profile</button><br />
            <button @click="logout">Logout</button><br />
            <button
              @click="deleteAccount"
              style="background-color: rgb(174, 75, 75); color: white"
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
    <button @click="goTo('signup')" v-show="!loggedIn">Sign Up Now!</button
    ><br />
    <button @click="goTo('login')" v-show="!loggedIn">or Login</button>
  </div>
</template>

<script>
import Service from "../service";
export default {
  data: function () {
    return {
      loggedIn: false,
      userData: {},
    };
  },
  methods: {
    goTo(location) {
      this.$router.push("/" + location);
    },
    async deleteAccount() {
      
      try {
        const res = await fetch(Service.url + "/api/users/" + this.userData._id, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          window.location.href = "/login";
        }
      } catch (err) {
        console.log(err);
      }
      this.loggedIn = false;
    },
    async logout() {
      try {
        const res = await fetch(Service.url + "/logout", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          window.location.href = "/login";
        }
      } catch (err) {
        console.log(err);
      }
      this.loggedIn = false;
    },
  },
  async created() {
    try {
      const res = await fetch(Service.url + "/checkUser", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      this.userData = await res.json();
      this.loggedIn = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
}

.account {
  margin: 10%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 10px;
  margin-top: 0;
  margin-bottom: 70px;
  border-radius: 10px;
}

.account h3 {
  color: rgb(0, 0, 0);
  margin-top: 0px;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
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
  font-size: 35px;
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

button {
  margin: 20px;
  height: 50px;
  width: 400px;
  font-size: 20px;
  color: #000000;
  background-color: rgb(177, 207, 255);
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
}

.admin button {
  background-color: rgb(227, 255, 136);
}

button:hover {
  background-color: rgb(76, 92, 118);
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
  color: #fff;
  transform: translateY(-7px);
}
</style>