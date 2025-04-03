"use client";

import { useState } from "react";
import { UserInfo } from "./types";
import dynamic from "next/dynamic";
import RegistrationForm from "./components/RegistrationForm";
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
    correctAnswer: 1,
  },
  {
    text: "What is the capital of Uzbekistan?",
    options: ["Samarkand", "Bukhara", "Tashkent", "Nukus"],
    correctAnswer: 2,
  },
];

export default function Home() {
  const [step, setStep] = useState<"registration" | "quiz" | "results">(
    "registration"
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [quizScore, setQuizScore] = useState<{
    subject: string;
    score: number;
    total: number;
  } | null>(null);

  const handleRegistrationSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStep("quiz");
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore({
      subject: "Mathematics",
      score: score,
      total: mockQuestions.length,
    });
    setStep("results");
  };

  const handleRestart = () => {
    setStep("registration");
    setUserInfo(null);
    setQuizScore(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <TelegramWebApp />

      {step === "registration" && (
        <RegistrationForm onSubmit={handleRegistrationSubmit} />
      )}

      {step === "quiz" && (
        <Quiz questions={mockQuestions} onComplete={handleQuizComplete} />
      )}

      {step === "results" && userInfo && quizScore && (
        <Results
          userInfo={userInfo}
          score={quizScore}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
