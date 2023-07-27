<template>
  <div class="container-fluid">
    <AppHeader />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "../common/AppHeader.vue";

export default defineComponent({
  name: "DashboardLayout",
  components: { AppHeader },
});
</script>
<style>
.header {
  background: blue;
}
</style>
