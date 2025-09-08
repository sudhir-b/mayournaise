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
    <div className="max-w-md mx-auto px-4 py-10 sm:px-6 sm:py-12">
      <div className="skeu-card p-6 sm:p-8 text-center">
        <h1 className="skeu-title text-5xl sm:text-6xl font-bold mb-2 sm:mb-3">
          Ma<i className="text-yellow-500">your</i>naise
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
          A silly project by Sudhir
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6 text-left"
        >
          {["oil", "egg", "acid", "mustard"].map((item) => (
            <label key={item} className="block">
              <span className="font-medium capitalize text-sm sm:text-base">
                {item}
              </span>
              <select
                {...register(item as keyof SubmitOrderRequest, {
                  required: true,
                })}
                className="skeu-input mt-1 w-full text-sm sm:text-base"
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
              className="skeu-input mt-1 w-full text-sm sm:text-base"
            />
          </label>
          {errors.email_address && (
            <span className="text-red-500 text-xs sm:text-sm">
              This field is required
            </span>
          )}

          <div className="skeu-note mt-6 sm:mt-8 mb-4 text-xs sm:text-sm text-gray-700">
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
              className="skeu-button skeu-button-yellow w-full text-sm sm:text-base"
            >
              Randomize
            </button>
            
            <button
              type="submit"
              disabled={isSubmitSuccessful}
              className={`skeu-button w-full text-sm sm:text-base ${
                isSubmitSuccessful
                  ? "skeu-button-disabled"
                  : "skeu-button-primary"
              }`}
            >
              {isSubmitSuccessful ? "Reserved!" : "Reserve"}
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
