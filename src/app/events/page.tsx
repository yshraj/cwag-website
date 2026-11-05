import { Metadata } from "next";

import { EventsPageContent } from "@/components/cwag/pages/events-page";

export const metadata: Metadata = {
  title: "Events & Programs",
  description: "Discover upcoming workshops, seminars, and events organized by Coaches Welfare Association Gujarat.",
};

export default function EventsPage() {
  return <EventsPageContent />;
}
