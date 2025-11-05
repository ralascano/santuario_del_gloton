import styles from "./contact.module.css";

// Iconos SVG livianos (sin dependencias) — versión JS/JSX
function IconMapPin(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
      />
    </svg>
  );
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.5.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 8a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.5 1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5z"
      />
    </svg>
  );
}
function IconTikTok(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M16 3a5 5 0 0 0 .4 2 5 5 0 0 0 3.6 3.1v3.1a8.3 8.3 0 0 1-4-1.2v5.9A6 6 0 1 1 10 9a6.2 6.2 0 0 1 1 .08v3.2A3 3 0 1 0 13 15V3z"
      />
    </svg>
  );
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
      />
    </svg>
  );
}
function IconFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M13 10h3l-.5 3H13v8h-3v-8H8v-3h2V8.5A4.1 4.1 0 0 1 14.5 4H17v3h-2a1 1 0 0 0-1 1z"
      />
    </svg>
  );
}

export default function ContactSection() {
  const mapsShareUrl = "https://maps.app.goo.gl/Ap751tdGSj8Cittm6";
  // Embed simple por dirección (no requiere API key)
  const mapsEmbedSrc =
    "https://www.google.com/maps?output=embed&q=loc:-0.2977643091754434,-78.46972471560817&z=17&hl=es";

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className={styles.grid}>
          {/* Columna de datos */}
          <div>
            <h2 id="contact-title" className={styles.title}>
              Visítanos o contáctanos
            </h2>

            <div className={styles.list} role="list">
              <div className={styles.row} role="listitem">
                <span className={styles.icon} aria-hidden>
                  <IconMapPin />
                </span>
                <p className={styles.text}>
                  González Suárez, Quito{" "}
                  <a
                    className={styles.link}
                    href={mapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir ubicación en Google Maps"
                  >
                    Ver en Google Maps
                  </a>
                </p>
              </div>

              <div className={styles.row} role="listitem">
                <span className={styles.icon} aria-hidden>
                  <IconPhone />
                </span>
                <p className={styles.text}>
                  <a className={styles.link} href="tel:+593994862959">
                    099 486 2959
                  </a>
                </p>
              </div>

              <div className={styles.row} role="listitem">
                <span className={styles.icon} aria-hidden>
                  <IconMail />
                </span>
                <p className={styles.text}>
                  <a
                    className={styles.link}
                    href="mailto:info@elsantuariodelgloton.com"
                  >
                    info@elsantuariodelgloton.com
                  </a>{" "}
                  <span className={styles.muted}>(genérico)</span>
                </p>
              </div>
            </div>

            {/* Redes sociales */}
            <div className={styles.socials} aria-label="Redes sociales">
              <a
                href="https://www.tiktok.com/@elsantuariodelgloton"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={styles.socialBtn}
                title="TikTok"
              >
                <IconTikTok />
              </a>
              <a
                href="https://www.instagram.com/elsantuariodelgloton/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialBtn}
                title="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                href="https://www.facebook.com/p/El-Santuario-Del-Glot%C3%B3n-593-100087392508108/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialBtn}
                title="Facebook"
              >
                <IconFacebook />
              </a>
            </div>
          </div>

          {/* Columna del mapa */}
          <div>
            <div className={styles.mapWrap}>
              <iframe
                className={styles.mapFrame}
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Mapa de ubicación en Google Maps"
              />
            </div>

            {/* CTA alternativo para abrir Maps nativo (móvil) */}
            <div className={styles.mapCta}>
              <a
                href={mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
