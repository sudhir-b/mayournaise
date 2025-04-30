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

const InventorySelector: React.FC<InventorySelectorProps = ({
  title,
  items,
  selected,
  setSelected,
}) => {
  return (
    <label>
      {title}:
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
      >
        {items.map((item) => (
          <option key={item.name} value={item.name} disabled={item.stock === 0} className="pl-2">
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InventorySelector;
