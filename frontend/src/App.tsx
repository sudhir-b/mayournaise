import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    
    const ingredientTypes = ["oil", "egg", "acid", "mustard"] as const;
    
    ingredientTypes.forEach(type => {
      const availableOptions = inventory[type].filter(option => option.stock > 0);
      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        setValue(type, availableOptions[randomIndex].name);
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
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={randomizeOptions}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base flex items-center bg-indigo-50 py-1 px-3 rounded-md hover:bg-indigo-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5.5a.5.5 0 001 0V4a1 1 0 112 0v5.5a2.5 2.5 0 01-5 0V5a1 1 0 011-1z" clipRule="evenodd" />
              <path d="M7 6a1 1 0 100-2H5a1 1 0 000 2h2zM5 10a1 1 0 100-2H3a1 1 0 000 2h2zM3 15a1 1 0 110-2h2a1 1 0 110 2H3zM15 6a1 1 0 100-2h-2a1 1 0 000 2h2zM17 10a1 1 0 100-2h-2a1 1 0 000 2h2zM15 15a1 1 0 110-2h2a1 1 0 110 2h-2z" />
            </svg>
            Randomize Options
          </button>
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 text-sm sm:text-base outline outline-1 outline-gray-300"
            >
              {inventory[item as keyof typeof inventory].map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
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
