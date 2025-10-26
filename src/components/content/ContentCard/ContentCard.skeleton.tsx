import React from "react";
import styles from "./ContentCard.module.css";
import skeletonStyles from "./ContentCard.skeleton.module.css";

export const ContentCardSkeleton: React.FC = () => {
  return (
    <div className={`${styles.card} ${skeletonStyles.skeleton}`}>
      <div
        className={`${styles.card__image_wrapper} ${skeletonStyles.skeleton__image}`}
      />
      <div className={styles.card__content}>
        <div
          className={`${skeletonStyles.skeleton__title} ${skeletonStyles.skeleton__shimmer}`}
        />
        <div className={styles.card__author}>
          <div
            className={`${skeletonStyles.skeleton__avatar} ${skeletonStyles.skeleton__shimmer}`}
          />
          <div
            className={`${skeletonStyles.skeleton__text} ${skeletonStyles.skeleton__shimmer}`}
          />
        </div>
        <div className={styles.card__footer}>
          <div
            className={`${skeletonStyles.skeleton__stats} ${skeletonStyles.skeleton__shimmer}`}
          />
          <div
            className={`${skeletonStyles.skeleton__price} ${skeletonStyles.skeleton__shimmer}`}
          />
        </div>
      </div>
    </div>
  );
};
