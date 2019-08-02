<template>
  <div class="body">
    <div class="az-signup-wrapper">
      <!-- az-column-signup-left -->
      <div class="az-column-signup">
        <img class="az-logo" src="../../assets/img/logo.png" alt="drug market">

        <div class="az-signup-header">
          <h2>Get Started</h2>
          <h4>Request your account now, it's Free</h4>
        </div>
        <!-- az-signup-header -->
        <div class="az-signup-footer">
          <p>
            Already have an account?
            <router-link to="/login">Sign In</router-link>
          </p>
        </div>
        <!-- az-signin-footer -->
      </div>
      <!-- az-column-signup -->
      <div class="signup-wrapper">
        <div class="signup-form">
          <div class="navs">
            <ul>
              <li>
                <div class="li-wrapper">
                  <div class="index" :style="{backgroundColor: prsonalInfoColor}">1</div>
                  <button
                    class="navBtn"
                    @click="personalInfoSelected"
                    :style="{color: prsonalInfoColor}"
                  >Personal Information</button>
                </div>
              </li>
              <li>
                <div class="li-wrapper">
                  <div class="index" :style="{backgroundColor: storeInfoColor}">2</div>
                  <button
                    class="navBtn"
                    @click="storeInfoSelected"
                    :style="{color: storeInfoColor}"
                  >Store Information</button>
                </div>
              </li>
              <li>
                <div class="li-wrapper">
                  <div class="index" :style="{backgroundColor: confirmationColor}">3</div>
                  <button
                    class="navBtn"
                    :style="{color: confirmationColor}"
                    @click="confirmationSelected()"
                  >Confimration</button>
                </div>
              </li>
            </ul>
          </div>
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="selectedComponent"></component>
            </keep-alive>
          </transition>
          <section class="control-btns" v-show="selectedComponent != 'FinishedReg'">
            <div class="previous-conrtol">
              <button
                class="control-btn"
                v-shortkey="['arrowleft']"
                @shortkey="previous"
                @click="previous"
                :disabled="selectedComponent == 'PersonalInfo'"
              >Previous</button>
            </div>
            <div class="next-conrtol">
              <transition name="fade" mode="out-in">
                <button
                  class="control-btn-finish"
                  @click="finish"
                  v-if="selectedComponent == 'Confirmation'"
                  key="finish"
                >Finish</button>
                <button
                  v-shortkey="['arrowright']"
                  @shortkey="next"
                  @click="next"
                  class="control-btn"
                  v-else
                  key="next"
                >Next</button>
              </transition>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "./childrens/PersonalInfo";
import StoreInfo from "./childrens/StoreInfo";
import Confirmation from "./childrens/Confirmation";
import FinishedReg from "./childrens/FinishedReg";
import { mapGetters } from "vuex";
import validationHelper from "./validationHelper";

export default {
  data() {
    return {
      nextBtn: "Next",
      activeTap: "",
      prsonalInfoColor: "#ff3535",
      storeInfoColor: "",
      confirmationColor: "",
      selectedComponent: "PersonalInfo",
      pesonalInfoChecked: false,
      storeInfoChecked: false
    };
  },
  computed: {
    ...mapGetters({
      fName: "getFName",
      lName: "getLName",
      phone: "getPhone",
      email: "getEmail",
      selectedArea: "getSelectedArea",
      selectedCity: "getSelectedCity",
      storeName: "getStoreName"
    })
  },
  components: {
    PersonalInfo,
    StoreInfo,
    Confirmation,
    FinishedReg
  },
  methods: {
    personalInfoSelected() {
      this.prsonalInfoColor = "#ff3535";
      this.storeInfoColor = "#a6a8ad";
      this.confirmationColor = "#a6a8ad";
      this.selectedComponent = "PersonalInfo";
    },
    storeInfoSelected() {
      if (!this.pesonalInfoChecked) {
        this.personValidationFn();
        return;
      }
      this.storeInfoColor = "#ff3535";
      this.prsonalInfoColor = "#00cccc";
      this.confirmationColor = "#a6a8ad";
      this.selectedComponent = "StoreInfo";
    },
    confirmationSelected() {
      if (!this.pesonalInfoChecked) {
        this.personValidationFn();
        return;
      }
      if (!this.storeInfoChecked) {
        this.sotreValidationFn();
        return;
      }
      this.prsonalInfoColor = "#00cccc";
      this.storeInfoColor = "#00cccc";
      this.confirmationColor = "#ff3535";
      this.selectedComponent = "Confirmation";
    },
    next() {
      if (this.selectedComponent == "PersonalInfo") {
        this.personValidationFn() ? this.storeInfoSelected() : null;
      } else {
        this.sotreValidationFn() ? this.confirmationSelected() : null;
      }
    },
    previous() {
      if (this.selectedComponent == "PersonalInfo") {
        return;
      }
      if (this.selectedComponent == "StoreInfo") {
        this.personalInfoSelected();
      } else {
        this.storeInfoSelected();
      }
    },
    personValidationFn() {
      if (
        !validationHelper.personalInfoValidation(
          this.fName,
          this.lName,
          this.phone,
          this.email
        )
      ) {
        this.pesonalInfoChecked = false;
        return false;
      }
      this.pesonalInfoChecked = true;
      return true;
    },
    sotreValidationFn() {
      if (
        !validationHelper.storeInfoValidation(
          this.storeName,
          this.selectedCity,
          this.selectedArea
        )
      ) {
        this.storeInfoChecked = false;
        return false;
      }
      this.storeInfoChecked = true;
      return true;
    },
    finish() {
      this.$http.post("http://localhost:3030/api/signing/signup", {
        fName: this.fName,
        lName: this.lName,
        phone: this.phone,
        email: this.email,
        selectedArea: this.selectedArea,
        selectedCity: this.selectedCity,
        storeName: this.storeName
      }).then(res => {
        console.log(res);
      });
      this.selectedComponent = "FinishedReg";
    }
  }
};
</script>

<style scoped>
.navBtn {
  background-color: #fff;
  border-width: 0;
  font-size: 14px;
  font-weight: 600;
  padding-top: 3px;
  outline: none;
  box-shadow: none;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}

.control-btn,
.control-btn-finish {
  border-radius: 0;
  border-width: 0;
  color: #fff;
  padding-top: 7px;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 7px;
  font-size: 14px;
  outline: none;
  box-shadow: none;
}
.control-btn {
  background-color: #ff3535;
}
.control-btn-finish {
  background-color: #00cccc;
}
.control-btn:focus,
.control-btn:hover,
.control-btn:active {
  background-color: #ff3535;
}
.control-btn:disabled {
  background-color: #a6a8ad;
  cursor: not-allowed;
}
.control-btns {
  border-top: 1px solid #e9ecef;
  margin: auto;
  padding: 30px;
}
.previous-conrtol {
  width: 15%;
  float: left;
  display: block;
}
.next-conrtol {
  margin-left: 92%;
}
.body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}
.navs {
  border-bottom: 1px solid #e9ecef;
  padding-top: 30px;
  padding-bottom: 15px;
}
.active .li-wrapper > a {
  transition: color 0.15s ease-in-out;
  color: #ff3535;
}
.active .index {
  background-color: #ff3535;
}
.navs ul > li {
  display: inline-block;
}
li + li {
  margin-left: 20px;
}
.li-wrapper {
  display: flex;
  justify-content: center;
}
.li-wrapper a {
  padding-left: 8px;
  margin-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #a6a8ad;
}
.index {
  border-radius: 50%;
  background-color: #ced4da;
  height: 40px;
  width: 40px;
  color: #fff;
  font-size: 16px;
  line-height: 42px;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.15s ease-in-out;
}
.signup-wrapper {
  flex: 1;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
}
.signup-form {
  width: 100%;
  border: 1px solid #e9ecef;
  height: 400px;
}
.az-logo {
  max-width: 220px;
}

.az-logo span {
  color: #ff3535;
}

.az-logo:hover,
.az-logo:focus {
  color: #212229;
}
.az-signup-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: rgba(248, 249, 250, 0.2);
}

@media (min-width: 992px) {
  .az-signup-wrapper {
    justify-content: flex-end;
  }
}

.az-column-signup {
  width: 29%;
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (min-width: 992px) {
  .az-column-signup {
    border-right: 1px solid #ced4da;
  }
}

.az-signup-header h2 {
  font-weight: 600;
  color: #ff3535;
  letter-spacing: -1px;
}

.az-signup-header h4 {
  font-size: 18px;
  font-weight: 600;
  color: #212229;
  margin-bottom: 25px;
}

.az-signup-footer p {
  color: #70737c;
  margin-bottom: 0px;
}

.az-signup-footer a {
  color: #212229;
  font-weight: 700;
}

.az-signup-footer a:hover,
.az-signup-footer a:focus {
  color: #ff3535;
}
</style>

