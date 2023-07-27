<!-- TheModal.vue -->
<template>
  <div
    class="modal fade"
    tabindex="-1"
    :class="{ 'show d-block': visible }"
    @click.self="closeModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <button type="button" class="btn-close" @click="closeModal"></button>
        <div class="agreement-img">
          <img src="../assets/images/agreement.png" class="w-auto" />
        </div>
        <div class="modal-header">
          <div class="modal-title">Accept Terms and Conditions to Continue</div>
        </div>
        <div class="modal-body">
          We noticed that you declined our terms and conditions. If you declined
          by mistake, you can accept them by clicking the button below.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn text-primary me-sm-3"
            @click="closeModal"
          >
            DECLINE
          </button>
          <button type="button" class="btn btn-primary" @click="submitModal">
            AGREE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitModal() {
      // You can handle the submit logic here
      this.closeModal();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "/src/styles/color";

.modal {
  background-color: rgba(0, 0, 0, 0.7);
  .modal-dialog {
    --bs-modal-width: 28.5625rem;

    .modal-content {
      padding: 1.125rem 1.25rem;

      .agreement-img {
        margin: 0 auto;

        img {
          max-width: 10.9375rem;
        }
      }

      .btn-close {
        --bs-btn-close-bg: url(../assets/icons/close-modal.svg);
        --bs-btn-close-opacity: 1;
        background-size: 1.5625rem;
        background-size: contain;
        margin-right: 0;
        margin-left: auto;
      }

      .modal-header {
        --bs-modal-header-border-width: 0;
        --bs-modal-header-padding: 1.25rem 0rem 0.625rem;

        .modal-title {
          color: #024059;
          font-size: 1.25rem;
          font-weight: 600;
          margin: auto;
        }
      }

      .modal-body {
        --bs-modal-padding: 0rem 1.3125rem;
        font-weight: 500;
        text-align: center;
      }

      .modal-footer {
        --bs-modal-footer-border-width: 0;
        justify-content: center;
        padding: 1.5625rem 0rem;

        .btn {
          width: 10.9375rem;
          border: 0.0625rem solid $primary;
        }
      }
    }
  }
}

@media (min-width: 36rem) {
  .modal .modal-dialog .modal-content .modal-header {
    --bs-modal-header-padding: 1.25rem 0.625rem 0.625rem;
  }
  .modal .modal-dialog .modal-content .modal-footer {
    padding: 1.5625rem 0.625rem;
  }
}
</style>
