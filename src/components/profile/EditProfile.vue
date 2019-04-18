<template>
  <div>
    <div class="content-breadcrumb">
      <span>
        <router-link tag="a" to="/">Profile</router-link>
      </span>
      <IosArrowForwardIcon w="10px" class="custom-icon"/>
      <span>
        <router-link tag="a" to="/edit-profile" class="dark-f-color">Edit Profile</router-link>
      </span>
    </div>
    <h2 class="content-title">Edit Profile</h2>
    <div class="content-label mg-b-5">Prsonal Informations</div>
    <p class="mg-b-20">This information will not be shared with public.</p>

    <div class="wd-xl-100p">
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
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 mg-t-20 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Last Name</label>
            <input
              type="name"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Your Last Name"
              value="Gad"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 mg-t-20 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Your Email"
              value="me@drugmarkt.me"
              @focus="toggleFocus"
              @blur="toggleFocus"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 mg-t-20 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Phone Number</label>
            <input
              type="email"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Phone Number"
              value="01020432442"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
      </div>
      <!-- row -->
      <div class="row row-xs mg-t-5">
        <!-- col -->
        <div class="col-md-3 mg-t-20">
          <div class="az-form-group">
            <label class="form-label">Birth Date</label>
            <date-picker
              type="text"
              class="form-control"
              lang="EN"
              id="datePickerId"
              v-model="birthDate"
              placeholder="YYYY-DD-MM"
            />
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
        <div class="col-md-3 mg-t-20 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Enter your password"
              value
            >
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
        <div class="col-md-3 mg-t-20 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Confirm your password"
              value
            >
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
      </div>
      <!-- row -->
    </div>
    <div class="mg-t-20">
      <button class="btn btn-az-primary pd-x-30 mg-r-5">Update</button>
      <button class="btn btn-dark pd-x-30">Cancel</button>
    </div>
    <hr class="mg-y-30">

    <div class="content-label mg-b-5">Store Informations</div>
    <p class="mg-b-20">Keep your store informations updated.</p>

    <div class="wd-xl-100p">
      <div class="row row-xs">
        <div class="col-md-3">
          <div class="az-form-group">
            <label class="form-label">Store Logo</label>
            <label class="custom-file-label" for="customFile">Change store logo 400*400px</label>
            <input
              type="file"
              class="custom-file-input"
              @focus="toggleFocus"
              @blur="toggleFocus"
              id="customFile"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Store Name</label>
            <input
              type="name"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="Your Store Name"
            >
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">City</label>
            <v-select
              class="form-control"
              id='vSelectId'
              :options="cities"
              v-model="selectedCity"
            />
          </div>
          <!-- az-form-group -->
        </div>
        <div class="col-md-3 pd-l-0">
          <div class="az-form-group">
            <label class="form-label">Area</label>
            <v-select
              class="form-control test"
              id="vSelectId"
              :options="areas"
              v-model="selectedArea"
            />
          </div>
          <!-- az-form-group -->
        </div>
      </div>
      <!-- row -->
      <div class="row row-xs mg-t-20">
        <!-- col -->
        <div class="col-md-12">
          <div class="az-form-group">
            <label class="form-label">About your store</label>
            <textarea
              rows="5"
              class="form-control"
              @focus="toggleFocus"
              @blur="toggleFocus"
              placeholder="A small description about your store"
            ></textarea>
          </div>
          <!-- az-form-group -->
        </div>
        <!-- col -->
      </div>
      <!-- row -->
    </div>
    <div class="mg-t-20">
      <button class="btn btn-az-primary pd-x-30 mg-r-5">Update</button>
      <button class="btn btn-dark pd-x-30">Cancel</button>
    </div>
  </div>
</template>
<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue"
import DatePicker from 'vue2-datepicker'
export default {
  data() {
    return {
      areas: ["Smouha", "Sidi Gaber", "Al Agmy", "Kafr Abdo", "Roushdy"],
      selectedArea: "Smouha",
      cities: ["Alexandria", "Cairo", "Swiss", "South Sinai", "Mansoura"],
      selectedCity: "Alexandria",
      birthDate: ''
    };
  },
  components: {
    IosArrowForwardIcon,
    DatePicker
  },
  methods: {
    toggleFocus(event) {
      event.target.parentElement.classList.toggle("focus");
    }
  }
};
</script>

<style>
.mx-input{
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
.content-title {
  color: #212229;
  font-weight: 700;
  font-size: 24px;
  text-indent: -1px;
  line-height: 1;
  position: relative;
  margin-bottom: 20px;
}
.content-label {
  color: #212229;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}
</style>
