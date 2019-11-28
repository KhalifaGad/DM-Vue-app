<template>
  <div class="az-content-body">
    <h2 class="content-title">Drugs List</h2>

    <div class="content-label pd-t-25 mg-b-5">All drugs list</div>
    <p class="mg-b-20">Click to more details about drug.</p>
    <div class="row">
      <div class="search-drugs">
        <input type="text" v-model="filters[0].value" placeholder="search drug names" />
      </div>
    </div>
    <data-tables
      id="table"
      :data="drugs"
      :table-props="tableProps"
      @row-dblclick="openDrugModal"
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
    <DrugModal v-if="isDrugModalOpened" :drug="drug" />
  </div>
</template>

<script>
import IosArrowForwardIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import DrugModal from "../components/drugs manegment/drugModal";
import { eventBus } from "../main";
import {
  getDrugs,
  getDrugSellingValue,
  getDrugsWtihSellingValue
} from "../utils/Queries";

export default {
  data() {
    return {
      drugs: [],
      isDrugModalOpened: false,
      drug: {},
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
          label: "Stores Count",
          prop: "storesCount"
        },
        {
          label: "Selling Value",
          prop: "sellingValue"
        }
      ],
      tableProps: {
        stripe: true,
        border: true,
        defaultSort: {
          prop: "sellingValue",
          order: "descending"
        }
      },
      filters: [
        {
          value: "",
          prop: "name"
        },
        {
          label: "",
          prop: "sellingValue"
        }
      ]
    };
  },
  components: {
    IosArrowForwardIcon,
    DrugModal
  },
  methods: {
    openDrugModal(selectedDrug) {
      this.drug = selectedDrug;
      this.isDrugModalOpened = true;
    }
  },
  async created() {
    this.drugs = await getDrugsWtihSellingValue(this);
    eventBus.$on("closeDrugModal", () => {
      this.isDrugModalOpened = false;
    });
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
  top: 196px;
  right: 90px;
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
  border-bottom: #4709ac solid;
}
.content-title {
  margin-top: 4%;
}
</style>

