"use client";

import { useState, useEffect } from "react";
import { UserInfo } from "../types";
import Header from "./Header";
import Results from "./Results";

interface Question {
  question: string;
  options: string[];
  answerIndex: number;
}

interface TestProps {
  userInfo: UserInfo;
}

export default function Test({ userInfo }: TestProps) {
  const [mathQuestions, setMathQuestions] = useState<Question[]>([]);
  const [englishQuestions, setEnglishQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [mathScore, setMathScore] = useState(0);
  const [englishScore, setEnglishScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<"math" | "english">(
    "math"
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [key: string]: number;
  }>({});

  const getOptionLabel = (index: number) => {
    return String.fromCharCode(65 + index); // A, B, C, D...
  };

  useEffect(() => {
    const loadQuestions = async () => {
      if (!userInfo.grade || !userInfo.language) {
        setError("Grade or language not selected");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Load math questions
        const mathFileName = `${userInfo.grade}-${userInfo.language}.json`;
        const mathResponse = await fetch(`/data/${mathFileName}`);
        if (!mathResponse.ok) {
          throw new Error(`Failed to load math questions from ${mathFileName}`);
        }
        const mathData = await mathResponse.json();
        if (!Array.isArray(mathData) || mathData.length === 0) {
          throw new Error("No math questions found");
        }
        setMathQuestions(mathData);

        // Load English questions
        const englishResponse = await fetch("/data/english.json");
        if (!englishResponse.ok) {
          throw new Error("Failed to load English questions");
        }
        const englishData = await englishResponse.json();
        if (!Array.isArray(englishData) || englishData.length === 0) {
          throw new Error("No English questions found");
        }
        setEnglishQuestions(englishData);

        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setMathScore(0);
        setEnglishScore(0);
        setShowResults(false);
        setCurrentSubject("math");
        setAnsweredQuestions({});
      } catch (error) {
        console.error("Error loading questions:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load questions"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [userInfo.grade, userInfo.language]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    const questionKey = `${currentSubject}-${currentQuestion}`;
    setAnsweredQuestions((prev) => ({
      ...prev,
      [questionKey]: index,
    }));
  };

  const handleNext = () => {
    const currentQuestions =
      currentSubject === "math" ? mathQuestions : englishQuestions;
    const currentScore = currentSubject === "math" ? mathScore : englishScore;
    const setCurrentScore =
      currentSubject === "math" ? setMathScore : setEnglishScore;

    if (selectedAnswer === currentQuestions[currentQuestion].answerIndex) {
      setCurrentScore(currentScore + 1);
    }

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      const nextQuestionKey = `${currentSubject}-${currentQuestion + 1}`;
      setSelectedAnswer(answeredQuestions[nextQuestionKey] ?? null);
    } else {
      if (currentSubject === "math") {
        setCurrentSubject("english");
        setCurrentQuestion(0);
        const firstEnglishKey = `english-0`;
        setSelectedAnswer(answeredQuestions[firstEnglishKey] ?? null);
      } else {
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const prevQuestionKey = `${currentSubject}-${currentQuestion - 1}`;
      setSelectedAnswer(answeredQuestions[prevQuestionKey] ?? null);
    } else if (currentSubject === "english") {
      setCurrentSubject("math");
      setCurrentQuestion(mathQuestions.length - 1);
      const lastMathKey = `math-${mathQuestions.length - 1}`;
      setSelectedAnswer(answeredQuestions[lastMathKey] ?? null);
    }
  };

  const handleQuestionClick = (index: number) => {
    setCurrentQuestion(index);
    const questionKey = `${currentSubject}-${index}`;
    setSelectedAnswer(answeredQuestions[questionKey] ?? null);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
          <Header />
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            {userInfo.language === "uz"
              ? "Xatolik yuz berdi"
              : "Произошла ошибка"}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#00A19B] text-white px-6 py-2 rounded-lg hover:bg-[#008F8A]"
          >
            {userInfo.language === "uz" ? "Qayta urinish" : "Попробовать снова"}
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <Results
        userInfo={userInfo}
        scores={[
          {
            subject: userInfo.language === "uz" ? "Matematika" : "Математика",
            score: mathScore,
            total: mathQuestions.length,
          },
          {
            subject: "English",
            score: englishScore,
            total: englishQuestions.length,
          },
        ]}
        onRestart={() => {
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setMathScore(0);
          setEnglishScore(0);
          setShowResults(false);
          setCurrentSubject("math");
          setAnsweredQuestions({});
        }}
      />
    );
  }

  const currentQuestions =
    currentSubject === "math" ? mathQuestions : englishQuestions;
  const currentQ = currentQuestions[currentQuestion];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              {userInfo.language === "uz"
                ? `${
                    currentSubject === "math" ? "Matematika" : "Ingliz tili"
                  } - Savol ${currentQuestion + 1} / ${currentQuestions.length}`
                : `${
                    currentSubject === "math" ? "Математика" : "Английский"
                  } - Вопрос ${currentQuestion + 1} / ${
                    currentQuestions.length
                  }`}
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
                <span className="font-medium text-[#00A19B] mr-2">
                  {getOptionLabel(index)})
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {currentQuestions.map((_, index) => {
              const questionKey = `${currentSubject}-${index}`;
              const isAnswered = questionKey in answeredQuestions;
              const isCurrent = index === currentQuestion;

              return (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(index)}
                  className={`w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-[#00A19B] text-white"
                      : isAnswered
                      ? "bg-[#00A19B] bg-opacity-20 text-[#00A19B]"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0 && currentSubject === "math"}
            className={`w-1/2 py-3 rounded-lg transition-all ${
              currentQuestion === 0 && currentSubject === "math"
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {userInfo.language === "uz" ? "Oldingi" : "Предыдущий"}
          </button>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`w-1/2 py-3 rounded-lg transition-all ${
              selectedAnswer === null
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#00A19B] text-white hover:bg-[#008F8A]"
            }`}
          >
            {currentQuestion === currentQuestions.length - 1
              ? userInfo.language === "uz"
                ? currentSubject === "math"
                  ? "Ingliz tiliga o'tish"
                  : "Yakunlash"
                : currentSubject === "math"
                ? "Перейти к английскому"
                : "Завершить"
              : userInfo.language === "uz"
              ? "Keyingi"
              : "Следующий"}
          </button>
        </div>
      </div>
    </div>
  );
}
