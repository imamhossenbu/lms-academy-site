"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Globe, Mail, Phone, Save, User } from "lucide-react";
import type { LearnerProfile } from "@/types/academy";
import { InputField } from "@/components/ui/InputField";
import { SubmitButton } from "@/components/ui/SubmitButton";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  phone: z.string().trim().regex(/^$|^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  country: z.string().trim().max(60, "Too long"),
  bio: z.string().trim().max(500, "Keep your bio under 500 characters"),
});
type Values = z.infer<typeof schema>;

/** Name, phone, country and a short bio (email is the sign-in and can't change here). */
export function ProfileForm({ profile }: { profile: LearnerProfile }) {
  const router = useRouter();
  const { register, handleSubmit, formState, reset, control } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: profile.name, phone: profile.phone ?? "", country: profile.country ?? "", bio: profile.bio ?? "" },
  });
  const bio = useWatch({ control, name: "bio" }) ?? "";
  const e = formState.errors;

  const onSubmit = async (v: Values) => {
    const id = toast.loading("Saving your profile…");
    const res = await fetch("/api/me/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) }).catch(() => null);
    const data = (await res?.json().catch(() => ({}))) as LearnerProfile & { message?: string };
    if (!res?.ok) return toast.error("Couldn't save your profile", { id, description: data?.message || "Please try again." });
    toast.success("Profile saved", { id, description: "Your details are up to date." });
    reset({ name: data.name, phone: data.phone ?? "", country: data.country ?? "", bio: data.bio ?? "" });
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-3xl border border-night-line bg-night-surface p-6">
      <div>
        <h2 className="heading-h4 font-bold text-white">Personal details</h2>
        <p className="body-sm-regular text-night-muted">How you appear to instructors and on certificates.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <InputField id="profile-name" label="Full name" autoComplete="name" leftElement={<User className="h-4 w-4" />} error={e.name?.message} {...register("name")} />
        <InputField id="profile-email" label="Email" value={profile.email} readOnly disabled leftElement={<Mail className="h-4 w-4" />} className="opacity-70" />
        <InputField id="profile-phone" label="Phone" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" leftElement={<Phone className="h-4 w-4" />} error={e.phone?.message} {...register("phone")} />
        <InputField id="profile-country" label="Country" autoComplete="country-name" placeholder="Bangladesh" leftElement={<Globe className="h-4 w-4" />} error={e.country?.message} {...register("country")} />
      </div>
      <div>
        <label htmlFor="profile-bio" className="mb-1.5 block body-sm-medium text-night-soft">
          About you
        </label>
        <textarea id="profile-bio" rows={4} placeholder="A sentence or two about your goals." {...register("bio")} className={`w-full rounded-xl border bg-night-surface px-4 py-3 body-regular text-white outline-none placeholder:text-night-muted focus:border-accent focus:ring-4 focus:ring-accent-10 ${e.bio ? "border-red" : "border-night-line"}`} />
        <div className="mt-1 flex justify-between body-xsm-regular">
          <span className="text-red">{e.bio?.message}</span>
          <span className="text-night-muted">{bio.length}/500</span>
        </div>
      </div>
      <SubmitButton size="md" loading={formState.isSubmitting} loadingText="Saving…" disabled={!formState.isDirty} icon={<Save className="h-4 w-4" />} className="sm:w-auto">
        Save changes
      </SubmitButton>
    </form>
  );
}

export default ProfileForm;
