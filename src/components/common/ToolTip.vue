<template>
  <div class="tooltip-icon" v-tooltip="tooltipText"></div>
</template>

<script lang="ts">
import { DirectiveBinding, defineComponent } from "vue";

export default defineComponent({
  name: "ToolTip",
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
  },
  directives: {
    tooltip: {
      mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        el.addEventListener("mouseenter", () => {
          const tooltip = document.createElement("div");
          tooltip.classList.add("tooltip");
          tooltip.textContent = binding.value as string;
          document.body.appendChild(tooltip);

          const rect = el.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          tooltip.style.top = `${
            rect.top + window.scrollY - tooltipRect.height - 5
          }px`;
          tooltip.style.left = `${rect.left + rect.width / 2 - 17}px`;
        });

        el.addEventListener("mouseleave", () => {
          const tooltip = document.querySelector(".tooltip");
          if (tooltip) {
            tooltip.remove();
          }
        });
      },
    },
  },
});
</script>

<style lang="scss">
@import "/src/styles/color";

$border-radius: 0.1563rem;

.tooltip {
  opacity: 1;
  z-index: 100;
  position: absolute;
  padding: 0.3125rem 0.625rem;
  background-color: $tooltip;
  color: $white;
  font-size: 0.75rem;
  max-width: 12.5rem;
  border-radius: $border-radius;
}
.tooltip:after {
  position: absolute;
  top: 100%;
  left: 0.625rem;
  margin: 0 auto;
  content: "";
  width: 0;
  height: 0;
  border-left: 0.375rem solid transparent;
  border-right: 0.375rem solid transparent;
  border-top: 0.375rem solid $tooltip;
}
.tooltip-icon {
  background: url(../../assets/icons/Info.svg) no-repeat center -0.3125rem;
  width: 1.5625rem;
  height: 1.5625rem;
  display: inline-block;
  vertical-align: middle;
}
.tooltip-icon:hover {
  background: url(../../assets/icons/Info_2.svg) no-repeat center -0.3125rem;
  width: 1.5625rem;
  height: 1.5625rem;
  display: inline-block;
  vertical-align: middle;
}
</style>
