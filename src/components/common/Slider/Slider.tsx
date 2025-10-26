import React, { useState, useEffect, useRef } from "react";
import styles from "./Slider.module.css";

export interface SliderProps {
  min: number;
  max: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  formatValue = (val) => val.toString(),
  disabled = false,
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(thumb);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      if (isDragging === "min") {
        onChange({
          min: Math.min(newValue, value.max - step),
          max: value.max,
        });
      } else if (isDragging === "max") {
        onChange({
          min: value.min,
          max: Math.max(newValue, value.min + step),
        });
      }
    };
    const handleMouseUp = () => setIsDragging(null);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, value, min, max, step, onChange]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isDragging) return;
    const newValue = getValueFromPosition(e.clientX);
    const midPoint = (value.min + value.max) / 2;
    if (newValue < midPoint) {
      onChange({ min: Math.min(newValue, value.max - step), max: value.max });
    } else {
      onChange({ min: value.min, max: Math.max(newValue, value.min + step) });
    }
  };

  const minPercentage = getPercentage(value.min);
  const maxPercentage = getPercentage(value.max);

  return (
    <div
      className={`${styles.sliderRow} ${
        disabled ? styles["slider--disabled"] : ""
      } ${className}`}
    >
      {label && <label className={styles.slider__label}>{label}</label>}
      <span className={styles.sliderValue}>{formatValue(value.min)}</span>
      <div
        className={styles.slider__track}
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <div className={styles.slider__track_bg} />
        <div
          className={styles.slider__track_active}
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
        <button
          type="button"
          className={`${styles.slider__thumb} ${
            isDragging === "min" ? styles["slider__thumb--dragging"] : ""
          }`}
          style={{ left: `${minPercentage}%` }}
          onMouseDown={handleMouseDown("min")}
          disabled={disabled}
          aria-label={`Minimum value: ${formatValue(value.min)}`}
        >
          <span className={styles.slider__thumb_tooltip}>
            {formatValue(value.min)}
          </span>
        </button>
        <button
          type="button"
          className={`${styles.slider__thumb} ${
            isDragging === "max" ? styles["slider__thumb--dragging"] : ""
          }`}
          style={{ left: `${maxPercentage}%` }}
          onMouseDown={handleMouseDown("max")}
          disabled={disabled}
          aria-label={`Maximum value: ${formatValue(value.max)}`}
        >
          <span className={styles.slider__thumb_tooltip}>
            {formatValue(value.max)}
          </span>
        </button>
      </div>
      <span className={styles.sliderValue}>{formatValue(value.max)}</span>
    </div>
  );
};
