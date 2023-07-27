import { shallowMount } from "@vue/test-utils";
import EditEmailView from "@/views/EditEmailView.vue";
import AuthService from "@/services/authService";
jest.mock("@/services/authService", () => ({
  emailVerification: jest.fn(),
}));

describe("Test for EditEmailView.vue page", () => {
  test("Button disable when email field is empty.", async () => {
    const wrapper = shallowMount(EditEmailView);
    wrapper.find("#email").setValue(wrapper.vm.user.emailAddress);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.user.emailAddress).toBe(wrapper.vm.user.emailAddress);
    expect(wrapper.find("#send-button").attributes().disabled).toBeDefined();
  });
  test("Button enable when email field is not empty.", async () => {
    const wrapper = shallowMount(EditEmailView, {
      data() {
        return {
          user: {
            registrationCode: "EBY1234",
            ssn: "012345678",
            emailAddress: "test@test.com",
          },
          verificationTxt: "test",
          isFormInvalid: false,
          isSubmitDisabled: false,
        };
      },
    });
    wrapper.vm.user.emailAddress;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#send-button");
    expect(button.attributes().disabled).toBeUndefined();
  });
  it("should handle verifyEmail function correctly", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(EditEmailView, {
      data() {
        return {
          user: {
            registrationCode: "EBY1234",
            ssn: "012345678",
            emailAddress: "test@test.com",
          },
          verificationTxt: "test",
          isFormInvalid: false,
          isSubmitDisabled: false,
        };
      },
      global: {
        mocks: {
          $router: mockRouter,
          $route: { query: { action: "" } },
        },
      },
    });

    (AuthService.emailVerification as jest.Mock).mockResolvedValue({
      data: { response: null },
    });
    await wrapper.setData({
      user: {
        registrationCode: "EBY12345",
        ssn: "012345679",
        emailAddress: "test@test.com",
      },
    });
    const registrationCodeInput = wrapper.vm.userRegistration();
    const ssnInput = wrapper.vm.userSsn();
    const emailAddressInput = wrapper.find("#email");
    await registrationCodeInput.setValue("EBY12345");
    await ssnInput.setValue("012345679");
    await emailAddressInput.setValue("test@test.com");
    await wrapper.find("#button-verifyemail").trigger("click");
    expect(AuthService.emailVerification).toHaveBeenCalledWith({
      registrationCode: "EBY12345",
      ssn: "012345679",
      emailAddress: "test@test.com",
    });
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/otp-verification");
  });
});
