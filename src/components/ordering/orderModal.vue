<template>
  <div class="order-modal">
    <div
      class="modal-body"
      :style="toggleTabs? 'width: 70%; height: 80%':'width: 50%; height: 60%'"
    >
      <section class="modal-tabs">
        <button @click="toggleTabs = !toggleTabs" :class="toggleTabs? 'active' : null">Data</button>
        <button @click="toggleTabs = !toggleTabs" :class="toggleTabs? null : 'active'">Actions</button>
        <div @click="print()" v-if="toggleTabs" title="print" style="z-index: 999">
          <IosPrintIcon w="20" h="20" class="custom-icon" title="print" />
        </div>
        <button class="close-btn" title="close" v-shortkey="['esc']" @shortkey="close()" @click="close()">close</button>
      </section>
      <section id="printable" class="data-section" v-if="toggleTabs">
        <section class="pharmacy-store-section">
          <section class="pharmacy-section">
            <h5>Pharmacy:</h5>
            <hr />
            <div class="pharmacy-data">
              <p>
                <span>Name:</span>
                {{ order.pharmacyName }}
              </p>
              <p>
                <span>Phone:</span>
                {{ order.from.phone }}
              </p>
              <p>
                <span>Address:</span>
                {{ order.from.city + ', ' + order.from.area + ', ' + order.from.street}}
              </p>
            </div>
          </section>
          <section class="store-section">
            <h5>Store:</h5>
            <hr />
            <div class="store-data">
              <p>
                <span>Name:</span>
                {{ order.storeName || 'test' }}
              </p>
              <p>
                <span>Phone:</span>
                {{ order.to.phone || '010xxxxxxxx'}}
              </p>
              <p>
                <span>Address:</span>
                {{ order.to.city + ', ' + order.to.area + ', ' + order.to.street}}
              </p>
            </div>
          </section>
        </section>
        <!-- end of pharmacy store Data section -->
        <hr class="separator" />
        <section class="order-section">
          <h5>Order:</h5>
          <hr />
          <section class="order-data">
            <div class="left">
              <p>
                <span>Order Status:</span>
                {{ order.orderStatus }}
              </p>
              <p>
                <span>Total:</span>
                {{ order.total }} EGP
              </p>
              <p>
                <span>Fees Ratio:</span>
                {{ order.DMFees }}%
              </p>
              <p>
                <span>Discount Ratio:</span>
                {{ order.walletDiscount }}%
              </p>
              <p>
                <span>Payment Way:</span>
                {{ order.payment || "CASH" }}
              </p>
            </div>
            <div class="right">
              <p>
                <span>Order Date:</span>
                {{ order.createdAt }}
              </p>
              <p>
                <span>Accepting Date:</span>
                {{ order.acceptingDate }}
              </p>
              <p>
                <span>Delivery Date:</span>
                {{ order.deliveringDate }}
              </p>
              <p>
                <span>Refusing Date:</span>
                {{ order.refusingingDate }}
              </p>
              <p>
                <span>Refusing Note:</span>
                {{ order.refusingNote || "" }}
              </p>
            </div>
          </section>
          <section class="order-table">
            <data-tables
              class="pd-l-20 pd-r-20 mg-t-30"
              id="table"
              :data="order.drugsList"
              :table-props="tableProps"
              row-key="data.code"
              :pagination-props="{ pageSizes: [5, 10, 15, 20, 50, 100] }"
            >
              <el-table-column
                id="test"
                v-for="(title) in titles"
                :prop="title.prop"
                :label="title.label"
                sortable="custom"
                :key="title.label"
              ></el-table-column>
            </data-tables>
          </section>
        </section>
      </section>
      <!-- end of data section -->
      <!-- beginning of action section -->
      <section class="actions-section" v-if="!toggleTabs">
        <section>
          <h4>Is order active?</h4>
          <button
            :disabled="activeBtnDisabled"
            @click="makeOrderAction(order.code, 'ACTIVE')"
          >Submit that</button>
        </section>
        <hr class="separator" />
        <section>
          <h4>Is order delivered?</h4>
          <button
            :disabled="deliveredBtnDisabled"
            @click="makeOrderAction(order.code, 'DELIVERED')"
          >Submit that</button>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import IosPrintIcon from "vue-ionicons/dist/ios-print.vue";
import { orderAction } from "../../utils/Mutations";

export default {
  components: {
    IosPrintIcon
  },
  props: ["order"],
  data() {
    return {
      drugList: [],
      toggleTabs: true,
      titles: [
        {
          label: "Name",
          prop: "name"
        },
        {
          label: "Quantity",
          prop: "quantity"
        },
        {
          label: "Unit Price",
          prop: "unitPrice"
        },
        {
          label: "Discount",
          prop: "discount"
        },
        {
          label: "Total",
          prop: "total"
        }
      ],
      tableProps: {
        stripe: true,
        border: true
      }
    };
  },
  methods: {
    close() {
      eventBus.closeOrderModalStatus();
    },
    print() {
      this.$htmlToPaper("printable");
    },
    async makeOrderAction(code, status) {
      let order = await orderAction(this, code, status);
      if (order) {
        this.$message({
          showClose: true,
          duration: 2000,
          message: `Order ${code} has been set to ${status} status`,
          type: "success"
        });
        this.order.orderStatus = status
      } else {
        this.$message({
          showClose: true,
          duration: 500,
          message: `Error perfroming order action `,
          type: "error"
        });
      }
    }
  },
  computed: {
    activeBtnDisabled() {
      let flag = false;
      switch (this.order.orderStatus) {
        case "ACTIVE":
        case "DELIVERED":
        case "REFUSED":
          flag = true;
          break;
        default:
          flag = false;
          break;
      }
      return flag;
    },
    deliveredBtnDisabled() {
      let flag = false;
      switch (this.order.orderStatus) {
        case "DELIVERED":
        case "REFUSED":
          flag = true;
          break;
        default:
          flag = false;
          break;
      }
      return flag;
    }
  },
  created() {
    this.order.drugsList.map(drugsListItem => {
      drugsListItem.name = drugsListItem.drug.name;
    });

    this.order.total = parseFloat(this.order.total).toLocaleString("en");
    this.order.createdAt = this.order.createdAt
      ? this.order.createdAt.slice(0, 10)
      : "";

    this.order.acceptingDate = this.order.acceptingDate
      ? this.order.acceptingDate.slice(0, 10)
      : "";

    this.order.refusingingDate = this.order.refusingingDate
      ? this.order.refusingingDate.slice(0, 10)
      : "";

    this.order.deliveringDate = this.order.deliveringDate
      ? this.order.deliveringDate.slice(0, 10)
      : "";
  }
};
</script>

<style scoped>
.custom-icon {
  color: #ff3535;
  position: absolute;
  left: 88%;
  top: 26%;
  cursor: pointer;
}
.custom-icon:hover {
  color: #560bd0;
  transform: scale(1.2);
}
.order-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000094;
  transition: opacity 1s ease;
}
.modal-body {
  background-color: #fff;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  opacity: 1;
  padding: 0;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  z-index: 999;
}
.modal-tabs {
  position: sticky;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  background-color: #ced4da;
  /* width: 100%; */
}
.modal-tabs > button {
  outline: none;
  width: 10%;
  height: 40px;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #fff;
  border-width: 0px;
  opacity: 0.6;
  color: black;
  font-weight: 500;
}
.modal-tabs > button.active {
  font-weight: bold;
  opacity: 1;
  outline: none;
}
.close-btn {
  align-self: flex-end;
  background-color: #ced4da !important;
  color: #ff3535 !important;
  font-weight: bolder !important;
  margin-left: auto;
  font-size: 1em !important;
}
.close-btn:hover {
  font-size: 1.2em !important;
}
.actions-section > section {
  display: flex;
  flex-direction: row;
  margin-bottom: 10%;
  align-content: center;
  align-items: baseline;
}
.actions-section > section > button {
  background-color: #ff3535;
  color: #fff;
  text-transform: none;
  margin-left: 5%;
  height: 50px;
  font-weight: bold;
  border-width: 0;
  outline: none;
}
.actions-section > section > button:hover {
  background-color: #560bd0;
}
.actions-section > section > button:disabled{
    background-color: #70737c;
}
.actions-section > hr {
  margin-bottom: 5%;
}
.actions-section,
.data-section {
  display: flex;
  flex-direction: column;
  padding: 5%;
  overflow-y: auto;
}

.order-data,
.pharmacy-store-section {
  display: flex;
  flex-direction: row;
}
.order-data > .left,
.order-data > .right,
.store-section,
.pharmacy-section {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.order-section > hr,
.store-section > hr,
.pharmacy-section > hr {
  width: 8%;
  margin-right: 92%;
  border-width: 3px;
  margin-top: -5px;
  border-color: #ada7a7;
}
.order-section > hr {
  width: 4%;
  margin-right: 96%;
}
.order-data > .left,
.order-data > .right,
.pharmacy-data,
.store-data {
  margin-left: 8%;
}
.order-data > .left > p > span,
.order-data > .right > p > span,
.pharmacy-data > p > span,
.store-data > p > span {
  font-weight: bolder;
  margin-right: 2%;
}
.order-data > .left > p,
.order-data > .right > p,
.pharmacy-data > p,
.store-data > p {
  font-weight: 400;
  margin-right: 2%;
}
.separator {
  width: 50%;
  border-width: 2px;
  border-color: #ada7a7;
}
</style>