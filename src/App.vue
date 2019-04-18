<template>
  <div>
    <app-header/>
    <div class="container-fluid">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>

<style scoped>
@import url("./assets/css/mainStyle.css");
@import url("./assets/css/utilityHelper.css");
.container-fluid{
  padding-top: 2%;
  padding-left: 5.5%;
  padding-right: 6.5%;
}
</style>
