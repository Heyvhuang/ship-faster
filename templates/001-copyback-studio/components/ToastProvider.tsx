"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            richColors
            closeButton
            theme="light"
            className="toaster-override"
            expand
            gap={12}
            duration={5000}
            toastOptions={{
                style: {
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                    color: "var(--ink-900)",
                    fontFamily: "var(--font-sans)",
                },
            }}
        />
    );
}
