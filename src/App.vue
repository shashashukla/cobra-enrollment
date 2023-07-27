<template>
  <DashboardLayout v-if="false" />
  <DefaultLayout />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "./components/layouts/DefaultLayout.vue";
import DashboardLayout from "./components/layouts/DashboardLayout.vue";
export default defineComponent({
  components: {
    DefaultLayout,
    DashboardLayout,
  },
});
</script>
<style lang="scss">
@import "./styles/App.scss";
</style>
