<template>
  <div>
    <div class="row">
      <div class="col-lg-4">
        <wideCard
          title="Sales"
          :firstNumber="totalSales"
          firstLabel="Total sales in EGP"
          :secondNumber="totalSalesInThisMonth"
          secondLabel="This Month in EGP"
          colorClass="bg-success"
        />

        <wideCard
          title="Customers"
          :firstNumber="pharmaciesCount"
          firstLabel="Pharmacies"
          :secondNumber="storesCount"
          secondLabel="Stores"
          colorClass="bg-primary"
        />
      </div>
      <div class="col-lg-8">
        <div class="row row-sm">
          <div class="col-md-4">
            <tallCard title="Total Orders" :number="totalOrders" />
          </div>
          <div class="col-md-4">
            <tallCard title="Pending Orders" :number="pendingOrdersCount" />
          </div>
          <div class="col-md-4">
            <tallCard title="Deliveried Orders" :number="deliveriedOrdersCount" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-8 mg-t-20">
        <topDrugs :topDrugs="topDrugs" />
      </div>
      <div class="col-lg-4 mg-t-20">
        <topPharmaciesCard :pharmacies="topPharmacies" />
      </div>
    </div>
  </div>
</template>

<script>
import wideCard from "../components/home/wideCard";
import tallCard from "../components/home/tallCard";
import topPharmaciesCard from "../components/home/topPharmaciesCard";
import topDrugs from "../components/home/topDrugs";
import {
  getTotalSales,
  getTotalSalesInThisMonth,
  getPharmaciesCount,
  getStoresCount,
  getOrdersCount,
  getPendingOrdersCount,
  getDeliveredOrdersCount,
  getTopPhramacies,
  getTopDrugsSelling
} from "../utils/Queries";

export default {
  components: {
    wideCard,
    tallCard,
    topPharmaciesCard,
    topDrugs
  },
  data() {
    return {
      totalSales: 0,
      totalSalesInThisMonth: 0,
      pharmaciesCount: 0,
      storesCount: 0,
      totalOrders: 0,
      pendingOrdersCount: 0,
      deliveriedOrdersCount: 0,
      topPharmacies: [],
      topDrugs: []
    };
  },
  methods: {
    updateTotalSales(fetchedTotalSales) {
      for (let i = 1; i <= fetchedTotalSales; i++) {
        setTimeout(() => {
          this.totalSales = parseFloat(i).toLocaleString("en");
        }, 0);
      }
    },
    updateTotalSalesThisMonth(fetchedTotalSales) {
      for (let i = 1; i <= fetchedTotalSales; i++) {
        setTimeout(() => {
          this.totalSalesInThisMonth = parseFloat(i).toLocaleString("en");
        }, 0);
      }
    },
    updateUI(
      totalSales,
      totalSalesInThisMonth,
      pharmaciesCount,
      storesCount,
      totalOrders,
      pendingOrdersCount,
      deliveriedOrdersCount
    ) {
      let maxValue = Math.max(
        totalSales,
        totalSalesInThisMonth,
        pharmaciesCount,
        storesCount,
        totalOrders,
        pendingOrdersCount,
        deliveriedOrdersCount
      );
      let time = 0;
      for (let i = 1; i <= maxValue; i++) {
        if (i > 200 && i < maxValue - 200) {
          i += 200;
        }
        setTimeout(() => {
          this.totalSales =
            i < totalSales
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(totalSales).toLocaleString("en");

          this.totalSalesInThisMonth =
            i < totalSalesInThisMonth
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(totalSalesInThisMonth).toLocaleString("en");

          this.pharmaciesCount =
            i < pharmaciesCount
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(pharmaciesCount).toLocaleString("en");

          this.storesCount =
            i < storesCount
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(storesCount).toLocaleString("en");

          this.totalOrders =
            i < totalOrders
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(totalOrders).toLocaleString("en");

          this.pendingOrdersCount =
            i < pendingOrdersCount
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(pendingOrdersCount).toLocaleString("en");

          this.deliveriedOrdersCount =
            i < deliveriedOrdersCount
              ? parseFloat(i).toLocaleString("en")
              : parseFloat(deliveriedOrdersCount).toLocaleString("en");
        }, time);
        if (time < 1000) {
          time += 5;
        }
      }
    }
  },
  async mounted() {
    let topPharmacies = await getTopPhramacies(this);
    this.topPharmacies = topPharmacies.splice(0, 5);
    let topDrugs = await getTopDrugsSelling(this);
    this.topDrugs = topDrugs.splice(0, 4);
    let totalSales = await getTotalSales(this);
    let totalSalesInThisMonth = await getTotalSalesInThisMonth(this);
    let pharmaciesCount = await getPharmaciesCount(this);
    let totalOrders = await getOrdersCount(this);
    let storesCount = await getStoresCount(this);
    let pendingOrdersCount = await getPendingOrdersCount(this);
    let deliveriedOrdersCount = await getDeliveredOrdersCount(this);
    this.updateUI(
      totalSales,
      totalSalesInThisMonth,
      pharmaciesCount,
      storesCount,
      totalOrders,
      pendingOrdersCount,
      deliveriedOrdersCount
    );
  }
};
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
