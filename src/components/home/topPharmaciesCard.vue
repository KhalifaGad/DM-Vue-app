<template>
    <div class="card card-dashboard-eight bg-white">
          <h6 class="card-title">Your Top Pharmacies</h6>
          <span class="d-block mg-b-20">Sales performance revenue based by customers</span>

          <div class="list-group">
            <div v-for="(pharmacyArr, index) in alterPharmacies" :key="index" class="list-group-item">
              <i class="fa fa-user"></i>
              <p>{{ pharmacyArr.pharmacyName }} </p>
              <span>{{ pharmacyArr.total + ' EGP' }}</span>
            </div>
          </div>
          <!-- list-group -->
        </div>
</template>

<script>
import { getPharmacyNameFromCode } from '../../utils/Queries'
export default {
  props: [
    'pharmacies'
  ],
  computed: {
    alterPharmacies(){
      return this.pharmacies.map((pharmacyArray)=> {
        return {
          pharmacyName: pharmacyArray[1].pharmacyName,
          total: pharmacyArray[1].total
        }
      })
    }
  },
  methods: {
    async getPharmacyName(code){
      let pharmacyName = await getPharmacyNameFromCode(this, code)
      return pharmacyName
    }
  }
}
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0px;
}

.content-label,
.card-dashboard-eight .card-title {
  color: #212229;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}
.card-dashboard-eight .card-title {
  font-size: 13px;
  margin-bottom: 5px;
}
.card-dashboard-eight {
  border-color: #ced4da;
  padding: 20px;
}
.card-dashboard-eight .list-group-item {
  padding: 10px 0;
  border-left-width: 0;
  border-right-width: 0;
  border-style: dotted;
  border-color: #ced4da;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.card-dashboard-eight .list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.card-dashboard-eight .list-group-item:last-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.card-dashboard-eight .list-group-item p {
  margin-bottom: 0;
  margin-left: 10px;
}

.card-dashboard-eight .list-group-item span {
  display: block;
  margin-left: auto;
  font-weight: 600;
  font-family: "Archivo", Arial, sans-serif;
  color: #212229;
}

.card-dashboard-eight .flag-icon {
  font-size: 24px;
  line-height: 1;
  border-radius: 100%;
}
</style>