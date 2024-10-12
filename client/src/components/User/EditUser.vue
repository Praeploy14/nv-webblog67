<template>
  <div class="edit-user-page">
    <h1>Edit User</h1>
    <form class="edit-user-form" v-on:submit.prevent="editUser">
      <div class="form-group">
        <label>Name:</label>
        <input type="text" v-model="user.name" />
      </div>
      <div class="form-group">
        <label>Lastname:</label>
        <input type="text" v-model="user.lastname" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="user.password" />
      </div>
      <div class="submit-btn-section">
        <button type="submit" class="submit-btn">Edit User</button>
      </div>
    </form>
  </div>
</template>

<script>
import UsersService from '../../services/UsersService';
export default {
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        status: 'active'
      }
    };
  },
  async created() {
    try {
      var userId = this.$route.params.userId;
      this.user = (await UsersService.show(userId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async editUser() {
      try {
        await UsersService.put(this.user);
        this.$router.push('/users');
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
/* Main Page */
.edit-user-page {
  max-width: 500px; /* Reduced width for a more compact form */
  margin: 40px auto;
  padding: 45px;
  background: linear-gradient(145deg, #1e2a38, #2d3e50); /* AI-inspired dark gradient */
  border-radius: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  font-family: 'Poppins', Cinzel;
  color: #e0e0e0; /* Light text color for readability */
}

/* Title */
h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #00ffcc; /* Neon green-blue title */
  margin-bottom: 25px;
}

/* Form Styles */
.edit-user-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1.2rem;
  color: #00e5ff; /* Neon blue for labels */
}

input {
  width: 100%;
  padding: 10px 15px; /* Slightly reduced padding */
  font-size: 1rem;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #2a2e34;
  color: #fff;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #00e676; /* Neon green border on focus */
}

/* Submit Button */
.submit-btn-section {
  text-align: center;
  margin-top: 25px;
}

.submit-btn {
  padding: 12px 25px; /* Reduced button padding */
  background-color: #00e676;
  color: #000;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 230, 118, 0.5);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #00c853;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 230, 118, 0.7);
}
</style>
