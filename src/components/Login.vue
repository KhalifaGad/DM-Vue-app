<template>
  <div class="az-signin-wrapper mg-30">
    <div class="az-card-signin">
      <img class="az-logo" src="../assets/img/logo.png" alt="drug market">
      <div class="az-signin-header">
        <h2>Welcome back!</h2>
        <h4>Please sign in to continue</h4>
        <p
          class="pd-t-10 pd-l-5 invalid-info"
          v-show="invalid"
        >Invalid email or password check the caps lock!</p>
        <form>
          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="email" class="form-control" placeholder="Enter your email">
          </div>
          <!-- form-group -->
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Enter your password"
            >
          </div>
          <!-- form-group -->
          <button class="btn btn-az-primary btn-block" @click.prevent="login">Sign In</button>
        </form>
      </div>
      <!-- az-signin-header -->
      <div class="az-signin-footer">
        <p>
          <a href>Forgot password?</a>
        </p>
        <p>
          Don't have an account?
          <router-link to="/signup">Request Account</router-link>
        </p>
      </div>
      <!-- az-signin-footer -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      invalid: false
    };
  },
  computed: {
    login() {
      if (this.email == "kkhalifa.gad@gmail.com" && this.password == "abc") {
        this.invalid = false;
        this.$router.push({ name: "Home" });
      } else {
        this.invalid = true;
      }
    }
  }
};
</script>

<style scoped>
.invalid-info {
  color: #ff3535;
  font-size: 12px;
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
.az-signin-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.az-card-signin {
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #ced4da;
  width: 360px;
  padding: 30px 35px;
}
.az-signin-header h2 {
  font-weight: 500;
  color: #ff3535;
  letter-spacing: -1px;
}

.az-signin-header h4 {
  font-weight: 400;
  color: #212229;
  margin-bottom: 15px;
}

.az-signin-header label {
  color: #70737c;
}

.az-signin-header .form-control {
  color: #212229;
  font-weight: 500;
  border-width: 2px;
  border-radius: 0%;
  border-color: #dee2e6;
}

.az-signin-header .form-control:focus {
  border-color: #ced4da;
  box-shadow: none;
}

.az-signin-header .form-control::placeholder {
  font-weight: 400;
  color: #969dab;
}

.az-signin-header .btn,
.az-signin-header .sp-container button,
.sp-container .az-signin-header button {
  margin-top: 25px;
}
.az-signin-footer p {
  color: #70737c;
}

.az-signin-footer p:first-child {
  margin-bottom: 5px;
}

.az-signin-footer p:last-child {
  margin-bottom: 0;
}

.az-signin-footer a {
  color: #212229;
  font-weight: 700;
}

.az-signin-footer a:hover,
.az-signin-footer a:focus {
  color: #ff3535;
}
</style>
