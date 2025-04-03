"use client";

import { useState } from "react";
import { UserInfo } from "../types";

interface Props {
  onSubmit: (data: UserInfo) => void;
}

export default function RegistrationForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<UserInfo>({
    fullName: "",
    phone: "",
    grade: "",
    language: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-center text-xl text-purple-600 mb-6">
        Ro'yxatdan o'tish
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm text-purple-600">F.I.SH</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="F.I.SH"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-purple-600">
            Telefon raqamingiz
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="+998 99 999 99 99"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-purple-600">Sinf</label>
          <select
            value={formData.grade}
            onChange={(e) =>
              setFormData({ ...formData, grade: e.target.value })
            }
            className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Sinfni tanlang</option>
            <option value="5">5 sinf</option>
            <option value="6">6 sinf</option>
            <option value="7">7 sinf</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-purple-600">Til</label>
          <select
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            className="w-full p-2 border border-purple-200 rounded-lg focus:outline-none focus:border-purple-500"
            required
          >
            <option value="">Tilni tanlang</option>
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors"
        >
          Davom etish
        </button>
      </form>
    </div>
  );
}
