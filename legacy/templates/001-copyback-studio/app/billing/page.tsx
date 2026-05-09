"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import { Button } from "../../components/Button";
import { Layers, CheckCircle, Zap } from "lucide-react";
import { getCreditsPerImage } from "../../lib/services/credits";
import { notify } from "../../lib/ui/toast";

export default function BillingPage() {
  const creditsPerImage = getCreditsPerImage();
  const starterCredits = 200;
  const proCredits = 500;
  const enterpriseCredits = 1000;
  const [processingPlan, setProcessingPlan] = useState<"starter" | "pro" | "enterprise" | null>(null);

  const starterImages = Math.floor(starterCredits / creditsPerImage);
  const proImages = Math.floor(proCredits / creditsPerImage);
  const enterpriseImages = Math.floor(enterpriseCredits / creditsPerImage);

  const handleCheckout = async (priceType: "starter" | "pro" | "enterprise") => {
    if (processingPlan) return;
    setProcessingPlan(priceType);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Checkout failed");
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Checkout failed.";
      console.error("Checkout error:", error);
      notify.error("Checkout failed", message);
    } finally {
      setProcessingPlan(null);
    }
  };

  const SALES_EMAIL = process.env.NEXT_PUBLIC_SALES_EMAIL || "voxyz.developer@gmail.com";
  const handleContactSales = () => {
    window.location.href = `mailto:${SALES_EMAIL}?subject=CopyBack%20Enterprise%20Plan`;
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-ink-900">Credits-based pricing</h2>
          <p className="text-ink-500 text-lg">
            Credits are consumed when generating proof images.{" "}
            <span className="text-ink-700 font-medium">1 image = {creditsPerImage} credits</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="border border-ink-200 rounded-2xl p-6 bg-white hover:border-ink-300 transition-all shadow-sm hover:shadow-md">
            <div className="bg-ink-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Layers className="text-ink-600" size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink-900">Starter</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-ink-900">$19</span>
              <span className="text-sm font-medium text-ink-500">/ month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-ink-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> {starterCredits} credits / month
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> ~ {starterImages} generated images
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> Downloadable exports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> Run history
              </li>
            </ul>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => handleCheckout("starter")}
              isLoading={processingPlan === "starter"}
              disabled={processingPlan !== null && processingPlan !== "starter"}
            >
              Choose Starter
            </Button>
          </div>

          <div className="border-2 border-ink-900 rounded-2xl p-6 bg-paper relative overflow-hidden shadow-xl transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-ink-900 text-white text-[10px] px-3 py-1 rounded-bl-lg font-bold tracking-wide uppercase">
              Most Popular
            </div>
            <div className="bg-ink-900 w-10 h-10 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-ink-900/20">
              <Zap className="text-white fill-current" size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink-900">Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-ink-900">$49</span>
              <span className="text-sm font-medium text-ink-500">/ month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-ink-900 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-ink-900" /> {proCredits} credits / month
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-ink-900" /> ~ {proImages} generated images
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-ink-900" /> Downloadable exports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-ink-900" /> Run history
              </li>
            </ul>
            <Button
              className="w-full shadow-lg"
              onClick={() => handleCheckout("pro")}
              isLoading={processingPlan === "pro"}
              disabled={processingPlan !== null && processingPlan !== "pro"}
            >
              Subscribe Pro
            </Button>
            <p className="text-center text-[10px] text-ink-500 mt-3">14-day money back guarantee.</p>
          </div>

          <div className="border border-ink-200 rounded-2xl p-6 bg-white hover:border-ink-300 transition-all shadow-sm hover:shadow-md">
            <div className="bg-ink-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Layers className="text-ink-600" size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2 text-ink-900">Enterprise</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-ink-900">$99</span>
              <span className="text-sm font-medium text-ink-500">/ month</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-ink-600">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> {enterpriseCredits} credits / month
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> ~ {enterpriseImages} generated images
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> Downloadable exports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-safe" /> Run history
              </li>
            </ul>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleContactSales}
              disabled={processingPlan !== null}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
