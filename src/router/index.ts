import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { createApp, h } from "vue";
import GetStartedView from "../views/GetStartedView.vue";
import OtpValidationView from "../views/OtpValidationView.vue";
import EditEmailView from "../views/EditEmailView.vue";
import AgreementView from "../views/AgreementView.vue";
import Loader from "@/components/common/LoaderComponent.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "get-started",
    component: GetStartedView,
  },
  {
    path: "/otp-verification",
    name: "/otp-verification",
    component: OtpValidationView,
  },
  {
    path: "/edit-email",
    name: "edit-email",
    component: EditEmailView,
  },
  {
    path: "/agreement",
    name: "agreement",
    component: AgreementView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loaderApp = createApp({
    render: () => h(Loader),
  });

  const loaderComponent = loaderApp.mount(document.createElement("div")); // Mount the loader component to a temporary div

  document.body.appendChild(loaderComponent.$el); // Append the loader component to the DOM

  next();
});

router.afterEach(() => {
  const loaderElement = document.querySelector(".loader");
  if (loaderElement) {
    loaderElement.remove(); // Remove the loader component from the DOM
  }
});

export default router;
