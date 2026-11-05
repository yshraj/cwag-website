"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  MapPin,
  Briefcase,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  address: z.string().min(10, "Address must be at least 10 characters"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  sport: z.string().min(1, "Sport is required"),
  experience: z.string().min(1, "Experience is required"),
  qualification: z.string().min(1, "Qualification is required"),
  currentRole: z.string().optional(),
  academy: z.string().optional(),
  achievements: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const districts = [
  "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch",
  "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka",
  "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch",
  "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal",
  "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar",
  "Tapi", "Vadodara", "Valsad"
];

const sports = [
  "Athletics", "Badminton", "Basketball", "Boxing", "Cricket", "Football",
  "Gymnastics", "Hockey", "Kabaddi", "Kho-Kho", "Swimming", "Table Tennis",
  "Tennis", "Volleyball", "Wrestling", "Yoga", "Other"
];

export function RegistrationPageContent() {
  const { t, locale } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: RegistrationFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Form data would be sent to backend here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 lg:pt-32">
        <section className="py-20 lg:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className={cn(
                "text-2xl font-bold",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("registration.success.title")}
              </h1>
              <p className={cn(
                "text-muted-foreground mt-4",
                locale === "gu" && "font-[var(--font-noto-gujarati)]"
              )}>
                {t("registration.success.message")}
              </p>
              <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  <p className={cn(
                    "text-sm text-amber-800",
                    locale === "gu" && "font-[var(--font-noto-gujarati)]"
                  )}>
                    {t("registration.note")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-orange-50/20 py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("registration.title")}
            </h1>
            <p className={cn(
              "text-muted-foreground mt-4",
              locale === "gu" && "font-[var(--font-noto-gujarati)]"
            )}>
              {t("registration.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 lg:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p className={cn(
                  "text-sm text-amber-800",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  {t("registration.note")}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className={cn(
                  "mb-6 flex items-center gap-2 text-lg font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  <User className="h-5 w-5 text-primary" />
                  {t("registration.form.personalInfo")}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t("registration.form.fullName")} *</Label>
                    <Input
                      id="fullName"
                      {...register("fullName")}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("registration.form.email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("registration.form.phone")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">{t("registration.form.dateOfBirth")} *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      {...register("dateOfBirth")}
                      className={errors.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors.dateOfBirth && (
                      <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t("registration.form.gender")} *</Label>
                    <select
                      id="gender"
                      {...register("gender")}
                      className={cn(
                        "h-10 w-full rounded-md border bg-background px-3",
                        errors.gender ? "border-red-500" : ""
                      )}
                    >
                      <option value="">Select</option>
                      <option value="male">{t("registration.form.male")}</option>
                      <option value="female">{t("registration.form.female")}</option>
                      <option value="other">{t("registration.form.other")}</option>
                    </select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className={cn(
                  "mb-6 flex items-center gap-2 text-lg font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  <MapPin className="h-5 w-5 text-primary" />
                  {t("registration.form.address")}
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("registration.form.address")} *</Label>
                    <Textarea
                      id="address"
                      {...register("address")}
                      className={errors.address ? "border-red-500" : ""}
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="district">{t("registration.form.district")} *</Label>
                      <select
                        id="district"
                        {...register("district")}
                        className={cn(
                          "h-10 w-full rounded-md border bg-background px-3",
                          errors.district ? "border-red-500" : ""
                        )}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                      {errors.district && (
                        <p className="text-xs text-red-500">{errors.district.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">{t("registration.form.city")} *</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        className={errors.city ? "border-red-500" : ""}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">{t("registration.form.pincode")} *</Label>
                      <Input
                        id="pincode"
                        {...register("pincode")}
                        className={errors.pincode ? "border-red-500" : ""}
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-500">{errors.pincode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="rounded-2xl border bg-card p-6">
                <h2 className={cn(
                  "mb-6 flex items-center gap-2 text-lg font-semibold",
                  locale === "gu" && "font-[var(--font-noto-gujarati)]"
                )}>
                  <Briefcase className="h-5 w-5 text-primary" />
                  {t("registration.form.professionalInfo")}
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sport">{t("registration.form.sport")} *</Label>
                    <select
                      id="sport"
                      {...register("sport")}
                      className={cn(
                        "h-10 w-full rounded-md border bg-background px-3",
                        errors.sport ? "border-red-500" : ""
                      )}
                    >
                      <option value="">Select Sport</option>
                      {sports.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                    {errors.sport && (
                      <p className="text-xs text-red-500">{errors.sport.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">{t("registration.form.experience")} *</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      {...register("experience")}
                      className={errors.experience ? "border-red-500" : ""}
                    />
                    {errors.experience && (
                      <p className="text-xs text-red-500">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="qualification">{t("registration.form.qualification")} *</Label>
                    <Input
                      id="qualification"
                      {...register("qualification")}
                      className={errors.qualification ? "border-red-500" : ""}
                    />
                    {errors.qualification && (
                      <p className="text-xs text-red-500">{errors.qualification.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentRole">{t("registration.form.currentRole")}</Label>
                    <Input id="currentRole" {...register("currentRole")} />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="academy">{t("registration.form.academy")}</Label>
                    <Input id="academy" {...register("academy")} />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="achievements">{t("registration.form.achievements")}</Label>
                    <Textarea id="achievements" {...register("achievements")} rows={3} />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("registration.form.submitting") : t("registration.form.submit")}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
