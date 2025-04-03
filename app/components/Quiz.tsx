"use client";

import { useState, useEffect, useCallback } from "react";
import { Question } from "../types";

interface Props {
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Calculate score
  const calculateScore = useCallback(() => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  }, [selectedAnswers, questions]);

  // Handle timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      onComplete(calculateScore());
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete, calculateScore]);

  const handleAnswer = (answerIndex: number) => {
    if (isTimeUp) return;

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isTimeUp) return;

    if (currentQuestion === questions.length - 1) {
      onComplete(calculateScore());
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="bg-purple-100 p-4 rounded-lg mb-4">
        <div className="flex justify-between items-center">
          <div
            className={`px-4 py-1 rounded ${
              timeLeft <= 300 ? "bg-red-500" : "bg-purple-500"
            } text-white`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="text-purple-600">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <p className="text-gray-800 mb-4">{questions[currentQuestion].text}</p>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer 
                ${
                  selectedAnswers[currentQuestion] === index
                    ? "bg-purple-50 border-purple-300"
                    : "hover:bg-gray-50"
                }
                ${isTimeUp ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <input
                type="radio"
                name="answer"
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswer(index)}
                disabled={isTimeUp}
                className="w-4 h-4 text-purple-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0 || isTimeUp}
          className="w-1/2 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined || isTimeUp}
          className="w-1/2 py-3 bg-purple-500 text-white rounded-lg disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
        </button>
      </div>

      {isTimeUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4">Время вышло!</h2>
            <p className="mb-4">Ваш тест был автоматически завершен</p>
            <p className="text-purple-600">
              Результат: {calculateScore()} из {questions.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
