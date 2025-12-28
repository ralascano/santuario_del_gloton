// app/(site)/menu/page.js
"use client";
import MenuSection from "@/components/menuItem/MenuSection";

export default function MenuPage() {
  return (
    <div className="menuPage">
      <header className="menuHeader">
        <h1>El Santuario del Glotón</h1>
      </header>

      <MenuSection showFeaturedTab />
    </div>
  );
}
