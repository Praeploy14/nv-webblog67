<template>
  <div>
    <div class="nv-navbar">
      <router-link :to="{ name: 'blogs' }"> <!-- Wrap logo with router-link -->
        <img src="@/assets/logo-apple.png" class="logo" alt="Apple Logo" />
      </router-link>
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }" class="nav-item">Apple Watch</router-link></li>
        <li><router-link :to="{ name: 'comments' }" class="nav-item">Create</router-link></li>
        <li><router-link :to="{ name: 'users' }" class="nav-item">Users</router-link></li>
        <li v-if="!isLogin()"><router-link :to="{ name: 'login' }" class="nav-item">Login</router-link></li>
        <li v-else><button @click="logout" class="nav-item logout-btn">Logout</button></li>
        <!-- <li v-else><button @click="logout" class="nav-item logout-btn">Logout</button></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isLogin() {
      return this.$store.getters.isUserLoggedIn;
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style scoped>
.nv-navbar {
  background: linear-gradient(145deg, #f69fbc, #d0b6e0); /* Gradient background from pink to light purple */
  padding: 1px; /* More padding for a better look */
  display: flex; /* Use Flexbox for alignment */
  justify-content: space-between; /* Space between logo and nav items */
  align-items: center; /* Center items vertically */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add a slight shadow for depth */
}

.logo {
  width: 100px; /* Set the logo size */
  height: auto; /* Maintain aspect ratio */
  margin-right: 0px; /* Space between logo and nav items */
}

.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex; /* Use Flexbox for layout */
}

.nv-navbar .nav li {
  margin: 0 15px; /* Space between items */
}

.nv-navbar .nav-item {
  padding: 10px 20px; /* Add padding to make the buttons larger */
  text-decoration: none; /* Remove underline */
  color: #fff; /* Change text color to white */
  background: linear-gradient(90deg, #d6a7e8, #82d0f5); /* Gradient from pastel purple to pastel blue */
  border-radius: 30px; /* Rounded edges for buttons */
  font-weight: bold; /* Make the text bold */
  transition: background-color 0.3s, transform 0.3s; /* Smooth transitions */
}

.nv-navbar .nav-item:hover {
  background: linear-gradient(90deg, #b98ce7, #5ab7e8); /* Darker gradient on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.logout-btn {
  border: none; /* No border for button */
  color: #fff; /* White text for button */
  background: linear-gradient(90deg, #ff5e57, #d32f2f); /* Logout button gradient color */
  border-radius: 30px; /* Rounded edges */
  padding: 10px 20px; /* Padding */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s, transform 0.3s; /* Smooth transitions */
}

.logout-btn:hover {
  background: linear-gradient(90deg, #c62828, #a81c1c); /* Darker red on hover */
  transform: translateY(-2px); /* Lift effect on hover */
}

.clearfix {
  clear: left;
}
</style>
