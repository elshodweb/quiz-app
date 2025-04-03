"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const TelegramWebApp = () => {
  useEffect(() => {
    // Only import and initialize WebApp on the client side
    const initWebApp = async () => {
      const { WebApp } = await import("@twa-dev/sdk");
      WebApp.ready();
    };

    initWebApp();
  }, []);

  return null;
};

// Prevent server-side rendering of this component
export default dynamic(() => Promise.resolve(TelegramWebApp), {
  ssr: false,
});
