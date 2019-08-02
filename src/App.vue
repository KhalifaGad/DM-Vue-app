<template>
  <div>
    <transition name="fade" mode="in-out">
      <router-view name="header"/>
      <router-view name="signup"/>
    </transition>
    <div class="container-fluid">
      <transition name="fade" mode="out-in">
        <router-view name="main"/>
      </transition>
      <transition name="fade-in" mode="out-in">
        <router-view name="login"/>
      </transition>
    </div>
    <router-view name="footer"/>
  </div>
</template>

<script>
</script>

<style scoped>
@import url("./assets/css/mainStyle.css");
@import url("./assets/css/utilityHelper.css");
.container-fluid {
  padding-left: 5.5%;
  padding-right: 6.5%;
}

.fade-in-enter {
  opacity: 0;
}
.fade-in-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
</style>
