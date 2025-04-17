import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PUBLIC_API_URL } from "../../constants";

type InventoryItem = {
  item_name: string;
  item_type: "oil" | "egg" | "acid" | "mustard";
  stock: number;
};

type InventoryResponse = {
  items: InventoryItem[];
};

// Export this type
export type CollatedInventoryItem = {
  name: string;
  stock: number;
};

export type CollatedInventory = {
  oil: CollatedInventoryItem[];
  egg: CollatedInventoryItem[];
  acid: CollatedInventoryItem[];
  mustard: CollatedInventoryItem[];
};

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function useInventoryQuery() {
  const queryKey = ["inventory"];

  const queryFn = async (): Promise<CollatedInventory> => {
    const response = await axios.get<InventoryResponse>(
      `${PUBLIC_API_URL}/inventory`
    );

    const inventory = response.data.items.reduce(
      (inventory, item) => {
        const { item_name, item_type, stock } = item;
        inventory[item_type].push({
          name: stock === 0 ? `${item_name} - sold out` : item_name,
          stock,
        });

        return inventory;
      },
      {
        oil: [],
        egg: [],
        acid: [],
        mustard: [],
      } as CollatedInventory
    );

    // shuffle the items in each category
    (Object.keys(inventory) as Array<keyof CollatedInventory>).forEach(
      (category) => {
        inventory[category] = shuffle(inventory[category]);
      }
    );

    return inventory;
  };

  return useQuery({ queryKey, queryFn });
}

// Export the hook as default and the types as named exports
export { CollatedInventoryItem };
export default useInventoryQuery;
