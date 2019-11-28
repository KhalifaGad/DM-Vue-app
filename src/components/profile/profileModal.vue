<template>
  <div class="profile-modal">
    <div class="modal-body">
      <!-- :style="toggleTabs? 'width: 70%; height: 80%':'width: 60%; height: 70%'" -->
      <section class="modal-tabs">
        <button @click="toggleTabs = !toggleTabs" :class="toggleTabs? 'active' : null">Data</button>
        <button
          @click="toggleTabs = !toggleTabs"
          :class="toggleTabs? null : 'active'"
          v-if="profile.type === 'Pharmacy'"
        >Actions</button>
        <button
          class="close-btn"
          title="close"
          v-shortkey="['esc']"
          @shortkey="close()"
          @click="close()"
        >close</button>
      </section>
      <section class="profile-section" v-if="toggleTabs">
        <h3>{{profile.name}}</h3>
        <section class="profile-data">
          <section>
            <p>
              <span>Type:</span>
              {{profile.type}}
            </p>
            <p>
              <span>Address:</span>
              {{profile.city + ', ' + profile.area + ', ' + profile.street}}
            </p>
            <p>
              <span>Phone:</span>
              {{profile.phone}}
            </p>
            <p v-if="profile.type === 'Pharmacy'">
              <span>Black listed:</span>
              {{isBlackListed? 'Yes' : 'No'}}
            </p>
          </section>
          <section>
            <p>
              <span>email:</span>
              {{profile.email}}
            </p>
            <p v-if="profile.type === 'Pharmacy'">
              <span>code:</span>
              {{profile.code}}
            </p>
            <p>
              <span>total orders:</span>
              {{ orders.length }}
            </p>
          </section>
        </section>
        <!-- @row-dblclick="rowClicked" -->
        <h5 style="margin-top: 4%">Orders:</h5>
        <data-tables
          class="pd-l-20 pd-r-20 mg-t-30"
          id="table"
          :key="tableKey"
          :data="orders"
          :table-props="tableProps"
          row-key="orders.code"
          @row-dblclick="openOrder"
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
      </section>
      <section class="actions-section" v-if="!toggleTabs">
        <section class="black-list-section">
          <h5>Black List:</h5>
          <button class="red" @click="blackListIt" :disabled="isBlackListed">Add</button>
          <button class="black" @click="removeFromBlackList" :disabled="!isBlackListed">Remove</button>
        </section>
        <hr class="separator" />
        <section class="discount-ntfc-section">
          <h5>Add Discount & Send Notification:</h5>
          <div class="first-layer">
            <div class="az-form-group">
              <label class="form-label">Discount Ratio</label>
              <input type="number" class="form-control" v-model="dscntRatio" placeholder="Eg: 1" />
            </div>
            <div class="az-form-group">
              <label class="form-label">Notitfiaction Title</label>
              <input
                type="name"
                class="form-control"
                v-model="ntfcTitle"
                placeholder="Eg: New Discount 🥳"
              />
            </div>
          </div>
          <div class="second-layer">
            <div class="az-form-group">
              <label class="form-label">Notitfiaction Body</label>
              <input
                type="name"
                class="form-control"
                v-model="ntfcBody"
                placeholder="Eg: horraaaay!, 2% discount hass been added to you 💃💃"
              />
            </div>
            <button class="red" @click="discntAndNtfc">Send</button>
          </div>
        </section>
        <hr class="separator" />
        <section class="discount-ntfc-section">
          <h5>Send Notification:</h5>
          <div class="first-layer">
            <div class="az-form-group lg">
              <label class="form-label">Notitfiaction Title</label>
              <input
                type="name"
                class="form-control"
                v-model="ntfcOnlyTitle"
                placeholder="Eg: New Discount 🥳"
              />
            </div>
          </div>
          <div class="second-layer">
            <div class="az-form-group">
              <label class="form-label">Notitfiaction Body</label>
              <input
                type="name"
                class="form-control"
                v-model="ntfcOnlyBody"
                placeholder="Eg: horraaaay!, 2% discount hass been added to you 💃💃"
              />
            </div>
            <button class="black" @click="sendNtfcOnly">Send</button>
          </div>
        </section>
      </section>
    </div>
    <OrderModal v-if="orderModalStatus" :order="order" />
  </div>
</template>

<script>
import { eventBus } from "../../main";
import {
  getPharmacyOrders,
  getStoreOrders,
  getOrder,
  checkIsBlackListed
} from "../../utils/Queries";
import OrderModal from "../ordering/orderModal";
import {
  add2BlackList,
  removeFromBlackList,
  sendNotification2Pharmacy,
  addDiscount2Pharmacy
} from "../../utils/Mutations";
import { showSucessMessage, showErrorMessage } from "../../utils/messages";
export default {
  data() {
    return {
      toggleTabs: true,
      orderModalStatus: false,
      tableKey: 1,
      tableProfileLabel: "",
      dscntRatio: "",
      ntfcOnlyTitle: "",
      ntfcTitle: "",
      ntfcOnlyBody: "",
      ntfcBody: "",
      isBlackListed: false,
      orders: [],
      order: {},
      titles: [
        {
          label: "Code",
          prop: "code"
        },
        {
          label: "Status",
          prop: "orderStatus"
        },
        {
          label: "Name",
          prop: "name"
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
          order: "descending"
        }
      },
      activeTab: ""
    };
  },
  props: ["profile"],
  components: {
    OrderModal
  },
  methods: {
    close() {
      eventBus.closeProfileModal();
    },
    async openOrder(selectedOrder) {
      let order = await getOrder(this, selectedOrder.code);
      order.code = selectedOrder.code;
      this.order = order;
      this.orderModalStatus = true;
    },
    async blackListIt() {
      let isAdded = await add2BlackList(this, this.profile.id);
      if (isAdded) {
        showSucessMessage(
          this,
          `Pharmacy: ${this.profile.name} has been added to the black list`
        );
        this.isBlackListed = true;
      } else {
        showErrorMessage(
          this,
          `Error adding pharmacy: ${this.profile.name} to black list, please try again!`
        );
      }
    },
    async removeFromBlackList() {
      let isRemoved = await removeFromBlackList(this, this.profile.id);
      if (isRemoved) {
        showSucessMessage(
          this,
          `Pharmacy: ${this.profile.name} has been removed from the black list`
        );
        this.isBlackListed = false;
      } else {
        showErrorMessage(
          this,
          `Error removing pharmacy: ${this.profile.name} to black list, please try again!`
        );
      }
    },
    async sendNtfcOnly() {
      if (this.ntfcOnlyTitle == "" || this.ntfcOnlyBody == "") {
        showErrorMessage(this, "Can not send empty fields!.");
        return;
      }
      let isSent = await sendNotification2Pharmacy(
        this,
        this.profile.id,
        this.ntfcOnlyTitle,
        this.ntfcOnlyBody
      );
      if (isSent) {
        showSucessMessage(this, "Notification has been sent.");
        this.ntfcOnlyTitle = "";
        this.ntfcOnlyBody = "";
      } else {
        showErrorMessage(this, "Error sending notification, please try again");
      }
    },
    async discntAndNtfc() {
      if (!this.ntfcTitle || !this.ntfcBody || !this.dscntRatio) {
        showErrorMessage(this, "Error: Empty field");
        return;
      }
      let isAdded = await addDiscount2Pharmacy(
        this,
        this.profile.id,
        this.dscntRatio
      );

      if (!isAdded) {
        showErrorMessage(this, "Error adding discount, please try again.");
        return;
      }

      let isSend = await sendNotification2Pharmacy(
        this,
        this.profile.id,
        this.ntfcTitle,
        this.ntfcBody
      );

      if (!isSend) {
        showErrorMessage(
          this,
          "Discount successfully added, but Error sending notification",
          4000
        );
        return;
      }
      showSucessMessage(this, "Action successfully performed");
      this.ntfcTitle = "";
      this.ntfcBody = "";
      this.dscntRatio = "";
    }
  },
  async created() {
    let type = this.profile.type;
    if (type === "Pharmacy") {
      this.isBlackListed = await checkIsBlackListed(this, this.profile.id);
    }
    this.orders =
      type === "Pharmacy"
        ? await getPharmacyOrders(this, this.profile.id)
        : await getStoreOrders(this, this.profile.id);

    this.orders.map(order => {
      order.name =
        type === "Pharmacy" ? order.to.storeName : order.from.pharmacyName;

      order.total = parseFloat(order.total).toLocaleString("en");

      order.createdAt = order.createdAt.slice(0, 10);
    });

    eventBus.$on("closeOrderModal", flag => {
      this.orderModalStatus = flag;
    });
  }
};
</script>

<style>
.profile-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 888;
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
  width: 70%;
  height: 80%;
  opacity: 1;
  padding: 0;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  z-index: 888;
}
.modal-tabs {
  position: sticky;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  background-color: #ced4da;
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
.actions-section,
.profile-section {
  display: flex;
  flex-direction: column;
  padding: 5%;
  overflow-y: auto;
  height: 100%;
}
.profile-data {
  display: flex;
  flex-direction: row;
  margin-top: 2%;
}
.profile-data section {
  width: 50%;
}
.profile-data section span {
  font-weight: bold;
  margin-right: 2%;
}
.discount-ntfc-section .first-layer,
.discount-ntfc-section .second-layer,
.black-list-section {
  display: flex;
  flex-direction: row;
}
.discount-ntfc-section {
  display: flex;
  flex-direction: column;
}
.discount-ntfc-section h5,
.black-list-section h5 {
  margin-right: 5%;
  font-size: 1.5em;
  margin-top: 1.7%;
}
.discount-ntfc-section .second-layer button,
.discount-ntfc-section button,
.black-list-section button {
  margin-left: 2%;
  height: 40px;
  width: 80px;
  font-weight: bold;
  color: #fff;
  border-width: 0;
  outline: none;
}
.red {
  background-color: #ff3535;
}
.red:hover {
  background-color: #560bd0;
}
.red:disabled {
  background-color: #70737c;
}
.black {
  background-color: #343640;
}
.black:hover {
  background-color: #23242b;
}
.black:disabled {
  background-color: #70737c;
}
.discount-ntfc-section .first-layer {
  margin-top: 2%;
}
.discount-ntfc-section .first-layer .az-form-group + .az-form-group {
  margin-left: 4%;
}
.discount-ntfc-section .first-layer .az-form-group {
  width: 40%;
  margin-top: 0;
}
.discount-ntfc-section .second-layer {
  margin-top: 2%;
  align-items: flex-end;
}
.discount-ntfc-section .second-layer .az-form-group {
  width: 70%;
}
.discount-ntfc-section .first-layer .az-form-group.lg {
  width: 70%;
}
.discount-ntfc-section .second-layer button {
  width: 10%;
  margin-left: 4%;
}
.separator {
  width: 50%;
  border-width: 2px;
  border-color: #dee2e6;
  margin-top: 6%;
  margin-bottom: 6%;
}
</style>
