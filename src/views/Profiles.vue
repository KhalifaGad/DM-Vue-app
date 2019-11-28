<template>
  <div>
    <h2 class="content-title">Profiles</h2>
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
  getStore
} from "../utils/Queries";
import ProfileModal from "../components/profile/profileModal";
import { eventBus } from "../main";
export default {
  data() {
    return {
      areas: ["Smouha", "Sidi Gaber", "Al Agmy", "Kafr Abdo", "Roushdy"],
      selectedArea: "Smouha",
      cities: ["Alexandria", "Cairo", "Swiss", "South Sinai", "Mansoura"],
      selectedCity: "Alexandria",
      birthDate: "",
      activeTab: "",
      profiles: [],
      profile: {},
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
    }
  },
  created() {
    this.updateUI()
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
/* .el-message .el-icon-info {
    color: #909399;
    ui element styling
    display: none
} */
.table-tab + .table-tab {
  margin-left: 3px;
}
</style>
<!-- <div class="wd-xl-100p">
      <div class="row row-xs">
        <div class="col-md-3 mg-t-20">
          <div class="az-form-group">
            <label class="form-label">First Name</label>
            <input
              type="name"
              class="form-control"
              placeholder="Your First Name"
              @focus="toggleFocus"
              @blur="toggleFocus"
            />
          </div>
        </div>
        <div class="col-md-3 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">City</label>
            <v-select class="form-control" id="vSelectId" :options="cities" v-model="selectedCity" />
          </div>
        </div>
      </div>
    </div> -->
