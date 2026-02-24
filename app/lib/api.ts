/**
 * API Configuration
 * Centralized API URL management using environment variables
 */

// Get the API base URL from environment variables
// Falls back to localhost:3000 if not defined
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://backend-production-b1af.up.railway.app";

/**
 * API Endpoints
 * Centralized endpoint definitions
 */
export const API_ENDPOINTS = {
    products: `${API_BASE_URL}/api/products`,
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    verify: `${API_BASE_URL}/api/auth/verify`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    sync: `${API_BASE_URL}/api/cart/sync`,
    getCart: `${API_BASE_URL}/api/cart`,
    addToCart: `${API_BASE_URL}/api/cart/add`,
    removeFromCart: `${API_BASE_URL}/api/cart/remove`,
} as const;

/**
 * Helper function to build API URLs
 * @param endpoint - The API endpoint path (e.g., '/api/products')
 * @returns Full API URL
 */
export const getApiUrl = (endpoint: string): string => {
    // Remove leading slash if present to avoid double slashes
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    return `${API_BASE_URL}${cleanEndpoint}`;
};

/**
 * Default fetch options with common headers
 */
export const defaultFetchOptions: RequestInit = {
    headers: {
        "Content-Type": "application/json",
    },
};

/**
 * Helper function to make authenticated API calls
 * @param endpoint - The API endpoint
 * @param options - Fetch options
 * @returns Fetch response
 */
export const apiCall = async (
    endpoint: string,
    options: RequestInit = {},
): Promise<Response> => {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("authToken")
            : null;

    const headers: HeadersInit = {
        ...defaultFetchOptions.headers,
        ...(options.headers || {}),
    };

    if (token) {
        (headers as Record<string, string>)["Authorization"] =
            `Bearer ${token}`;
    }

    return fetch(endpoint, {
        ...defaultFetchOptions,
        ...options,
        headers,
    });
};
