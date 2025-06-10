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
    watch,
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
    <div className="text-center max-w-md mx-auto px-4 py-6 sm:px-6 sm:py-8 bg-neumorph-bg shadow-neumorph-out rounded-3xl">
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
            <span className="font-medium capitalize text-sm sm:text-base text-gray-700">
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="mt-1 block w-full bg-neumorph-input shadow-neumorph-in rounded-xl py-3 px-4 text-sm sm:text-base text-gray-700 focus:shadow-neumorph-pressed outline-none transition-shadow duration-200"
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

        <label className="block mt-6 sm:mt-8 mb-1 font-medium text-sm sm:text-base text-gray-700">
          Email
          <input
            type="email"
            {...register("email_address", { required: true })}
            className="mt-1 block w-full bg-neumorph-input shadow-neumorph-in rounded-xl py-3 px-4 text-sm sm:text-base text-gray-700 focus:shadow-neumorph-pressed outline-none transition-shadow duration-200"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-500 text-xs sm:text-sm">
            This field is required
          </span>
        )}

        <label className="block mb-1 font-medium text-sm sm:text-base text-gray-700">
          Referral code (optional)
          <input
            type="text"
            {...register("referral_code")}
            className="mt-1 block w-full bg-neumorph-input shadow-neumorph-in rounded-xl py-3 px-4 text-sm sm:text-base text-gray-700 focus:shadow-neumorph-pressed outline-none transition-shadow duration-200"
          />
        </label>

        {(() => {
          const email = watch("email_address");
          if (email && /^[^@]+@[^@]+\.[^@]+$/.test(email)) {
            // Mayonnaise-themed referral codes
            const mayoCodes = [
              "MAYO-MAGIC",
              "CREAMY-DREAM",
              "EGGCELLENT",
              "TANGY-TWIST",
              "WHISK-WIZARD",
              "EMULSIFY-PRO",
              "OLEIC-HERO",
              "YOLK-MASTER",
              "SMOOTH-OPERATOR",
              "GOLDEN-RATIO",
              "MAYO-CHEF",
              "SILKY-SMOOTH",
              "RICH-BLEND",
              "PERFECT-EMULSION",
              "CREAMY-DELIGHT"
            ];
            
            // Create a deterministic but rotating selection based on email and current week
            const emailHash = email.split('').reduce((hash, char) => {
              return ((hash << 5) - hash) + char.charCodeAt(0);
            }, 0);
            
            // Get current week number for rotation
            const now = new Date();
            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
            
            // Combine email hash with week for consistent but rotating codes
            const codeIndex = Math.abs(emailHash + weekNumber) % mayoCodes.length;
            const selectedCode = mayoCodes[codeIndex];
            
            return (
              <div className="text-xs sm:text-sm text-gray-700 mb-2">
                Your referral code: <span className="font-mono select-all bg-neumorph-input shadow-neumorph-in rounded-xl px-3 py-2 text-gray-700 font-semibold">{selectedCode}</span>
              </div>
            );
          }
          return null;
        })()}

        <div className="mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700 bg-neumorph-input shadow-neumorph-in p-4 rounded-2xl">
          <h2 className="font-bold uppercase mb-2 text-gray-700">Disclaimers</h2>
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
            className="py-3 px-4 font-semibold rounded-2xl bg-neumorph-bg shadow-neumorph-out hover:shadow-neumorph-pressed active:shadow-neumorph-pressed focus:outline-none text-sm sm:text-base text-gray-700 transition-shadow duration-200"
          >
            Randomize
          </button>
          
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`py-3 px-4 font-semibold rounded-2xl focus:outline-none text-sm sm:text-base transition-shadow duration-200 ${
              isSubmitSuccessful
                ? "bg-neumorph-bg shadow-neumorph-in text-gray-500 cursor-not-allowed"
                : "bg-neumorph-bg shadow-neumorph-out hover:shadow-neumorph-pressed active:shadow-neumorph-pressed text-gray-700"
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
