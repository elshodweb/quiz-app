import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-between items-center mb-6">
      <Image src="/logo.png" alt="School Logo" width={48} height={48} />
      <Image
        src="/logo-2.png"
        style={{ scale: 1.8, transform: "translateX(-6px)" }}
        alt="App Logo"
        width={48}
        height={48}
      />
    </div>
  );
}
