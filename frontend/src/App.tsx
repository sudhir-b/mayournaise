import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery, { CollatedInventory } from "./hooks/queries/useInventoryQuery"; // Import CollatedInventory type

function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest>();

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    submitOrderMutation.mutate(data, {
      onError: () => {
        // TODO: handle error
        // errorToast("Failed to submit order");
      },
    });
  };

  const randomizeOptions = () => {
    if (!inventory) return;

    // Use the correct type for categories
    const categories: (keyof CollatedInventory)[] = [
      "oil",
      "egg",
      "acid",
      "mustard",
    ];
    categories.forEach((category) => {
      // Ensure category exists in inventory and is an array before proceeding
      // No need to check Array.isArray, as CollatedInventory type guarantees it's an array
      if (inventory[category]) {
        const availableOptions = inventory[category].filter(
          (option) => option.stock > 0
        );
        if (availableOptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableOptions.length);
          // Use type assertion as 'category' is now guaranteed to be a valid ingredient key
          setValue(category as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
        }
      } else {
        // This case should technically not happen with the correct types, but good for robustness
        console.warn(`Inventory data for category '${category}' is missing.`);
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        {/* Use the correctly typed categories array for mapping */}
        {(['oil', 'egg', 'acid', 'mustard'] as (keyof CollatedInventory)[]).map((item) => (
          <label key={item} className="block text-left">
            <span className="font-medium capitalize text-sm sm:text-base">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-sm sm:text-base outline outline-1 outline-gray-300"
            >
              {/* Use optional chaining for safety, though inventory should be loaded */}
              {inventory[item]?.map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
                >
                  {option.name} {option.stock === 0 ? "(Out of stock)" : ""}
                </option>
              )) ?? <option disabled>Loading options...</option>}
            </select>
          </label>
        ))}

        <label className="block text-left mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base">
          Email
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
          />
        </label>
        {errors.email_address && (
          <span className="block text-left text-red-500 text-xs sm:text-sm">
            This field is required
          </span>
        )}

        <div className="mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700 bg-gray-100 p-4 rounded-md border border-gray-300 text-left">
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
          onClick={randomizeOptions}
          className="w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 text-sm sm:text-base mt-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Randomize Ingredients
        </button>

        {/* Reserve Button */}
        <button
          type="submit"
          disabled={isSubmitSuccessful}
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base mt-4 sm:mt-6 ${
            isSubmitSuccessful
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isSubmitSuccessful ? "Reserved!" : "Reserve"}
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
