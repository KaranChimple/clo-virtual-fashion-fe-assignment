import { Select } from "components/common";
import styles from "./SortDropdown.module.css";
import { SortOption } from "types";

const options = [
  { value: SortOption.NAME, label: "Item Name" },
  { value: SortOption.PRICE_HIGH_LOW, label: "Higher Price" },
  { value: SortOption.PRICE_LOW_HIGH, label: "Lower Price" },
];

export const SortDropdown = ({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) => {
  const handleSortChange = (value: string) => {
    onChange(value as SortOption);
  };

  return (
    <div className={styles.sortDropdown}>
      <Select
        label="Sort By"
        options={options}
        value={value}
        onChange={handleSortChange}
      />
    </div>
  );
};
