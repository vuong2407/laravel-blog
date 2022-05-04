export default {
  api(url) {
    return "https://bloglaravelnv.herokuapp.com/api/" + url;
  },
  token() {
    return window.localStorage.getItem("token");
  },
};
