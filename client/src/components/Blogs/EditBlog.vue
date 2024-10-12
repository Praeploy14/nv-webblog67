<template>
  <div class="edit-product-container">
    <h1>Edit Product</h1>
    <form v-on:submit.prevent="editBlog" class="edit-product-form">
      <p>Name: <input type="text" v-model="blog.name" /></p>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
          <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
        </div>
      </transition>

      <div class="file-upload-section">
        
        <p class="upload-progress" v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p class="upload-success" v-if="isSuccess">Upload Successful.</p>

        <div class="dropbox">
          <p class="upload-instruction" v-if="isInitial">
            click to browse
          </p>
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="handleFileChange($event)"
            accept="image/*"
            class="input-file"
          />
        </div>
      </div>

      <transition-group tag="ul" class="pictures">
        <li v-for="picture in pictures" :key="picture.id">
          <img
            class="picture-image"
            :src="BASE_URL + picture.name"
            alt="picture image"
          />
          <br />
          <button v-on:click.prevent="useThumbnail(picture.name)" class="thumb-button">Thumbnail</button>
          <button v-on:click.prevent="delFile(picture)" class="delete-button">Delete</button>
        </li>
      </transition-group>

      <div class="clearfix"></div>

      <p>Sip: <input type="text" v-model="blog.sip" /></p>

      <p>Sensor: <input type="text" v-model="blog.sensor" /></p>

      <p>Price: <input type="text" v-model="blog.price" /></p>

      <div class="button-group">
        <button type="submit" class="update-button">Update</button>
        <button v-on:click="navigateTo('/blogs')" class="back-button">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      blog: {
        name: "",
        thumbnail: "null",
        sip: "",
        sensor: "",
        price: "",
        pictures: "null",
      },
      config: {
        toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ],
        height: 300,
      },
    };
  },
  methods: {
    async delFile(picture) {
      const result = confirm("Want to delete?");
      if (result) {
        await UploadService.delete({ filename: picture.name });
        this.pictures = this.pictures.filter(item => item.id !== picture.id);
      }
    },
    async editBlog() {
      try {
        await BlogsService.put(this.blog);
        this.$router.push({ name: "blogs" });
      } catch (err) {
        console.error(err);
      }
    },
    handleFileChange(event) {
      const { files } = event.target;
      this.fileCount = files.length;

      if (files.length) {
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append(this.uploadFieldName, file, file.name);
          this.uploadedFileNames.push(file.name);
        });
        this.save(formData);
      }
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.uploadedFileNames.forEach(uploadFilename => {
          if (!this.pictures.some(picture => picture.name === uploadFilename)) {
            this.pictureIndex++;
            this.pictures.push({ id: this.pictureIndex, name: uploadFilename });
          }
        });
        this.clearUploadResult();
      } catch (error) {
        console.error(error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    clearUploadResult() {
      setTimeout(() => this.reset(), 5000);
    },
    useThumbnail(filename) {
      this.blog.thumbnail = filename;
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.uploadedFileNames = [];
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
  async created() {
    this.currentStatus = STATUS_INITIAL;
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogsService.show(blogId)).data;
      this.pictures = JSON.parse(this.blog.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.upload-instruction {
  text-align: center;
  color: dimgray;
  font-weight: bold;
}

.edit-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #d9a8ff, #a9dbff); /* Pastel purple to light blue */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Poppins', Cinzel;
}

.edit-product-form p {
  margin-bottom: 15px;
}

.file-upload-section {
  margin: 20px 0;
}

.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: rgb(205, 255, 249);
  color: dimgray;
  padding: 20px;
  min-height: 120px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

.input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: rgb(249, 179, 255);
}

.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

.pictures li {
  margin-right: 15px;
  margin-bottom: 15px;
}

.picture-image {
  max-width: 180px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.thumbnail-pic img {
  width: 200px;
}

.button-group {
  display: flex; /* Use flexbox to center buttons */
  justify-content: center; /* Center the buttons */
  margin-top: 20px;
}

.update-button,
.back-button,
.thumb-button,
.delete-button {
  padding: 10px 25px; /* Adjust padding for oval shape */
  margin: 0 10px; /* Margin between buttons */
  border: none;
  border-radius: 30px; /* Make buttons oval */
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Added shadow for a nice effect */
}

.update-button {
  background-color: #7a67a5; /* Soft Purple */
  color: white;
}

.update-button:hover {
  background-color: #6f5c94; /* Darker Purple */
  transform: scale(1.05);
}

.back-button {
  background-color: #56cfe1; /* Soft Blue */
  color: white;
}

.back-button:hover {
  background-color: #4ba3c7; /* Darker Blue */
  transform: scale(1.05);
}

.thumb-button {
  background-color: #3fa2df; /* Soft Purple */
  color: white;
}

.thumb-button:hover {
  background-color: #1b78d5; /* Darker Purple */
  transform: scale(1.05);
}

.delete-button {
  background-color: #e57373; /* Soft Red */
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f; /* Darker Red */
  transform: scale(1.05);
}

.clearfix {
  clear: both;
}
</style>
