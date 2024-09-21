import React from "react";

interface InventoryItem {
  name: string;
  stock: number;
}

interface InventorySelectorProps {
  title: string;
  items: InventoryItem[];
  selected: string;
  setSelected: (value: string) => void;
}

const InventorySelector: React.FC<InventorySelectorProps> = ({
  title,
  items,
  selected,
  setSelected,
}) => {
  return (
    <label>
      {title}:
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {items.map((item) => (
          <option key={item.name} value={item.name} disabled={item.stock === 0}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InventorySelector;
