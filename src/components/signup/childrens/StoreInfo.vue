<template>
  <div class="wrapper pd-t-20 pd-x-30">
    <h3>Store Information</h3>
    <section>
      <p>We need to know some informations about your store</p>
      <div class="row row-sm">
        <div class="col-md-5 col-lg-4">
          <label class="form-control-label">
            Store Name:
            <span class="tx-danger">*</span>
          </label>
          <input
            id="firstname"
            class="form-control"
            name="firstname"
            placeholder="Enter Store name"
            type="text"
            required
          >
        </div>
        <div class="col-md-5 col-lg-4 mg-t-20 mg-md-t-0">
          <label>
            City:
            <span class="tx-danger">*</span>
          </label>
          <v-select id="vSelectIdSignup" :options="cities" v-model="selectedCity"/>
        </div>
        <div class="col-md-5 col-lg-4 mg-t-20 mg-md-t-0">
          <label>
            Area:
            <span class="tx-danger">*</span>
          </label>
          <v-select id="vSelectIdSignup" :options="areas" v-model="selectedArea" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { eventBus } from "../../../main.js"

export default {
  data() {
    return {
      areas: ["Smouha", "Sidi Gaber", "Al Agmy", "Kafr Abdo", "Roushdy"],
      selectedArea: "Pick area",
      cities: ["Alexandria", "Cairo", "Swiss", "South Sinai", "Mansoura"],
      selectedCity: "Pick city",
      birthDate: ""
    };
  },
};
</script>

<style scoped>
.wrapper {
  padding-bottom: 44px;
}
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
