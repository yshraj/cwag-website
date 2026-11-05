import { Metadata } from "next";

import { ContactPageContent } from "@/components/cwag/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Coaches Welfare Association Gujarat. Contact us for membership inquiries, support, or general information.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
