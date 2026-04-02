import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const url = (import.meta.env.VITE_API_BASE_URL ).replace(/\/$/, "");
    console.log("Current API URL:", url);

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Add item to cart
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1
        }));

        if (token) {
            try {
                await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    { headers: { token } }
                );
            } catch (err) {
                console.error("Add to cart failed:", err);
            }
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
            try {
                await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    { headers: { token } }
                );
            } catch (err) {
                console.error("Remove from cart failed:", err);
            }
        }
    };

    // Fetch food list
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

    // Load cart from backend
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(
                url + "/api/cart/get",
                { headers: { token } }
            );
            setCartItems(response.data.data || {});
        } catch (error) {
            console.error("Error loading cart:", error);
        }
    };

    // Initial load
    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();

            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            } else {
                const savedCart = localStorage.getItem("cartItems");
                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                }
            }
        };

        loadData();
    }, []);

    // Save cart locally if not logged in
    useEffect(() => {
        if (!token) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems, token]);

    // Total price
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = food_list.find(item => item._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    // Total quantity
    const getTotalItemCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            totalCount += cartItems[itemId];
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

// Custom hook
export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreContextProvider");
    }
    return context;
};

export default StoreContextProvider;
