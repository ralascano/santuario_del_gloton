"use client";
import Image from "next/image";
import styles from "../page.module.css";
import ThemeToggle from "@/components/buttonTheme/ThemeToggle";
import Hero from "@/components/hero/Hero";
import MenuSection from "@/components/menuItem/MenuSection";
import CartSidebar from "@/components/cartSideBar/CartSideBar";
import ReviewsSection from "@/components/reviewCard/ReviewSection";
import ContactSection from "@/components/contactSection/ContactSection";

export default function Home() {
  return (
    <>
      <main style={{ paddingTop: 96 }}>
        <div className="container" style={{ display: "flex", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <Hero />
            <MenuSection
              minPrice={0}
              forceTab="Recomendados" // fuerza el filtro
              showTabs={false} // oculta tabs
              showSubtabs={false} // oculta subtabs
              showSearch={false} // oculta búsqueda
              showFeaturedTab={false} // no agrega el tab a la barra (ya está forzado)
            />
          </div>
          {
            //<CartSidebar />
          }
        </div>

        <ReviewsSection />
        <ContactSection />
      </main>
    </>
  );
}
