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
    reset,
    formState: { isSubmitSuccessful, errors },
    // watch, // Removed unused 'watch' as it causes typecheck error
  } = useForm<SubmitOrderRequest>();

  // State for selected preset
  const [selectedPreset, setSelectedPreset] = React.useState<string>("");

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
    setSelectedPreset("");
    ["oil", "egg", "acid", "mustard"].forEach((item) => {
      const catTyped = item as keyof typeof inventory;
      const options = inventory[catTyped];
      const availableOptions = options.filter((option: { stock: number }) => option.stock > 0);
      
      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        setValue(item as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
      } else {
        setValue(item as keyof SubmitOrderRequest, "");
      }
    });
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

      {/* Preset selector */}
      <div className="mb-4 sm:mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">Preset combinations
          <select
            value={selectedPreset}
            onChange={e => {
              const value = e.target.value;
              setSelectedPreset(value);
              if (!value) {
                reset();
                return;
              }
              const preset = PRESET_COMBINATIONS.find(p => p.value === value);
              if (!preset) return;
              // Only set if all ingredients in stock
              const allInStock = ["oil","egg","acid","mustard"].every((cat) => {
                const catTyped = cat as keyof typeof inventory;
                return inventory && inventory[catTyped].some((opt: { stock: number; name: string }) =>
                  opt.stock > 0 && opt.name === preset[cat as keyof typeof preset]
                );
              });
              if (allInStock) {
                (['oil', 'egg', 'acid', 'mustard'] as const).forEach(cat => setValue(cat, preset[cat]));
              } else {
                reset();
              }
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base"
          >
            <option value="">Select preset...</option>
            {PRESET_COMBINATIONS.map(preset => {
              // Disabled if any ingredient not in stock
              const allInStock = ["oil","egg","acid","mustard"].every((cat) => {
                const catTyped = cat as keyof typeof inventory;
                return inventory && inventory[catTyped].some((opt: { stock: number; name: string }) =>
                  opt.stock > 0 && opt.name === preset[cat as keyof typeof preset]
                );
              });
              return <option key={preset.value} value={preset.value} disabled={!allInStock}>{preset.label}</option>
            })}
          </select>
        </label>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        
        {['oil', 'egg', 'acid', 'mustard'].map((item) => (
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

        <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Randomize
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
