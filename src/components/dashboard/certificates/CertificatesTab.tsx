import React from "react";
import { Award } from "lucide-react";
import type { CertificateItem } from "@/types/academy";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { TabHeading } from "../TabHeading";
import { CertificateCard } from "./CertificateCard";

export function CertificatesTab({ items }: { items: CertificateItem[] }) {
  return (
    <>
      <TabHeading title="Certificates" text="Earned by completing courses — every certificate can be verified online." />
      {items.length ? (
        <Stagger onMount className="grid gap-5 md:grid-cols-2" stagger={0.06}>
          {items.map((c) => (
            <StaggerItem key={c.id} className="h-full">
              <CertificateCard c={c} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <EmptyState icon={<Award className="h-7 w-7" />} title="No certificates yet" text="Finish a course to earn your first certificate." />
      )}
    </>
  );
}

export default CertificatesTab;
