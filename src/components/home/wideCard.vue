<template>
  <div :class="['card card-dashboard-ten', colorClass]" >
    <h6 class="content-label"> {{ title }} </h6>
    <div class="card-body">
      <div>
        <h6> {{ firstNumber }} </h6>
        <label> {{ firstLabel }} </label>
      </div>
      <div>
        <h6> {{ secondNumber }} </h6>
        <label> {{ secondLabel }} </label>
      </div>
    </div>
    <!-- card-body -->
  </div>
  <!-- card -->
</template>

<script>
export default {
    props: [
        'title',
        'firstNumber',
        'firstLabel',
        'secondNumber',
        'secondLabel',
        'colorClass'
    ]
}
</script>

<style scoped>
.bg-success {
  background-color: #3bb001 !important;
}
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
.card-dashboard-ten {
  border-width: 0;
  padding: 20px;
}
.card-dashboard-ten + .card-dashboard-ten {
  margin-top: 20px;
}
.card-dashboard-ten .content-label {
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 15px;
  line-height: 1.05;
  color: #fff;
}
.card-dashboard-ten .card-body {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-dashboard-ten .card-body > div {
  flex: none;
}

.card-dashboard-ten .card-body > div label {
  font-size: 13px;
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.75);
}

.card-dashboard-ten .card-body > div h6 {
  margin-bottom: 2px;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  line-height: 0.975;
  font-family: "Montserrat", sans-serif;
}
.card-dashboard-ten .card-body > div h6 span {
  font-size: 13px;
}

.card-dashboard-ten .card-body > div h6 .percent {
  font-size: 20px;
}
</style>