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
  icon?: React.ReactNode;
}

const InventorySelector: React.FC<InventorySelectorProps> = ({
  title,
  items,
  selected,
  setSelected,
  icon,
}) => {
  return (
    <label className="block">
      <span className="font-medium capitalize text-sm sm:text-base flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </span>
      <select 
        value={selected} 
        onChange={(e) => setSelected(e.target.value)}
        className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm py-3 px-4 text-sm sm:text-base bg-white outline outline-1 outline-gray-200 transition-all duration-200 hover:border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {items.map((item) => (
          <option 
            key={item.name} 
            value={item.name} 
            disabled={item.stock === 0} 
            className="pl-2"
          >
            {item.name} {item.stock <= 3 && item.stock > 0 ? `(Only ${item.stock} left!)` : ""}
          </option>
        ))}
      </select>
    </label>
  );
};

export default InventorySelector;
