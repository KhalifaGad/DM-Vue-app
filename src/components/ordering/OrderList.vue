<template>
  <div>
    <div class="content-breadcrumb">
      <span>
        <router-link tag="a" to="/">Orders</router-link>
      </span>
      <IosArrowForwardIcon w="10px" class="custom-icon"/>
      <span>
        <router-link tag="a" to="/orders-list" class="dark-f-color">Orders List</router-link>
      </span>
    </div>
    <h2 class="content-title">Orders List</h2>
    <div class="content-label pd-t-25 mg-b-5">Your store orders list</div>
    <p class="mg-b-20">this a list for all your store orders.</p>

    <div class="table-container">
      <div class="tableControl pd-t-10 pd-r-10 pd-l-10">
        <div class="table-tabs btn-group">
          <button
            class="table-tab"
            @click="toggleTabs('')"
            :class="(activeTab == '')? 'active' : null"
          >All Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('active')"
            :class="(activeTab == 'active')? 'active' : null"
          >Active Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('pending')"
            :class="(activeTab == 'pending')? 'active' : null"
          >Pending Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('delivered')"
            :class="(activeTab == 'delivered')? 'active' : null"
          >Delivered Orders</button>
          <button
            class="table-tab"
            @click="toggleTabs('refused')"
            :class="(activeTab == 'refused')? 'active' : null"
          >Refused Orders</button>
        </div>
        <input type="text" v-model="filters[0].value" placeholder="search pharmacy name">
      </div>
      <!-- <div class="search-orders col col-md-5">
            <input type="text" v-model="filters[0].value" placeholder="search pharmacy name" >
      </div>-->

      <data-tables
        class="pd-l-20 pd-r-20 mg-t-30"
        id="table"
        :data="data"
        :table-props="tableProps"
        :filters="filters"
        row-key="data.orerId"
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
  </div>
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import ordersList from "../../assets/ordersData.js";
export default {
  data() {
    return {
      data: ordersList.orders,
      titles: ordersList.titles,
      tableProps: {
        stripe: true,
        border: true
      },
      activeTab: "",
      filters: [
        {
          value: "",
          prop: "pharmacyName"
        },
        {
          value: "",
          prop: "status"
        }
      ]
    };
  },
  components: {
    IosArrowForwardIcon
  },
  methods: {
    toggleTabs(val) {
      this.activeTab = val;
      this.filters[1].value = val;
    },
    rowClicked(order) {
      this.$message({
        showClose: true,
        center: true,
        duration: 0,
        message: order.orderId
      });
    }
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
