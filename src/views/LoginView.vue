<template>
  <div class="container">
    <div class="row">
      <form
        v-if="loading == false"
        class="col-8 mx-auto mt-5"
        @submit.prevent="login()"
      >
        <h2>Login</h2>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model.lazy="user.email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors.email }"
            id="exampleInputEmail1"
            placeholder="Email"
          />
          <div class="invalid-feedback" v-if="errors.email">
            {{ errors.email }}
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model.lazy="user.password"
            :class="{ 'is-invalid': errors.password }"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
          <div class="invalid-feedback" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>
        <div class="form-group">
          <router-link to="/register">Register an Account</router-link>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
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
const axios = require("axios");
import Alert from "../components/Alert.vue";
import request from "../Constants/Request";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {},
      loading: false,
      alertContent: {},
    };
  },
  components: {
    Alert,
  },
  methods: {
    async login() {
      console.log("login event");
      try {
        this.loading = true;
        const response = await axios.post(request.api("login"), {
          ...this.user,
        });
        console.log(response.data);
        window.localStorage.setItem("token", response.data.token);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.log(error);
        this.alertContent = {
          title: "Error",
          content:
            error.response.data.errors.email ||
            error.response.data.errors.password,
          hasError: true,
          close: false,
        };
        this.errors = error.response.data.errors;
        console.log(error.response.data.errors);
      }
      console.log(this.user);
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
