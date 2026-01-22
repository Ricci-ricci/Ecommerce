"use client";

import { useState } from "react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "../../../components/ui/sidebar";
import SidebarShop from "../sidebarShop";
import ProductGrid from "../ProductGrid";
import { products } from "../../data/products";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

const Shop2 = () => {
    //where we stock everythings
    const [filteredProducts, setFilteredProducts] = useState(products); //here is the product or the filtered product
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]); //here is the category if selected
    const [minPrice, setMinPrice] = useState<number>(0); //here is the min price that is 0
    const [maxPrice, setMaxPrice] = useState<number>(1000); //here is the max price that is 1000 if selected

    //this is a function to apply the filters
    const applyFilters = (categories: string[], min: number, max: number) => {
        //after importing the product we filter it and stock it inside filterd variable
        // filtered has to check if
        const filtered = products.filter((product: Product) => {
            //if there s no category selectioned and returned true and return everything categories.lenght===0
            // or check if it s included inside the categories by categories.includes(product.category);
            const inCategory =
                categories.length === 0 ||
                categories.includes(product.category);
            //check if it s between the range of price max and min
            const inPriceRange = product.price >= min && product.price <= max;
            //and return both
            return inCategory && inPriceRange;
        });
        setFilteredProducts(filtered);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setMinPrice(0);
        setMaxPrice(1000);
        setFilteredProducts(products);
    };

    return (
        <SidebarProvider className="w-full h-full min-h-[inherit]">
            <SidebarShop
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
            />
            <SidebarInset className="bg-transparent overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 px-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">
                            Showing {filteredProducts.length} results
                        </span>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-6">
                    <ProductGrid filteredProducts={filteredProducts} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Shop2;
