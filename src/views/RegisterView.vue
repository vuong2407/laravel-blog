<template>
  <div class="container">
    <div class="row">
      <form
        class="col-8 mx-auto mt-5"
        @submit.prevent="createUser()"
        v-if="loading == false"
      >
        <h2>Register</h2>
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
          <label for="exampleInputName">Name</label>
          <input
            v-model.lazy="user.name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
            id="exampleInputName"
            placeholder="User Name"
          />
          <div class="invalid-feedback" v-if="errors.name">
            {{ errors.name }}
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword">Password</label>
          <input
            v-model.lazy="user.password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
            id="exampleInputPassword"
            placeholder="Password"
          />
          <div class="invalid-feedback" v-if="errors.password">
            {{ errors.password }}
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputConfirmPassword">Confirm Password</label>
          <input
            v-model.lazy="confirmPassword"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.confirmPassword }"
            id="exampleInputConfirmPassword"
            placeholder="Password"
          />
          <div class="invalid-feedback" v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </div>
        </div>
        <div class="form-group">
          You have an
          <router-link to="/login">Account</router-link>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
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
      user: {
        email: "",
        password: "",
        name: "",
      },
      confirmPassword: null,
      errors: {},
      loading: false,
    };
  },
  methods: {
    async createUser() {
      if (this.checkConfirmPassword(this.user.password, this.confirmPassword)) {
        try {
          this.loading = true;
          const response = await axios.post(request.api("register"), this.user);
          console.log(response);
          this.$router.push({ name: "login" });
        } catch (error) {
          console.log(error);
          this.errors = error.response.data.errors;
        }
        this.loading = false;
      } else {
        this.errors = {
          confirmPassword: "Password is not match",
        };
      }
    },
    checkConfirmPassword(password, confirmPassword) {
      if (confirmPassword != password) return false;
      return true;
    },
  },
};
</script>

<style scoped></style>
