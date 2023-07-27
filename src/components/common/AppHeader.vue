<template>
  <div class="header">
    <div class="logo">
      <img src="../../assets/images/logo.png" />
    </div>
    <div class="menu-list">
      <div
        :key="'menu-' + item.icon"
        class="menu-item"
        v-for="item of menuItems"
      >
        <div class="menu-icon">
          <img :src="require('@/assets/icons/' + item.icon + '.svg')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  data() {
    return {
      menuItems: [
        {
          link: "/profile",
          title: "Profile",
          icon: "profile",
        },
        {
          link: "/dependents",
          title: "Dependents",
          icon: "dependents",
        },
        {
          link: "/benefits",
          title: "Benefits",
          icon: "benefits",
        },
        {
          link: "/payments",
          title: "Payments",
          icon: "payment",
        },
        {
          link: "/documents",
          title: "Documents",
          icon: "document",
        },
        {
          link: "/confirmation",
          title: "Confirmation",
          icon: "confirmation",
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped></style>
