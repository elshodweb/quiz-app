"use client";

import { UserInfo } from "../types";

interface Props {
  userInfo: UserInfo;
  score: {
    subject: string;
    score: number;
    total: number;
  };
  onRestart: () => void;
}

export default function Results({ userInfo, score, onRestart }: Props) {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <div className="mb-6">
        <div className="w-24 h-24 mx-auto mb-4">
          {/* You can add a celebration icon or image here */}
          🎉
        </div>
        <h1 className="text-2xl text-purple-600 mb-2">
          Tabriklaymiz, {userInfo.fullName}!
        </h1>
        <p className="text-gray-600">Siz ajoyib natija ko'rsatdingiz!</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="space-y-2 text-left">
          <p>F.I.SH: {userInfo.fullName}</p>
          <p>Telefon raqami: {userInfo.phone}</p>
          <p>Sinf: {userInfo.grade}</p>
          <p>Til: {userInfo.language}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-purple-100 px-6 py-3 rounded-lg">
          <p className="text-purple-600">{score.subject}</p>
          <p className="font-bold">
            {score.score}/{score.total}
          </p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
      >
        Chegirmani qo'lga kiritish
      </button>
    </div>
  );
}
