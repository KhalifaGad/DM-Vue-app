<template>
  <div class="card card-table-two">
    <h6 class="card-title">Top drugs selling</h6>
    <span class="d-block mb-20">This is the most selling drugs for this month's' date.</span>
    <div class="table-responsive">
      <table class="table table-striped table-dashboard-two mg-b-0">
        <thead>
          <tr>
            <th>Drug Name</th>
            <th class="wd-lg-20p tx-right tx-medium">Sales Count</th>
            <th class="wd-lg-20p tx-right tx-medium">Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(drug, index) in alterTopDrugs" :key="index">
            <td>{{ drug.name }}</td>
            <td class="tx-right tx-medium tx-inverse">{{ drug.quantity }} Pack</td>
            <td class="tx-right tx-medium tx-danger">{{ drug.total }} EGP</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- table-responsive -->
  </div>
</template>

<script>
export default {
  props: ["topDrugs"],
  computed: {
    alterTopDrugs() {
      return this.topDrugs.map(drugArr => {
        return {
          name: drugArr[1].name,
          quantity: drugArr[1].quantity,
          total: drugArr[1].total
        };
      });
    }
  }
};
</script>

<style scoped>
.card-table-two {
  border-color: #ced4da;
  padding: 20px;
  height: 300px;
}
.card-table-two .card-title {
  color: #212229;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 5px;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table-responsive > .table-bordered {
  border: 0;
}

.table-dashboard-two thead > tr > th,
.table-dashboard-two thead > tr > td,
.table-dashboard-two tbody > tr > th,
.table-dashboard-two tbody > tr > td {
  white-space: nowrap;
}
.table-dashboard-two tbody > tr > th:not(:first-child),
.table-dashboard-two tbody > tr > td:not(:first-child) {
  font-family: sans-serif;
  font-weight: 600;
  font-size: 12px;
}
.tx-danger {
  color: #dc3545;
}
.mb-20,
.mg-b-20 {
  margin-bottom: 20px;
}
.mg-b-0 {
  margin-bottom: 0px;
}
.mg-t-20 {
  margin-top: 20px;
}
.tx-right {
  text-align: right;
}
.tx-medium {
  font-weight: 500;
}
.tx-inverse {
  color: #212229;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.table thead th,
.table thead td {
  color: #70737c;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-bottom-width: 1px;
  border-top-width: 0;
  padding: 0 15px 5px;
}
.table tbody + tbody {
  border-top: 2px solid #dee2e6;
}
</style>