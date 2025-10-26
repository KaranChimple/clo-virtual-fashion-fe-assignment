import React from "react";
import styles from "./Container.module.css";

export interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "xl",
  className = "",
}) => {
  return (
    <div
      className={`${styles.container} ${
        styles[`container--${size}`]
      } ${className}`}
    >
      {children}
    </div>
  );
};
