<template>
  <div class="container">
    <div class="row">
      <form
        v-if="loading == false"
        class="col-8 mx-auto mt-5"
        @submit.prevent="createPost()"
      >
        <div class="w-100 d-flex justify-content-between align-items-center">
          <h2 class="mt-5 mb-5">Create Post</h2>
          <router-link to="/">Home</router-link>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input
            type="text"
            v-model.lazy="body.title"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
            id="exampleInputEmail1"
            placeholder="Title"
          />
          <div class="invalid-feedback" v-if="errors.title">
            {{ errors.title }}
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Content</label>
          <textarea
            rows="15"
            type="text"
            v-model.lazy="body.content"
            class="form-control"
            :class="{ 'is-invalid': errors.content }"
            id="exampleInputEmail1"
            placeholder="Content"
          />
          <div class="invalid-feedback" v-if="errors.content">
            {{ errors.content }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Post</button>
      </form>
      <div class="col-4 mx-auto mt-5" v-if="loading" role="status">
        <div class="w-100 d-flex">
          <span class="spinner-border mx-auto"></span>
        </div>
      </div>
    </div>
    <Alert :alertContent="alertContent" />
  </div>
</template>

<script>
import request from "../Constants/Request";
import Alert from "../components/Alert.vue";
const axios = require("axios");
export default {
  data() {
    return {
      loading: false,
      errors: {},
      body: {},
      alertContent: {},
    };
  },
  components: {
    Alert,
  },
  methods: {
    async createPost() {
      console.log("create post");
      this.loading = true;
      try {
        const response = await axios.post(request.api("post"), this.body, {
          headers: {
            Authorization: `Bearer ${request.token()}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        this.errors = error.response.data.errors;
        console.log(error);
      }
      this.loading = false;
      this.alertContent = {
        title: "Success",
        content: "Create post success",
        hasSuccess: true,
        close: false,
      };
    },
  },
};
</script>

<style scoped></style>
