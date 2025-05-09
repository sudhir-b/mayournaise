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
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-mayo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-center text-lg font-medium text-gray-700">Loading inventory...</p>
        </div>
      </div>
    );
    
  if (!inventory)
    return (
      <div className="mayo-card p-8 max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-center text-lg font-medium text-red-600">
            Failed to load inventory.
          </p>
          <p className="text-center text-sm text-gray-500">
            Please try refreshing the page or check your connection.
          </p>
        </div>
      </div>
    );

  return (
    <div className={`max-w-md mx-auto px-6 py-8 sm:py-10 ${formAppeared ? 'animate-fade-in' : 'opacity-0'}`}>
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="flex flex-col items-center mb-8">
        <div className="mb-4 animate-float">
          <img src="/mayo-jar.svg" alt="Mayo Jar" className="h-20 w-20" />
        </div>
        <div className="relative mb-2">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-center tracking-tight">
            Ma<i className="text-mayo-500 animate-float inline-block">your</i>naise
          </h1>
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-mayo-100 opacity-70 animate-float"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-mayo-200 opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <p className="text-center text-gray-600 text-sm sm:text-base max-w-xs">
          A silly project by Sudhir
        </p>
      </div>

      <div className="mayo-card">
        <div className="bg-gradient-to-r from-mayo-400 to-mayo-500 h-3 w-full"></div>
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-5">
            {["oil", "egg", "acid", "mustard"].map((item, index) => (
              <div key={item} className="transition duration-300 ease-in-out" style={{ transitionDelay: `${index * 100}ms` }}>
                <label className="block">
                  <span className="font-medium capitalize text-sm sm:text-base flex items-center">
                    {getIngredientIcon(item)}
                    <span className="ml-2">{item}</span>
                  </span>
                  <select
                    {...register(item as keyof SubmitOrderRequest, {
                      required: true,
                    })}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm py-3 px-4 text-sm sm:text-base bg-white outline outline-1 outline-gray-200"
                  >
                    {inventory[item as keyof typeof inventory].map((option) => (
                      <option
                        key={option.name}
                        value={option.name}
                        disabled={option.stock === 0}
                        className="pl-2"
                      >
                        {option.name} {option.stock <= 3 && option.stock > 0 ? `(Only ${option.stock} left!)` : ""}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label className="block font-medium text-sm sm:text-base flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="ml-2">Email</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email_address", { required: true })}
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm py-3 px-4 text-sm sm:text-base bg-white outline outline-1 outline-gray-200"
            />
            {errors.email_address && (
              <span className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                This field is required
              </span>
            )}
          </div>

          <div className="mt-6 text-xs sm:text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="font-bold uppercase mb-2 text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Disclaimers
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-mayo-200 mt-1 mr-2 flex-shrink-0"></span>
                For legal reasons, this isn't a food business
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-mayo-300 mt-1 mr-2 flex-shrink-0"></span>
                You are solely responsible for the resulting taste
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-mayo-400 mt-1 mr-2 flex-shrink-0"></span>
                If I don't know you, you probably won't get your mayo (sorry)
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={randomizeIngredients}
              disabled={randomizing}
              className={`group relative overflow-hidden py-3 px-4 font-semibold rounded-lg shadow-md text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-mayo-400 focus:ring-opacity-75 ${
                randomizing 
                  ? "bg-mayo-400 cursor-wait" 
                  : "bg-mayo-500 hover:bg-mayo-600 text-white"
              }`}
            >
              <span className="flex items-center justify-center relative z-10">
                {randomizing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Randomizing...
                  </>
                ) : (
                  <>
                    <span className="mr-2 transform transition-all duration-300 group-hover:rotate-12 inline-block">🪄</span>
                    Randomize
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-white opacity-20 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              <span className="absolute -inset-px rounded-lg border-2 border-transparent group-hover:border-white opacity-20 transition-all duration-300"></span>
            </button>
            
            <button
              type="submit"
              disabled={isSubmitSuccessful || submitting}
              className={`group relative overflow-hidden py-3 px-4 font-semibold rounded-lg shadow-md text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-1 ${
                isSubmitSuccessful
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : submitting
                    ? "bg-indigo-500 text-white cursor-wait"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
              }`}
            >
              <span className="flex items-center justify-center relative z-10">
                {isSubmitSuccessful ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Reserved!
                  </>
                ) : submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Reserving...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 transition-transform duration-300 group-hover:translate-y-[-2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Reserve
                  </>
                )}
              </span>
              {!isSubmitSuccessful && !submitting && (
                <>
                  <span className="absolute inset-0 bg-white opacity-10 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  <span className="absolute -inset-px rounded-lg border-2 border-transparent group-hover:border-white opacity-20 transition-all duration-300"></span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-6 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Mayournaise. All Rights Reserved.</p>
      </div>
    </div>
  );
}

// Helper function to get icons for each ingredient type
function getIngredientIcon(type: string) {
  switch (type) {
    case 'oil':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'egg':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 45.46 45.46 0 003.55-.414c1.437-.232 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A48.627 48.627 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      );
    case 'acid':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case 'mustard':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
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
