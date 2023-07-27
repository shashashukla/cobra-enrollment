<template>
  <div v-if="$route.name === 'agreement'" class="agreement-layout">
    <router-view />
  </div>
  <div v-else class="default-layout">
    <DefaultHeaderComponent />
    <div class="container-fluid login-page">
      <div class="row">
        <div class="col-md-6 position-md-static position-relative">
          <div class="benefit-img">
            <div class="background-gradient"></div>
            <img src="../../assets/images/welcome-image.png" alt="Benefits" />
            <div class="benefits-section p-3 p-md-0">
              <h1 class="benefit-title text-white mb-3">
                Welcome to P&A Group’s COBRA Enrollment Portal
              </h1>
              <p class="text-white">
                Here you can view your benefit options and enroll in available
                coverage for you and your family. Log in now to select your
                COBRA election(s) and make your initial payment(s).
              </p>
            </div>
            <div class="black-gradient"></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="login-section p-3 p-md-0">
            <div class="login-form">
              <slot></slot>
              <router-view />
            </div>
            <div class="footer-row">
              <div class="footer-links">
                <ul>
                  <li>
                    <a href="https://padmin.com/contact/" target="_blank"
                      >Contact Us</a
                    >
                  </li>
                  <li>
                    <a
                      href="https://padmin.com/about-us/privacy-policy/"
                      target="_blank"
                      >Privacy Statement</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DefaultHeaderComponent from "../common/DefaultHeaderComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    DefaultHeaderComponent,
  },
});
</script>
