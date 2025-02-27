import React, { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  AlertCircle,
  PhilippinePeso,
} from "lucide-react";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation triggers
  useEffect(() => {
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
  }, []);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes only
      if (email === "admin@example.com" && password === "password") {
        // Success - would redirect in a real app
        window.location.href = "/dashboard";
      } else {
        setErrorMessage("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left side - Animated brand section */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            animationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background elements with improved positioning for all screen sizes */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/10 left-1/10 w-20 h-20 rounded-full bg-blue-500 opacity-10"></div>
            <div className="absolute top-1/4 right-1/10 w-32 h-32 rounded-full bg-blue-400 opacity-10"></div>
            <div className="absolute bottom-1/4 left-1/5 w-48 h-48 rounded-full bg-blue-300 opacity-10"></div>
            <div className="absolute bottom-1/10 right-1/10 w-24 h-24 rounded-full bg-blue-600 opacity-10"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-6 md:p-8 lg:p-12">
          <div
            className={`transform transition-all duration-1000 ${
              animationComplete
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <div className="text-3xl md:text-4xl font-bold flex items-center mb-2">
                <span className="tracking-widest mr-1">G.</span>
                <span className="tracking-widest mr-1">L.</span>
                <span className="tracking-widest">S.</span>
              </div>
              <div className="text-base md:text-lg font-semibold tracking-wider text-center">
                MANPOWER SERVICES
              </div>
              <div className="text-base md:text-lg font-semibold tracking-wider text-center">
                Payroll Management System
              </div>
            </div>

            <div
              className={`space-y-6 md:space-y-8 transform transition-all duration-1000 delay-300 ${
                animationComplete
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <PhilippinePeso size={22} className="mr-3 flex-shrink-0" />
                  <h3 className="text-lg md:text-xl font-semibold">
                    Effortless Payroll Management
                  </h3>
                </div>
                <p className="text-blue-100 text-sm md:text-base">
                  Streamline your payroll operations with our comprehensive
                  solution designed for modern businesses.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center mb-3 md:mb-4">
                  <Lock size={22} className="mr-3 flex-shrink-0" />
                  <h3 className="text-lg md:text-xl font-semibold">
                    Secure & Compliant
                  </h3>
                </div>
                <p className="text-blue-100 text-sm md:text-base">
                  Enterprise-grade security with full compliance to Philippines
                  payroll regulations and standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div
          className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${
            animationComplete
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mobile-only logo for small screens */}
          <div className="flex flex-col items-center mb-6 md:hidden">
            <div className="text-3xl font-bold flex items-center mb-1 text-blue-800">
              <span className="tracking-widest mr-1">G.</span>
              <span className="tracking-widest mr-1">L.</span>
              <span className="tracking-widest">S.</span>
            </div>
            <div className="text-base font-semibold tracking-wider text-blue-700">
              MANPOWER SERVICES
            </div>
            <div className="text-sm font-medium text-blue-600">
              Payroll Management System
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-blue-100 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Please sign in to access your account
            </p>

            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center text-sm">
                <AlertCircle size={16} className="mr-2 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="pl-10 w-full bg-white border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md py-2 sm:py-3 text-sm sm:text-base text-gray-700 transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 w-full bg-white border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md py-2 sm:py-3 text-sm sm:text-base text-gray-700 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="rounded bg-white border-blue-200 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-xs sm:text-sm text-gray-600"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center rounded-md py-2 sm:py-3 px-4 text-white text-sm font-medium transition-all duration-300 ${
                    isLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ChevronRight size={16} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Need help?{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
