import { shallowMount } from "@vue/test-utils";
import GetStartedView from "@/views/GetStartedView.vue";
import AuthService from "@/services/authService";

jest.mock("@/services/authService", () => ({
  login: jest.fn(),
}));

describe("Test for GetStartedView", () => {
  test("GetStartedView page render.", () => {
    const wrapper = shallowMount(GetStartedView);
    expect(wrapper.vm).toBeTruthy();
  });
  test("Button disable when Registration code and SSN filds are empty  .", async () => {
    const wrapper = shallowMount(GetStartedView, {
      data() {
        return {
          user: {
            registrationCode: "",
            ssn: "",
            gRecaptcha: "",
          },
        };
      },
    });
    wrapper.vm.user;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#button-continue");
    expect(button.attributes().disabled).toBeDefined();
  });
  test("Button enable when Registration code and SSN filds are not empty.", async () => {
    const wrapper = shallowMount(GetStartedView, {
      data() {
        return {
          user: {
            registrationCode: "123456",
            ssn: "256-24-4568",
            gRecaptcha: "1234",
          },
        };
      },
    });
    wrapper.vm.user;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#button-continue");
    expect(button.attributes().disabled).toBeUndefined();
  });
  it("SSN format is valid/invalid", () => {
    const rules = GetStartedView.validations().user.ssn.validateSsn;
    expect(rules("856-68-8746")).toBe(true);
    expect(rules("8565-6884-8746")).toBe(false);
  });
  test("If registration code and SSN is empty then error message should show", async () => {
    const wrapper = shallowMount(GetStartedView);
    wrapper.find("#registrationCode").setValue("");
    wrapper.find("#ssn").setValue("");
    const error = wrapper.vm.v$.user.ssn.$error;
    expect(error).toBeTruthy();
    const errorMessage = wrapper.vm.v$.user.ssn.required;
    expect(errorMessage.$message).toBe("Value is required");
  });

  it("should handle userDataSubmit function correctly", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(GetStartedView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    (AuthService.login as jest.Mock).mockResolvedValue({
      data: { response: "test@test.com" },
    });

    await wrapper.setData({
      user: {
        registrationCode: "AB123",
        ssn: "012-34-5678",
        gRecaptcha: "valid-recaptcha",
      },
    });
    const registrationCodeInput = wrapper.find("#registrationCode");
    const ssnInput = wrapper.find("#ssn");
    await registrationCodeInput.setValue("AB123");
    await ssnInput.setValue("012-34-5678");
    await wrapper.find("#button-continue").trigger("click");

    expect(AuthService.login).toHaveBeenCalledWith({
      registrationCode: "AB123",
      ssn: "012345678",
    });
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/otp-verification");
  });

  it("should handle userDataSubmit function correctly when login fails", async () => {
    const wrapper = shallowMount(GetStartedView);

    (AuthService.login as jest.Mock).mockResolvedValue({
      data: { error: "Customer not found." },
    });

    await wrapper.setData({
      user: {
        registrationCode: "AB125",
        ssn: "012-34-5678",
        gRecaptcha: "valid-recaptcha",
      },
    });
    const registrationCodeInput = wrapper.find("#registrationCode");
    const ssnInput = wrapper.find("#ssn");
    await registrationCodeInput.setValue("AB125");
    await ssnInput.setValue("012-34-5678");
    await wrapper.find("#button-continue").trigger("click");

    expect(AuthService.login).toHaveBeenCalledWith({
      registrationCode: "AB125",
      ssn: "012345678",
    });
  });
});
