"use client";
import styles from "./footer.module.css";

// Iconos SVG livianos
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 8a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.5 1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}
function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}
function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M16 3a5 5 0 0 0 .4 2 5 5 0 0 0 3.6 3.1v3.1a8.3 8.3 0 0 1-4-1.2v5.9A6 6 0 1 1 10 9a6.2 6.2 0 0 1 1 .08v3.2A3 3 0 1 0 13 15V3z"
      />
    </svg>
  );
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      />
    </svg>
  );
}
function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M13 10h3l-.5 3H13v8h-3v-8H8v-3h2V8.5A4.1 4.1 0 0 1 14.5 4H17v3h-2a1 1 0 0 0-1 1z"
      />
    </svg>
  );
}

export default function Footer() {
  const phoneHref = "tel:+593994862959";
  const mapsHref = "https://maps.app.goo.gl/Ap751tdGSj8Cittm6";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Columna 1: Horarios */}
          <div>
            <h4 className={styles.h4}>Horarios</h4>
            <p className={styles.muted}>Lun - Vie: 12:00 – 22:00</p>
            <p className={styles.muted}>Sáb - Dom: 11:00 – 23:00</p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className={styles.h4}>Contáctanos</h4>
            <p className={styles.muted}>
              <IconPhone className={styles.inlineIcon} />{" "}
              <a className={styles.link} href={phoneHref}>
                099 486 2959
              </a>
            </p>
            <p className={styles.muted}>
              <IconMapPin className={styles.inlineIcon} />{" "}
              <a
                className={styles.link}
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                González Suárez, Quito (Ver mapa)
              </a>
            </p>
          </div>

          {/* Columna 3: Redes + Legal */}
          <div>
            <h4 className={styles.h4}>Síguenos</h4>
            <div className={styles.socials} aria-label="Redes sociales">
              <a
                className={styles.socialBtn}
                href="https://www.tiktok.com/@elsantuariodelgloton"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok"
              >
                <IconTikTok />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.instagram.com/elsantuariodelgloton/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                className={styles.socialBtn}
                href="https://www.facebook.com/p/El-Santuario-Del-Glot%C3%B3n-593-100087392508108/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <IconFacebook />
              </a>
            </div>

            <h4 className={styles.h4} style={{ marginTop: 16 }}>
              Legal
            </h4>
            <a href="#" className={styles.link}>
              Política de privacidad
            </a>
            <a href="#" className={styles.link}>
              Términos y condiciones
            </a>
          </div>
        </div>

        <div className={styles.copy}>
          © 2025 El Santuario del Glotón. Todos los derechos reservados.
          {/* Crédito opcional de desarrollo:
            <span className={styles.by}> — Sitio por Ricardo Lascano</span>
          */}
        </div>
      </div>
    </footer>
  );
}
