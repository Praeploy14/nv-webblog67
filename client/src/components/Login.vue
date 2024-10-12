<template>
  <div class="login-container">
    <h1>User Login</h1>
    <form v-on:submit.prevent="onLogin" class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <button type="submit" class="btn">Login</button>
      <div class="error" v-if="error">{{ error }}</div>
    </form>
    <!-- Button to navigate to the user registration page -->
    <button @click="navigateToAddUser" class="btn-add-user">Register</button>
  </div>
</template>

<script>
import AuthenService from "../services/AuthenService";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AuthenService.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);

        this.$router.push({
          name: "users",
        });
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
        this.email = "";
        this.password = "";
      }
    },
    navigateToAddUser() {
      this.$router.push("/user/create");
    },
  },
};
</script>

<style scoped>
/* Container Styles */
.login-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 40px;
  background: linear-gradient(135deg, #bcf4fb, #fabfd4); /* Deeper pastel blue and pink gradient */
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(100, 149, 237, 0.5); /* Darker shadow */
  text-align: center;
  font-family: 'Poppins', Cinzel;
  color: #444; /* Slightly darker text color */
}

/* Title Styles */
h1 {
  font-size: 2.4rem;
  margin-bottom: 20px;
  color: #ff4081; /* Stronger pink for the title */
  text-shadow: 2px 2px 5px rgba(255, 64, 129, 0.6); /* More intense glow */
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 1.1rem;
  color: #ff80ab; /* Bolder pink for labels */
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background-color: #b2ebf2; /* Deeper pastel blue */
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border: 2px solid #ff80ab; /* Bold pink focus border */
  box-shadow: 0 0 8px rgba(255, 128, 171, 0.5);
}

/* Button Styles */
.btn,
.btn-add-user {
  width: 100%;
  padding: 15px;
  background-color: #ff94c2; /* Slightly stronger pink for buttons */
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  position: relative;
  overflow: hidden;
}

.btn::before,
.btn-add-user::before {
  content: "";
  position: absolute;
  width: 300%;
  height: 300%;
  background: rgba(255, 105, 180, 0.3); /* Bolder sparkle effect */
  top: -100%;
  left: -100%;
  border-radius: 50%;
  transition: all 0.5s ease;
}

.btn:hover::before,
.btn-add-user:hover::before {
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  background: rgba(255, 105, 180, 0.5); /* Brighter sparkle on hover */
}

.btn:hover,
.btn-add-user:hover {
  background-color: #ff4081; /* Stronger pink on hover */
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(255, 182, 193, 0.6);
}

/* Error Message */
.error {
  color: #ff1744;
  margin-top: 15px;
  font-size: 0.9rem;
}

/* Register Button Hover Effects */
.btn-add-user {
  background-color: #81d4fa; /* Slightly deeper pastel blue */
}

.btn-add-user:hover {
  background-color: #29b6f6; /* Darker blue on hover */
  box-shadow: 0 10px 25px rgba(135, 206, 250, 0.7); /* Blue shadow on hover */
}
</style>
