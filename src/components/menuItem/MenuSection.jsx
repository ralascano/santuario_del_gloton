// components/menuItem/MenuSection.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import MenuItemCard from "./MenuItemCard";
import menuData from "@/data/menu.json";

function asNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : n;
}
function normStr(v) {
  return (typeof v === "string" ? v : String(v ?? "")).toLocaleLowerCase("es");
}
function itemKey(it, idx) {
  return `${it?.id ?? it?.slug ?? it?.name ?? "item"}-${idx}`;
}

/**
 * Props:
 *  - minPrice?: number | null      (para "Recomendados", default 9 si se usa Recomendados)
 *  - forceTab?: string | null      ("Recomendados" | "Todos" | una categoría)
 *  - showTabs?: boolean            (default true)
 *  - showSubtabs?: boolean         (default true)
 *  - showSearch?: boolean          (default true)
 *  - showFeaturedTab?: boolean     (default true) -> agrega "Recomendados" al inicio de tabs
 */
export default function MenuSection({
  minPrice = null,
  forceTab = null,
  showTabs = true,
  showSubtabs = true,
  showSearch = true,
  showFeaturedTab = true,
} = {}) {
  const tabs = menuData.tabs; // ["Desayunos", "Encebollados", ...]
  const subTabsBy = menuData.subTabs || {}; // { Sopas: ["Costa","Sierra"], ... }

  const featuredLabel = "Recomendados";
  const isForcedFeatured = forceTab === featuredLabel;

  const baseTabs = ["Todos", ...tabs];
  const displayedTabs = showFeaturedTab
    ? [featuredLabel, ...baseTabs]
    : baseTabs;

  const defaultActive = forceTab ?? displayedTabs[0]; // si forceTab, arranca ahí
  const [activeTab, setActiveTab] = useState(defaultActive);
  const [activeSub, setActiveSub] = useState(null);
  const [query, setQuery] = useState("");

  // Si llega forceTab en runtime (home), sincroniza
  useEffect(() => {
    if (forceTab && forceTab !== activeTab) {
      setActiveTab(forceTab);
      setActiveSub(null);
      setQuery("");
    }
  }, [forceTab]); // eslint-disable-line

  const visibleItems = useMemo(() => {
    let pool = Array.isArray(menuData.items) ? [...menuData.items] : [];

    // 1) Tab virtual "Recomendados"
    if (activeTab === featuredLabel) {
      const threshold = Number(minPrice ?? 9);
      pool = pool.filter((it) => Number(it?.price) >= threshold);
    }

    // 2) Filtro por categoría si NO es "Todos" ni "Recomendados"
    if (activeTab !== "Todos" && activeTab !== featuredLabel) {
      pool = pool.filter((it) => it && it.category === activeTab);
    }

    // 3) Subcategoría (solo si hay una activa)
    if (activeSub) {
      pool = pool.filter((it) => it && it.subCategory === activeSub);
    }

    // 4) Búsqueda
    const q = query.trim().toLowerCase();
    if (q) {
      pool = pool.filter((it) => {
        const hay = `${it?.name ?? ""} ${it?.description ?? ""} ${(
          it?.tags || []
        ).join(" ")}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // 5) Orden estable
    return pool.filter(Boolean).sort((a, b) =>
      normStr(a?.name).localeCompare(normStr(b?.name), "es", {
        sensitivity: "base",
      })
    );
  }, [activeTab, activeSub, query, minPrice]);

  function onTabClick(tab) {
    setActiveTab(tab);
    // subtabs solo si categoría real (no "Todos" ni "Recomendados")
    if (tab === "Todos" || tab === featuredLabel) {
      setActiveSub(null);
    } else {
      setActiveSub(subTabsBy[tab]?.[0] ?? null);
    }
    setQuery("");
  }

  const shouldShowTabs = showTabs;
  const shouldShowSubtabs =
    showSubtabs &&
    activeTab !== "Todos" &&
    activeTab !== featuredLabel &&
    subTabsBy[activeTab]?.length;

  return (
    <section id="menu" className={styles.section}>
      {isForcedFeatured && (
        <header className={styles.sectionHeader} aria-live="polite">
          <h2 className={styles.sectionTitle}>
            Platos recomendados del restaurante
          </h2>
          {/* Si quieres una bajada opcional:
        <p className={styles.sectionSubtitle}>
          Selección de la casa (≥ ${Number(minPrice ?? 9).toFixed(2)})
        </p>
        */}
        </header>
      )}
      {/* Tabs */}
      {shouldShowTabs && (
        <div className={styles.tabs} role="tablist" aria-label="Categorías">
          {displayedTabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles.tab} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => onTabClick(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Subtabs */}
      {shouldShowSubtabs ? (
        <div
          className={styles.subtabs}
          role="tablist"
          aria-label="Subcategorías"
        >
          {subTabsBy[activeTab].map((st) => (
            <button
              key={st}
              role="tab"
              aria-selected={activeSub === st}
              className={`${styles.subtab} ${
                activeSub === st ? styles.active : ""
              }`}
              onClick={() => setActiveSub(st)}
              type="button"
            >
              {st}
            </button>
          ))}
        </div>
      ) : null}

      {/* Búsqueda */}
      {showSearch && (
        <div className={styles.controls}>
          <input
            className={styles.search}
            type="search"
            placeholder="Buscar plato o ingrediente…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar"
          />
        </div>
      )}

      {/* Grid */}
      <div className={styles.grid}>
        {visibleItems.map((it, idx) => (
          <MenuItemCard
            key={itemKey(it, idx)}
            id={it?.id}
            title={it?.name}
            desc={it?.description}
            price={asNumber(it?.price)}
            image={it?.image?.src}
          />
        ))}
        {!visibleItems.length && (
          <p className={styles.empty}>
            No encontramos resultados
            {showSearch && query ? ` para “${query}”` : ""}.
          </p>
        )}
      </div>
    </section>
  );
}
