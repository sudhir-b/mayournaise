import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef } from "react"; // Import useEffect and useRef
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery from "./hooks/queries/useInventoryQuery";

// Define the ingredient keys more strictly
const INGREDIENT_KEYS: Array<keyof Omit<SubmitOrderRequest, "email_address">> = ["oil", "egg", "acid", "mustard"];

function Mayournaise() {
  const { data: inventory, isLoading, error: inventoryError } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const initialRandomizationDone = useRef(false); // Ref to track initial randomization
  const {
    register,
    handleSubmit,
    setValue, // Destructure setValue
    formState: { isSubmitSuccessful, errors },
    trigger, // Destructure trigger to potentially show errors if needed
  } = useForm<SubmitOrderRequest>({
      // Keep default values empty initially
      defaultValues: {
          oil: "",
          egg: "",
          acid: "",
          mustard: "",
          email_address: ""
      }
  });

  // Helper function to set a random value for an item
  const setRandomValue = (item: keyof Omit<SubmitOrderRequest, "email_address">, shouldValidate: boolean) => {
    if (!inventory) return;

    const optionsList = inventory[item];
    if (!Array.isArray(optionsList)) {
      console.error(`Inventory for ${item} is not an array:`, optionsList);
      return; // Skip this item if data is invalid
    }

    const availableOptions = optionsList.filter(option => option.stock > 0);
    if (availableOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      const randomOption = availableOptions[randomIndex];
      setValue(item, randomOption.name, { shouldValidate: shouldValidate, shouldDirty: true }); // Use passed validation flag
    } else {
       setValue(item, "", { shouldValidate: shouldValidate, shouldDirty: true }); // Clear selection if nothing available
      console.warn(`No available stock for ingredient: ${item}`);
    }
  };

  // Effect for initial randomization on load
  useEffect(() => {
    if (!isLoading && inventory && !initialRandomizationDone.current) {
        INGREDIENT_KEYS.forEach(item => {
            setRandomValue(item, false); // Initial set, don't validate yet
        });
        initialRandomizationDone.current = true; // Mark initial randomization as done
    }
  }, [inventory, isLoading, setValue]); // Dependencies

  // Handler for the randomize button click
  const handleRandomizeClick = () => {
    if (!inventory) {
        console.warn("Cannot randomize: Inventory not loaded yet.");
        return;
    }
    INGREDIENT_KEYS.forEach(item => {
        setRandomValue(item, true); // Manual randomize, trigger validation
    });
  };

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    // RHF handles validation based on rules, this extra check might be redundant
    // const allSelected = INGREDIENT_KEYS.every(key => data[key]);
    // if (!allSelected || !data.email_address) { ... }

    submitOrderMutation.mutate(data, {
      onError: () => {
        console.error("Failed to submit order");
      },
    });
  };


  if (isLoading && !initialRandomizationDone.current) // Show loading only on initial load
    return <p className="text-center text-lg">Loading inventory...</p>;

  // Handle inventory loading error
  if (inventoryError || (!inventory && !isLoading)) // Check error or if loading finished but no inventory
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load inventory. Please try refreshing the page.
      </p>
    );

  // Validate inventory structure only if inventory is loaded
  if (inventory) {
      const hasAllKeys = INGREDIENT_KEYS.every(key => key in inventory && Array.isArray(inventory[key]));
      if (!hasAllKeys) {
          console.error("Inventory data structure is missing required keys or keys are not arrays:", inventory);
          return (
              <p className="text-center text-lg text-red-600">
                  Invalid inventory data received.
              </p>
          );
      }
  }

  // If still loading but inventory exists (e.g., refetching), show form with potentially old data
  // Or if inventory hasn't loaded yet but randomization is done (unlikely state, but safeguard)
  // We need inventory to render the options, so show loading if inventory is missing
  if (!inventory) {
     return <p className="text-center text-lg">Preparing selection...</p>;
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
        {INGREDIENT_KEYS.map((item) => (
          <label key={item} className="block text-left"> {/* Align label text left */}
            <span className="font-medium capitalize text-sm sm:text-base">
              {item}
            </span>
            <select
              {...register(item, {
                required: `${item.charAt(0).toUpperCase() + item.slice(1)} is required.`, // Add specific error message
              })}
              className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-sm sm:text-base outline outline-1 ${errors[item] ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'}`} // Dynamic border color on error
            >
              <option value="" disabled>Select {item}...</option> {/* Placeholder option */}
              {inventory[item]?.map((option) => ( // Added optional chaining for safety
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
                >
                  {option.name} {option.stock === 0 ? "(Out of stock)" : ""}
                </option>
              ))}
            </select>
            {errors[item] && ( // Display error for each select
                <span className="text-red-500 text-xs sm:text-sm block mt-1">{errors[item]?.message}</span>
            )}
          </label>
        ))}

        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base text-left"> {/* Align label text left */}
          Email
          <input
            type="email"
            {...register("email_address", {
                 required: "Email address is required.",
                 pattern: { // Basic email pattern validation
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: "Invalid email address format"
                 }
             })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 ${errors.email_address ? 'border-red-500 outline-red-500' : 'border-gray-300 outline-gray-300'}`} // Dynamic border color
            placeholder="your.email@example.com" // Add placeholder
          />
        </label>
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm block mt-1 text-left"> {/* Align error text left */}
            {errors.email_address.message} {/* Display specific error message */}
          </span>
        )}

        <div className="mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700 bg-gray-100 p-4 rounded-md border border-gray-300 text-left"> {/* Align disclaimer text left */}
          <h2 className="font-bold uppercase mb-2">Disclaimers</h2>
          <p>
            For legal reasons, this isn't a food business
            <br />
            You are solely responsible for the resulting taste
            <br />
            If I don't know you, you probably won't get your mayo (sorry)
          </p>
        </div>

        {/* Randomize Button */}
        <button
          type="button" // Important: type="button" to prevent form submission
          onClick={handleRandomizeClick} // Use specific handler
          className="w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 text-sm sm:text-base mt-2 sm:mt-4 bg-purple-600 hover:bg-purple-700 text-white transition duration-150 ease-in-out" // Added transition
        >
          Randomize Ingredients
        </button>

        <button
          type="submit"
          disabled={isSubmitSuccessful || submitOrderMutation.isPending} // Disable while submitting
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base mt-4 sm:mt-6 transition duration-150 ease-in-out ${ // Added transition
            isSubmitSuccessful || submitOrderMutation.isPending // Adjusted condition
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {submitOrderMutation.isPending ? "Reserving..." : (isSubmitSuccessful ? "Reserved!" : "Reserve")} {/* Show loading state */}
        </button>
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
