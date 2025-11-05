import styles from "./reviews.module.css";

export default function ReviewCard({ avatar, name, stars = 5, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatar} alt={`Avatar of ${name}`} className={styles.avatar} />
        <div>
          <p className={styles.name}>{name}</p>
          <div className={styles.stars} aria-label={`${stars} stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < stars ? styles.starOn : styles.starOff}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
