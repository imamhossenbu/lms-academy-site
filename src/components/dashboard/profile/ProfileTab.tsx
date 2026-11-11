import React from "react";
import type { LearnerProfile } from "@/types/academy";
import { TabHeading } from "../TabHeading";
import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";
import { AvatarUploader } from "./AvatarUploader";

export function ProfileTab({ profile }: { profile: LearnerProfile }) {
  return (
    <>
      <TabHeading title="Profile & security" text={`Member since ${new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}.`} />
      <div className="space-y-6">
        <AvatarUploader name={profile.name} avatar={profile.avatar} />
        <ProfileForm profile={profile} />
        <PasswordForm />
      </div>
    </>
  );
}

export default ProfileTab;
