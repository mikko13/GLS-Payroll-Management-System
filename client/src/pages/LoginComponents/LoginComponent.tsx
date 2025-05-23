import React, { useState, useEffect } from "react";
import BrandSection from "./BrandSection";
import FeatureCard from "./FeatureCard";
import LoginForm from "./LoginForm";
import { PhilippinePeso, Lock } from "lucide-react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationComplete, setAnimationComplete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    if (authService.isAuthenticated()) {
      checkUserAndRedirect();
    }

    // Animation timing
    setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
  }, []);

  const checkUserAndRedirect = async () => {
    try {
      // Get current user and check role
      await authService.getCurrentUser();
      if (authService.isAdmin()) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // If error occurs during verification, clear token
      console.error("Error verifying authentication:", error);
      authService.logout();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await authService.login(email, password);
      console.log("Login response:", response);

      // Check if login was successful and user data exists
      if (!response || !response.user) {
        throw new Error("Invalid response from server");
      }

      // Double-check user role and redirect accordingly
      if (response.user.role === "admin") {
        console.log("Admin user detected, redirecting to admin dashboard");
        navigate("/admin-dashboard");
      } else {
        console.log("Regular user detected, redirecting to dashboard");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Extract error message from response if available
      let message = "Login failed. Please check your credentials.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // If remember me is checked, store email in localStorage
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    }
  }, [rememberMe, email]);

  // Load remembered email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left side - Animated brand section */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            animationComplete ? "opacity-100" : "opacity-0"
          }`}
        >
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
            <BrandSection />
            <div
              className={`space-y-6 md:space-y-8 transform transition-all duration-1000 delay-300 ${
                animationComplete
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <FeatureCard
                icon={
                  <PhilippinePeso size={22} className="mr-3 flex-shrink-0" />
                }
                title="Effortless Payroll Management"
                description="Streamline your payroll operations with our comprehensive solution designed for modern businesses."
              />
              <FeatureCard
                icon={<Lock size={22} className="mr-3 flex-shrink-0" />}
                title="Secure & Compliant"
                description="Enterprise-grade security with full compliance to Philippines payroll regulations and standards."
              />
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
            <BrandSection />
          </div>

          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            isLoading={isLoading}
            errorMessage={errorMessage}
            handleLogin={handleLogin}
          />

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
