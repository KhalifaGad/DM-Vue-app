<template>
  <div class>
    <div class="content-breadcrumb">
      <span>
        <router-link tag="a" to="/">Drugs mangement</router-link>
      </span>
      <IosArrowForwardIcon w="10px" class="custom-icon"/>
      <span>
        <router-link tag="a" to="/upload-new" class="dark-f-color">Upload Drug</router-link>
      </span>
    </div>
    <h2 class="content-title">Upload New Drug</h2>
    <div class="content-label pd-t-15 mg-b-5">Select the drug name</div>
    <p class="mg-b-20">All the drugs imported from the egyptian database .</p>
    <div class="wd-xl-100p">
      <div class="row row-xs">
        <div class="col-md-4 mg-t-20 mg-lg-t-0">
          <div class="az-form-group">
            <label class="form-label">Drug Name</label>
            <v-select class="form-control mg-t-15" id="vSelectId" :options="drugNames"/>
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-4 mg-t-20 mg-lg-t-0 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Price per pack</label>
            <input
              type="name"
              class="form-control mg-t-15"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Price by EGP"
              value
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-4 mg-t-20 mg-lg-t-0 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Cash payment</label>
            <div
              @focus="toggleFocus"
              @blur="toggleFocus"
              @click="cashToggle = !cashToggle"
              :class="{on: cashToggle}"
              class="az-toggle az-toggle-primary mg-t-15"
            >
              <span></span>
            </div>
          </div>
          <!-- az-form-group -->
        </div>
      </div>
      <!-- row -->
      <div class="row row-xs mg-t-20">
        <!-- col -->
        <div class="col-md-6">
          <div class="az-form-group">
            <label class="form-label">Upload Excel file with your store drugs list</label>
            <label class="custom-file-label" for="customFile">Upload drugs list</label>
            <input
              type="file"
              @focus="toggleFocus"
              @blur="toggleFocus"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              class="custom-file-input"
              id="customFile"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
      </div>
      <!-- row -->
    </div>
    <div class="mg-t-20 pd-b-90">
      <button class="btn btn-az-primary pd-x-30 mg-r-5">Update</button>
      <button class="btn btn-dark pd-x-30">Cancel</button>
    </div>
  </div>
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
export default {
  data() {
    return {
      cashToggle: false,
      drugNames: ["Drug 1", "Drug 2", "Drug 3"]
    };
  },
  components: {
    IosArrowForwardIcon
  },
  methods: {
    toggleFocus(event) {
      event.target.parentElement.classList.toggle("focus");
    }
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
</style>

