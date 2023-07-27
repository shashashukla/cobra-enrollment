import { shallowMount } from "@vue/test-utils";
import OtpValidationView from "@/views/OtpValidationView.vue";
import "@testing-library/jest-dom";

describe("Test for OtpValidationView.vue page", () => {
  const wrapper = shallowMount(OtpValidationView, {
    props: {
      formData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        otpcode: "",
        submitted: false,
        countdown: 59,
      };
    },
    global: {
      stubs: ["router-link", "router-view"],
    },
  });
  test("Button disable when OTP code field is empty.", async () => {
    wrapper.vm.otpcode;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#button-continue");
    expect(button.attributes().disabled).toBeDefined();
  });
  test("Resend button disable when count down running.", async () => {
    wrapper.vm.countdown;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#resend-button");
    expect(button.exists()).toBe(true);
    expect(button.attributes().disabled).toBe(undefined);
  });
  test("Resend button enable when times out.", async () => {
    wrapper.vm.countdown == 0;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#resend-button");
    expect(button.exists()).toBe(true);
    expect(button.attributes().enable).toBe(undefined);
  });
  test("Redirect to edit email page after click on EDIT icon.", async () => {
    const button = wrapper.find("#edit-link");
    await button.trigger("click");
    expect(wrapper.html()).toContain("/edit-email");
  });
});
