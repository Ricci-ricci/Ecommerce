"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../lib/api";

export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    description?: string;
    categoryName?: string;
    features?: string[];
    stock?: number;
    published?: boolean;
    categoryId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

interface User {
    username: string;
}

interface GlobalContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    isInCart: (productId: string | number) => boolean;
    clearCart: () => void;
    user: User | null;
    setUser: (user: User | null) => void;
    verifylogin: () => Promise<void>;
    logout: () => Promise<void>;
    cartTotal: number;
    cartCount: number;
}
//create a global context to use a global state across the app
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    //stock the cart and user in a state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        //get the item inside the local storage "cart"
        const storedCart = localStorage.getItem("cart");
        //check if both are true and then parse both in json to be usable
        try {
            if (storedCart) setCart(JSON.parse(storedCart));
        } catch (error) {
            console.error("Failed to parse stored data", error);
        }
        setIsInitialized(true);

        // Verify session with backend on app load
        verifylogin();
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        //change it each time the value change #dependance [cart]
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, isInitialized]);

    //function to add to cart
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            //check if it exist or not by looking for the id
            const existingItem = prevCart.find(
                (item) => item.id === product.id,
            );
            //if yes check if item id == product id and then add + 1 or just return the item
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    const isInCart = (productId: string | number) => {
        return cart.some((item) => item.id === productId);
    };

    const removeFromCart = (productId: string | number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const verifylogin = async () => {
        try {
            console.log("Verifying login session...");
            const response = await fetch(API_ENDPOINTS.verify, {
                method: "GET",
                credentials: "include",
            });
            console.log(" Verify response status:", response.status);
            if (!response.ok) {
                throw new Error("Failed to verify login");
            }
            const data = await response.json();
            console.log(" Verify response data:", data);
            if (data.user && data.user.name) {
                console.log(" User verified:", data.user.name);
                setUser({ username: data.user.name });
            } else {
                console.log("No user data in response");
            }
        } catch (error: unknown) {
            console.error(" Verify login error:", error);
            setUser(null);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.logout, {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Failed to logout");
            }
            setUser(null);
            router.push("/login");
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <GlobalContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                isInCart,
                clearCart,
                user,
                setUser,
                verifylogin,
                logout,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobal must be used within a GlobalProvider");
    }
    return context;
};
