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
    return <p className="text-center text-lg">Loading inventory...</p>;
  if (!inventory)
    return (
      <p className="text-center text-lg text-red-600">
        Failed to load inventory.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-6xl sm:text-7xl font-extrabold text-center mb-2 sm:mb-3 tracking-tight text-amber-900" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        Ma<i className="text-yellow-500 font-bold">your</i>naise
      </h1>
      <p className="text-center text-gray-600 text-sm sm:text-base mb-8 sm:mb-10">
        A silly project by Sudhir
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-5 sm:space-y-6">
          {["oil", "egg", "acid", "mustard"].map((item) => (
            <label key={item} className="block">
              <span className="font-medium capitalize text-sm sm:text-base block mb-2 text-amber-800">
                {item}
              </span>
              <select
                {...register(item as keyof SubmitOrderRequest, {
                  required: true,
                })}
                className="glass block w-full rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-3 px-4 text-sm sm:text-base hover:bg-white/40 border-transparent hover:border-white/70 transition-colors duration-300"
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
        </div>

        <div className="pt-2">
          <label className="block mb-2 font-medium text-sm sm:text-base text-amber-800">
            Email
            <input
              type="email"
              {...register("email_address", { required: true })}
              className="glass mt-2 block w-full rounded-md shadow-sm focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-3 px-4 text-sm sm:text-base hover:bg-white/40 border-transparent hover:border-white/70 transition-colors duration-300"
              placeholder="your@email.com"
            />
          </label>
          {errors.email_address && (
            <span className="text-red-500 text-xs sm:text-sm mt-1 block">
              This field is required
            </span>
          )}
        </div>

        <div className="mt-8 glass text-sm sm:text-base text-amber-900 p-5 rounded-xl">
          <h2 className="font-bold uppercase mb-3 text-amber-900">Disclaimers</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>For legal reasons, this isn't a food business</li>
            <li>You are solely responsible for the resulting taste</li>
            <li>If I don't know you, you probably won't get your mayo (sorry)</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-white/30">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="glass py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-amber-900 flex items-center justify-center transition-colors duration-300"
          >
            <span className="mr-2">🪄</span> Randomize
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`glass py-3 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-sm sm:text-base transition-colors duration-300 ${
              isSubmitSuccessful
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-indigo-100"
            }`}
          >
            {isSubmitSuccessful ? "Reserved! ✓" : "Reserve"}
          </button>
        </div>
      </form>
      
      <div className="flex justify-center mt-10">
        <footer className="text-center text-amber-800 text-xs glass py-3 px-6 rounded-full inline-block bg-white/40">
          © {new Date().getFullYear()} Mayournaise • All rights reserved
        </footer>
      </div>
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
