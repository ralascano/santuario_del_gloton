import styles from "./hero.module.css";

export default function Hero() {
  const backgroundUrl = "/images/santuario_del_gloton.jpg";
  //"https://lh3.googleusercontent.com/aida-public/AB6AXuD8KJPwka_Lh94-_t9tZuiw1PkVOJZ2ZhB8wMP11Nacip2fDwAlZXqNoSlYl0v6NZ-NggWs8vNSIJTlzfmQkX_QdkX_VSUaUdOGRvIUrL9kW9Rlfv_ZZvdj4cEr6CmKEP1ELiUGwcAbO4MVhMFytmT_J6VnHy2VV34EfbGl6-L05tIHAFwa0005AuwcYeJzzMGomLUwhZljYxwje6MfY3Te0xIaz8T09RxT32-HOBk7H1dCUpSnVHvcxSmuURSTvlPLjM3D8on3PlA";

  return (
    <section aria-labelledby="hero-title">
      <div
        className={styles.hero}
        style={{ backgroundImage: `url("${backgroundUrl}")` }}
      >
        <div className={styles.overlay} />

        <div className={styles.content}>
          <div className={styles.texts}>
            <h1 id="hero-title" className={styles.title}>
              Comida casera con un toque sagrado y familiar.
            </h1>
            <h2 className={styles.subtitle}>
              Un lugar de paz donde cada bocado se disfruta con pasión.
            </h2>
          </div>

          <div className={styles.actions}>
            <a href="#menu" className="btn btn-primary">
              Haz tu Pedido
            </a>
            <a href="/menu" className="btn">
              Explorar Menú
            </a>
          </div>

          <p className={styles.delivery}>Delivery in 30–45 min</p>
        </div>
      </div>
    </section>
  );
}
