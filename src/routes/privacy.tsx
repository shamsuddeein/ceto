import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "./terms";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Cetoh" },
      { name: "description", content: "How Cetoh collects, uses and protects your personal data." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      updated="June 1, 2026"
      sections={[
        [
          "1. Information We Collect",
          "We collect information you provide when you create an account, list a product, or make a purchase - including name, email, payout details and transaction data.",
        ],
        [
          "2. How We Use Information",
          "We use your data to operate the platform, process payments, communicate with you, prevent fraud, and improve our services.",
        ],
        [
          "3. Sharing",
          "We share data with payment processors and service providers strictly to deliver the service. We do not sell your personal information.",
        ],
        [
          "4. Cookies",
          "We use cookies and similar technologies for authentication, analytics and remembering preferences. You can control cookies via your browser settings.",
        ],
        [
          "5. Data Security",
          "We use industry-standard encryption and security controls to protect your information, both in transit and at rest.",
        ],
        [
          "6. Your Rights",
          "You may request access, correction, deletion or export of your personal data by emailing privacy@cetoh.com.",
        ],
        [
          "7. Data Retention",
          "We retain your data for as long as your account is active or as needed to comply with legal obligations and resolve disputes.",
        ],
        [
          "8. Data Hosting",
          "Cetoh stores your data securely; your data may be processed in jurisdictions outside Nigeria with equivalent safeguards in place.",
        ],
        [
          "9. Children",
          "Cetoh is not intended for users under 18. We do not knowingly collect data from minors.",
        ],
        [
          "10. Changes",
          "We may update this policy. Material changes will be communicated via email or in-app notice.",
        ],
      ]}
    />
  ),
});
