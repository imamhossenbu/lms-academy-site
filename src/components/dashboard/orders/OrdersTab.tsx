import React from "react";
import Link from "next/link";
import { FileDown, Receipt } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { OrderItem } from "@/types/academy";
import { ToneBadge, type Tone } from "@/components/ui/ToneBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { TabHeading } from "../TabHeading";

const STATUS: Record<OrderItem["status"], { label: string; tone: Tone }> = {
  PAID: { label: "Paid", tone: "green" },
  PENDING: { label: "Pending", tone: "yellow" },
  FAILED: { label: "Failed", tone: "red" },
  CANCELLED: { label: "Cancelled", tone: "gray" },
  REFUNDED: { label: "Refunded", tone: "blue" },
};

/** Orders table (column borders): number, course, date, total, status, invoice / retry. */
export function OrdersTab({ items }: { items: OrderItem[] }) {
  return (
    <>
      <TabHeading title="Orders" text="Your course purchases and invoices." />
      {items.length ? (
        <div className="overflow-x-auto rounded-2xl border border-night-line bg-night-surface">
          <table className="w-full min-w-170 table-fixed">
            <thead className="border-b border-night-line bg-white/5">
              <tr className="divide-x divide-night-line text-left">
                {["Order", "Course", "Date", "Total", "Status", "Invoice"].map((h, i) => (
                  <th key={h} className={`px-3.5 py-3 body-xsm-medium font-semibold text-night-soft ${i === 1 ? "w-1/3" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-night-line">
              {items.map((o) => {
                const s = STATUS[o.status] ?? STATUS.PENDING;
                return (
                  <tr key={o.id} className="divide-x divide-night-line transition-colors hover:bg-white/5">
                    <td className="truncate px-3.5 py-3 body-sm-medium text-white">{o.orderNumber}</td>
                    <td className="px-3.5 py-3">
                      <Link href={`/courses/${o.course.slug}`} className="block truncate body-sm-regular text-night-soft hover:text-accent">
                        {o.course.title}
                      </Link>
                    </td>
                    <td className="px-3.5 py-3 body-sm-regular text-night-soft">{new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td className="px-3.5 py-3 body-sm-medium text-white">{formatPrice(o.totalAmount, o.currency, o.totalAmount <= 0)}</td>
                    <td className="px-3.5 py-3">
                      <ToneBadge tone={s.tone} size="sm" dot>
                        {s.label}
                      </ToneBadge>
                    </td>
                    <td className="px-3.5 py-3">
                      {o.invoice ? (
                        <a href={o.invoice.invoiceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 body-sm-medium text-accent hover:underline">
                          <FileDown className="h-4 w-4" />
                          PDF
                        </a>
                      ) : o.status === "FAILED" || o.status === "CANCELLED" ? (
                        <Link href={`/checkout/${o.course.slug}`} className="body-sm-medium text-accent hover:underline">
                          Try again
                        </Link>
                      ) : (
                        <span className="body-sm-regular text-night-muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={<Receipt className="h-7 w-7" />} title="No orders yet" text="Paid courses you buy appear here with their invoices." />
      )}
    </>
  );
}

export default OrdersTab;
