<template>
  <div class="about">
    <h3 class="heading-title">Welcome !</h3>
    <form>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          v-model="user.name"
          @input="v$.user.name.$touch()"
          id="name"
          class="form-control"
          :class="v$.user.name.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.user.name.$error" class="input-errors">
          <span
            :class="{ 'is-invalid': v$.user.name.$error }"
            v-if="v$.user.name.required"
          >
            Please enter your name
          </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="ssn" class="form-label">SSN</label>
        <input
          type="text"
          v-model="user.ssn"
          @input="v$.user.ssn.$touch()"
          id="ssn"
          disabled
          class="form-control type-number"
          :class="v$.user.ssn.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.user.ssn.$error" class="input-errors">
          <span
            :class="{ 'is-invalid': v$.user.ssn.$error }"
            v-if="v$.user.ssn.required"
          >
            Please enter a valid SSN
          </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Address" class="form-label">Address</label>
        <input
          type="text"
          v-model="user.address"
          @input="v$.user.address.$touch()"
          class="form-control"
          :class="v$.user.address.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.user.address.$error" class="input-errors">
          <span
            :class="{ 'is-invalid': v$.user.address.$error }"
            v-if="v$.user.address.required"
          >
            Please enter your address
          </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="zipcode" class="form-label">Zip Code</label>
        <input
          type="text"
          v-model="user.zip"
          @input="v$.user.zip.$touch()"
          class="form-control type-number"
          :class="v$.user.zip.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.user.zip.$error" class="input-errors">
          <span
            :class="{ 'is-invalid': v$.user.zip.$error }"
            v-if="v$.user.zip.required"
          >
            Please enter a valid zip code
          </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="dob" class="form-label">Date Of Birth</label>
        <datepicker
          v-model="user.dob"
          @input="v$.user.dob.$touch()"
          format="MM/dd/yyyy"
          :class="v$.user.dob.$error ? 'is-invalid' : 'input-text'"
          wrapper-class="d-block"
          input-class="form-control type-number"
          iconColor="#024059"
          :hideInput="false"
        ></datepicker>
      </div>
      <div class="form-group mb-3">
        <label for="gender" class="form-label">Gender</label>
        <div class="form-check-group">
          <div class="form-check-inline">
            <label class="form-check-label" for="male">
              <input
                type="checkbox"
                class="form-check-input"
                value="M"
                id="male"
                :checked="formData.gender == 'M' ? true : false"
                v-model="user.gender"
              />
              Male
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" for="female">
              <input
                type="checkbox"
                class="form-check-input"
                value="F"
                id="female"
                :checked="formData.gender == 'F' ? true : false"
                v-model="user.gender"
              />
              Female
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" for="other">
              <input
                type="checkbox"
                class="form-check-input"
                value="Other"
                id="other"
                :checked="formData.gender == 'other' ? true : false"
                v-model="user.gender"
              />
              Other
            </label>
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          :disabled="v$.user.$invalid"
          class="btn w-100"
          type="button"
          :class="[buttonDesign()]"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { required, minLength, maxLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";

export default defineComponent({
  components: {
    Datepicker,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },
  data() {
    return {
      user: {
        name: this.formData.name,
        ssn: this.formData.ssno,
        address: this.formData.address,
        zip: this.formData.zip,
        dob: new Date(this.formData.dob),
        gender: this.formData.gender,
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        name: { required },
        ssn: { required },
        address: { required },
        zip: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(6),
          numeric,
        },
        dob: { required },
        //gender: { required },
      },
    };
  },
  computed: {
    genderChecked() {
      return this.formData.gender == "M"
        ? true
        : this.formData.gender == "F"
        ? true
        : this.formData.gender == "other"
        ? true
        : false;
    },
  },
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
  },
});
</script>
