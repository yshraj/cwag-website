import { Metadata } from "next";

import { MembershipPageContent } from "@/components/cwag/pages/membership-page";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join CWAG - Learn about membership benefits, eligibility, and how to become a member of Coaches Welfare Association Gujarat.",
};

export default function MembershipPage() {
  return <MembershipPageContent />;
}
