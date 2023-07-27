<template>
  <div class="agreement-wrapper">
    <div class="agreement-header">
      <div class="agreement-title">Legal Agreement (Placeholder Content)</div>
      <div class="print-btn" @click="printAgreement">Print</div>
    </div>
    <div class="agreement-body">
      <div class="agreement-point">1.Eligibility.</div>
      <div class="agreement-content">
        The Participant is eligible to participate in the COBRA continuation
        coverage offered by the Administrator pursuant to the Consolidated
        Omnibus Budget Reconciliation Act of 1985, as amended (the “COBRA”).
      </div>
      <div class="agreement-point">2.Enrollment.</div>
      <div class="agreement-content">
        The Participant hereby enrolls in the COBRA continuation coverage
        offered by the Administrator. The effective date of the Participant’s
        coverage will be [EFFECTIVE DATE].
      </div>
      <div class="agreement-point">3.Premiums.</div>
      <div class="agreement-content">
        The Participant agrees to pay the monthly premiums for the COBRA
        continuation coverage in the amount of [AMOUNT] per month. The premiums
        will be due on the first day of each month.
      </div>
      <div class="agreement-point">4.Termination.</div>
      <div class="agreement-content">
        This Agreement will terminate on the earlier of the following dates: The
        date on which the Participant’s COBRA continuation coverage terminates
        under the COBRA. The date on which the Participant ceases to pay the
        monthly premiums.
      </div>
      <div class="agreement-point">5. Governing Law.</div>
      <div class="agreement-content">
        This Agreement will be governed by and construed in accordance with the
        laws of the State of [STATE].
      </div>
      <div class="agreement-point">6. Entire Agreement.</div>
      <div class="agreement-content">
        This Agreement constitutes the entire agreement between the parties with
        respect to the subject matter hereof and supersedes all prior or
        contemporaneous communications, representations, or agreements, whether
        oral or written.
      </div>
      <div class="agreement-point">7. Severability.</div>
      <div class="agreement-content">
        If any provision of this Agreement is held to be invalid or
        unenforceable, such provision will be struck from this Agreement and the
        remaining provisions will remain in full force and effect.
      </div>
      <div class="agreement-point">8. Waiver.</div>
      <div class="agreement-content">
        No waiver of any provision of this Agreement will be effective unless in
        writing and signed by both parties.
      </div>
      <div class="agreement-point">9. Notices.</div>
      <div class="agreement-content">
        All notices and other communications hereunder will be in writing and
        will be deemed to have been duly given when delivered in person, upon
        the first business day following deposit in the United States mail,
        postage prepaid, certified or registered, return receipt requested,
        addressed as follows:
        <br />
        <br />
        If to Participant:
        <br />
        [YOUR NAME]
        <br />
        [YOUR ADDRESS]
        <br />
        <br />
        If to Administrator:
        <br />
        [P&A]
        <br />
        [ADDRESS]
        <br />
        <br />
        or to such other address as either party may designate in writing from
        time to time.
      </div>
      <div class="agreement-point">10. Headings.</div>
      <div class="agreement-content">
        The headings in this Agreement are for convenience only and will not
        affect its interpretation.
      </div>
      <div class="agreement-point">11. Counterparts.</div>
      <div class="agreement-content">
        This Agreement may be executed in one or more counterparts, each of
        which will be deemed an original, but all of which together will
        constitute one and the same instrument.
      </div>
    </div>
    <div class="agreement-footer">
      <div class="agreement-footer-container">
        <div class="form-check agreement-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="agreement"
            id="agreementCheck"
          />
          <label class="form-check-label agreement-label" for="agreementCheck">
            I acknowledge that I have read and understand the terms and
            conditions.
          </label>
        </div>
        <div class="agreement-btns">
          <button class="btn text-primary me-3" @click="openModal">
            DECLINE
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': agreement, 'btn-secondary': !agreement }"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  </div>
  <AgreementModal :visible="showModal" @close="closeModal" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

import AgreementModal from "../components/AgreementModal.vue";
export default defineComponent({
  components: { AgreementModal },
  data() {
    return {
      agreement: false,
      showModal: false,
    };
  },
  methods: {
    printAgreement() {
      window.print();
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitModal() {
      // You can handle the submit logic here
      this.closeModal();
    },
  },
});
</script>
<style scoped lang="scss">
@import "/src/styles/color";

.agreement-wrapper {
  padding-bottom: 4.4375rem;

  .agreement-header {
    background: transparent
      linear-gradient(281deg, $primary 0%, #0091bf 52%, $primary-blue 100%) 0%
      0% no-repeat padding-box;
    padding: 1.375rem 2.5rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .agreement-title {
      font-size: 1.875rem;
      color: $white;
      font-weight: 700;
      text-align: center;
    }
    .print-btn {
      color: $white;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 1.125rem;
      align-self: center;
      background: url(../assets/icons/print.svg) no-repeat left -0.0625rem;
      padding-left: 2rem;
      cursor: pointer;
    }
  }
  .agreement-body {
    max-width: 68.75rem;
    margin: 0 auto;
    padding: 1.25rem;

    .agreement-point {
      font-family: Roboto;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.0088rem;
      margin-bottom: 0.4375rem;
      color: $checkbox-default;
    }

    .agreement-content {
      color: $checkbox-default;
      font-weight: 500;
      font-size: 1rem;
      line-height: 2.1875rem;
      margin-bottom: 0.625rem;
    }
  }
  .agreement-footer {
    box-shadow: 0rem -0.125rem 0.375rem #00000029;
    position: fixed;
    bottom: 0;
    background: $white;
    width: 100%;

    .agreement-footer-container {
      display: flex;
      justify-content: space-between;
      max-width: 68.75rem;
      margin: auto;
      padding: 0.9375rem;
      flex-direction: column;

      .form-check.agreement-check {
        align-self: center;
        margin-bottom: 0.625rem;

        #agreementCheck {
          --bs-border-color: #b5b5b5;
          --bs-border-width: 0.125rem;
        }
        .form-check-input:checked {
          background-color: $checkbox-selected;
          border-color: $checkbox-selected;
        }

        label.agreement-label {
          font-weight: 600;
          color: $the-default;
        }
      }

      .agreement-btns {
        text-align: center;

        .btn {
          width: 10.9375rem;
        }

        .btn:not(.btn-secondary) {
          border: 0.0625rem solid $primary;
        }
      }
    }
  }
}

@media (min-width: 48rem) {
  .agreement-wrapper {
    .agreement-header {
      flex-direction: row;

      .agreement-title {
        text-align: left;
      }
    }

    .agreement-body {
      padding: 1.25rem 2.5rem;
    }
  }
}

@media (min-width: 62rem) {
  .agreement-wrapper {
    .agreement-body {
      padding: 1.25rem 0.625rem;
    }
    .agreement-footer .agreement-footer-container {
      flex-direction: row;

      .form-check.agreement-check {
        margin-bottom: 0;
      }
    }
  }
}

@media print {
  .agreement-footer {
    display: none;
  }
}
</style>
