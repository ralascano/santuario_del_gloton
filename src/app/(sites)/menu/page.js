// app/(site)/menu/page.js
"use client";
import MenuSection from "@/components/menuItem/MenuSection";

export default function MenuPage() {
  return (
    <div className="container" style={{ display: "grid", gap: 16 }}>
      <header style={{ padding: "12px 0" }}>
        <h1 style={{ fontSize: "clamp(20px,5vw,28px)", fontWeight: 900 }}>
          El Santuario del Glotón
        </h1>
      </header>

      <MenuSection showFeaturedTab />
    </div>
  );
}
