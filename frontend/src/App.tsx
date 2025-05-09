import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery from "./hooks/queries/useInventoryQuery";
import { PRESET_COMBINATIONS } from "./constants";

function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest & { preset?: string }>();

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    submitOrderMutation.mutate(data, {
      onError: () => {
        // TODO: handle error
        // errorToast("Failed to submit order");
      },
    });
  };
  
  // Watch for changes in the preset dropdown
  const selectedPreset = watch("preset");

  // Effect to apply preset when it changes
  React.useEffect(() => {
    if (!selectedPreset || !inventory) return;
    
    const preset = PRESET_COMBINATIONS.find(p => p.name === selectedPreset);
    if (!preset) return;
    
    console.log("Applying preset:", preset.name);
    
    // Set basic ingredients if they're in stock
    ["oil", "egg", "acid", "mustard"].forEach((item) => {
      const itemValue = preset[item as keyof typeof preset] as string;
      const itemExists = inventory[item as keyof typeof inventory].some(
        option => option.name === itemValue && option.stock > 0
      );
      
      if (itemExists) {
        console.log(`Setting ${item} to ${itemValue}`);
        setValue(item as keyof SubmitOrderRequest, itemValue);
      } else {
        console.log(`${itemValue} not available for ${item}`);
      }
    });
    
    // Set extras if they're in stock
    setValue("extras", []);
    if (preset.extras && preset.extras.length > 0) {
      const availableExtras = preset.extras.filter(extra => 
        inventory.extra.some(option => option.name === extra && option.stock > 0)
      );
      
      if (availableExtras.length > 0) {
        console.log("Setting extras to:", availableExtras);
        setValue("extras", availableExtras);
      }
    }
  }, [selectedPreset, inventory, setValue]);

  const randomizeIngredients = () => {
    if (!inventory) return;
    
    // Clear preset selection
    setValue("preset", "");
    
    ["oil", "egg", "acid", "mustard"].forEach((item) => {
      const options = inventory[item as keyof typeof inventory];
      const availableOptions = options.filter(option => option.stock > 0);
      
      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        setValue(item as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
      }
    });
    
    // Clear any previous extras
    setValue("extras", []);
    
    // Randomly select 0-3 extras
    const extraOptions = inventory.extra.filter(option => option.stock > 0);
    if (extraOptions.length > 0) {
      const numExtras = Math.floor(Math.random() * Math.min(4, extraOptions.length));
      if (numExtras > 0) {
        // Shuffle and take the first numExtras
        const selectedExtras = shuffle([...extraOptions])
          .slice(0, numExtras)
          .map(option => option.name);
        setValue("extras", selectedExtras);
      }
    }
  };
  
  // Helper function to shuffle an array
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  if (isLoading)
    return <p className="text-center text-lg">Loading inventory...</p>;
  if (!inventory)
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load inventory.
      </p>
    );

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
        className="space-y-4 sm:space-y-6"
      >
        <div className="mb-4">
          <label className="block">
            <span className="font-medium text-sm sm:text-base">Preset Combinations</span>
            <select
              {...register("preset")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
            >
              <option value="">Select a preset combination</option>
              {PRESET_COMBINATIONS.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-gray-500 mt-1">
            Selecting a preset will auto-fill ingredients if they're in stock
          </p>
        </div>
        
        {["oil", "egg", "acid", "mustard"].map((item) => (
          <label key={item} className="block">
            <span className="font-medium capitalize text-sm sm:text-base">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
            >
              {inventory[item as keyof typeof inventory].map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
                  className="pl-2"
                >
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        ))}
        
        {inventory.extra.length > 0 && (
          <div className="mt-4">
            <label className="block">
              <span className="font-medium text-sm sm:text-base">Extras (Optional)</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {inventory.extra.map((extra) => (
                  <div key={extra.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`extra-${extra.name}`}
                      value={extra.name}
                      disabled={extra.stock === 0}
                      {...register("extras")}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label 
                      htmlFor={`extra-${extra.name}`} 
                      className={`text-sm ${extra.stock === 0 ? 'text-gray-400' : ''}`}
                    >
                      {extra.name}
                    </label>
                  </div>
                ))}
              </div>
            </label>
          </div>
        )}

        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base">
          Email
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm">
            This field is required
          </span>
        )}

        <div className="mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700 bg-gray-100 p-4 rounded-md border border-gray-300">
          <h2 className="font-bold uppercase mb-2">Disclaimers</h2>
          <p>
            For legal reasons, this isn't a food business
            <br />
            You are solely responsible for the resulting taste
            <br />
            If I don't know you, you probably won't get your mayo (sorry)
          </p>
        </div>

        <div className="grid gap-4 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            🪄 Randomize Ingredients
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base ${
              isSubmitSuccessful
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {isSubmitSuccessful ? "Reserved!" : "Reserve"}
          </button>
        </div>
      </form>
    </div>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mayournaise />
    </QueryClientProvider>
  );
}

export default App;
