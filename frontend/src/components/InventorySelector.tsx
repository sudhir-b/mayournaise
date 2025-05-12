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
    <label className="block">
      <span className="font-medium capitalize text-sm sm:text-base block mb-2 text-amber-800">
        {title}
      </span>
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="glass block w-full rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-3 px-4 text-sm sm:text-base hover:bg-white/40 border-transparent hover:border-white/70 transition-colors duration-300"
      >
        {items.map((item) => (
          <option 
            key={item.name} 
            value={item.name} 
            disabled={item.stock === 0} 
            className="pl-2"
          >
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InventorySelector;
