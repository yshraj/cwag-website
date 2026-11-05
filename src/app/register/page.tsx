import { Metadata } from "next";

import { RegistrationPageContent } from "@/components/cwag/pages/registration-page";

export const metadata: Metadata = {
  title: "Coach Registration",
  description: "Register as a coach with CWAG. Join Gujarat's largest network of sports coaches and access welfare benefits, training programs, and more.",
};

export default function RegistrationPage() {
  return <RegistrationPageContent />;
}
