<template>
  <div class="product-page">
    <div class="title-section">
      <h2 class="left-align">Apple Watch</h2>
      <h2 class="center-align">All Products</h2>
    </div>
    <h4>There are {{ blogs.length }} Products</h4>
    <!-- <button class="create-btn" v-on:click="navigateTo('/blog/create')">Create New Product</button> -->

    <div v-for="blog in blogs" v-bind:key="blog.id" class="product-card">

            
      <transition name="fade">
        <div class="product-content">
          <div class="thumbnail-pic" v-if="blog.thumbnail && blog.thumbnail !== 'null'">
            <img :src="BASE_URL + blog.thumbnail" alt="Thumbnail" />
          </div>
          

          <div class="product-info">
            <p><strong>ID:</strong> {{ blog.id }}</p>
            <p><strong>Name:</strong> {{ blog.name }}</p>
            <p><strong>SIP:</strong> {{ blog.sip }}</p>
            <p><strong>Sensor:</strong> {{ blog.sensor.replace(/(<([^>]+)>)/gi, "") }}</p>
            <p><strong>Price:</strong> {{ blog.price | formatPrice }} ฿</p>
          </div>
        </div>
      </transition>

      <div class="product-actions">
        <button class="view-btn" v-on:click="navigateTo('/blog/'+ blog.id)">View</button>
        <button class="edit-btn" v-on:click="navigateTo('/blog/edit/'+ blog.id)">Edit</button>
        <button class="delete-btn" v-on:click="deleteBlog(blog)">Delete</button>
      </div>
    </div>

    <p class="logout-section">
      <button class="logout-btn" v-on:click="logout">Logout</button>
    </p>
  </div>
</template>

<script>
import BlogsService from '@/services/BlogsService';

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/", // Correct URL for images
      blogs: []
    };
  },
  async created() {
    this.blogs = (await BlogsService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setBlog', null);
      this.$router.push({ name: 'login' });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogsService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogsService.index()).data;
    }
  },
  filters: {
    formatPrice(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
};
</script>

<style scoped>
/* Main Page */
.product-page {
  max-width: 950px;
  margin: 0 auto;
  padding: 50px 300px;
  background: linear-gradient(145deg, #fad1f5, #aee6f0); /* Light purple to light blue gradient */
  border-radius: 0px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', Cinzel; /* Modern and popular font */
}

/* Title Section */
.title-section {
  display: flex;
  justify-content: center; /* Center All Products */
  align-items: center;
  position: relative;
}

/* Left aligned Apple Watch */
.left-align {
  position: absolute;
  left: 0;
  font-size: 2.5rem;
  color: transparent; /* Make text transparent to show the background */
  font-weight: 600;
  background: linear-gradient(45deg, #9e75ea, #f7afc8); /* Light purple to pastel pink */
  -webkit-background-clip: text;
  background-clip: text;
  font-family: 'Poppins', Cinzel; /* Stylish font */
}


.center-align {
  text-align: center;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

h4 {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
  margin-bottom: 35px;
}

/* Create New Button */
.create-btn {
  display: block;
  margin: 0 auto 35px;
  padding: 15px 30px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.create-btn:hover {
  background-color: #3700b3;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(98, 0, 234, 0.3);
}

/* Product Card */
.product-card {
  background: linear-gradient(45deg, #ffffff, #d9b5ff);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}

.product-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.product-content {
  display: flex; /* Use flexbox to align image and info side by side */
  align-items: center; /* Center vertically */
}

.product-info p {
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
}

.product-info strong {
  color: #333;
}

/* Thumbnail Styles */
.thumbnail-pic {
  display: flex; /* Center the image */
  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
  margin-right: 15px; /* Space between the image and text */
}

.thumbnail-pic img {
  max-width: 200px; /* Increased maximum width for the thumbnail */
  max-height: 200px; /* Increased maximum height for the thumbnail */
  object-fit: cover; /* Maintain aspect ratio and cover the area */
  border-radius: 10px; /* Optional: add some rounded corners */
}

/* Action Buttons */
.product-actions {
  margin-top: 20px;
  text-align: right;
}

button {
  padding: 12px 25px;
  margin-right: 12px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  letter-spacing: 0.5px;
}

/* View Button */
.view-btn {
  background-color: #03dac6;
  color: white;
}

.view-btn:hover {
  background-color: #018786;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(3, 218, 198, 0.3);
}

/* Edit Button */
.edit-btn {
  background-color: #ffb300;
  color: white;
}

.edit-btn:hover {
  background-color: #ff9100;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 179, 0, 0.3);
}

/* Delete Button */
.delete-btn {
  background-color: #e53935;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(229, 57, 53, 0.3);
}

/* Logout Button */
.logout-section {
  text-align: center;
  margin-top: 50px;
}

.logout-btn {
  background-color: #cf1959;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.logout-btn:hover {
  background-color: #cf3d3d;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(236, 53, 190, 0.3);
}
</style>
