<template>
  <div class="az-content-body">
    <div class="content-breadcrumb">
      <span>
        <router-link tag="a" to="/">Drugs mangement</router-link>
      </span>
      <IosArrowForwardIcon w="10px" class="custom-icon"/>
      <span>
        <router-link tag="a" to="/edit-profile" class="dark-f-color">Drugs List</router-link>
      </span>
    </div>
    <h2 class="content-title">Drugs List</h2>

    <div class="content-label pd-t-25 mg-b-5">Your store drugs list</div>
    <p class="mg-b-20">this a list of all the drugs that yu uploded to your store.</p>
    <div class="row">
      <div class="search-drugs col col-md-5">
        <input type="text" v-model="filters[0].value" placeholder="search drug names">
      </div>
    </div>
    <data-tables
      id="table"
      :data="data"
      :table-props="tableProps"
      :filters="filters"
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
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import drugsList from "../../assets/drugsData.js";

export default {
  data() {
    return {
      data: drugsList.drugs,
      titles: drugsList.titles,
      tableProps: {
        stripe: true,
        border: true
      },
      filters: [
        {
          value: "",
          prop: "drugName"
        }
      ]
    };
  },
  components: {
    IosArrowForwardIcon
  }
};
</script>

<style scoped>
.custom-icon {
  margin-left: 2px;
  margin-right: 2px;
}
.dark-f-color {
  color: #3e3f44;
}
.search-drugs {
  position: absolute;
  top: 200px;
  right: -250px;
}
.search-drugs input {
  border: none;
  width: 180px;
  padding-left: 15px;
  padding-bottom: 5px;
  border-bottom: #d5d8dd solid;
  font-size: 16px;
  transition: border-color 0.5s ease-in-out;
}
.search-drugs input:focus,
.search-drugs input:hover {
  outline: none;
  border-bottom: #ff3535 solid;
}
</style>

