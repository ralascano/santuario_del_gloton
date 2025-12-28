"use client";
import styles from "./reviews.module.css";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
        <div className={styles.grid}>
          <ReviewCard
            avatar="/videos/avatarreviews/type-1.png" // imagen
            name="María S."
            stars={5}
            text="El encebollado sabe como hecho en casa..."
            videoSrc="/videos/reviews/type-1.mp4" // mp4
            videoThumbnail="/videos/avatarreviews/type-1-thumb.png" // imagen
            videoDuration="0:24"
            aspectRatio="16 / 9"
          />

          <ReviewCard
            avatar="/videos/avatarreviews/type-2.png" // imagen
            name="María S."
            stars={5}
            text="El encebollado sabe como hecho en casa..."
            videoSrc="/videos/reviews/type-2.mp4" // mp4
            videoThumbnail="/videos/avatarreviews/type-2-thumb.png" // imagen
            videoDuration="0:24"
            aspectRatio="16 / 9"
          />

          <ReviewCard
            avatar="/videos/avatarreviews/type-3.png" // imagen
            name="María S."
            stars={5}
            text="El encebollado sabe como hecho en casa..."
            videoSrc="/videos/reviews/type-3.mp4" // mp4
            videoThumbnail="/videos/avatarreviews/type-3-thumb.png" // imagen
            videoDuration="0:24"
            aspectRatio="16 / 9"
          />
        </div>
      </div>
    </section>
  );
}
