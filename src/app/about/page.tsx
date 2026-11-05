import { Metadata } from "next";

import { AboutPageContent } from "@/components/cwag/pages/about-page";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Coaches Welfare Association Gujarat (CWAG) - our mission, vision, objectives, and leadership team working for coach welfare across Gujarat.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
