import React from "react";
import Image from "next/image";
import { CreditCard, ShieldCheck } from "lucide-react";

const LOGOS = [
  { src: "/images/payments/bkash.png", alt: "bKash" },
  { src: "/images/payments/nagad.png", alt: "Nagad" },
  { src: "/images/payments/sslcommerz.png", alt: "SSLCommerz" },
];

/** How the learner will pay: SSLCommerz secure page (cards, mobile banking, net banking). */
export function PaymentMethods() {
  return (
    <div className="rounded-2xl border border-night-line bg-night-surface p-5">
      <h2 className="body-medium flex items-center gap-2 font-semibold text-white">
        <CreditCard className="h-4 w-4 text-accent" />
        Payment method
      </h2>
      <div className="mt-3 rounded-xl border border-accent bg-accent-soft p-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
          <div className="min-w-0">
            <p className="body-sm-medium font-semibold text-white">Card, mobile banking or net banking</p>
            <p className="body-xsm-regular mt-0.5 text-night-muted">Visa, Mastercard, bKash, Nagad, Rocket and more — on SSLCommerz&apos;s secure page.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {LOGOS.map((l) => (
                <span key={l.alt} className="flex h-8 items-center rounded-lg border border-night-line bg-night-surface px-2.5">
                  <Image src={l.src} alt={l.alt} width={64} height={20} className="h-4 w-auto object-contain" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 body-xsm-regular text-night-muted">
        <ShieldCheck className="h-4 w-4 text-green" />
        Your payment details go straight to the gateway — we never see your card or PIN.
      </p>
    </div>
  );
}

export default PaymentMethods;
