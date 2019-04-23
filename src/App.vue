<template>
  <div>
    <router-view name="header"/>
    <router-view name="signup" />
    <div class="container-fluid">
      <router-view name="main"/>
      <router-view name="login" />
    </div>
    <router-view name="footer"/>
  </div>
</template>

<script>

</script>

<style scoped>
@import url("./assets/css/mainStyle.css");
@import url("./assets/css/utilityHelper.css");
.container-fluid{
  padding-left: 5.5%;
  padding-right: 6.5%;
}
</style>
