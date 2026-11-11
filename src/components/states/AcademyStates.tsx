import React from "react";
import { CloudOff, PauseCircle, SearchX } from "lucide-react";
import { PLATFORM_URL } from "@/lib/config";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StateScreen } from "./StateScreen";

/** No academy at this address (unknown subdomain / custom domain). */
export function NoAcademy() {
  return (
    <StateScreen icon={<SearchX className="h-8 w-8" />} eyebrow="Academy not found" title="There's no academy here yet" text="Check the address and try again. If you run this academy, make sure the domain is connected in your admin panel.">
      <ButtonLink href={PLATFORM_URL} variant="secondary">
        Go to EduPro
      </ButtonLink>
    </StateScreen>
  );
}

/** The academy's subscription is cancelled or suspended. */
export function AcademyUnavailable({ name }: { name: string }) {
  return (
    <StateScreen icon={<PauseCircle className="h-8 w-8" />} eyebrow={name} title="This academy is taking a break" text="The site is temporarily unavailable. Please check back soon — your account and progress are safe." />
  );
}

/** The backend couldn't be reached. */
export function ServiceDown() {
  return <StateScreen icon={<CloudOff className="h-8 w-8" />} eyebrow="Connection problem" title="We'll be right back" text="We couldn't load the academy just now. Please refresh the page in a moment." />;
}
