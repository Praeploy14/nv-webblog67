<template>
    <div class="blog-create">
      <h1>Create Product</h1>
      <form v-on:submit.prevent="createBlog">
        <div class="form-group">
          <label for="blog-name">Name:</label>
          <input id="blog-name" type="text" v-model="blog.name" placeholder="Enter blog name" />
        </div>
        <transition name="fade">
          <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
            <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
          </div>
        </transition>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files)"
            accept="image/*"
            class="input-file"
          />
          <center><p v-if="isInitial">Drag your file(s) here to begin<br />or click to browse</p></center>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">Upload Successful.</p>
        </div>
        <ul class="pictures">
          <transition-group tag="li">
            <li v-for="picture in pictures" :key="picture.id">
              <img :src="BASE_URL + picture.name" alt="picture image" />
              <div class="button-group">
                <button v-on:click.prevent="useThumbnail(picture.name)">Set as Thumbnail</button>
                <button v-on:click.prevent="delFile(picture)">Delete</button>
              </div>
            </li>
          </transition-group>
        </ul>
        <div class="form-group">
          <label for="blog-sip">Sip:</label>
          <input id="blog-sip" type="text" v-model="blog.sip" placeholder="Enter SIP" />
        </div>
        <div class="form-group">
          <label for="blog-sensor">Sensor:</label>
          <input id="blog-sensor" type="text" v-model="blog.sensor" placeholder="Enter Sensor" />
        </div>
        <div class="form-group">
          <label for="blog-price">Price:</label>
          <input id="blog-price" type="text" v-model="blog.price" placeholder="Enter Price" />
        </div>
        <p>
          <center><button type="submit" class="submit-button">Create</button></center>
        </p>
      </form>
    </div>
  </template>
  
  <script>
  import BlogsService from "@/services/BlogsService";
  import UploadService from "../../services/UploadService";
  
  const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;
  
  export default {
    data() {
      return {
        BASE_URL: "http://localhost:8081/assets/uploads/",
        currentStatus: STATUS_INITIAL,
        uploadFieldName: "userPhoto",
        uploadedFileNames: [],
        pictures: [],
        pictureIndex: 0,
        blog: {
          name: "",
          thumbnail: "null",
          pictures: "null",
          sip: "",
          sensor: "",
          price: "",
        },
      };
    },
    methods: {
      async delFile(material) {
        let result = confirm("Want to delete?");
        if (result) {
          await UploadService.delete({ filename: material.name });
          this.pictures = this.pictures.filter(picture => picture.id !== material.id);
        }
      },
      async createBlog() {
        this.blog.pictures = JSON.stringify(this.pictures);
        try {
          await BlogsService.post(this.blog);
          this.$router.push({ name: "blogs" });
        } catch (err) {
          console.log(err);
        }
      },
      async save(formData) {
        try {
          this.currentStatus = STATUS_SAVING;
          await UploadService.upload(formData);
          this.currentStatus = STATUS_SUCCESS;
  
          this.uploadedFileNames.forEach(uploadFilename => {
            if (!this.pictures.some(picture => picture.name === uploadFilename)) {
              this.pictures.push({
                id: ++this.pictureIndex,
                name: uploadFilename,
              });
            }
          });
          this.clearUploadResult();
        } catch (error) {
          console.log(error);
          this.currentStatus = STATUS_FAILED;
        }
      },
      filesChange(fieldName, fileList) {
        if (!fileList.length) return;
        const formData = new FormData();
        Array.from(fileList).forEach(file => {
          formData.append(fieldName, file, file.name);
          this.uploadedFileNames.push(file.name);
        });
        this.save(formData);
      },
      clearUploadResult() {
        setTimeout(() => {
          this.currentStatus = STATUS_INITIAL;
          this.uploadedFileNames = [];
        }, 5000);
      },
      useThumbnail(filename) {
        this.blog.thumbnail = filename;
      },
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
    },
  };
  </script>
  
  <style scoped>
  .blog-create {
    background: linear-gradient(to bottom right, #b2e0f5, #c5f0d9); /* Soft gradient from light blue to light pastel green */
    padding: 50px 100px; /* Increased padding for a spacious layout */
    border-radius: 12px; /* Slightly rounded corners */
    max-width: 600px;
    margin: auto;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); /* Deeper shadow for more depth */
    font-family: 'Poppins', Cinzel;
  }
  
  h1 {
    text-align: center;
    color: #2c3e50; /* Darker shade for contrast */
  }
  
  .form-group {
    margin-bottom: 20px; /* Increased spacing between form groups */
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }
  
  input[type="text"] {
    width: 100%;
    padding: 15px; /* Increased padding for a more comfortable input field */
    border: 1px solid #b2dfdb; /* Light border */
    border-radius: 6px;
    transition: border-color 0.3s; /* Transition effect */
  }
  
  input[type="text"]:focus {
    border-color: #2c3e50; /* Darker border on focus */
  }
  
  .dropbox {
    outline: 2px dashed #5b47bf; /* Dash box color */
    background: #e0f2f1; /* Light background color */
    color: #004d40;
    padding: 30px; /* Increased padding */
    min-height: 120px; /* More height for better interaction */
    cursor: pointer;
    border-radius: 6px;
    position: relative;
  }
  
  .input-file {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
  
  .pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  .pictures li {
    margin-right: 15px; /* Increased spacing */
    margin-bottom: 15px; /* Increased spacing */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .pictures img {
    max-width: 180px;
    border-radius: 6px; /* Slightly rounded corners for images */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  
  .button-group {
    margin-top: 8px; /* Increased spacing */
  }
  
  button {
    background-color: #00796b; /* Teal button color */
    color: white;
    border: none;
    border-radius: 6px; /* Rounded button corners */
    padding: 12px 20px; /* Adjusted padding for a bolder look */
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    font-size: 16px; /* Slightly larger font size */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for buttons */
  }
  
  button:hover {
    background-color: #004d40; /* Darker teal on hover */
    transform: scale(1.05); /* Slight enlargement on hover */
  }
  
  .thumbnail-pic img {
    width: 200px;
    border-radius: 6px; /* Rounded corners for thumbnail */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for thumbnail */
  }
  </style>
  