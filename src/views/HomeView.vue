<template>
  <div class="home">
    <div class="container">
      <div class="w-100 d-flex justify-content-between align-items-center">
        <h2 class="mt-5 mb-5">Posts</h2>
        <router-link to="/dashboard">Crete post</router-link>
      </div>
      <div v-if="loading == false">
        <div v-for="post in posts" :key="post">
          <div class="card mt-2">
            <div class="card-body">
              <h2>{{ post.title }}</h2>
              <div>{{ post.content }}</div>
            </div>
          </div>
        </div>
        <nav
          aria-label="Page navigation example"
          class="mt-2 w-100 d-flex justify-content-center"
        >
          <ul class="pagination">
            <li class="page-item" v-if="currentPage > 1">
              <a class="page-link" href="#" @click.prevent="currentPage--"
                >Previous</a
              >
            </li>
            <li
              class="page-item"
              v-for="page in totalPage"
              :key="page"
              :class="{ active: currentPage == page }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="currentPage = page"
                >{{ page }}</a
              >
            </li>
            <li class="page-item" v-if="currentPage < totalPage">
              <a class="page-link" href="#" @click.prevent="currentPage++"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-4 mx-auto mt-5" v-if="loading" role="status">
        <div class="w-100 d-flex">
          <span class="spinner-border mx-auto"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import request from "../Constants/Request";

export default {
  data() {
    return {
      posts: [],
      currentPage: 1,
      totalPage: 0,
      loading: false,
    };
  },
  methods: {
    async getPosts() {
      this.loading = true;
      try {
        const response = await axios.get(
          request.api("post") + "?page=" + this.currentPage,
          {
            headers: {
              Authorization: `Bearer ${request.token()}`,
            },
          }
        );
        this.posts = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPage = response.data.last_page;
        console.log(response);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.getPosts();
  },
  watch: {
    currentPage: function () {
      this.getPosts();
    },
  },
};
</script>
