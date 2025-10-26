import React from "react";
import { ContentItem } from "types";
import {
  ContentCard,
  ContentCardSkeleton,
} from "components/content/ContentCard";
import styles from "./ContentGrid.module.css";

export interface ContentGridProps {
  items: ContentItem[];
  isLoading?: boolean;
  skeletonCount?: number;
  onItemClick?: (item: ContentItem) => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  items,
  isLoading = false,
  skeletonCount = 8,
  onItemClick,
}) => {
  if (isLoading && items.length === 0) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ContentCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ContentCard key={item.id} item={item} onClick={onItemClick} />
      ))}
    </div>
  );
};
