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
      <div className="relative min-h-screen floating-elements flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-8 py-6 text-center">
          <p className="text-white text-lg drop-shadow-sm">Loading inventory...</p>
        </div>
      </div>
    );
  if (!inventory)
    return (
      <div className="relative min-h-screen floating-elements flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-8 py-6 text-center">
          <p className="text-red-300 text-lg drop-shadow-sm">
            Failed to load inventory.
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen floating-elements">
      <div className="glass-strong rounded-2xl text-center max-w-md mx-auto px-6 py-8 sm:px-8 sm:py-10 m-4">
        <h1 className="sparkle text-6xl sm:text-6xl font-bold text-center mb-2 sm:mb-3 text-white drop-shadow-lg">
          Ma<i className="text-yellow-300 drop-shadow-md">your</i>naise
        </h1>
        <p className="text-center text-white/80 text-sm sm:text-base mb-6 sm:mb-8 drop-shadow-sm">
          A silly project by Sudhir
        </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        
        {["oil", "egg", "acid", "mustard"].map((item) => (
          <label key={item} className="block">
            <span className="font-medium capitalize text-sm sm:text-base text-white drop-shadow-sm">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="glass-input mt-2 block w-full rounded-xl py-3 px-4 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            >
              {inventory[item as keyof typeof inventory].map((option) => (
                <option
                  key={option.name}
                  value={option.name}
                  disabled={option.stock === 0}
                  className="bg-gray-800 text-white"
                >
                  {option.name}
                </option>
              ))}
            </select>
          </label>
        ))}

        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base text-white drop-shadow-sm">
          Email
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="glass-input mt-2 block w-full rounded-xl py-3 px-4 text-sm sm:text-base text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            placeholder="your@email.com"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-300 text-xs sm:text-sm drop-shadow-sm">
            This field is required
          </span>
        )}

        <div className="glass mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-white/90 p-4 rounded-xl">
          <h2 className="font-bold uppercase mb-2 text-white drop-shadow-sm">Disclaimers</h2>
          <p className="drop-shadow-sm">
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
            className="glass-button py-3 px-4 font-semibold rounded-xl text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            ✨ Randomize
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`glass-button py-3 px-4 font-semibold rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 ${
              isSubmitSuccessful
                ? "opacity-60 cursor-not-allowed text-white/70"
                : "text-white"
            }`}
          >
            {isSubmitSuccessful ? "✅ Reserved!" : "🥄 Reserve"}
          </button>
        </div>
      </form>
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
