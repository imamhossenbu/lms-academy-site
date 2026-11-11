import React from "react";
import { CloudOff } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";

export function LoadError({ message }: { message: string }) {
  return <EmptyState icon={<CloudOff className="h-7 w-7" />} title="Couldn't load this section" text={message || "Please refresh the page in a moment."} />;
}

export default LoadError;
