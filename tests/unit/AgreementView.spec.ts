import { shallowMount } from "@vue/test-utils";
import AgreementView from "@/views/AgreementView.vue";
import "@testing-library/jest-dom";

describe("Test for AgreementView.vue page", () => {
  test("Accept button disable when uncheck the acknowledge chckbox", async () => {
    const wrapper = shallowMount(AgreementView);
    const agreement = false;
    wrapper.find("#agreementCheck").setValue(agreement);
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#accept-button");
    expect(button.attributes().disabled).toBeUndefined();
  });
  test("When click on decline button modal will open ", async () => {
    const wrapper = shallowMount(AgreementView);
    const button = wrapper.find("#decline-button");
    button.trigger("click");
    const spy = jest.spyOn(wrapper.vm, "openModal");
    wrapper.vm.openModal();
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
