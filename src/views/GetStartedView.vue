<template>
  <div class="view-container">
    <h1 class="heading-title">Get Started</h1>
    <form>
      <div
        class="alert alert-danger"
        v-if="isFormInvalid"
        v-html="validationMsg"
      ></div>
      <div class="form-group mb-3">
        <label for="registrationCode" class="form-label"
          >Registration Code
          <ToolTip
            tooltipText="To access your registration code, please refer to your P&A Group Qualifying Event COBRA Notice.  The registration code is located on the top of page one."
        /></label>
        <input
          maxlength="8"
          type="text"
          v-model="user.registrationCode"
          @input="v$.user.registrationCode.$touch()"
          id="registrationCode"
          class="form-control type-number"
          :class="v$.user.registrationCode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.registrationCode.$error">
          <span
            :class="{ 'is-invalid': v$.user.registrationCode.$error }"
            v-if="v$.user.registrationCode.required"
          >
            Please enter a valid registration code
          </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="ssn" class="form-label"
          >SSN
          <ToolTip
            tooltipText="Enter your full SSN.  If your previous employer uses an alternative identifier, please refer to your Qualifying Event Notice for your alternative identifier."
        /></label>
        <input
          type="text"
          v-model="user.ssn"
          @input="v$.user.ssn.$touch()"
          v-maska
          data-maska="*##-##-####"
          id="ssn"
          class="form-control type-number"
          :class="v$.user.ssn.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.ssn.$error">
          <span
            :class="{ 'is-invalid': v$.user.ssn.$error }"
            v-if="v$.user.ssn.required"
          >
            Please enter a valid SSN
          </span>
        </div>
      </div>
      <div class="captcha-container">
        <div class="google-recaptcha">
          <vue-recaptcha
            class="w-100"
            size="normal"
            v-show="showRecaptcha"
            sitekey="6LeNMh4nAAAAAJ0pj8ld0HhkxZCLrTvdn9951Ie8"
            theme="light"
            :loading-timeout="loadingTimeout"
            @verify="recaptchaVerified"
            @expire="recaptchaExpired"
            @fail="recaptchaFailed"
            @error="recaptchaError"
            ref="vueRecaptcha"
          >
          </vue-recaptcha>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          :disabled="v$.user.$invalid || isSubmitDisabled"
          class="btn w-100"
          id="button-continue"
          type="button"
          :class="[buttonDesign()]"
          @click="userDataSubmit"
        >
          CONTINUE
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent, ref } from "vue";
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ToolTip from "@/components/common/ToolTip.vue";
import vueRecaptcha from "vue3-recaptcha2";
import validateSsn from "@/utils/validations/validateSsn";
import { vMaska } from "maska";
import AuthService from "@/services/authService";

interface UserData {
  registrationCode: string;
  ssn: string;
  gRecaptcha: string;
}

export default defineComponent({
  name: "GetStartedView",
  components: {
    ToolTip,
    vueRecaptcha,
  },
  directives: { maska: vMaska },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        registrationCode: "",
        ssn: "",
        gRecaptcha: "",
      } as UserData,
      submitted: false,
      showRecaptcha: true,
      loadingTimeout: 30000,
      isFormInvalid: false,
      validationMsg: "Invalid registration code or SSN. Please try again",
      isSubmitDisabled: false,
    };
  },
  validations() {
    return {
      user: {
        registrationCode: {
          required,
          minLength: minLength(8),
        },
        ssn: { required, validateSsn },
        gRecaptcha: { required },
      },
    };
  },
  methods: {
    buttonDesign(): string {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async userDataSubmit(): Promise<void> {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      const params = {
        registrationCode: this.user.registrationCode,
        ssn: this.user.ssn.replace(/-/g, ""),
      };
      this.isSubmitDisabled = true;
      const result = await AuthService.login(params);
      this.isSubmitDisabled = false;
      if (result === undefined) {
        this.isFormInvalid = true;
        return;
      }
      if (result.data.response) {
        this.isFormInvalid = false;
        const paramsData = {
          registrationCode: this.user.registrationCode,
          ssn: this.user.ssn.replace(/-/g, ""),
          emailAddress: result.data.response,
        };
        this.$router.push({
          path: "/otp-verification",
          query: paramsData,
        });
      } else if (result.data.error) {
        this.isFormInvalid = true;
        this.validationMsg =
          result.data.error +
          "If you believe this is incorrect, please click <a href='https://padmin.com/contact/' target='_blank'>Contact Us</a> to connect with P&A Group's Participant Support Center.";
      } else {
        this.$router.push({
          path: "/edit-email",
          query: {
            action: "register",
            registrationCode: this.user.registrationCode,
            ssn: this.user.ssn.replace(/-/g, ""),
          },
        });
      }
    },
    recaptchaVerified(response: string): void {
      if (response) {
        this.user.gRecaptcha = response;
      }
    },
    recaptchaExpired(): void {
      if (vueRecaptcha.value) {
        vueRecaptcha.value.reset();
      }
      this.user.gRecaptcha = "";
    },
    recaptchaFailed(): void {
      this.user.gRecaptcha = "";
    },
    recaptchaError(reason: any): void {
      this.user.gRecaptcha = "";
    },
  },
});
</script>
<style scoped>
.google-recaptcha {
  width: 14.375rem;
  height: 4.375rem;
  overflow: hidden;
  top: -0.0625rem;
  left: -0.0625rem;
  position: relative;
}

.captcha-container {
  -webkit-box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0 0 0.25rem 0.0625rem rgba(0, 0, 0, 0.08);
  border: 0.0625rem solid #d3d3d3;
  background: #f9f9f9;
  border-radius: 0.1875rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.captcha-container::after {
  content: "";
  width: 4.375rem;
  height: 4.375rem;
  background: url(/src/assets/images/recaptcha.png) no-repeat right 0.625rem
    center / contain;
}
</style>
