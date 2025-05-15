import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react"; // Added for managing preset alert
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery from "./hooks/queries/useInventoryQuery";
import { PRESET_COMBINATIONS } from "./constants"; // Import presets

// Define type for individual inventory items (used in lambdas)
interface CollatedInventoryItem {
  name: string;
  stock: number;
}

function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset, // Added for resetting form
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest>();
  const [showPresetAlert, setShowPresetAlert] = useState(false); // State for preset alert

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    submitOrderMutation.mutate(data, {
      onError: () => {
        // TODO: handle error
        // errorToast("Failed to submit order");
      },
    });
  };

  const randomizeIngredients = () => {
    if (!inventory) return;

    ["oil", "egg", "acid", "mustard"].forEach((item) => {
      const options = inventory[item as keyof typeof inventory];
      const availableOptions = options.filter((option: CollatedInventoryItem) => option.stock > 0);

      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        setValue(item as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
      }
    });

    // Also randomize extras (0-3 extras)
    if (inventory.extra && inventory.extra.length > 0) {
      const availableExtras = inventory.extra.filter((e: CollatedInventoryItem) => e.stock > 0);
      const numExtrasToSelect = Math.floor(Math.random() * Math.min(4, availableExtras.length + 1));
      const selectedExtras: string[] = [];
      const shuffledExtras = [...availableExtras].sort(() => 0.5 - Math.random());
      for (let i = 0; i < numExtrasToSelect; i++) {
        selectedExtras.push(shuffledExtras[i].name);
      }
      setValue("extras", selectedExtras);
    } else {
      setValue("extras", []);
    }
  };

  const handlePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowPresetAlert(false); // Hide alert on new selection
    const presetName = event.target.value;
    if (!presetName) {
      reset(); // Reset form if no preset is selected
      return;
    }

    const selectedPreset = PRESET_COMBINATIONS.find(p => p.name === presetName);
    if (!selectedPreset || !inventory) return;

    // Check stock for all ingredients in the preset
    const isOutOfStock =
      !inventory.oil.find((i: CollatedInventoryItem) => i.name === selectedPreset.oil && i.stock > 0) ||
      !inventory.egg.find((i: CollatedInventoryItem) => i.name === selectedPreset.egg && i.stock > 0) ||
      !inventory.acid.find((i: CollatedInventoryItem) => i.name === selectedPreset.acid && i.stock > 0) ||
      !inventory.mustard.find((i: CollatedInventoryItem) => i.name === selectedPreset.mustard && i.stock > 0) ||
      selectedPreset.extras.some(extraName => {
        const extraItem = inventory.extra?.find((e: CollatedInventoryItem) => e.name === extraName);
        return !extraItem || extraItem.stock === 0;
      });

    if (isOutOfStock) {
      setShowPresetAlert(true);
      reset(); // Reset form because preset is out of stock
      return;
    }

    setValue("oil", selectedPreset.oil);
    setValue("egg", selectedPreset.egg);
    setValue("acid", selectedPreset.acid);
    setValue("mustard", selectedPreset.mustard);
    setValue("extras", selectedPreset.extras || []);
  };


  if (isLoading)
    return <p className="text-center text-lg">Loading inventory...</p>;
  if (!inventory)
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load inventory.
      </p>
    );

  const availableExtras = inventory.extra?.filter((e: CollatedInventoryItem) => e.stock > 0) || [];

  return (
    <div className="text-center max-w-md mx-auto px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="text-6xl sm:text-6xl font-bold text-center mb-2 sm:mb-3">
        Ma<i className="text-yellow-500">your</i>naise
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
        A silly project by Sudhir
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6 bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        {/* Preset Selector */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-sm sm:text-base text-gray-700">
            Preset Combinations
          </label>
          <select
            onChange={handlePresetChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300 hover:border-gray-400 focus:outline-indigo-500"
          >
            <option value="">-- Select a Preset --</option>
            {PRESET_COMBINATIONS.map((preset) => {
              const isOutOfStock =
                !inventory.oil.find((i: CollatedInventoryItem) => i.name === preset.oil && i.stock > 0) ||
                !inventory.egg.find((i: CollatedInventoryItem) => i.name === preset.egg && i.stock > 0) ||
                !inventory.acid.find((i: CollatedInventoryItem) => i.name === preset.acid && i.stock > 0) ||
                !inventory.mustard.find((i: CollatedInventoryItem) => i.name === preset.mustard && i.stock > 0) ||
                preset.extras.some(extraName => {
                  const extraItem = inventory.extra?.find((e: CollatedInventoryItem) => e.name === extraName);
                  return !extraItem || extraItem.stock === 0;
                });
              return (
                <option key={preset.name} value={preset.name} disabled={isOutOfStock}>
                  {preset.name} {isOutOfStock ? "(Out of Stock)" : ""}
                </option>
              );
            })}
          </select>
          {showPresetAlert && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              This preset is currently out of stock. Some ingredients may not be available.
            </p>
          )}
        </div>

        {["oil", "egg", "acid", "mustard"].map((item) => (
          <label key={item} className="block">
            <span className="font-medium capitalize text-sm sm:text-base text-gray-700">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300 hover:border-gray-400 focus:outline-indigo-500"
            >
              {inventory[item as keyof typeof inventory].map((option: CollatedInventoryItem) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
                  className="pl-2"
                >
                  {option.name} ({option.stock} left)
                </option>
              ))}
            </select>
          </label>
        ))}

        {/* Extras Section */}
        {availableExtras.length > 0 && (
          <div className="pt-2">
            <label className="block mb-2 font-medium text-sm sm:text-base text-gray-700">
              Extras (Optional)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {inventory.extra?.map((extra: CollatedInventoryItem) => (
                <label
                  key={extra.name}
                  className={`flex items-center space-x-2 p-2 rounded-md border transition-all duration-200 ease-in-out ${
                    extra.stock === 0
                      ? "bg-gray-100 cursor-not-allowed opacity-60"
                      : "bg-white hover:border-yellow-500 hover:shadow-sm cursor-pointer"
                  } border-gray-300`}
                >
                  <input
                    type="checkbox"
                    value={extra.name}
                    {...register("extras")}
                    disabled={extra.stock === 0}
                    className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 border-gray-300 rounded focus:ring-yellow-400 disabled:opacity-50"
                  />
                  <span className={`text-xs sm:text-sm ${extra.stock === 0 ? "text-gray-500" : "text-gray-800"}`}>
                    {extra.name} ({extra.stock} left)
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}


        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base text-gray-700">
          Email
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300 hover:border-gray-400 focus:outline-indigo-500"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm">
            This field is required
          </span>
        )}

        <div className="mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700 bg-gray-100 p-3 sm:p-4 rounded-md border border-gray-200">
          <h2 className="font-bold uppercase mb-2 text-gray-800">Disclaimers</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>For legal reasons, this isn't a food business.</li>
            <li>You are solely responsible for the resulting taste.</li>
            <li>If I don't know you, you probably won't get your mayo (sorry).</li>
           </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6 pt-2">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="py-2 sm:py-3 px-3 sm:px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Randomize 🪄
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful || submitOrderMutation.isPending}
            className={`py-2 sm:py-3 px-3 sm:px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base transition-colors duration-200 ease-in-out transform hover:scale-105 ${
              isSubmitSuccessful || submitOrderMutation.isPending
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSubmitSuccessful ? "Reserved! 🎉" : submitOrderMutation.isPending ? "Reserving..." : "Reserve Mayo"}
          </button>
        </div>
      </form>
       <footer className="mt-10 sm:mt-12 text-center text-xs sm:text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Mayournaise Inc. All rights reserved (not really).</p>
      </footer>
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-yellow-50 to-orange-200 font-sans selection:bg-yellow-500 selection:text-white">
        <Mayournaise />
      </div>
    </QueryClientProvider>
  );
}

export default App;
