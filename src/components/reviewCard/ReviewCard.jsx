import { useRef, useState } from "react";
import styles from "./reviews.module.css";

export default function ReviewCard({
  avatar,
  name,
  stars = 5,
  text,
  videoSrc,
  videoThumbnail,
  videoDuration,
  aspectRatio = "16 / 9",
}) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = muted;
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.then(() => setPlaying(true)).catch((err) => {
        console.error("play() falló:", err);
      });
    } else {
      setPlaying(true);
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  };

  // Stop real: pausa + vuelve al inicio
  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  const handleWrapperClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) playVideo();
    else pauseVideo();
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  };

  const handlePauseBtn = (e) => {
    e.stopPropagation();
    pauseVideo();
  };

  const handlePlayBtn = (e) => {
    e.stopPropagation();
    playVideo();
  };

  const handleStopBtn = (e) => {
    e.stopPropagation();
    stopVideo();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={avatar} alt={`Avatar of ${name}`} className={styles.avatar} />
        <div>
          <p className={styles.name}>{name}</p>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < stars ? "" : styles.starOff}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.text}>{text}</p>

      {videoSrc && (
        <div
          className={styles.videoWrapper}
          style={{ aspectRatio }}
          onClick={handleWrapperClick}
        >
          <video
            ref={videoRef}
            className={styles.video}
            poster={videoThumbnail}
            muted={muted}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>

          {/* Overlay inicial */}
          {!playing && (
            <>
              <div className={styles.videoOverlay}>
                <div className={styles.playButton}>▶</div>
              </div>
              {videoDuration && (
                <div className={styles.videoDuration}>{videoDuration}</div>
              )}
            </>
          )}

          {/* Controles */}
          <div
            className={styles.videoControls}
            onClick={(e) => e.stopPropagation()}
          >
            {!playing ? (
              <button type="button" onClick={handlePlayBtn} aria-label="Play">
                ▶
              </button>
            ) : (
              <button type="button" onClick={handlePauseBtn} aria-label="Pause">
                ❚❚
              </button>
            )}

            <button type="button" onClick={handleStopBtn} aria-label="Stop">
              ⏹
            </button>

            <button
              type="button"
              onClick={handleMuteToggle}
              aria-label="Mute toggle"
            >
              {muted ? "🔇" : "🔊"}
            </button>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
