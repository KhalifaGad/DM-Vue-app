<template>
  <div class="card card-dashboard-seventeen">
    <div class="card-body">
      <h6 class="card-title">{{ title }}</h6>
      <div>
        <h4>{{parseFloat(number).toLocaleString('en')}}</h4>
        <span>order</span>
      </div>
    </div>
    <!-- chart-wrapper -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ["title", "number"]
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0px;
}

.content-label,
.card-dashboard-eight .card-title {
  color: #212229;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}

.card-dashboard-seventeen {
  position: relative;
}

.card-dashboard-seventeen .card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 242px;
  position: relative;
  z-index: 10;
}

.card-dashboard-seventeen .card-body h4 {
  margin-bottom: 0;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  color: #212229;
}

.card-dashboard-seventeen .card-body span {
  font-size: 11px;
}

.card-dashboard-seventeen .card-title {
  line-height: 1.3;
}
</style>