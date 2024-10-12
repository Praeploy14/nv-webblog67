<template>
  <div class="user-page">
    <h1>Get All Users</h1>
    <div class="create-section">
      <button class="create-btn" v-on:click="navigateTo('/user/create')">Create User</button>
    </div>
    <hr>
    <div v-if="users.length">
      <div><b>There are:</b> {{ users.length }} users</div>
      <div v-for="user in users" v-bind:key="user.id" class="user-card">
        <div><b>ID:</b> {{ user.id }}</div>
        <div><b>Username:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>Email:</b> {{ user.email }}</div>
        <div><b>Status:</b> {{ user.status }}</div>
        <div><b>Type:</b> {{ user.type }}</div>
        <div class="actions">
          <button class="view-btn" v-on:click="navigateTo('/user/'+user.id)">View</button>
          <button class="edit-btn" v-on:click="navigateTo('/user/edit/'+user.id)">Edit</button>
          <button class="delete-btn" v-on:click="deleteUser(user)">Delete</button>
        </div>
        <hr>
      </div>
    </div>
    <div class="logout-section">
      <button class="logout-btn" v-on:click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    try {
      this.users = (await UsersService.index()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push({
        name: "login"
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteUser(user) {
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (result) {
        try {
          await UsersService.delete(user);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      try {
        this.users = (await UsersService.index()).data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
/* Main Page */
.user-page {
  max-width: 1500px;
  margin: 0 auto;
  padding: 50px 100px;
  background: linear-gradient(145deg, #40a6e6, #e1a0d9); /* Dark AI-inspired gradient */
  color: white;
  border-radius: 0px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  font-family: 'Poppins', Cinzel;
}

h1 {
  text-align: center;
  font-size: 2.8rem;
  color: #000000; /* Neon green */
  margin-bottom: 40px;
  font-weight: 700;
}

hr {
  border: none;
  height: 1px;
  background-color: #444;
  margin: 25px 0;
}

/* Create Button */
.create-section {
  text-align: center;
  margin-bottom: 40px;
}

.create-btn {
  padding: 15px 30px;
  background-color: #00e676;
  color: #000;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 230, 118, 0.5);
  transition: all 0.3s ease;
}

.create-btn:hover {
  background-color: #00c853;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 230, 118, 0.7);
}

/* User Cards */
.user-card {
  background-color: #2c2f33;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
}

.user-card div {
  font-size: 1.1rem;
  margin: 10px 0;
}

/* Buttons */
.actions button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.view-btn {
  background-color: #03a9f4;
  color: white;
}

.view-btn:hover {
  background-color: #0288d1;
  transform: translateY(-2px);
}

.edit-btn {
  background-color: #ffeb3b;
  color: #000;
}

.edit-btn:hover {
  background-color: #fbc02d;
  transform: translateY(-2px);
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
}

/* Logout Button */
.logout-section {
  text-align: center;
  margin-top: 40px;
}

.logout-btn {
  padding: 15px 40px;
  background-color: #ff1744;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background-color: #d50000;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 23, 68, 0.7);
}
</style>
