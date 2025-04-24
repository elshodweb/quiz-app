"use client";

import { UserInfo } from "../types";
import Image from "next/image";
import Header from "./Header";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Score {
  subject: string;
  score: number;
  total: number;
}

interface Props {
  userInfo: UserInfo;
  scores: Score[];
  onRestart: () => void;
}

export default function Results({ userInfo, scores, onRestart }: Props) {
  const language = userInfo.language;

  const formatPhone = (phone: string) => {
    return `+998 (${phone.slice(0, 2)}) ${phone.slice(2, 5)} ${phone.slice(
      5,
      7
    )} ${phone.slice(7, 9)}`;
  };

  const getGradeText = () => {
    if (language === "uz") {
      return `${userInfo.grade}-sinf`;
    }
    return `${userInfo.grade} класс`;
  };

  const getChartData = (score: Score) => {
    const correctAnswers = score.score;
    const wrongAnswers = score.total - score.score;

    return {
      labels: [
        language === "uz" ? "To'g'ri javoblar" : "Правильные ответы",
        language === "uz" ? "Noto'g'ri javoblar" : "Неправильные ответы",
      ],
      datasets: [
        {
          data: [correctAnswers, wrongAnswers],
          backgroundColor: ["#00A19B", "#E5E7EB"],
          borderColor: ["#00A19B", "#E5E7EB"],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <Header />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#00A19B] mb-2">
              {language === "uz" ? "Test natijalari" : "Результаты теста"}
            </h2>
            <p className="text-gray-600">{getGradeText()}</p>
          </div>

          {/* User Information */}
          <div className="bg-[#00A19B] bg-opacity-10 p-4 rounded-lg mb-6">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-[#00A19B] font-medium">
                  {language === "uz" ? "F.I.SH: " : "Ф.И.О: "}
                </span>
                {userInfo.fullName}
              </p>
              <p className="text-sm">
                <span className="text-[#00A19B] font-medium">
                  {language === "uz" ? "Telefon raqami: " : "Номер телефона: "}
                </span>
                {formatPhone(userInfo.phone)}
              </p>
              <p className="text-sm">
                <span className="text-[#00A19B] font-medium">
                  {language === "uz" ? "Sinf: " : "Класс: "}
                </span>
                {getGradeText()}
              </p>
              <p className="text-sm">
                <span className="text-[#00A19B] font-medium">
                  {language === "uz" ? "Til: " : "Язык: "}
                </span>
                {language === "uz" ? "O'zbekcha" : "Русский"}
              </p>
            </div>
          </div>

          {/* Test Results */}
          <div className="space-y-8">
            {scores.map((score, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {score.subject}
                </h3>

                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <div className="text-3xl font-bold text-[#00A19B] mb-2">
                      {score.score}/{score.total}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((score.score / score.total) * 100)}%
                    </div>
                  </div>
                  <div className="h-32">
                    <Pie data={getChartData(score)} options={chartOptions} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      {language === "uz"
                        ? "To'g'ri javoblar"
                        : "Правильные ответы"}
                    </span>
                    <span className="font-semibold">{score.score}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      {language === "uz" ? "Jami savollar" : "Всего вопросов"}
                    </span>
                    <span className="font-semibold">{score.total}</span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={onRestart}
              className="w-full py-3 bg-[#00A19B] text-white rounded-lg hover:bg-[#008F8A] transition-colors"
            >
              {language === "uz" ? "Qayta urinish" : "Попробовать снова"}
            </button>

            <div className="flex justify-center gap-8 mt-6 mb-4">
              <a
                href="https://www.instagram.com/premium_school_uzbekistan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#00A19B] font-bold text-sm hover:underline"
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  className="w-8 h-8 mr-2"
                />
                Premium School Uzbekistan
              </a>
              <a
                href="https://www.instagram.com/ajou_uz?igsh=MXhvcmMya3AzY21vMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#00A19B] font-bold text-sm hover:underline"
              >
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  className="w-8 h-8 mr-2"
                />
                Ajou Uzbekistan
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
