import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import { useAuth } from "../context/AuthContext/AuthContext"
import { X } from "lucide-react"

interface LoginPopupProps {
  setShowLogin: (show: boolean) => void;
  showLogin?: boolean;
}

const LoginPopup = ({ setShowLogin }: LoginPopupProps) => {
  const [currState, setCurrentState] = useState("Login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const { login, signup, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (currState === "Login") {
        await login(formData.email, formData.password)
      } else {
        if (!formData.name) {
          setError("Name is required")
          return
        }
        await signup(formData.name, formData.email, formData.password)
      }
      setShowLogin(false)
      navigate("/")
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <form
        className="bg-white dark:bg-neutral-900 w-[90%] max-w-[400px] p-8 rounded-2xl shadow-2xl flex flex-col gap-6 animate-in zoom-in-95 duration-200 border border-neutral-200 dark:border-neutral-800"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{currState}</h2>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-6 h-6 text-neutral-500 hover:text-neutral-900 dark:hover:text-white" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg border border-red-100 dark:border-red-900/50">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {currState === "Sign up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-neutral-400"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-neutral-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-neutral-400"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? "Please wait..." : currState === "Sign up" ? "Create account" : "Login"}
        </button>

        {currState === "Sign up" && (
          <div className="flex items-start gap-3 mt-[-10px]">
            <input type="checkbox" required className="mt-1 w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>
        )}

        {currState === "Login" ? (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign up")}
              className="text-orange-500 font-bold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-orange-500 font-bold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginPopup
