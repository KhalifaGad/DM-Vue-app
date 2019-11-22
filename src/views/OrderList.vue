<template>
  <div>
    <div class="content-breadcrumb">
      <span>
        <router-link tag="a" to="/">Orders</router-link>
      </span>
      <IosArrowForwardIcon w="10px" class="custom-icon" />
      <span>
        <router-link tag="a" to="/orders-list" class="dark-f-color">Orders List</router-link>
      </span>
    </div>
    <h2 class="content-title">Orders List</h2>
    <div class="content-label pd-t-25 mg-b-5">Drug1Market orders list</div>
    <p class="mg-b-20">this a list for all orders in the platform.</p>

    <div class="table-container">
      <div class="tableControl pd-t-10 pd-r-10 pd-l-10">
        <div class="table-tabs">
          <!-- btn-group -->
          <button
            class="table-tab"
            @click="toggleTabs('')"
            :class="(activeTab == '')? 'active' : null"
          >All Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('ACCEPTED')"
            :class="(activeTab == 'ACCEPTED')? 'active' : null"
          >Accepted Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('ACTIVE')"
            :class="(activeTab == 'ACTIVE')? 'active' : null"
          >Active Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('PENDING')"
            :class="(activeTab == 'PENDING')? 'active' : null"
          >Pending Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('DELIVERED')"
            :class="(activeTab == 'DELIVERED')? 'active' : null"
          >Delivered Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('REFUSED')"
            :class="(activeTab == 'REFUSED')? 'active' : null"
          >Refused Orders</button>
        </div>
        <input type="text" v-model="filters[0].value" placeholder="Search Pharmacies" />
      </div>
      <!-- <div class="search-orders col col-md-5">
            <input type="text" v-model="filters[0].value" placeholder="search pharmacy name" >
      </div>-->

      <data-tables
        class="pd-l-20 pd-r-20 mg-t-30"
        id="table"
        :key="tableKey"
        :data="data"
        :table-props="tableProps"
        :filters="filters"
        row-key="data.code"
        @row-dblclick="rowClicked"
        :pagination-props="{ pageSizes: [5, 10, 15, 20, 50, 100] }"
      >
        <el-table-column
          v-for="(title) in titles"
          :prop="title.prop"
          :label="title.label"
          sortable="custom"
          :key="title.label"
        ></el-table-column>
      </data-tables>
    </div>
    <OrderModal v-if="ordarModalStatus" :order="order" />
  </div>
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import ordersList from "../assets/ordersData";
import { getOrders, getOrder } from "../utils/Queries";
import OrderModal from "../components/ordering/orderModal";
import { eventBus } from "../main";
export default {
  components: {
    IosArrowForwardIcon,
    OrderModal
  },
  data() {
    return {
      order: {},
      ordarModalStatus: false,
      data: [],
      tableKey: 1,
      titles: [
        {
          label: "Order ID",
          prop: "code"
        },
        {
          label: "Status",
          prop: "orderStatus"
        },
        {
          label: "Pharmacy",
          prop: "pharmacyName"
        },
        {
          label: "Store",
          prop: "storeName"
        },
        {
          label: "Price",
          prop: "total"
        },
        {
          label: "Date",
          prop: "createdAt"
        }
      ],
      tableProps: {
        stripe: true,
        border: true,
        defaultSort: {
          prop: "createdAt",
          order: 'descending'
        }
      },
      activeTab: "",
      filters: [
        {
          value: "",
          prop: "pharmacyName"
        },
        {
          value: "",
          prop: "orderStatus"
        }
      ]
    };
  },
  methods: {
    toggleTabs(val) {
      this.activeTab = val;
      this.filters[1].value = val;
    },
    async rowClicked(selectedOrder) {
      let order = await getOrder(this, selectedOrder.code);
      order.storeName = selectedOrder.storeName;
      order.pharmacyName = selectedOrder.pharmacyName;
      order.code = selectedOrder.code;
      this.order = order;

      this.ordarModalStatus = true;
    },
    prepareOrders(orders) {
      for (let i = 0; i < orders.length; i++) {
        this.data.push({
          code: orders[i].code,
          storeName: orders[i].to.storeName || "testing",
          pharmacyName: orders[i].from.pharmacyName || "testing",
          orderStatus: orders[i].orderStatus,
          total: orders[i].total,
          createdAt: orders[i].createdAt.slice(0, 10)
        });
      }
    },
    async updateUI() {
      this.data = [];
      let orders = await getOrders(this);
      this.prepareOrders(orders);
    }
  },
  created() {
    this.activeTab = this.$route.params.activeTab;
    this.filters[1].value = this.activeTab;
    eventBus.$on("closeOrderModal", flag => {
      this.updateUI();
      this.tableKey++;
      this.ordarModalStatus = flag;
    });
  },
  mounted() {
    this.updateUI();
  }
};
</script>

<style>
.custom-icon {
  margin-left: 2px;
  margin-right: 2px;
}
.search-orders {
  position: absolute;
  top: 200px;
  right: -250px;
}
.search-orders input {
  border: none;
  width: 180px;
  padding-left: 7px;
  padding-bottom: 5px;
  border-bottom: #d5d8dd solid;
  font-size: 14px;
  transition: border-color 0.5s ease-in-out;
}
.tableControl input:focus,
.tableControl input:hover {
  border-bottom: #4709ac solid;
}
.table-container {
  border: 1px solid #dee2e6;
}
.tableControl {
  display: flex;
  width: 100%;
  height: 54px;
  background-color: #ced4da;
  border-width: 0px;
}
.tableControl input {
  outline: none;
  float: right;
  border: none;
  width: 16%;
  padding-left: 7px;
  padding-bottom: 5px;
  margin-right: -10px;
  background-color: #ced4da;
  border-bottom: #b1b2b4 solid;
  font-size: 14px;
  transition: border-color 0.5s ease-in-out;
}
.table-tab {
  outline: none;
  height: 40px;
  font-size: 12px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  border-width: 0px;
  margin-top: 5px;
  opacity: 0.6;
  color: black;
  font-weight: 500;
}
.table-tab.active {
  font-weight: bold;
  opacity: 1;
  outline: none;
}
.table-tab:hover:not(.active) {
  opacity: 0.8;
}
.table-tabs {
  width: 85%;
}
/* .el-message .el-icon-info {
    color: #909399;
    ui element styling
    display: none
} */
.table-tab + .table-tab {
  margin-left: 3px;
}
</style>
