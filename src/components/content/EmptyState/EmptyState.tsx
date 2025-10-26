import React from "react";
import { Button } from "components/common/Button";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  message = "Try adjusting your filters or search terms",
  icon,
  action,
}) => {
  return (
    <div className={styles.empty}>
      {icon && <div className={styles.empty__icon}>{icon}</div>}
      {!icon && (
        <div className={styles.empty__icon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      )}
      <h3 className={styles.empty__title}>{title}</h3>
      <p className={styles.empty__message}>{message}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
