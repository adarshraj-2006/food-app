import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
    console.log("Current API URL:", url);
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Add item to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 1) {
                newCart[itemId] -= 1;
            } else {
                delete newCart[itemId];
            }
            return newCart;
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Fetch food list from backend
    const fetchFoodList = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setCartItems(response.data.data || {});
        } catch (error) {
            console.error(error);
        }
    }

    // Load data on mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            } else {
                const savedCart = localStorage.getItem('cartItems');
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            }
        }
        loadData();
    }, []);

    // Save cart to localStorage whenever it changes (only if no token?? or always?)
    // If token exists, backend is source of truth. But saving to local is backup/sync.
    useEffect(() => {
        if (!token) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, token]);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    const getTotalItemCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId];
            }
        }
        return totalCount;
    };

    const contextValue = {
        url,
        food_list,
        isLoading,
        fetchFoodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalItemCount,
        token,
        setToken
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreContextProvider");
    }
    return context;
};

export default StoreContextProvider;
