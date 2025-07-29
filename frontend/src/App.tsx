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
  
  const randomizeIngredients = () => {
    if (!inventory) return;
    
    ["oil", "egg", "acid", "mustard"].forEach((item) => {
      const options = inventory[item as keyof typeof inventory];
      const availableOptions = options.filter(option => option.stock > 0);
      
      if (availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        setValue(item as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-xl text-gray-700 font-medium animate-pulse">Loading inventory...</p>
      </div>
    );
  if (!inventory)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-center text-xl text-red-600 font-medium">Failed to load inventory. Please try again later.</p>
      </div>
    );

  return (
    <div className="text-center max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-lg sm:p-8">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Ma<i className="text-yellow-500">your</i>naise
      </h1>
      <p className="text-center text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
        Craft your perfect condiment.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        
        {["oil", "egg", "acid", "mustard"].map((item) => (
          <div key={item} className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <label className="block">
              <span className="font-semibold capitalize text-gray-800 text-base mb-2 block">
                {item}
              </span>
              <select
                {...register(item as keyof SubmitOrderRequest, {
                  required: true,
                })}
                className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 py-3 px-4 text-base bg-white hover:border-gray-400 transition-colors duration-200"
              >
                {inventory[item as keyof typeof inventory].map((option) => (
                  <option
                    key={option.name}
                    value={option.name}
                    disabled={option.stock === 0}
                    className="py-2"
                  >
                    {option.name} {option.stock === 0 ? "(Out of stock)" : ""}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}

        <label className="block mt-6 sm:mt-8">
          <span className="font-semibold text-gray-800 text-base mb-2 block">Email</span>
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 py-3 px-4 text-base bg-white hover:border-gray-400 transition-colors duration-200"
            placeholder="your@email.com"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-600 text-sm font-medium">Email is required.</span>
        )}

        <div className="mt-8 text-sm text-gray-600 bg-blue-50 p-5 rounded-lg border border-blue-200 leading-relaxed">
          <h2 className="font-bold uppercase text-blue-800 mb-3">Important Disclaimers</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>This is a hobby project, not a commercial food business.</li>
            <li>You are solely responsible for the resulting taste and safety of your mayonnaise.</li>
            <li>Orders are fulfilled at our discretion; we reserve the right to decline any order without prior notice.</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="py-4 px-6 font-bold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 text-base bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white transform hover:scale-105 transition-all duration-200"
          >
            🎲 Randomize
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`py-4 px-6 font-bold rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 text-base transform transition-all duration-200 ${
              isSubmitSuccessful
                ? "bg-gradient-to-br from-green-400 to-green-600 text-white cursor-default"
                : "bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white hover:scale-105 focus:ring-indigo-400"
            }`}
          >
            {isSubmitSuccessful ? "✅ Reserved!" : "🥄 Reserve Mayo"}
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
