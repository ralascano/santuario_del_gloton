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
            name="Usuario 1"
            stars={5}
            text="Porque es muy limpio y la comida es muy grande, es muy sabrosa y porque me encanta..."
            videoSrc="/videos/reviews/type-1.mp4" // mp4
            videoThumbnail="/videos/avatarreviews/type-1-thumb.png" // imagen
            videoDuration="0:24"
            aspectRatio="16 / 9"
          />

          <ReviewCard
            avatar="/videos/avatarreviews/type-2.png" // imagen
            name="Usuario 2"
            stars={5}
            text="Por calidad, experiencia y atención. Muy recomendado, sabroso y te vas completamente satisfecho..."
            videoSrc="/videos/reviews/type-2.mp4" // mp4
            videoThumbnail="/videos/avatarreviews/type-2-thumb.png" // imagen
            videoDuration="0:24"
            aspectRatio="16 / 9"
          />

          <ReviewCard
            avatar="/videos/avatarreviews/type-3.png" // imagen
            name="Usuario 3"
            stars={5}
            text="Bueno, a nosotros nos encanta su comida porque es fresca, tiene los sabores súper equilibrados, realmente salimos..."
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
