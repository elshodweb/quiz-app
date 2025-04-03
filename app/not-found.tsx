"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after a brief delay
    router.push("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-teal-600 mb-2">
          Перенаправление...
        </h1>
        <p className="text-gray-600">Пожалуйста, подождите</p>
      </div>
    </div>
  );
}
