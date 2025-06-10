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
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="mt-1 block w-full rounded-xl border-[#eddc9f] shadow-lg shadow-[#f0ecd0] bg-[#fffbe7] focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-80 py-2 px-3 text-sm sm:text-base outline outline-1 outline-[#dbc26a] border-2"
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
