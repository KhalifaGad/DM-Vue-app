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
            id="storeName"
            class="form-control"
            v-model="storeName"
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
          <v-select id="vSelectCitySignup" :options="cities" v-model="selectedCity"/>
        </div>
        <div class="col-md-5 col-lg-4 mg-t-20 mg-md-t-0">
          <label>
            Area:
            <span class="tx-danger">*</span>
          </label>
          <v-select id="vSelectAreaSignup" :options="areas" v-model="selectedArea" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    areas(){ return this.$store.getters.getAreas
    },
    selectedArea: {
      set(val) { this.$store.dispatch('setSelectedArea', val) },
      get() { return this.$store.getters.getSelectedArea }
    },
    cities() { return this.$store.getters.getCities 
    },
    selectedCity: {
      set(val) { this.$store.dispatch('setSelectedCity', val) },
      get() { return this.$store.getters.getSelectedCity }
    },
    storeName: {
      set(val) { this.$store.dispatch('setStoreName', val) },
      get() { return this.$store.getters.getStoreName }
    }
  },
  methods: {
    Fn(){
    document.getElementById('vSelectIdSignup').id = 'vSelectIdSignupError';  
    //document.getElementById('vSelectIdSignup').style.backgroundColor = 'red';
  }
  }
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
