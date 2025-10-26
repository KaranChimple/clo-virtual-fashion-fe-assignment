import React from "react";
import { Container } from "components/layout/Container";
import styles from "./Header.module.css";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title = "CLO-SET Store",
  subtitle = "Discover amazing fashion designs",
}) => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.header__content}>
          <div className={styles.header__branding}>
            <h1 className={styles.header__title}>{title}</h1>
            {subtitle && <p className={styles.header__subtitle}>{subtitle}</p>}
          </div>
        </div>
      </Container>
    </header>
  );
};
