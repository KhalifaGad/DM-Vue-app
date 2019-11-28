<template>
  <div class="drug-modal">
    <div class="modal-body">
      <div class="first-layer">
        <h3>{{drug.name}}</h3>
        <button class="close-btn" v-shortkey="['esc']" @shortkey="close()" @click="close">close</button>
      </div>
      <div class="second-layer">
        <h4>stores:</h4>
        <p class="mg-t-30" >Click to open store.</p>
        <data-tables
          id="table"
          :data="drug.stores"
          @row-dblclick="openStore"
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
      </div>
    </div>
    <ProfileModal v-if="isProfileOpened" :profile="store" />
  </div>
</template>

<script>
import { eventBus } from "../../main";
import {
  getDrug,
  getDrugStores,
  getStoreName,
  getStore
} from "../../utils/Queries";
import ProfileModal from "../profile/profileModal";
export default {
  components: {
    ProfileModal
  },
  data() {
    return {
      titles: [
        {
          label: "Name",
          prop: "name"
        },
        {
          label: "Price",
          prop: "price"
        },
        {
          label: "Cash Disc.",
          prop: "discount"
        },
        {
          label: "Def. Disc.",
          prop: "deferredDiscount"
        },
        {
          label: "Only Cash",
          prop: "onlyCash"
        },
        {
          label: "count",
          prop: "count"
        }
      ],
      tableProps: {
        stripe: true,
        border: true
      },
      isProfileOpened: false,
      store: {}
    };
  },
  props: ["drug"],
  methods: {
    close() {
      eventBus.closeDrugModal();
    },
    async openStore(selectedStore) {
      let stores = this.drug.stores,
        id = "";
      for (let i = 0; i < stores.length; i++) {
        if (stores[i].name === selectedStore.name) {
          id = stores[i].store;
          console.log(id);
          break;
        }
      }
      this.store = await getStore(this, id);
      console.log(this.store);
      this.store.id = id;
      this.store.type = "Store";
      this.store.name = selectedStore.name;
      this.isProfileOpened = true;
    }
  },
  async created() {
    let stores = await getDrugStores(this, this.drug.id);
    console.log(stores);
    stores.map(async storeObj => {
      storeObj.name = (await getStoreName(this, storeObj.store)) || "test";
      storeObj.onlyCash = storeObj.onlyCash ? "Yes" : "No";
      storeObj.deferredDiscount = storeObj.deferredDiscount || 0;
      storeObj.count = 0;
    });
    this.drug.stores = stores;
  },
  mounted() {
    eventBus.$on("closeProfileModal", () => {
      this.isProfileOpened = false;
    });
  }
};
</script>

<style scoped>
.drug-modal {
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
  padding: 5%;
  padding-top: 3%;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  z-index: 888;
  width: 70%;
  height: 80%;
}
.first-layer {
  display: flex;
  flex-direction: row;
}
.close-btn {
  align-self: flex-end;
  background-color: #fff !important;
  color: #ff3535;
  font-weight: bolder;
  margin-left: auto;
  border-width: 0;
  outline: none;
  font-size: 1em !important;
  margin-bottom: 1%;
}
.close-btn:hover {
  font-size: 1.2em !important;
}
.second-layer {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 100%;
  overflow-y: auto;
}
</style>