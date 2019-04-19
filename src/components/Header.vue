<template>
  <nav class="navbar navbar-expand-lg">
    <router-link class="navbar-brand" to="/">
      <img src="../assets/img/logo.png" alt="Drug Market" width="226">
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <ul class="navbar-nav main-nav mr-auto">
      <router-link tag="li" active-class="active" to="/" class="nav-item" exact>
        <a class="nav-link">
          <i class="fa fa-home"></i> Home
        </a>
      </router-link>
      <li class="nav-item dropdown">
        <a
          class="nav-link with-sub"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-user"></i> Profile
          <IosArrowDownIcon w="10px" class="custom-icon"/>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/profile-page" active-class="active" class="dropdown-item">Profile Page</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/edit-profile" active-class="active" class="dropdown-item">Edit Profile</router-link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link with-sub"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-cog"></i> Drugs Mangement
          <IosArrowDownIcon w="10px" class="custom-icon"/>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/drugs-list" active-class="active" class="dropdown-item">Drug List</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/upload-new" active-class="active" class="dropdown-item">Upload New</router-link>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link with-sub"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-cube"></i> Orders
          <IosArrowDownIcon w="10px" class="custom-icon"/>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link to="/orders-list" active-class="active" class="dropdown-item">Order List</router-link>
          <div class="dropdown-divider"></div>
          <router-link
            to="/pending-orders"
            active-class="active"
            class="dropdown-item"
          >Pending Orders</router-link>
          <div class="dropdown-divider"></div>
          <router-link to="/active-orders" active-class="active" class="dropdown-item">Active Orders</router-link>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown new">
        <a
          class="nav-link with-sub-notification"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-bell"></i>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right notification-menu"
          aria-labelledby="navbarDropdown"
        >
          <h6 class="notification-title">Notifications</h6>
          <p class="notification-text">You have 1 unread notification</p>
          <div class="az-notification-list">
            <!-- media -->
            <div class="media new">
              <div class="media-body">
                <p>
                  New Order
                  <strong>#48596</strong> Has been placed
                </p>
                <span>Mar 13 04:16am</span>
              </div>
              <!-- media-body -->
            </div>
            <!-- media -->
            <div class="media">
              <div class="media-body">
                <p>
                  Your product
                  <strong>Gum Touth Brush</strong> has been uploded
                </p>
                <span>Mar 13 02:56am</span>
              </div>
              <!-- media-body -->
            </div>
            <!-- media -->
            <div class="media">
              <div class="media-body">
                <p>
                  Hello
                  <strong>Stroriiii</strong>your account has been confirmed
                </p>
                <span>Mar 12 10:40pm</span>
              </div>
              <!-- media-body -->
            </div>
            <!-- media -->
          </div>
        </div>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link with-sub-profile profile-icon"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <div class="img-user">
            <img class="img-user" src="../assets/img/profile.jpg" alt="user img">
          </div>
        </a>
        <div
          class="dropdown-menu dropdown-menu-right profile-menu"
          aria-labelledby="navbarDropdown"
        >
          <div class="header-profile">
            <div class="img-user">
              <img src="../assets/img/profile.jpg" alt>
            </div>
            <h6>Storeii</h6>
          </div>
          <a href class="dropdown-item">
            <i class="fa fa-user"></i> My Profile
          </a>
          <div class="dropdown-divider"/>
          <a href class="dropdown-item">
            <i class="fa fa-edit"></i> Edit Profile
          </a>
          <div class="dropdown-divider"/>
          <a href="#" class="dropdown-item">
            <i class="fa fa-sign-out"></i> Sign Out
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>
<script>
import IosArrowDownIcon from "vue-ionicons/dist/ios-arrow-down.vue";

export default {
  components: {
    IosArrowDownIcon
  }
};
</script>

<style scoped>
.navbar {
  height: 85px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 74px;
  padding-right: 74px;
  z-index: 100;
}

.navbar-nav > .nav-item {
  font-weight: 700;
  font-size: 1.1em;
  margin-left: 15px;
  padding-left: 15px;
}
.nav-item .nav-link {
  color: #494c57;
}
.navbar .nav-item.active .nav-link {
  color: #ff3535;
}

.navbar .dropdown-menu > .active,
.navbar .dropdown-menu > a:focus {
  color: #ff3535;
  background-color: transparent;
  z-index: 3;
}
.navbar .dropdown-menu > a:hover {
  z-index: 3;
}
.navbar .nav-item.show .nav-link::before {
  display: block;
}
.navbar .nav-link.with-sub::before {
  content: "";
  position: absolute;
  top: 42px;
  left: 50%;
  margin-left: -7px;
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: #dee2e6;
  border-left-color: #dee2e6;
  transform: rotate(45deg);
  background-color: #fff;
  z-index: 2;
  display: none;
}
.navbar .nav-link.with-sub-notification::before {
  content: "";
  position: absolute;
  top: 59px;
  left: 50%;
  margin-left: 12px;
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: #dee2e6;
  border-left-color: #dee2e6;
  transform: rotate(45deg);
  background-color: #fff;
  z-index: 2;
  display: none;
}
.navbar .nav-link.with-sub-profile::before {
  content: "";
  position: absolute;
  top: 59px;
  left: 50%;
  margin-left: 2px;
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top-color: #dee2e6;
  border-left-color: #dee2e6;
  transform: rotate(45deg);
  background-color: #fff;
  z-index: 2;
  display: none;
}
.dropdown-menu {
  position: absolute;
  border: 2px solid #dee2e6;
  z-index: 1;
  border-radius: 0;
  top: 45px;
}
.notification-menu {
  width: 320px;
  top: 62px;
  right: -28px;
  padding: 15px 20px;
}
.profile-menu {
  width: 220px;
  top: 62px;
  right: 1px;
  padding: 15px 20px;
}
.dropdown-item {
  font-size: 0.8em;
}
.fa-bell {
  position: absolute;
  top: 15px;
  font-size: 1.7em;
  color: #494c57;
}
.custom-icon {
  position: absolute;
  top: 13px;
  right: -6px;
  color: #92939b;
}
.profile-icon > .img-user {
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.header-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.header-profile h6 {
  font-size: 18px;
  font-weight: 700;
  color: #212229;
  margin-bottom: 0;
}
.header-profile .img-user {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
}
.img-user {
  display: block;
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 100%;
}

.img-user img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}
.main-nav > .nav-item + .nav-item::after {
  content: "";
  position: absolute;
  height: 18px;
  left: 0;
  border-left: 1px solid #ced4da;
  bottom: 10px;
}
.dropdown-divider {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
i {
  font-size: 1.3em;
}
.notification-title {
  font-size: 18px;
  font-weight: 700;
  color: #212229;
  margin-bottom: 5px;
  line-height: 1;
}
.notification-text {
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 15px;
}
.az-notification-list .media {
  padding: 10px 0;
  position: relative;
}

.az-notification-list .media + .media {
  border-top: 1px dotted #ced4da;
}

.az-notification-list .media:hover,
.az-notification-list .media:focus {
  cursor: pointer;

  z-index: 3;
}

.az-notification-list .media:hover::before,
.az-notification-list .media:focus::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -20px;
  bottom: -1px;
  right: -20px;
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  z-index: -1;
}

.az-notification-list .media-body {
  margin-left: 15px;
  font-size: 13px;
}

.az-notification-list .media-body p {
  margin-bottom: 5px;
  line-height: 1.3;
  font-weight: 400;
}

.az-notification-list .media-body strong {
  font-weight: 500;
}

.az-notification-list .media-body span {
  display: block;
  font-size: 11px;
  color: #969dab;
}
.media.new p {
  color: #212229;
  font-weight: bold;
}

li.new::after {
  content: "";
  position: absolute;
  top: 12px;
  right: -14px;
  width: 7px;
  height: 7px;
  background-color: #dc3545;
  border-radius: 100%;
}
</style>

