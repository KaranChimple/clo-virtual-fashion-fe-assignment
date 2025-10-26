import React from "react";
import { ContentItem, PricingOption } from "types";
import styles from "./ContentCard.module.css";

export interface ContentCardProps {
  item: ContentItem;
  onClick?: (item: ContentItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.card__image_wrapper}>
        <img
          src={item.imagePath}
          alt={item.title}
          className={styles.card__image}
          loading="lazy"
        />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__row}>
          <div className={styles.card__textgroup}>
            <div className={styles.card__title}>{item.title}</div>
            <div className={styles.card__creator}>{item.creator}</div>
          </div>
        </div>
        <div className={styles.card__price}>
          {item.pricingOption === PricingOption.FREE
            ? "FREE"
            : item.pricingOption === PricingOption.VIEW_ONLY
            ? "VIEW ONLY"
            : `$${
                typeof item.price === "number"
                  ? item.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : "—"
              }`}
        </div>
      </div>
    </article>
  );
};
