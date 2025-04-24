"use client";

import { useState, useEffect } from "react";
import { UserInfo } from "../types";
import Header from "./Header";

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

interface QuizProps {
  userInfo: UserInfo;
}

export default function Quiz({ userInfo }: QuizProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const fileName = `${userInfo.grade}-${userInfo.language}.json`;
        const response = await fetch(`/data/${fileName}`);
        if (!response.ok) {
          throw new Error(`Failed to load questions from ${fileName}`);
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error loading questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo.grade && userInfo.language) {
      loadQuestions();
    }
  }, [userInfo.grade, userInfo.language]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].answerIndex) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A19B] mx-auto mb-4"></div>
          <p className="text-[#00A19B]">
            {userInfo.language === "uz"
              ? "Savollar yuklanmoqda..."
              : "Загрузка вопросов..."}
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <Header />
          <h2 className="text-2xl font-bold text-center text-[#00A19B] mb-6">
            {userInfo.language === "uz"
              ? "Test natijalari"
              : "Результаты теста"}
          </h2>
          <div className="text-center">
            <p className="text-lg mb-4">
              {userInfo.language === "uz"
                ? `Sizning natijangiz: ${score} / ${questions.length}`
                : `Ваш результат: ${score} / ${questions.length}`}
            </p>
            <p className="text-sm text-gray-600">
              {userInfo.language === "uz"
                ? `To'g'ri javoblar: ${score}`
                : `Правильные ответы: ${score}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              {userInfo.language === "uz"
                ? `Savol ${currentQuestion + 1} / ${questions.length}`
                : `Вопрос ${currentQuestion + 1} / ${questions.length}`}
            </span>
          </div>

          <h2 className="text-xl mb-6">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  selectedAnswer === index
                    ? "border-[#00A19B] bg-[#00A19B] bg-opacity-10"
                    : "border-gray-200 hover:border-[#00A19B] hover:bg-[#00A19B] hover:bg-opacity-5"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className={`w-full py-4 rounded-lg transition-all ${
            selectedAnswer === null
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#00A19B] text-white hover:bg-[#008F8A]"
          }`}
        >
          {currentQuestion === questions.length - 1
            ? userInfo.language === "uz"
              ? "Yakunlash"
              : "Завершить"
            : userInfo.language === "uz"
            ? "Keyingi"
            : "Следующий"}
        </button>
      </div>
    </div>
  );
}
