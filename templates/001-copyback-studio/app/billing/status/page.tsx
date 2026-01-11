"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "../../../components/AppShell";
import { Button } from "../../../components/Button";
import { CheckCircle, XCircle, ArrowRight, RefreshCcw } from "lucide-react";

function BillingStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";
  const sessionId = searchParams.get("session_id");

  const isSuccess = status === "success";

  return (
    <AppShell>
      <div className="flex items-center justify-center min-h-[70vh] px-4">
        <div className="max-w-md w-full text-center">
          <div
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <CheckCircle className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
          </div>

          <h1 className="text-3xl font-bold text-ink-900 mb-3">
            {isSuccess ? "Payment Successful!" : "Payment Cancelled"}
          </h1>

          <p className="text-ink-500 mb-8">
            {isSuccess
              ? "Thank you for your purchase. Your credits have been added to your account."
              : "Your payment was cancelled. No charges were made to your account."}
          </p>

          {sessionId && isSuccess && (
            <div className="bg-ink-50 border border-ink-200 rounded-lg p-4 mb-8">
              <p className="text-xs text-ink-400 mb-1">Session ID</p>
              <p className="text-sm font-mono text-ink-600 break-all">{sessionId}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isSuccess ? (
              <Link href="/studio">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Studio <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/billing">
                  <Button size="lg" className="w-full sm:w-auto">
                    <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
                  </Button>
                </Link>
                <Link href="/studio">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Studio
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function BillingStatusPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-8 h-8 border-4 border-ink-200 border-t-ink-900 rounded-full animate-spin" />
          </div>
        </AppShell>
      }
    >
      <BillingStatusContent />
    </Suspense>
  );
}
