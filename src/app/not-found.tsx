import { ArrowRight, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/shared/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" eyebrowIcon={<Compass className="h-4 w-4" />} title="Page not_ found" subtitle="The course may have been moved or is no longer available. Try browsing the catalogue instead.">
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/courses" icon={<ArrowRight className="h-4 w-4" />}>
          Browse courses
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </PageHero>
  );
}
