<template>
  <div class="user-details-page">
    <h1>Show User</h1>
    <div class="user-info">
      <p><strong>ID:</strong> {{ user.id }} </p>
      <p><strong>Name:</strong> {{ user.name }} </p>
      <p><strong>Lastname:</strong> {{ user.lastname }} </p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Password:</strong> {{ user.password }}</p>
      <p><strong>Status:</strong> {{ user.status }}</p>
      <p><strong>Type:</strong> {{ user.type }}</p>
      <p><strong>Created At:</strong> {{ user.createdAt }}</p>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";

export default {
  data() {
    return {
      user: {}
    };
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>
/* Main Page */
.user-details-page {
  max-width: 1000px;
  margin: 50px auto;
  padding: 40px;
  background: linear-gradient(145deg, #3a3f5c, #414b6b); /* Dark futuristic background */
  border-radius: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  font-family: 'Poppins', Cinzel;
  color: #e0e0e0; /* Light text color for contrast */
}

/* Title */
h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #00e5ff; /* Neon blue title */
  margin-bottom: 30px;
}

/* User Info */
.user-info p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.user-info strong {
  color: #00ffcc; /* Bright neon green for labels */
}

/* Input Highlight */
p {
  color: #ffffff;
}

</style>
