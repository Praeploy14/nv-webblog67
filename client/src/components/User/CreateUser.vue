<template>
  <div class="create-user-page">
    <h1>Create User</h1>
    <form class="user-form" v-on:submit.prevent="createUser">
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
        <input type="email" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="user.password" />
      </div>
      <div class="submit-btn-section">
        <button type="submit" class="submit-btn">Create User</button>
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
  methods: {
    async createUser() {
      try {
        await UsersService.post(this.user);
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
.create-user-page {
  max-width: 400px; /* Reduced max-width for more compact design */
  margin: 40px auto;
  padding: 40px;
  background: linear-gradient(145deg, #54f3d0, #7c7fe9); /* Futuristic gradient */
  border-radius: 40px; /* Slightly reduced for a compact look */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  font-family: 'Poppins', Cinzel;
  color: #fff;
}

h1 {
  text-align: center;
  font-size: 2.8rem; /* Slightly smaller font size */
  color: #5400e6;
  margin-bottom: 30px;
  font-weight: 700;
}

/* Form Styles */
.user-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px; /* Reduced margin for compactness */
}

label {
  font-size: 1rem;
  color: #001eff;
  margin-bottom: 6px;
  display: block;
}

input {
  width: 100%;
  padding: 10px 12px; /* Reduced padding for smaller inputs */
  font-size: 0.9rem;
  border: 1px solid #c4e6fe;
  border-radius: 6px; /* Slightly reduced border-radius */
  background-color: #fcfcfc;
  color: #030303;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #00e676;
}

/* Submit Button */
.submit-btn-section {
  text-align: center;
  margin-top: 25px;
}

.submit-btn {
  padding: 12px 25px; /* Reduced padding for a smaller button */
  background-color: #00e676;
  color: #000;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 230, 118, 0.5);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #00c853;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 230, 118, 0.7);
}
</style>
