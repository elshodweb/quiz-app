"use client";

import { useState } from "react";
import { UserInfo } from "./types";
import dynamic from "next/dynamic";
import RegistrationForm from "./components/RegistrationForm";
import Test from "./components/Test";
import Quiz from "./components/Quiz";
import Results from "./components/Results";

// Import TelegramWebApp with no SSR
const TelegramWebApp = dynamic(() => import("./components/TelegramWebApp"), {
  ssr: false,
});

// Temporary mock data - will be replaced with JSON later
const mockQuestions = [
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answerIndex: 1,
  },
  {
    text: "What is the capital of Uzbekistan?",
    options: ["Samarkand", "Bukhara", "Tashkent", "Nukus"],
    answerIndex: 2,
  },
];

export default function Home() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleRegistrationSubmit = (data: UserInfo) => {
    setUserInfo(data);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <TelegramWebApp />

      {!userInfo ? (
        <RegistrationForm onSubmit={handleRegistrationSubmit} />
      ) : (
        <Test userInfo={userInfo} />
      )}
    </main>
  );
}
