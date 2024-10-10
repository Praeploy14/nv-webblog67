<template>
  <div>
    <h1>Get All Users</h1>
    <div><button v-on:click="navigateTo('/user/create')">Create User</button></div>
    <hr>
    <div v-if="users.length">
      <div><b>There are:</b> {{ users.length }} users</div>
      <div v-for="user in users" v-bind:key="user.id">
        <div><b>id:</b> {{ user.id }}</div>
        <div><b>username:</b> {{ user.name }} {{ user.lastname }}</div>
        <div><b>email:</b> {{ user.email }}</div>
        <div><b>status:</b> {{ user.status }}</div>
        <div><b>type:</b> {{ user.type }}</div>
        <div>
          <button v-on:click="navigateTo('/user/'+user.id)">View </button>
          <button v-on:click="navigateTo('/user/edit/'+user.id)">Edit</button>
          <button v-on:click="deleteUser(user)">Delete</button>
        </div>
        <hr>
      </div>
    </div>
    <div><button v-on:click="logout">Logout</button></div>

  </div>
</template>

<script>
import UsersService from "@/services/UsersService";
export default {
  data(){
    return {
      users: []
    }
  },
  async created() {
    try{
      this.users = (await UsersService.index()).data;
    }catch(err){
      console.log(err);
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('setToken',null)
      this.$store.dispatch('setUser',null)
      this.$router.push({
        name: 'login'
      })
    },
    navigateTo(route){
      this.$router.push(route);
    },
    async deleteUser(user){
      let result = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if(result){
        try{
          await UsersService.delete(user);
          this.refreshData();

        }catch(err){
          console.log(err);
        }
      }
    },
    async refreshData(){
      try{
        this.users = (await UsersService.index()).data;
      }catch(err){
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
