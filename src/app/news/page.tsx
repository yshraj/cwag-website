import { Metadata } from "next";

import { NewsPageContent } from "@/components/cwag/pages/news-page";

export const metadata: Metadata = {
  title: "News & Announcements",
  description: "Stay updated with the latest news and announcements from Coaches Welfare Association Gujarat.",
};

export default function NewsPage() {
  return <NewsPageContent />;
}
