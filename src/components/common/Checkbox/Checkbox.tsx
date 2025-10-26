import React from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.checkbox} ${className}`}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox__input}
        {...props}
      />
      <label htmlFor={id} className={styles.checkbox__label}>
        <span className={styles.checkbox__box}>
          <svg
            className={styles.checkbox__icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className={styles.checkbox__text}>{label}</span>
      </label>
    </div>
  );
};
