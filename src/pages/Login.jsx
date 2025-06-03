"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  Users,
  Award,
} from "lucide-react";
import video from "../../public/video.mp4";

import constant from "/constant";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${constant.apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        setError(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
            minWidth: "100%",
            minHeight: "100%",
            width: "100vw",
            height: "100vh",
          }}
        ></div> */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Image overlay with original color scheme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-indigo-950/40"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating geometric shapes with original colors */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-16 left-16 w-24 h-24 bg-blue-500/15 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-32 right-24 w-20 h-20 bg-indigo-400/20 rounded-full animate-float-delayed blur-lg"></div>
        <div className="absolute bottom-24 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full animate-float-slow blur-2xl"></div>
        <div className="absolute bottom-16 right-16 w-16 h-16 bg-indigo-500/20 rounded-full animate-float blur-lg"></div>
      </div>

      <div className="relative z-20 flex w-full max-w-6xl h-full mx-4 py-8">
        {/* Left: Enhanced Content Section */}
        <div className="w-1/2 h-full hidden lg:flex flex-col justify-center items-center px-12 py-8 text-white relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-4 bg-white/2 backdrop-blur-sm border border-white/5 rounded-3xl"></div>

          {/* Enhanced School Icons Animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-80 h-80">
              {/* Central icon */}
              <div className="absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center animate-pulse-slow shadow-2xl ring-2 ring-white/20">
                <GraduationCap className="w-12 h-12 text-white drop-shadow-2xl" />
              </div>

              {/* Orbiting icons with original blue theme */}
              {/* <div className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-400/30 backdrop-blur-md rounded-full flex items-center justify-center animate-orbit shadow-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 bg-indigo-400/30 backdrop-blur-md rounded-full flex items-center justify-center animate-orbit-delayed shadow-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500/30 backdrop-blur-md rounded-full flex items-center justify-center animate-orbit-reverse shadow-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 bg-indigo-500/30 backdrop-blur-md rounded-full flex items-center justify-center animate-orbit-slow shadow-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div> */}
            </div>
          </div>

          <div className="text-center relative z-10 mt-32">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight animate-fade-in-up bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent drop-shadow-2xl">
              The Future Grooming School
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed animate-fade-in-up delay-300 max-w-sm mx-auto">
              Manage All Your School
              <br />
              <span className="text-blue-300 font-semibold text-xl">
                in One Gateway
              </span>
            </p>

            {/* Enhanced progress dots with original colors */}
            <div className="mt-8 flex justify-center space-x-3 animate-fade-in-up delay-500">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-200 shadow-lg"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400 shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Right: Enhanced Login Form */}
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 py-8 relative">
          <div className="w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/15">
            {/* Enhanced glassmorphism effects with original colors */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-12 translate-x-8 pointer-events-none blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full translate-y-8 -translate-x-8 pointer-events-none blur-lg"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl ring-2 ring-white/20 backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-blue-100">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Enhanced Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full pl-12 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 bg-white/10 backdrop-blur-md text-white placeholder-white/50 hover:bg-white/15 focus:bg-white/15"
                    />
                  </div>
                </div>

                {/* Enhanced Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-white/90">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full pl-12 pr-12 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-300 bg-white/10 backdrop-blur-md text-white placeholder-white/50 hover:bg-white/15 focus:bg-white/15"
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-blue-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Enhanced Error Message */}
                {error && (
                  <div className="bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-100 px-4 py-3 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                {/* Enhanced Login Button with original colors */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 rounded-xl transform transition-all duration-300 shadow-2xl relative overflow-hidden ${
                    isLoading
                      ? "bg-gray-500/50 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-blue-500/25"
                  }`}
                >
                  {!isLoading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/70">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline decoration-blue-400/50 hover:decoration-blue-300"
                  >
                    Contact Admin
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      {/* <style jsx="true">{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-180deg);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(90deg);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes orbit-delayed {
          from {
            transform: rotate(90deg) translateX(100px) rotate(-90deg);
          }
          to {
            transform: rotate(450deg) translateX(100px) rotate(-450deg);
          }
        }

        @keyframes orbit-reverse {
          from {
            transform: rotate(180deg) translateX(100px) rotate(-180deg);
          }
          to {
            transform: rotate(-180deg) translateX(100px) rotate(180deg);
          }
        }

        @keyframes orbit-slow {
          from {
            transform: rotate(270deg) translateX(100px) rotate(-270deg);
          }
          to {
            transform: rotate(630deg) translateX(100px) rotate(-630deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 20s linear infinite;
        }

        .animate-orbit-delayed {
          animation: orbit-delayed 25s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 30s linear infinite;
        }

        .animate-orbit-slow {
          animation: orbit-slow 35s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style> */}
    </div>
  );
};

export default Login;
