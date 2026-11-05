import { Metadata } from "next";

import { DirectoryPageContent } from "@/components/cwag/pages/directory-page";

export const metadata: Metadata = {
  title: "Coach Directory",
  description: "Find registered sports coaches across Gujarat. Search by name, sport, or district in the CWAG coach directory.",
};

export default function DirectoryPage() {
  return <DirectoryPageContent />;
}
