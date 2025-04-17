import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery, { CollatedInventory } from "./hooks/queries/useInventoryQuery";
import { useEffect, useRef } from "react";

// Helper function to set random values
const selectRandomIngredients = (
  inventory: CollatedInventory,
  setValue: UseFormSetValue<SubmitOrderRequest>
) => {
  const categories: (keyof CollatedInventory)[] = ["oil", "egg", "acid", "mustard"];
  categories.forEach(category => {
    const availableOptions = inventory[category].filter(option => option.stock > 0);
    if (availableOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      const randomOption = availableOptions[randomIndex];
      const originalName = randomOption.name.replace(' - sold out', '');
      setValue(category, originalName, { shouldValidate: false, shouldDirty: true });
    } else {
       setValue(category, "", { shouldValidate: false, shouldDirty: true });
    }
  });
};


function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest>({
    defaultValues: {
      email_address: ""
    }
  });

  const initialRandomizationDone = useRef(false);

  useEffect(() => {
    if (inventory && !isLoading && !initialRandomizationDone.current) {
      selectRandomIngredients(inventory, setValue);
      initialRandomizationDone.current = true;
    }
  }, [inventory, isLoading, setValue]);


  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    submitOrderMutation.mutate(data, {
      onError: () => {
        // TODO: handle error
        // errorToast("Failed to submit order");
      },
      onSuccess: () => {
      }
    });
  };

  const handleRandomize = () => {
    if (!inventory) return;

    selectRandomIngredients(inventory, setValue);

    if (isSubmitSuccessful) {
       reset(undefined, { keepErrors: true, keepDirty: true, keepTouched: true, keepIsValid: true, keepSubmitCount: false });
    }
  };


  if (isLoading && !inventory)
    return <p className="text-center text-lg">Loading inventory...</p>;
  if (!inventory && !isLoading)
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load inventory. Cannot set initial values.
      </p>
    );
 if (!inventory) {
     return <p className="text-center text-lg">Preparing mayonnaise options...</p>;
 }


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
        {( ["oil", "egg", "acid", "mustard"] as const ).map((item) => (
          <label key={item} className="block">
            <span className="font-medium capitalize text-sm sm:text-base">
              {item}
            </span>
            <select
              {...register(item, {
                required: `Please select an ${item}`,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-sm sm:text-base outline outline-1 outline-gray-300"
            >
              <option value="" disabled>Select {item}</option>
              {inventory[item].map((option) => (
                <option
                  key={option.name}
                  value={option.name.replace(' - sold out', '')}
                  disabled={option.stock === 0}
                >
                  {option.stock === 0 ? `${option.name.replace(" - sold out", "")} (Sold Out)` : option.name}
                </option>
              ))}
            </select>
             {errors[item] && (
                <span className="text-red-500 text-xs sm:text-sm">
                  {errors[item]?.message}
                </span>
              )}
          </label>
        ))}

        {/* Email input */}
        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base">
          Email
          <input
            type="email"
            placeholder="your@email.com"
            {...register("email_address", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm">
            {errors.email_address.message}
          </span>
        )}

        {/* Disclaimers */}
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

        {/* Randomize button */}
        <button
          type="button"
          onClick={handleRandomize}
          className="w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 text-white mb-2 sm:mb-3"
        >
          Randomize Ingredients
        </button>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitSuccessful || submitOrderMutation.isPending}
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base ${ 
            isSubmitSuccessful || submitOrderMutation.isPending
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {submitOrderMutation.isPending ? "Reserving..." : isSubmitSuccessful ? "Reserved!" : "Reserve"}
        </button>
      </form>
    </div>
  );
}

// QueryClient setup and App component remain the same
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mayournaise />
    </QueryClientProvider>
  );
}

export default App;
