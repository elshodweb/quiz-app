"use client";

import { useState } from "react";
import { UserInfo } from "../types";
import Image from "next/image";
import Header from "./Header";
import Test from "./Test";

interface Props {
  onSubmit: (data: UserInfo) => void;
}

export default function RegistrationForm({ onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserInfo>({
    fullName: "",
    phone: "",
    grade: "",
    language: "",
    termsAccepted: false,
  });
  const [showTest, setShowTest] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(formData);
      setShowTest(true);
    }
  };

  if (showTest) {
    return <Test userInfo={formData} />;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Header />

      <h1 className="text-center text-xl text-[#00A19B] mb-6">
        {step === 1 ? "Ro'yxatdan o'tish" : ""}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 ? (
          <>
            <div className="space-y-2">
              <label className="block text-sm text-[#00A19B]">F.I.SH</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full p-2 border border-[#00A19B] border-opacity-20 rounded-lg focus:outline-none focus:border-[#00A19B]"
                placeholder="F.I.SH"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#00A19B]">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={
                    formData.phone
                      ? `+998 (${formData.phone.slice(0, 2)})${
                          formData.phone.length > 2 ? " " : ""
                        }${formData.phone.slice(2, 5)}${
                          formData.phone.length > 5 ? " " : ""
                        }${formData.phone.slice(5, 7)}${
                          formData.phone.length > 7 ? " " : ""
                        }${formData.phone.slice(7, 9)}`.replace(/[()-\s]*$/, "")
                      : ""
                  }
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value.replace(/^998/, "");
                    value = value.slice(0, 9);
                    setFormData({ ...formData, phone: value });
                  }}
                  className="w-full p-2 border border-[#9747FF] border-opacity-20 rounded-lg focus:outline-none focus:border-[#9747FF]"
                  placeholder="+998 (90) 123 45 67"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-sm text-[#00A19B]">
                Sinfni tanlang
              </label>
              <select
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                className="w-full p-2 border border-[#00A19B] border-opacity-20 rounded-lg focus:outline-none focus:border-[#00A19B]"
                required
              >
                <option value="">Sinfni tanlang</option>
                <option value="5">5-sinf</option>
                <option value="6">6-sinf</option>
                <option value="7">7-sinf</option>
                <option value="8">8-sinf</option>
                <option value="9">9-sinf</option>
                <option value="10">10-sinf</option>
                <option value="11">11-sinf</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#00A19B]">
                Tilni tanlang
              </label>
              <select
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
                className="w-full p-2 border border-[#00A19B] border-opacity-20 rounded-lg focus:outline-none focus:border-[#00A19B]"
                required
              >
                <option value="">Tilni tanlang</option>
                <option value="uz">O'zbekcha</option>
                <option value="ru">Русский</option>
              </select>
            </div>

            <div className="mt-6 p-4 bg-[#00A19B] bg-opacity-10 rounded-lg">
              <p className="text-[#00A19B] text-sm mb-4">
                Lorem ipsum dolor sit amet consectetur. Donec auctor ut ante
                proin. Vitae vulputate aliquam blandit varius ut hendrerit nec
                semper at.
              </p>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      termsAccepted: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-[#00A19B]"
                  required
                />
                <span className="text-sm text-[#00A19B]">
                  Lorem ipsum dolor sit amet
                </span>
              </label>
            </div>
          </>
        )}

        <div className="flex gap-4">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/2 py-3 gradient-btn"
            >
              Назад
            </button>
          )}
          <button
            type="submit"
            className={`py-3 gradient-btn ${step === 2 ? "w-1/2" : "w-full"}`}
          >
            {step === 1 ? "Davom etish" : "Далее"}
          </button>
        </div>
      </form>
    </div>
  );
}
