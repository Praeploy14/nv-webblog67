<template>
    <div class="details-container">
      <h1 class="title">Details Apple Watch</h1>
      <div class="details-card">
        <img v-if="blog.thumbnail" :src="BASE_URL + blog.thumbnail" alt="Apple Watch Image" class="watch-image" />
        <p><strong>ID:</strong> {{ blog.id }}</p>
        <p><strong>Name:</strong> {{ blog.name }}</p>
        <p><strong>Sip:</strong> {{ blog.sip }}</p>
        <p><strong>Sensor:</strong> {{ blog.sensor }}</p>
        <p><strong>Price:</strong> {{ blog.price }}</p>
      </div>
  
      <div class="button-group">
        <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="edit-button">Edit</button>
        <button v-on:click="navigateTo('/blogs')" class="back-button">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import BlogsService from '@/services/BlogsService'
  
  export default {
    data() {
      return {
        blog: null,
        BASE_URL: "http://localhost:8081/assets/uploads/" // ตรวจสอบให้แน่ใจว่านี่ถูกตั้งค่าอย่างถูกต้อง
      }
    },
    async created() {
      try {
        const blogId = this.$route.params.blogId
        this.blog = (await BlogsService.show(blogId)).data
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
    }
  }
  </script>
  
  <template>
    <div class="details-container">
      <h1 class="title">Details Apple Watch</h1>
      <div class="details-card">
        <img v-if="blog.thumbnail" :src="BASE_URL + blog.thumbnail" alt="Apple Watch Image" class="watch-image" />
        <p><strong>ID:</strong> {{ blog.id }}</p>
        <p><strong>Name:</strong> {{ blog.name }}</p>
        <p><strong>Sip:</strong> {{ blog.sip }}</p>
        <p><strong>Sensor:</strong> {{ blog.sensor }}</p>
        <p><strong>Price:</strong> {{ blog.price }}</p>
      </div>
  
      <div class="button-group">
        <button v-on:click="navigateTo('/blog/edit/' + blog.id)" class="edit-button">Edit</button>
        <button v-on:click="navigateTo('/blogs')" class="back-button">Back</button>
      </div>
    </div>
  </template>
  
  <script>
  import BlogsService from '@/services/BlogsService'
  
  export default {
    data() {
      return {
        blog: null,
        BASE_URL: "http://localhost:8081/assets/uploads/" // ตรวจสอบให้แน่ใจว่านี่ถูกตั้งค่าอย่างถูกต้อง
      }
    },
    async created() {
      try {
        const blogId = this.$route.params.blogId
        this.blog = (await BlogsService.show(blogId)).data
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      navigateTo(route) {
        this.$router.push(route)
      },
    }
  }
  </script>
  
  <style scoped>
.details-container {
  background: linear-gradient(to bottom right, #e0f7fa, #b2ebf2); /* พื้นหลังไล่สีที่นุ่มนวล */
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: auto; /* กึ่งกลางการ์ด */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* เงาเล็กน้อย */
}

.title {
  text-align: center; /* กึ่งกลางชื่อ */
  color: #00796b; /* สีเทาอ่อนสำหรับชื่อ */
  margin-bottom: 20px; /* ระยะห่างด้านล่างชื่อ */
}

.details-card {
  background: white; /* พื้นหลังสีขาวสำหรับรายละเอียด */
  padding: 15px;
  border-radius: 10px; /* มุมโค้ง */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* เงาเล็กน้อย */
}

.watch-image {
  max-width: 70%; /* ปรับขนาดสูงสุดของรูปภาพ */
  height: auto; /* รักษาสัดส่วน */
  border-radius: 10px; /* มุมโค้ง */
  margin: 0 auto; /* จัดกลางรูปภาพ */
  display: block; /* เปลี่ยนเป็น block เพื่อให้ centering ทำงาน */
  transition: transform 0.3s, box-shadow 0.3s; /* เอฟเฟกต์การเปลี่ยน */
}

.watch-image:hover {
  transform: scale(1.05); /* ขยายขนาดเมื่อเลื่อนเมาส์ */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเมื่อเลื่อนเมาส์ */
}

.details-card p {
  margin: 10px 0; /* ระยะห่างระหว่างย่อหน้า */
  font-size: 16px; /* ขนาดตัวอักษร */
  color: #333; /* สีตัวอักษรมืด */
}

.button-group {
  display: flex; /* ใช้ flexbox สำหรับการจัดตำแหน่งปุ่ม */
  justify-content: center; /* กึ่งกลางปุ่ม */
  margin-top: 20px; /* ระยะห่างด้านบนปุ่ม */
}

button {
  background: linear-gradient(90deg, #00796b, #004d40); /* ไล่สีเขียว */
  color: white; /* ข้อความสีขาว */
  border: none; /* ไม่มีขอบ */
  border-radius: 5px; /* มุมโค้ง */
  padding: 10px 20px; /* ระยะห่าง */
  margin: 0 10px; /* ระยะห่างระหว่างปุ่ม */
  cursor: pointer; /* แสดงเป็นลูกศรเมื่อวางเมาส์ */
  transition: background 0.3s, transform 0.2s; /* เอฟเฟกต์การเปลี่ยน */
  font-size: 16px; /* ขนาดตัวอักษร */
}

button:hover {
  background: linear-gradient(90deg, #004d40, #00796b); /* ไล่สีเข้มขึ้นเมื่อวางเมาส์ */
  transform: scale(1.05); /* ขยายขนาดเมื่อวางเมาส์ */
}
</style>