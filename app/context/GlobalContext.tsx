"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../lib/api";

type BackendCartProduct = Product;

type BackendCartItem = {
    id: string;
    quantity: number;
    product: BackendCartProduct;
};

type BackendCart = {
    id: string;
    userId: string;
    items: BackendCartItem[];
};

type SyncCartResponse =
    | {
          success: true;
          message: string;
          data: BackendCart | null;
      }
    | {
          success: false;
          message: string;
      };

type GetCartResponse =
    | { success: true; data: (BackendCart & { total?: number }) | null }
    | { success: false; message?: string };

export interface Product {
    id: string;
    title: string;
    price: number;
    rating: number;
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
    cartItemId?: string;
}

interface User {
    username: string;
}

interface GlobalContextType {
    cart: CartItem[];
    addToCart: (product: Product) => Promise<void> | void;
    removeFromCart: (productId: string | number) => Promise<void> | void;
    isInCart: (productId: string | number) => boolean;
    clearCart: () => Promise<void> | void;
    user: User | null;
    setUser: (user: User | null) => void;
    verifylogin: () => Promise<void>;
    logout: () => Promise<void>;
    cartTotal: number;
    cartCount: number;
    syncCart: () => Promise<SyncCartResponse>;
}
//create a global context to use a global state across the app
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    //stock the cart and user in a state
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [authInitialized, setAuthInitialized] = useState(false);

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
        verifylogin().finally(() => setAuthInitialized(true));
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        //change it each time the value change #dependance [cart]
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart, isInitialized]);

    const isInCart = (productId: string | number) => {
        return cart.some((item) => item.id === productId);
    };

    const mapBackendCartToCartItems = (backendCart: BackendCart | null) => {
        if (!backendCart?.items) return [];
        return backendCart.items.map((item) => ({
            ...item.product,
            quantity: item.quantity,
            cartItemId: item.id,
        }));
    };

    const syncCart = async (): Promise<SyncCartResponse> => {
        console.log("synchronizing cart");

        const response = await fetch(API_ENDPOINTS.sync, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guestCart: cart }),
        });

        const data: SyncCartResponse = await response.json().catch(() => ({
            success: false,
            message: "Invalid JSON response from server",
        }));

        if (!response.ok) {
            console.log("failed to sync the cart", data);
            return data;
        }

        if (data.success) {
            const nextCart = mapBackendCartToCartItems(data.data);
            setCart(nextCart);

            // guest cart is now merged into DB cart
            try {
                localStorage.removeItem("cart");
            } catch {
                // ignore storage errors
            }
        }

        console.log(data);
        return data;
    };

    const getServerCart = useCallback(async () => {
        const response = await fetch(API_ENDPOINTS.getCart, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            return;
        }

        const payload: GetCartResponse | null = await response
            .json()
            .catch(() => null);

        // Expected backend shape from getCart:
        // { success: true, data: { ...cart, items: [...], total } }
        if (!payload || payload.success !== true) return;

        const backendCart = payload.data ?? null;
        const nextCart = mapBackendCartToCartItems(backendCart);
        setCart(nextCart);
    }, []);

    useEffect(() => {
        if (!authInitialized) return;

        // If logged in, treat server as the source of truth on load
        if (user) {
            getServerCart();
        }
    }, [user, authInitialized, getServerCart]);

    //function to add to cart
    const addToCart = async (product: Product) => {
        // Guest mode: local cart only
        if (!user) {
            setCart((prevCart) => {
                const existingItem = prevCart.find(
                    (item) => item.id === product.id,
                );
                if (existingItem) {
                    return prevCart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
            return;
        }

        // Auth mode: backend is source of truth
        const response = await fetch(API_ENDPOINTS.addToCart, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: product.id,
                quantity: 1,
            }),
        });

        if (!response.ok) {
            console.error("Failed to add item to cart");
            return;
        }

        // Your backend returns { success:true, data: cartItem } not the full cart,
        // so we refresh server cart to update UI.
        await getServerCart();
    };

    const removeFromCart = async (productId: string | number) => {
        // Guest mode
        if (!user) {
            setCart((prevCart) =>
                prevCart.filter((item) => item.id !== productId),
            );
            return;
        }

        // Auth mode: backend remove expects cart item id (not product id).
        // Our `CartItem` stores it as `cartItemId` once hydrated from server.
        const existing = cart.find((i) => i.id === productId);
        const itemId = existing?.cartItemId;

        if (!itemId) {
            // If cart was still in guest shape or not hydrated yet, refresh first.
            console.warn(
                "No cartItemId found for removal; refreshing server cart.",
            );
            await getServerCart();
            return;
        }

        const response = await fetch(
            `${API_ENDPOINTS.removeCartItem}/${itemId}`,
            {
                method: "DELETE",
                credentials: "include",
            },
        );

        if (!response.ok) {
            console.error("Failed to remove item from cart");
            return;
        }

        await getServerCart();
    };

    const clearCart = async () => {
        // Guest mode
        if (!user) {
            setCart([]);
            return;
        }

        const response = await fetch(API_ENDPOINTS.clearCart, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            console.error("Failed to clear cart");
            return;
        }

        // Clear local state after server confirmation
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
                const data = await response.json();
                console.error(" Verify login failed:", data.message);
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
                syncCart,
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
