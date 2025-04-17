import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Need setValue from react-hook-form to update form state programmatically
import { SubmitHandler, useForm } from "react-hook-form"; 
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery from "./hooks/queries/useInventoryQuery";

function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const {
    register,
    handleSubmit,
    setValue, // Destructure setValue
    reset, // Import reset to clear the form state including success status
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest>({
    defaultValues: { // Initialize with empty strings for controlled components
      oil: "",
      egg: "",
      acid: "",
      mustard: "",
      email_address: ""
    }
  });

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    submitOrderMutation.mutate(data, {
      onError: () => {
        // TODO: handle error
        // errorToast("Failed to submit order");
      },
      onSuccess: () => {
         // Optionally reset form fields after successful submission if desired
         // reset(); // Uncomment this line to clear the form on success
      }
    });
  };

  // Function to handle randomizing ingredient selections
  const handleRandomize = () => {
    if (!inventory) return;

    const categories: (keyof typeof inventory)[] = ["oil", "egg", "acid", "mustard"];

    categories.forEach(category => {
      // Filter out items with 0 stock
      const availableOptions = inventory[category].filter(option => option.stock > 0);
      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        const randomOption = availableOptions[randomIndex];
        // Update the form value for this category
        // Use the original item_name before '- sold out' was potentially added
        const originalName = randomOption.name.replace(' - sold out', ''); 
        setValue(category, originalName, { shouldValidate: true }); // Trigger validation if needed
      } else {
        // If no options are available, set the value to empty string or handle as needed
         setValue(category, "", { shouldValidate: true });
      }
    });
    // Reset the submission status if user randomizes after a successful submission
    if (isSubmitSuccessful) {
       reset(undefined, { keepValues: true, keepErrors: true, keepDirty: true, keepTouched: true, keepIsValid: true, keepSubmitCount: false }); 
    }
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
        {["oil", "egg", "acid", "mustard"].map((item) => (
          <label key={item} className="block">
            <span className="font-medium capitalize text-sm sm:text-base">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: `Please select an ${item}`, // Add specific required message
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-sm sm:text-base outline outline-1 outline-gray-300"
              defaultValue="" // Ensure default empty value is set
            >
              {/* Add a default placeholder option */}
              <option value="" disabled>Select {item}</option>
              {inventory[item as keyof typeof inventory].map((option) => (
                <option
                  key={option.name} // Use unique key like name + stock if names can repeat
                  value={option.name.replace(' - sold out', '')} // Ensure value doesn't contain " - sold out"
                  disabled={option.stock === 0}
                >
                  {/* Display name with '(Sold Out)' indicator */}
                  {option.stock === 0 ? `${option.name.replace(" - sold out", "")} (Sold Out)` : option.name}
                </option>
              ))}
            </select>
             {/* Display validation error for this specific field */}
             {errors[item as keyof SubmitOrderRequest] && (
                <span className="text-red-500 text-xs sm:text-sm">
                  {errors[item as keyof SubmitOrderRequest]?.message}
                </span>
              )}
          </label>
        ))}

        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base">
          Email
          <input
            type="email"
            placeholder="your@email.com" // Add placeholder
            {...register("email_address", { 
                required: "Email is required", 
                pattern: { // Basic email pattern validation
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                } 
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 text-sm sm:text-base outline outline-1 outline-gray-300"
          />
        </label>
         {/* Display validation error for email */}
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm">
            {errors.email_address.message}
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

        {/* Add the Randomize button here */}
        <button
          type="button" // Important: type="button" to prevent form submission
          onClick={handleRandomize}
          className="w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 text-sm sm:text-base bg-purple-600 hover:bg-purple-700 text-white mb-2 sm:mb-3" // Style similarly to submit, but purple
        >
          Randomize Ingredients
        </button>

        <button
          type="submit"
          disabled={isSubmitSuccessful || submitOrderMutation.isPending} // Disable also while submitting
          className={`w-full py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base ${ 
            isSubmitSuccessful || submitOrderMutation.isPending
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
           {/* Show different text based on submission status */}
          {submitOrderMutation.isPending ? "Reserving..." : isSubmitSuccessful ? "Reserved!" : "Reserve"}
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
