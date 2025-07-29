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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-amber-800 animate-pulse">Loading inventory...</p>
        </div>
      </div>
    );
  if (!inventory)
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          Failed to load inventory.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-10 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-amber-300/20 rounded-full blur-md animate-pulse"></div>
        
        {/* Main card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500"></div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-lg"></div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 mb-3 tracking-tight">
                Ma<span className="relative">
                  <i className="text-yellow-500 drop-shadow-lg">your</i>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transform scale-x-110"></div>
                </span>naise
              </h1>
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">🥄</div>
            </div>
            <p className="text-amber-700 font-medium text-lg mb-2">Craft Your Perfect Mayo</p>
            <p className="text-amber-600/70 text-sm">A deliciously silly project by Sudhir</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
        
        {["oil", "egg", "acid", "mustard"].map((item) => (
          <label key={item} className="block text-left">
            <span className="font-semibold capitalize text-base text-amber-800 flex gap-2 items-center mb-1">
              <span className="inline-block text-lg">
                {item === 'oil' && '🫒'}
                {item === 'egg' && '🥚'}
                {item === 'acid' && '🍋'}
                {item === 'mustard' && '🌱'}
              </span>
              {item}
            </span>
            <select
              {...register(item as keyof SubmitOrderRequest, {
                required: true,
              })}
              className="transition-all duration-300 mt-1 block w-full rounded-xl border-2 border-yellow-200 shadow focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-70 bg-white/60 backdrop-blur outline-none py-2 px-3 text-base placeholder-amber-300 disabled:bg-gray-100/60"
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

        <label className="block mt-8 mb-1 font-medium text-base text-amber-800">
          <span className="flex items-center gap-2">
            <span className="text-lg">📧</span>Email Address
          </span>
          <input
            type="email"
            placeholder="mayo.lover@email.com"
            autoComplete="email"
            {...register("email_address", { required: true })}
            className="transition-all duration-300 mt-2 block w-full rounded-xl border-2 border-amber-200 shadow focus:border-yellow-400 focus:ring focus:ring-yellow-100 focus:ring-opacity-60 bg-white/60 backdrop-blur outline-none py-2 px-3 text-base placeholder-amber-200 text-amber-900 disabled:bg-gray-100/60"
          />
        </label>
        {errors.email_address && (
          <span className="text-red-600 text-sm font-medium flex items-center gap-1 mt-1">
            <span>⚠️</span>This field is required
          </span>
        )}

        <div className="mt-8 mb-6 text-xs sm:text-sm text-amber-900/80 bg-yellow-100/60 p-4 rounded-2xl border border-yellow-300 shadow-lg relative overflow-hidden">
          <div className="absolute -top-3 -right-3 rotate-12 scale-110 opacity-30 text-4xl pointer-events-none">🍯</div>
          <h2 className="font-bold uppercase mb-2 tracking-wider text-amber-900">Disclaimers</h2>
          <ul className="list-disc pl-6 text-amber-800 space-y-1">
            <li>For legal reasons, this isn't a food business</li>
            <li>You are solely responsible for the resulting taste 🤪</li>
            <li>If I don't know you, you probably won't get your mayo (sorry!)</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6">
          <button
            type="button"
            onClick={randomizeIngredients}
            className="transition-all duration-200 py-3 px-4 font-extrabold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75 text-base bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 hover:from-yellow-400 hover:to-orange-500 text-yellow-900 flex items-center justify-center gap-2 group"
          >
            <span className="text-lg group-hover:animate-spin">🎲</span> Randomize
          </button>
          <button
            type="submit"
            disabled={isSubmitSuccessful}
            className={`transition-all duration-200 py-3 px-4 font-extrabold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 text-base flex items-center justify-center gap-2 ${
              isSubmitSuccessful
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-white"
            }`}
          >
            <span className="text-lg">
              {isSubmitSuccessful ? "👏" : "🥪"}
            </span>
            {isSubmitSuccessful ? "Reserved!" : "Reserve"}
          </button>
        </div>
      </form>
        </div>
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
