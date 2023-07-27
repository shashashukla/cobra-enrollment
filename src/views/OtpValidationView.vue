<template>
  <div>
    <h3 class="heading-title">Enter Verification Code</h3>
    <p class="v-code-text">We have sent a verification code to</p>
    <p class="email-text">
      {{ userEmail() }}
      <router-link
        class="edit-email edit-pencil"
        :to="`/edit-email?ssn=${userSsn}&registrationCode=${userRegistration}`"
      >
        EDIT
      </router-link>
    </p>
    <form>
      <div
        class="alert alert-danger"
        v-if="isFormInvalid"
        v-html="validationMsg"
      ></div>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Code</label>
        <input
          type="text"
          class="form-control type-number"
          id="name"
          v-model="otpcode"
          @input="v$.otpcode.$touch()"
          :class="v$.otpcode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.otpcode.$error">
          <span
            :class="{ 'is-invalid': v$.otpcode.$error }"
            v-if="v$.otpcode.required"
          >
            Enter correct verification code
          </span>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.otpcode.$invalid || isSubmitDisabled"
          class="btn w-100"
          :class="[buttonDesign()]"
          @click="otpVerification"
        >
          VERIFY
        </button>
      </div>
    </form>
    <div class="mt-2">
      <div
        class="float-left resend-code"
        :class="[resendTextEnable]"
        @click="reverseCountdown()"
      >
        RESEND CODE
      </div>
      <div class="timing-color float-right">{{ formatedCountdown }}</div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import moment from "moment";
import AuthService from "@/services/authService";
interface iUserData {
  registrationCode: string;
  ssn: string;
  emailAddress: string;
}

export default defineComponent({
  name: "OtpValidationView",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        registrationCode: "",
        ssn: "",
        emailAddress: "",
      } as iUserData,
      verificationTxt: "",
      isFormInvalid: false,
      otpcode: "",
      submitted: false,
      countdown: 59,
      validationMsg:
        "You entered an incorrect code, Please try again or click RESEND CODE to click a new code.",
      isSubmitDisabled: false,
    };
  },
  validations() {
    return {
      otpcode: {
        required,
        numeric,
        maxLength: maxLength(6),
        minLength: minLength(6),
      },
    };
  },
  mounted() {
    this.timerCountdowm();
  },
  computed: {
    formatedCountdown(): string {
      return moment(this.countdown, "seconds").format("m:ss");
    },
    resendTextEnable(): string {
      return this.countdown ? "disabled" : "";
    },
  },
  methods: {
    timerCountdowm(): void {
      const stopCountdown = setInterval(() => {
        this.countdown -= 1;
        if (!this.countdown) clearInterval(stopCountdown);
      }, 1000);
    },
    reverseCountdown(): void {
      this.countdown = 59;
      const stopCountdown = setInterval(() => {
        this.countdown -= 1;
        if (!this.countdown) clearInterval(stopCountdown);
      }, 1000);
    },
    buttonDesign(): string {
      const buttonStatus = this.v$.otpcode.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    userEmail(): any {
      return this.$route.query.emailAddress;
    },
    userRegistration(): any {
      return this.$route.query.registrationCode;
    },
    userSsn(): any {
      return this.$route.query.ssn;
    },
    async otpVerification(): Promise<void> {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.isSubmitDisabled = true;
      const params = {
        registrationCode: this.userRegistration(),
        ssn: this.userSsn(),
        emailAddress: this.userEmail(),
      };
      this.isSubmitDisabled = false;
      const result = await AuthService.emailVerification(params);
      if (result === undefined) {
        this.isFormInvalid = true;
        return;
      }
      if (result.data.response) {
        this.isFormInvalid = false;
      } else if (result.data.error) {
        this.isFormInvalid = true;
        this.validationMsg =
          result.data.error +
          "If you believe this is incorrect, please click <a href='https://padmin.com/contact/' target='_blank'>Contact Us</a> to connect with P&A Group's Participant Support Center.";
      } else {
        this.isFormInvalid = true;
        this.$router.push({
          path: "/agreement",
          query: params,
        });
      }
    },
    async editEmailForm(): Promise<void> {
      this.$emit("editEmailId");
    },
  },
});
</script>
