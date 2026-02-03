import AppRoutes from "./routes/AppRoutes";

// Context Providers
import { AuthProvider } from "./components/context/AuthContext/AuthContext";
import { CartProvider } from "./components/context/CartContext/CartContext";
import { ThemeProvider } from "./components/context/ThemeContext/ThemeContext";
import Chatbot from "./components/Chatbot/Chatbot";

const AppContent = () => {
  return (
    <div className="app min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <Chatbot />
        </CartProvider>
      </AuthProvider>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
