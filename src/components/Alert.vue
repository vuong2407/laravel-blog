<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    :class="{
      hidden: alertContent.close == true,
      show: alertContent.close == false,
    }"
    style="position: absolute; top: 20px; right: 100px"
  >
    <div class="toast-header">
      <i
        class="fas fa-check-circle"
        :class="{
          'text-danger': alertContent.hasError == true,
          'text-success': alertContent.hasSuccess,
        }"
      ></i>
      <strong class="mr-auto ml-2">{{ alertContent.title }}</strong>
      <button type="button" class="ml-2 mb-1 close">
        <span aria-hidden="true" @click="closeAlert()">&times;</span>
      </button>
    </div>
    <div class="toast-body">{{ alertContent.content }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    alertContent: {
      type: Object,
    },
  },
  methods: {
    closeAlert() {
      this.alertContent.close = true;
    },
  },
};
</script>

<style scoped></style>
