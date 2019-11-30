<template>
  <div>
    <h2 class="content-title">Profiles</h2>

    <section class="discount-ntfc-section">
      <div class="content-label">Notifications</div>
      <p class="mg-t-5">Send notifications based upone area.</p>
      <!-- <h5>Send Notification:</h5> -->
      <div class="first-layer">
        <div class="az-form-group lg">
          <label class="form-label">Notitfiaction Title</label>
          <input
            type="name"
            v-model="ntfcTitle"
            class="form-control"
            placeholder="Eg: New Discount 🥳"
          />
        </div>
        <div class="az-form-group">
          <label class="form-label">Pharmacies Areas</label>
          <v-select
            class="form-control mg-t-15"
            id="vSelectId"
            v-model="selectedArea"
            :options="areas"
          />
        </div>
      </div>
      <div class="second-layer">
        <div class="az-form-group">
          <label class="form-label">Notitfiaction Body</label>
          <input
            type="name"
            v-model="ntfcBody"
            class="form-control"
            placeholder="Eg: horraaaay!, 2% discount hass been added to you 💃💃"
          />
        </div>
        <button class="btn btn-dark" @click="snedNotification">Send</button>
      </div>
    </section>
    <hr class="separator" />
    <div class="content-label mg-b-5">Phramacies & Stores</div>
    <p class="mg-b-20">Here you can deal with profiles of Drug1Market.</p>

    <div class="table-container">
      <div class="tableControl pd-t-10 pd-r-10 pd-l-10">
        <div class="table-tabs">
          <!-- btn-group -->
          <button
            class="table-tab"
            @click="toggleTabs('')"
            :class="(activeTab == '')? 'active' : null"
          >All</button>
          <button
            class="table-tab"
            @click="toggleTabs('Pharmacy')"
            :class="(activeTab == 'Pharmacy')? 'active' : null"
          >Pharmacies</button>
          <button
            class="table-tab"
            @click="toggleTabs('Store')"
            :class="(activeTab == 'Store')? 'active' : null"
          >Stores</button>
        </div>
        <input type="text" v-model="filters[0].value" placeholder="Search Names" />
        <input type="text" v-model="filters[2].value" placeholder="Search Codes" />
      </div>
      <data-tables
        class="pd-l-20 pd-r-20 mg-t-30"
        id="table"
        :data="profiles"
        :table-props="tableProps"
        :filters="filters"
        row-key="id"
        @row-dblclick="openProfile"
        :key="tableKey"
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
    <ProfileModal v-if="profileModalStatus" :profile="profile" />
  </div>
</template>
<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import DatePicker from "vue2-datepicker";
import {
  getPharmacies,
  getStores,
  getPharmacy,
  getStore,
  getPharmaciesAreas
} from "../utils/Queries";
import ProfileModal from "../components/profile/profileModal";
import { eventBus } from "../main";
import { showErrorMessage, showSucessMessage } from "../utils/messages";
import { sendNotificationByArea } from '../utils/Mutations';
export default {
  data() {
    return {
      selectedArea: "",
      ntfcTitle: "",
      ntfcBody: "",
      activeTab: "",
      profiles: [],
      profile: {},
      areas: [],
      tableKey: 1,
      profileModalStatus: false,
      titles: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "Name",
          prop: "name"
        },
        {
          label: "Type",
          prop: "type"
        },
        {
          label: "Code",
          prop: "code"
        }
      ],
      tableProps: {
        stripe: true,
        border: true
      },
      filters: [
        {
          value: "",
          prop: "name"
        },
        {
          value: "",
          prop: "type"
        },
        {
          value: "",
          prop: "code"
        }
      ]
    };
  },
  components: {
    IosArrowForwardIcon,
    DatePicker,
    ProfileModal
  },
  methods: {
    toggleFocus(event) {
      event.target.parentElement.classList.toggle("focus");
    },
    prepareProfiles(pharmacies, stores) {
      (this.profiles = pharmacies), this.profiles.push(...stores);
      this.tableKey++;
    },
    toggleTabs(val) {
      this.activeTab = val;
      this.filters[1].value = val;
    },
    async openProfile(selectedProfile) {
      let type = selectedProfile.type;
      this.profile =
        type === "Pharmacy"
          ? await getPharmacy(this, selectedProfile.id)
          : await getStore(this, selectedProfile.id);

      this.profile.type = type;
      this.profile.id = selectedProfile.id;
      this.profile.name = selectedProfile.name;

      this.profileModalStatus = true;
    },
    async updateUI() {
      let pharmacies = await getPharmacies(this);
      pharmacies = pharmacies.map(pharmacy => {
        return {
          id: pharmacy.id,
          name: pharmacy.pharmacyName,
          type: "Pharmacy",
          code: pharmacy.code
        };
      });
      let stores = await getStores(this);
      stores = stores.map(store => {
        return {
          id: store.id,
          name: store.storeName,
          type: "Store",
          code: ""
        };
      });
      this.prepareProfiles(pharmacies, stores);
    },
    async snedNotification() {
      if (!this.selectedArea || !this.ntfcBody || !this.ntfcTitle) {
        showErrorMessage(this, "Can not perform, wrong data provided");
        return;
      }
      let isSent = await sendNotificationByArea(
        this,
        this.selectedArea,
        this.ntfcTitle,
        this.ntfcBody
      );
      if(isSent){
        showSucessMessage(this, "Notification has bees successfully sent");
        this.selectedArea  = ""
        this.ntfcBody = ""
        this.ntfcTitle = ""
      } else {
        showErrorMessage(this, "Error sending notification")
      }
    }
  },
  async created() {
    this.updateUI();
    let areas = await getPharmaciesAreas(this);
    this.areas = areas.filter(area => area != null);
  },
  mounted() {
    eventBus.$on("closeProfileModal", flage => {
      this.profileModalStatus = flage;
    });
  }
};
</script>

<style>
.mx-input {
  border-radius: 0%;
  border-width: 0px;
  padding-left: 0px;
  box-shadow: none;
}
.custom-icon {
  margin-left: 2px;
  margin-right: 2px;
}
.dark-f-color {
  color: #3e3f44;
}
/* margin-bottom: 20px; */
.content-title {
  color: #212229;
  font-weight: 700;
  font-size: 24px;
  text-indent: -1px;
  line-height: 1;
  position: relative;
  margin-top: 5%;
  margin-bottom: 2%;
}
.content-label {
  color: #212229;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
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
/* .tableControl input + input {
  margin-left: 3%;
} */
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
.table-tab + .table-tab {
  margin-left: 3px;
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
  margin-top: 4%;
}
.discount-ntfc-section h5 {
  margin-right: 5%;
  font-size: 1.5em;
  margin-top: 1.7%;
}
.discount-ntfc-section .second-layer button,
.discount-ntfc-section button {
  margin-left: 2%;
  height: 40px;
  width: 80px;
  font-weight: bold;
  color: #fff;
  border-width: 0;
  outline: none;
}
.black:disabled {
  background-color: #70737c;
}
.discount-ntfc-section .first-layer {
  margin-top: 1%;
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
.discount-ntfc-section .first-layer .az-form-group {
  width: 33%;
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

