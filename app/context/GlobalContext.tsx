"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

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
    name: string;
}

interface GlobalContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string | number) => void;
    isInCart: (productId: string | number) => boolean;
    clearCart: () => void;
    user: User | null;
    login: (username: string) => void;
    logout: () => void;
    cartTotal: number;
    cartCount: number;
}
//create a global context to use a global state across the app
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    //stock the cart and user in a state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        //get the item inside the local storage "cart"
        const storedCart = localStorage.getItem("cart");
        //get the item inside the local storage "user"
        const storedUser = localStorage.getItem("user");
        //check if both are true and then parse both in json to be usable
        try {
            if (storedCart) setCart(JSON.parse(storedCart));
            if (storedUser) setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Failed to parse stored data", error);
        }
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        //change it each time the value change #dependance [cart]
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, isInitialized]);

    useEffect(() => {
        if (!isInitialized) return;
        //if user exist stock it inside local storage user
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            //remove it
            localStorage.removeItem("user");
        }
    }, [user, isInitialized]);
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

    const login = (name: string) => {
        setUser({ name });
    };

    const logout = () => {
        setUser(null);
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
                login,
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
