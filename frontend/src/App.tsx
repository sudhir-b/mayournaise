import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import useSubmitOrderMutation, {
  SubmitOrderRequest,
} from "./hooks/mutations/useSubmitOrderMutation";
import useInventoryQuery from "./hooks/queries/useInventoryQuery";
import { useEffect, useState } from "react";
import Toast from "./components/Toast";

function Mayournaise() {
  const { data: inventory, isLoading } = useInventoryQuery();
  const submitOrderMutation = useSubmitOrderMutation();
  const [formAppeared, setFormAppeared] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [randomizing, setRandomizing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<SubmitOrderRequest>();

  // Animation effect once components load
  useEffect(() => {
    setFormAppeared(true);
  }, []);

  // Show toast when order is submitted successfully
  useEffect(() => {
    if (isSubmitSuccessful) {
      setToastMessage("Your mayonnaise order has been reserved! 🎉");
      setToastType("success");
      setShowToast(true);
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<SubmitOrderRequest> = (data) => {
    setSubmitting(true);
    submitOrderMutation.mutate(data, {
      onSuccess: () => {
        setToastMessage("Your mayonnaise order has been reserved! 🎉");
        setToastType("success");
        setShowToast(true);
        setSubmitting(false);
      },
      onError: () => {
        setToastMessage("Failed to submit order. Please try again.");
        setToastType("error");
        setShowToast(true);
        setSubmitting(false);
      },
    });
  };
  
  // Randomize with a small delay for visual effect
  const randomizeIngredients = () => {
    if (!inventory || randomizing) return;
    
    setRandomizing(true);
    
    // Show a small delay animation for better UX
    setTimeout(() => {
      ["oil", "egg", "acid", "mustard"].forEach((item) => {
        const options = inventory[item as keyof typeof inventory];
        const availableOptions = options.filter(option => option.stock > 0);
        
        if (availableOptions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableOptions.length);
          setValue(item as keyof SubmitOrderRequest, availableOptions[randomIndex].name);
        }
      });
      
      // Add toast notification for randomize
      setToastMessage("Ingredients randomized! ✨");
      setToastType("info");
      setShowToast(true);
      
      setRandomizing(false);
    }, 400);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-mayo-500 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
    
  if (!inventory)
    return (
      <div className="max-w-md mx-auto p-4 border border-gray-200 rounded-md bg-white">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-600 font-medium mb-1">
            Failed to load inventory
          </p>
          <p className="text-sm text-gray-500">
            Please try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );

  return (
    <div className={`max-w-md mx-auto px-6 py-6 sm:py-8 ${formAppeared ? 'animate-fade-in' : 'opacity-0'}`}>
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="text-center mb-6">
        <img src="/mayo-jar.svg" alt="Mayo Jar" className="h-16 w-16 mx-auto mb-3" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-1">
          Ma<span className="text-mayo-500">your</span>naise
        </h1>
        <p className="text-gray-600 text-sm">
          A silly project by Sudhir
        </p>
      </div>

      <div className="mayo-card">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 sm:p-6 space-y-5"
        >
          <div className="space-y-4">
            {["oil", "egg", "acid", "mustard"].map((item) => (
              <div key={item}>
                <label className="block">
                  <span className="font-medium capitalize text-sm sm:text-base">
                    {item}
                  </span>
                  <select
                    {...register(item as keyof SubmitOrderRequest, {
                      required: true,
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm sm:text-base bg-white"
                  >
                    {inventory[item as keyof typeof inventory].map((option) => (
                      <option
                        key={option.name}
                        value={option.name}
                        disabled={option.stock === 0}
                      >
                        {option.name} {option.stock <= 3 && option.stock > 0 ? `(Only ${option.stock} left)` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email_address", { required: true })}
              className="mt-1 block w-full rounded-md border border-gray-200 py-2 px-3 text-sm sm:text-base bg-white"
            />
            {errors.email_address && (
              <span className="text-red-600 text-xs mt-1 block">
                This field is required
              </span>
            )}
          </div>

          <div className="text-xs sm:text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
            <h2 className="font-semibold mb-2">Disclaimers</h2>
            <ul className="space-y-1">
              <li>• For legal reasons, this isn't a food business</li>
              <li>• You are solely responsible for the resulting taste</li>
              <li>• If I don't know you, you probably won't get your mayo (sorry)</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={randomizeIngredients}
              disabled={randomizing}
              className={`py-2 px-4 rounded-md text-sm sm:text-base border ${
                randomizing 
                  ? "bg-gray-100 text-gray-500 cursor-wait border-gray-200" 
                  : "bg-mayo-500 hover:bg-mayo-600 text-white border-mayo-500 hover:border-mayo-600"
              }`}
            >
              {randomizing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Randomizing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🪄</span>
                  Randomize
                </span>
              )}
            </button>
            
            <button
              type="submit"
              disabled={isSubmitSuccessful || submitting}
              className={`py-2 px-4 rounded-md text-sm sm:text-base border ${
                isSubmitSuccessful
                  ? "bg-green-500 text-white border-green-500 cursor-not-allowed"
                  : submitting
                    ? "bg-gray-100 text-gray-500 border-gray-200 cursor-wait"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700"
              }`}
            >
              {isSubmitSuccessful ? (
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reserved!
                </span>
              ) : submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Reserving...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Reserve
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-4 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Mayournaise. All Rights Reserved.</p>
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
