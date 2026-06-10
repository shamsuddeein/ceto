import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Service | Cetoh" },
    { name: "description", content: "The terms and conditions governing your use of Cetoh." },
  ] }),
  component: () => <LegalPage title="Terms of Service" updated="June 1, 2026" sections={termsSections} />,
});

const termsSections: [string, string][] = [
  ["1. Acceptance of Terms", "By accessing or using Cetoh, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the platform."],
  ["2. Eligibility", "You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account and transact on Cetoh."],
  ["3. Accounts", "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account."],
  ["4. Creator Responsibilities", "As a creator, you warrant that you own or have the rights to the digital products you list, and that they do not infringe any third-party rights."],
  ["5. Fees & Payouts", "Cetoh charges a transparent service fee on each sale. Payouts are processed to your verified payout method within 1–3 business days after clearance."],
  ["6. Prohibited Content", "You may not list illegal content, malware, adult content, hate speech, or anything that violates intellectual property rights."],
  ["7. Termination", "We may suspend or terminate accounts that violate these terms, with or without notice."],
  ["8. Limitation of Liability", "Cetoh is provided on an \"as-is\" basis. To the maximum extent permitted by law, we are not liable for indirect or consequential damages."],
  ["9. Changes to Terms", "We may update these terms from time to time. Continued use of the platform constitutes acceptance of the revised terms."],
  ["10. Contact", "Questions about these terms? Reach us at legal@cetoh.com."],
];

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: readonly (readonly [string, string])[] }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <article className="container-page max-w-3xl py-12 md:py-16">
        <h1 className="font-display text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-2 text-sm text-foreground/60">Last updated: {updated}</p>
        <div className="mt-10 space-y-8">
          {sections.map(([h, body]) => (
            <section key={h}>
              <h2 className="font-display text-xl font-semibold text-primary">{h}</h2>
              <p className="mt-2 leading-relaxed text-foreground/80">{body}</p>
            </section>
          ))}
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
