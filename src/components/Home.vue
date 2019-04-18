<template>
  <div>
    <div class="row">
      <div class="col-lg-4">
        <div class="card card-dashboard-ten bg-success">
          <h6 class="content-label">Sales</h6>
          <div class="card-body">
            <div>
              <h6>128055 EGP</h6>
              <label>Total sales</label>
            </div>
            <div>
              <h6>8900 EGP</h6>
              <label>This month</label>
            </div>
          </div>
          <!-- card-body -->
        </div>
        <!-- card -->
        <div class="card card-dashboard-ten bg-primary">
          <h6 class="content-label">Customers</h6>
          <div class="card-body">
            <div>
              <h6>90</h6>
              <label>Total Customers</label>
            </div>
            <div>
              <h6>12</h6>
              <label>This Month</label>
            </div>
          </div>
          <!-- card-body -->
        </div>
        <!-- card -->
      </div>
      <div class="col-lg-8">
        <div class="row row-sm">
          <div class="col-md-4">
            <div class="card card-dashboard-seventeen">
              <div class="card-body">
                <h6 class="card-title">Total Orders</h6>
                <div>
                  <h4>3,980</h4>
                  <span>This Month</span>
                </div>
              </div>
              <!-- chart-wrapper -->
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-dashboard-seventeen">
              <div class="card-body">
                <h6 class="card-title">Pending Orders</h6>
                <div>
                  <h4>8</h4>
                  <span>From Yestarday</span>
                </div>
              </div>
              <!-- chart-wrapper -->
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-dashboard-seventeen">
              <div class="card-body">
                <h6 class="card-title">Deliveried Orders</h6>
                <div>
                  <h4>88</h4>
                  <span>This Month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 mg-t-20">
        <div class="card card-table-two">
          <h6 class="card-title">Top drugs selling</h6>
          <span class="d-block mb-20">This is the most selling drugs for this month's' date.</span>
          <div class="table-responsive">
            <table class="table table-striped table-dashboard-two mg-b-0">
              <thead>
                <tr>
                  <th>Drug Name</th>
                  <th class="tx-right tx-medium">Update Date</th>
                  <th class="wd-lg-20p tx-right tx-medium">Sales Count</th>
                  <th class="wd-lg-20p tx-right tx-medium">Sales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kitofan</td>
                  <td class="tx-right tx-medium tx-inverse">05 Oct 2018</td>
                  <td class="tx-right tx-medium tx-inverse">48 Pack</td>
                  <td class="tx-right tx-medium tx-danger">2800 EGP</td>
                </tr>
                <tr>
                  <td>Kitofan</td>
                  <td class="tx-right tx-medium tx-inverse">05 Oct 2018</td>
                  <td class="tx-right tx-medium tx-inverse">48 Pack</td>
                  <td class="tx-right tx-medium tx-danger">2800 EGP</td>
                </tr>
                <tr>
                  <td>Kitofan</td>
                  <td class="tx-right tx-medium tx-inverse">05 Oct 2018</td>
                  <td class="tx-right tx-medium tx-inverse">48 Pack</td>
                  <td class="tx-right tx-medium tx-danger">2800 EGP</td>
                </tr>
                <tr>
                  <td>Kitofan</td>
                  <td class="tx-right tx-medium tx-inverse">05 Oct 2018</td>
                  <td class="tx-right tx-medium tx-inverse">48 Pack</td>
                  <td class="tx-right tx-medium tx-danger">2800 EGP</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- table-responsive -->
        </div>
        <!-- card-dashboard-five -->
      </div>
      <div class="col-lg-4 mg-t-20">
        <div class="card card-dashboard-eight bg-white">
          <h6 class="card-title">Your Top Customers</h6>
          <span class="d-block mg-b-20">Sales performance revenue based by customers</span>

          <div class="list-group">
            <div class="list-group-item">
              <i class="fa fa-user"></i>
              <p>Dr. Ahmed Pharmacy</p>
              <span>12000.900 EGP</span>
            </div>
            <div class="list-group-item">
              <i class="fa fa-user"></i>
              <p>Dr. Ahmed Pharmacy</p>
              <span>12000.900 EGP</span>
            </div>
            <div class="list-group-item">
              <i class="fa fa-user"></i>
              <p>Dr. Ahmed Pharmacy</p>
              <span>12000.900 EGP</span>
            </div>
            <div class="list-group-item">
              <i class="fa fa-user"></i>
              <p>Dr. Ahmed Pharmacy</p>
              <span>12000.900 EGP</span>
            </div>
            <div class="list-group-item">
              <i class="fa fa-user"></i>
              <p>Dr. Ahmed Pharmacy</p>
              <span>12000.900 EGP</span>
            </div>
          </div>
          <!-- list-group -->
        </div>
        <!-- card -->
      </div>
    </div>
  </div>
</template>

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
.content-label,
.card-dashboard-eight .card-title {
  color: #212229;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}
.card-dashboard-eight .card-title {
  font-size: 13px;
  margin-bottom: 5px;
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
/* .table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}
.table-striped tbody tr:nth-of-type(even) {
    background-color: rgba(150, 157, 171, 0.1);
} */
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
.card-dashboard-eight {
  border-color: #ced4da;
  padding: 20px;
}
.card-dashboard-eight .list-group-item {
  padding: 10px 0;
  border-left-width: 0;
  border-right-width: 0;
  border-style: dotted;
  border-color: #ced4da;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.card-dashboard-eight .list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.card-dashboard-eight .list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.card-dashboard-eight .list-group-item p {
  margin-bottom: 0;
  margin-left: 10px;
}

.card-dashboard-eight .list-group-item span {
  display: block;
  margin-left: auto;
  font-weight: 600;
  font-family: "Archivo", Arial, sans-serif;
  color: #212229;
}

.card-dashboard-eight .flag-icon {
  font-size: 24px;
  line-height: 1;
  border-radius: 100%;
}
</style>
