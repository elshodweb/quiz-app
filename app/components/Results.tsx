"use client";

import { UserInfo } from "../types";
import Image from "next/image";

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
    <div className="p-4 max-w-md mx-auto">
      {/* Top logos */}
      <div className="flex justify-between items-center mb-8">
        <Image src="/logo.png" alt="School Logo" width={48} height={48} />
        <Image src="/logo-2.png" alt="App Logo" width={48} height={48} />
      </div>

      {/* Celebration image and text */}
      <div className="text-center mb-6">
        <div className="w-48 h-48 mx-auto mb-4 relative">
          <Image
            src="/check.png"
            alt="Celebration"
            width={192}
            height={192}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl text-[#00A19B] font-medium mb-1">
          Tabriklaymiz, {userInfo.fullName.split(" ")[0]}!
        </h1>
        <p className="text-gray-500">Siz ajoyib natija ko'rsatdingiz!</p>
      </div>

      {/* User info card */}
      <div className="bg-[#00A19B] p-4 rounded-lg mb-4">
        <div className="bg-[#ffffff]  p-4 rounded-lg mb-2">
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-[#00A19B]">F.I.SH: </span>
              {userInfo.fullName}
            </p>
            <p className="text-sm">
              <span className="text-[#00A19B]">Telefon raqam: </span>
              {userInfo.phone}
            </p>
            <p className="text-sm">
              <span className="text-[#00A19B]">Maktab: </span>
              {userInfo.school}
            </p>
            <p className="text-sm">
              <span className="text-[#00A19B]">Sinf: </span>
              {userInfo.grade}
            </p>
            <p className="text-sm">
              <span className="text-[#00A19B]">Til: </span>
              {userInfo.language === "uz"
                ? "O'zbek"
                : userInfo.language === "ru"
                ? "Русский"
                : "English"}
            </p>
          </div>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#ffffff]  px-4 py-3 rounded-lg text-center">
            <p className="text-[#00A19B] text-sm mb-1">Ingliz tili</p>
            <p className="font-medium">14/15</p>
          </div>
          <div className="bg-[#ffffff]  px-4 py-3 rounded-lg text-center">
            <p className="text-[#00A19B] text-sm mb-1">Matematika</p>
            <p className="font-medium">14/15</p>
          </div>
        </div>
      </div>
      {/* Action button */}
      <button
        onClick={onRestart}
        className="w-full py-3 bg-[#00A19B] text-white rounded-lg transition-colors"
      >
        Chegirmani qo'lga kiritish
      </button>
    </div>
  );
}
