import React, { useEffect, useRef } from "react";
import { useContentStore } from "store";
import { useURLSync, useInfiniteScroll } from "hooks";
import { Header, Container } from "components/layout";
import {
  ContentGrid,
  ContentFilters,
  EmptyState,
  SortDropdown,
} from "components/content";
import styles from "./StorePage.module.css";

export const StorePage: React.FC = () => {
  const {
    shownItems,
    filteredItems,
    filters,
    setFilters,
    resetFilters,
    fetchAllContent,
    showMore,
    isLoading,
    hasMore,
  } = useContentStore();

  const { updateURL, getFiltersFromURL } = useURLSync();
  const isInitialMount = useRef(true);

  const sentinelRef = useInfiniteScroll(
    () => {
      if (hasMore && !isLoading) {
        showMore();
      }
    },
    {
      enabled: hasMore && !isLoading,
    }
  );

  useEffect(() => {
    if (isInitialMount.current) {
      const urlFilters = getFiltersFromURL();
      setFilters(urlFilters);
      fetchAllContent();
      isInitialMount.current = false;
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      updateURL(filters);
    }
  }, [filters, updateURL]);

  return (
    <div className={styles.page}>
      <Header />
      <Container>
        <div className={styles.pageContent}>
          <div className={styles.filterCard}>
            <ContentFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
              resultCount={filteredItems.length}
              isLoading={isLoading}
            />
          </div>
          {isLoading && shownItems.length === 0 && (
            <ContentGrid items={[]} isLoading skeletonCount={12} />
          )}
          <div className={styles.sortBar}>
            <SortDropdown
              value={filters.sortBy}
              onChange={(sort) => setFilters({ sortBy: sort })}
            />
          </div>
          {!isLoading && shownItems.length > 0 && (
            <>
              <ContentGrid items={shownItems} />
              {hasMore && <div ref={sentinelRef} style={{ height: 24 }} />}
            </>
          )}
          {!isLoading && shownItems.length === 0 && (
            <EmptyState title="No items found" />
          )}
        </div>
      </Container>
    </div>
  );
};
