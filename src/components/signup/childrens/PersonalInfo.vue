<template>
  <div class="pd-t-20 pd-b-40 pd-x-30">
    <h3>Personal Information</h3>
    <section>
      <p class="mg-b-20">Try the keyboard navigation by clicking arrow left or right!</p>

      <div class="row row-sm">
        <div class="col-md-5 col-lg-3">
          <label class="form-control-label">
            First Name: {{ fName }}
            <span class="tx-danger">*</span>
          </label>
          <input
            v-model.lazy="fName"
            id="fName"
            class="form-control"
            name="firstname"
            placeholder="Enter firstname"
            type="text"
            required
          >
        </div>
        <!-- col -->
        <div class="col-md-5 col-lg-3 mg-t-20 mg-md-t-0">
          <label class="form-control-label">
            Last Name:
            <span class="tx-danger">*</span>
          </label>
          <input
            v-model.lazy="lName"
            id="lName"
            class="form-control"
            name="lastname"
            placeholder="Enter lastname"
            type="text"
            required
          >
        </div>
        <!-- col -->
        <div class="col-md-5 col-lg-3 mg-t-20 mg-md-t-0">
          <label class="form-control-label">
            Phone Number:
            <span class="tx-danger">*</span>
          </label>
          <input
            v-model.lazy="phone"
            id="phone"
            class="form-control"
            placeholder="phone number"
            type="number"
            required
          >
        </div>
        <!-- col -->
        <div class="col-md-5 col-lg-3 mg-t-20 mg-md-t-0">
          <label class="form-control-label">
            Email:
            <span class="tx-danger">*</span>
          </label>
          <input
            v-model.lazy="email"
            class="form-control"
            id="email"
            placeholder="Enter email address"
            type="email"
            required
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { eventBus } from "../../../main.js";
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
    fName: {
      set(val) { this.$store.dispatch('setFName', val) },
      get() { return this.$store.getters.fName }
    },
    lName: {
      set(val) {this.$store.dispatch('setLName', val) },
      get() { return this.$store.getters.lName }
    },phone: {
      set(val) {this.$store.dispatch('setPhone', val)},
      get() { return this.$store.getters.phone }
    },
    email: {
      set(val) {this.$store.dispatch('setEmail', val)},
      get() { return this.$store.getters.email }
    }
  }
};
</script>


<style scoped>
input {
  outline: none;
  border-radius: 0;
  height: 36px;
}
input:focus {
  outline: none;
  box-shadow: none;
  border-color: #a6a8ad;
}
</style>
