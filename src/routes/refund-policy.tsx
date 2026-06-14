import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./terms";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | Cetoh" },
      { name: "description", content: "Cetoh's refund and dispute resolution policy." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Refund Policy"
      updated="June 1, 2026"
      sections={[
        [
          "1. Overview",
          "Because digital products are delivered instantly and cannot be returned, refunds are handled case-by-case to protect both buyers and creators.",
        ],
        [
          "2. Eligibility for Refunds",
          "You may request a refund within 14 days of purchase if the product is materially different from its description, broken, or not delivered.",
        ],
        [
          "3. Non-Refundable Cases",
          "Refunds are not granted for change of mind, completed services, or content that has already been substantially consumed (e.g. course fully completed).",
        ],
        [
          "4. How to Request a Refund",
          "Email support@cetoh.com with your order ID and reason. We aim to respond within 2 business days.",
        ],
        [
          "5. Creator Responsibilities",
          "Creators must respond to disputes within 5 business days. Unresolved disputes may be decided by Cetoh in good faith.",
        ],
        [
          "6. Processing Time",
          "Approved refunds are returned to the original payment method within 5–10 business days.",
        ],
        [
          "7. Chargebacks",
          "Initiating a chargeback without first contacting support may result in account suspension while we investigate.",
        ],
        [
          "8. Subscriptions",
          "You may cancel a subscription at any time; you'll retain access until the end of the current billing period.",
        ],
        ["9. Contact", "Questions? Reach our support team at support@cetoh.com."],
      ]}
    />
  ),
});
