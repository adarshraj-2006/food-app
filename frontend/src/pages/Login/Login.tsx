import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/context/AuthContext/AuthContext";
import { Mail, Phone, Lock, User, Store, Building2, ArrowRight, CheckCircle2, AlertCircle, ChevronLeft } from "lucide-react";

type AuthMode = "login" | "signup";
type Role = "customer" | "seller";
type Method = "email" | "phone";

const Login = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<Role>("customer");
  const [method, setMethod] = useState<Method>("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
  });
  const [error, setError] = useState("");
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (authMode === "login") {
        await login(formData.email || formData.phone, formData.password);
      } else {
        const name = role === "seller" ? formData.businessName : formData.name;
        const identifier = method === "email" ? formData.email : formData.phone;

        if (!name) {
          setError(role === "seller" ? "Business Name is required" : "Name is required");
          return;
        }

        // Note: useAuth signup currently expects (name, email, password)
        // We'll pass the identifier (email/phone) to the email field for now
        await signup(name, identifier, formData.password);
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-[1000px] h-full min-h-[650px] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 dark:border-neutral-800">

        {/* Left Side: Branding & Info */}
        <div className="w-full md:w-[40%] bg-red-500 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-12 group w-fit">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-red-500 font-black text-xl">T</span>
              </div>
              <span className="text-2xl font-black tracking-tight">Tomato</span>
            </Link>

            <h1 className="text-4xl font-extrabold mb-6 leading-tight">
              {authMode === "login" ? "Welcome back to the family." : "Join the world's freshest community."}
            </h1>
            <p className="text-red-100 text-lg mb-8 leading-relaxed opacity-90">
              {role === "customer"
                ? "Get access to thousands of restaurants and exclusive deals delivered right to your door."
                : "Empower your business with our platform. Reach more customers and grow your restaurant."}
            </p>

            <div className="space-y-4">
              {[
                "Instant Delivery",
                "Wide Selection",
                "Live Tracking"
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-red-50">
                  <CheckCircle2 size={18} className="text-white" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-red-600/30 backdrop-blur-sm border border-red-400/20 p-5 rounded-2xl">
            <p className="text-sm italic opacity-80">"The best food app I've ever used. Simple, fast, and beautiful."</p>
            <p className="text-sm font-bold mt-2">— Adarsh Raj</p>
          </div>

          {/* Abstract Decorations */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-400 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-[-5%] left-[-10%] w-48 h-48 bg-red-600 rounded-full blur-2xl opacity-40"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col h-full bg-white dark:bg-neutral-900 relative">

          <div className="mb-8">
            <div className="flex bg-slate-100 dark:bg-neutral-800 p-1.5 rounded-2xl w-fit mb-6">
              <button
                onClick={() => setAuthMode("login")}
                className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${authMode === "login" ? "bg-white dark:bg-neutral-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-neutral-400 hover:text-slate-700 dark:hover:text-white"}`}
              >
                Login
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all ${authMode === "signup" ? "bg-white dark:bg-neutral-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 dark:text-neutral-400 hover:text-slate-700 dark:hover:text-white"}`}
              >
                Sign Up
              </button>
            </div>

            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
              {authMode === "login" ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-slate-500 dark:text-neutral-400 font-medium">
              {authMode === "login"
                ? `Welcome back! Please enter your ${role === "seller" ? "partner" : ""} details.`
                : "Choose your account type to get started."}
            </p>
          </div>

          {/* Mode/Role Selectors */}
          <div className="mb-6 space-y-4">
            {authMode === "login" ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setRole("customer")}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${role === "customer" ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600" : "border-slate-100 dark:border-neutral-700 hover:border-slate-200 dark:hover:border-neutral-600 text-slate-600 dark:text-neutral-300"}`}
                >
                  <User size={20} /> Customer
                </button>
                <button
                  onClick={() => setRole("seller")}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${role === "seller" ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600" : "border-slate-100 dark:border-neutral-700 hover:border-slate-200 dark:hover:border-neutral-600 text-slate-600 dark:text-neutral-300"}`}
                >
                  <Building2 size={20} /> Partner
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRole("customer")}
                  className={`relative p-5 rounded-2xl border-2 transition-all text-left ${role === "customer" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-slate-100 dark:border-neutral-700 hover:border-slate-200 dark:hover:border-neutral-600"}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${role === "customer" ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400"}`}>
                    <User size={24} />
                  </div>
                  <h3 className={`font-black ${role === "customer" ? "text-red-600" : "text-slate-900 dark:text-white"}`}>Personal</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">To order food & explore</p>
                  {role === "customer" && <CheckCircle2 className="absolute top-4 right-4 text-red-500" size={20} />}
                </button>
                <button
                  onClick={() => setRole("seller")}
                  className={`relative p-5 rounded-2xl border-2 transition-all text-left ${role === "seller" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-slate-100 dark:border-neutral-700 hover:border-slate-200 dark:hover:border-neutral-600"}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${role === "seller" ? "bg-red-500 text-white" : "bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400"}`}>
                    <Store size={24} />
                  </div>
                  <h3 className={`font-black ${role === "seller" ? "text-red-600" : "text-slate-900 dark:text-white"}`}>Business</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">For restaurant partners</p>
                  {role === "seller" && <CheckCircle2 className="absolute top-4 right-4 text-red-500" size={20} />}
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Signup Specific Header/Toggles */}
            {authMode === "signup" && role === "customer" && (
              <div className="flex items-center gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setMethod("email")}
                  className={`text-sm font-bold pb-1 transition-all ${method === "email" ? "text-red-500 border-b-2 border-red-500" : "text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-300"}`}
                >
                  With Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("phone")}
                  className={`text-sm font-bold pb-1 transition-all ${method === "phone" ? "text-red-500 border-b-2 border-red-500" : "text-slate-400 dark:text-neutral-500 hover:text-slate-600 dark:hover:text-neutral-300"}`}
                >
                  With Phone
                </button>
              </div>
            )}

            <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
              {/* Contextual Fields */}
              {authMode === "signup" && (
                role === "customer" ? (
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                ) : (
                  <div className="relative group">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Restaurant Name"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-slate-900 dark:text-white"
                    />
                  </div>
                )
              )}

              {/* Identifier Field (Email/Phone) */}
              {(authMode === "login" || (authMode === "signup" && method === "email") || (authMode === "signup" && role === "seller")) && (
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder={role === "seller" ? "Business Email" : "Email Address"}
                    required={method === "email" || authMode === "login"}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-slate-900 dark:text-white"
                  />
                </div>
              )}

              {authMode === "signup" && (method === "phone" || role === "seller") && (
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={role === "seller" ? "Contact Number" : "Mobile Number"}
                    required={method === "phone" || role === "seller"}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-neutral-800 border border-slate-100 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 focus:bg-white dark:focus:bg-neutral-900 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-red-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group h-[60px]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {authMode === "login" ? "Continue" : "Create My Account"}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social / Other Options (Placeholder for UX completeness) */}
          <div className="mt-auto pt-8">
            <p className="text-center text-slate-400 dark:text-neutral-500 text-sm font-medium">
              By continuing, you agree to our
              <span className="text-slate-900 dark:text-white hover:text-red-500 cursor-pointer transition-colors px-1">Terms</span> &
              <span className="text-slate-900 dark:text-white hover:text-red-500 cursor-pointer transition-colors px-1">Privacy</span>
            </p>
          </div>

          <Link
            to="/"
            className="absolute top-8 right-8 text-slate-400 dark:text-neutral-500 hover:text-red-500 transition-colors"
            title="Close"
          >
            <ChevronLeft size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
