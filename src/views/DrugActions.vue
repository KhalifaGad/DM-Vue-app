<template>
  <div class>
    <h2 class="content-title mg-t-30">Drug Actions</h2>
    <div class="content-label pd-t-15 mg-b-15">Edit existed drug name:</div>
    <div class="wd-xl-100p">
      <div class="row row-xs">
        <div class="col-md-4 mg-t-20 mg-lg-t-0">
          <div class="az-form-group">
            <label class="form-label">Drug Name</label>
            <v-select
              class="form-control mg-t-15"
              id="vSelectId"
              v-model="selectedDrugName"
              :options="drugNames"
            />
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-4 mg-t-20 mg-lg-t-0 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">New Name</label>
            <input
              type="name"
              class="form-control mg-t-15"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Enter drug new name"
              v-model="newDrugName1"
            />
          </div>
          <!-- az-form-group -->
        </div>
      </div>
      <!-- row -->
    </div>
    <div class="mg-t-20 pd-b-30">
      <button @click="updateDrug" class="btn btn-az-primary pd-x-30 mg-r-5">Update</button>
    </div>
    <hr class="separator">
    <div class="content-label pd-t-15 mg-b-15">Add new drug:</div>
    <div class="wd-xl-100p">
      <div class="row row-xs">
        <!-- <div class="col-md-4 mg-t-20 mg-lg-t-0">
          <div class="az-form-group">
            <label class="form-label">Drug Name</label>
            <v-select
              class="form-control mg-t-15"
              id="vSelectId"
              v-model="selectedDrugName"
              :options="drugNames"
            />
          </div>
        </div> -->
        <div class="col-md-4 mg-t-20 mg-lg-t-0 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Drug Name</label>
            <input
              type="name"
              class="form-control mg-t-15"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Enter drug name"
              v-model="newDrugName2"
            />
          </div>
          <!-- az-form-group -->
        </div>
      </div>
      <!-- row -->
    </div>
    <div class="mg-t-20 pd-b-30">
      <button @click="addNewDrug" class="btn btn-dark pd-x-30 mg-r-5">Add</button>
    </div>
  </div>
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import { getDrugsName } from "../utils/Queries";
import { showErrorMessage, showSucessMessage } from "../utils/messages";
import { updateDrugName, addDrug } from "../utils/Mutations";
export default {
  data() {
    return {
      cashToggle: false,
      drugNames: [],
      selectedDrugName: "",
      newDrugName1: "",
      newDrugName2: ""
    };
  },
  components: {
    IosArrowForwardIcon
  },
  methods: {
    toggleFocus(event) {
      event.target.parentElement.classList.toggle("focus");
    },
    async updateDrug() {
      if (this.newDrugName1 == "") {
        showErrorMessage(this, "Can not set empty drug name!.");
        return;
      }
      let isUpdated = await updateDrugName(
        this,
        this.selectedDrugName,
        this.newDrugName1
      );
      if(isUpdated){
        showSucessMessage(this, "Drug name hass been updated successfully");
        let drugs = await getDrugsName(this);
        this.newDrugName1 = ""
        this.selectedDrugName = ""
        this.drugNames = []
        this.drugNames.push(...drugs.map(drug => drug.name));
      } else {
        showErrorMessage(this, "Error updating drug name")
      }
    },
    async addNewDrug(){
      if(this.newDrugName2 == ""){
        showErrorMessage(this, "Can not add empty drug name!.");
        return;
      }
      let isAdded = await addDrug(this, this.newDrugName2)
      if(isAdded){
        showSucessMessage(this, "Drug hass been added successfully");
        let drugs = await getDrugsName(this);
        this.newDrugName1 = ""
        this.newDrugName2 = ""
        this.selectedDrugName = ""
        this.drugNames = []
        this.drugNames.push(...drugs.map(drug => drug.name));
      } else {
        showErrorMessage(this, "Error adding new drug")
      }
    }
  },
  async created() {
    let drugs = await getDrugsName(this);
    this.drugNames.push(...drugs.map(drug => drug.name));
  }
};
</script>

<style scoped>
.custom-icon {
  margin-left: 2px;
  margin-right: 2px;
}

.content-title {
  color: #212229;
  font-weight: 700;
  font-size: 24px;
  text-indent: -1px;
  line-height: 1;
  position: relative;
  margin-bottom: 20px;
}
.az-toggle {
  width: 60px;
  height: 25px;
  background-color: #ced4da;
  padding: 2px;
  position: relative;
  overflow: hidden;
}

.az-toggle span {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  display: block;
  width: 20px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

@media screen and (prefers-reduced-motion: reduce) {
  .az-toggle span {
    transition: none;
  }
}

.az-toggle span::before,
.az-toggle span::after {
  position: absolute;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #fff;
  top: 2px;
  line-height: 1.38;
}

.az-toggle span::before {
  content: "on";
  left: -25px;
}

.az-toggle span::after {
  content: "off";
  right: -29px;
}

.az-toggle.on {
  background-color: #ff3535;
}

.az-toggle.on span {
  left: 37px;
}
.separator {
  width: 50%;
  border-width: 1px;
  border-color: #dee2e6;
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>
