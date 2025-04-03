"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import type { TelegramWebApp } from "../types/telegram";

const TelegramWebApp = () => {
  useEffect(() => {
    const initWebApp = async () => {
      try {
        if (typeof window !== "undefined") {
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
          } else {
            // Import the SDK and initialize it
            const sdk = await import("@twa-dev/sdk");
            // Access the WebApp object from the window after SDK initialization
            if (window.Telegram?.WebApp) {
              window.Telegram.WebApp.ready();
            }
          }
        }
      } catch (error) {
        console.error("Failed to initialize Telegram Web App:", error);
      }
    };

    initWebApp();
  }, []);

  return null;
};

// Prevent server-side rendering of this component
export default dynamic(() => Promise.resolve(TelegramWebApp), {
  ssr: false,
});
