"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    useSidebar,
} from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const categories = ["Clothing", "Footwear", "Accessories", "Electronics"];

interface SidebarShopProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    minPrice: number;
    setMinPrice: (price: number) => void;
    maxPrice: number;
    setMaxPrice: (price: number) => void;
    onApplyFilters: (categories: string[], min: number, max: number) => void;
    onClearFilters: () => void;
}

const SidebarShop = ({
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onApplyFilters,
    onClearFilters,
}: SidebarShopProps) => {
    const { isMobile } = useSidebar();

    const handleCategoryChange = (category: string, checked: boolean) => {
        const newCategories = checked
            ? [...selectedCategories, category]
            : selectedCategories.filter((c) => c !== category);
        setSelectedCategories(newCategories);
        onApplyFilters(newCategories, minPrice, maxPrice);
    };

    const handlePriceChange = () => {
        onApplyFilters(selectedCategories, minPrice, maxPrice);
    };

    return (
        <Sidebar
            collapsible={isMobile ? "offcanvas" : "none"}
            className="bg-gray-50/50 border-r border-gray-100"
        >
            <SidebarHeader>
                <h2 className="text-lg font-semibold px-2">Filters</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Categories</SidebarGroupLabel>
                    <SidebarGroupContent>
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="flex items-center mb-2"
                            >
                                <input
                                    type="checkbox"
                                    id={category}
                                    checked={selectedCategories.includes(
                                        category,
                                    )}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        handleCategoryChange(
                                            category,
                                            e.target.checked,
                                        )
                                    }
                                    className="mr-2 accent-black"
                                />
                                <label
                                    htmlFor={category}
                                    className="text-sm cursor-pointer select-none"
                                >
                                    {category}
                                </label>
                            </div>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Price Range</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="flex items-center mb-2">
                            <label
                                htmlFor="minPrice"
                                className="mr-2 text-sm w-8"
                            >
                                Min:
                            </label>
                            <Input
                                id="minPrice"
                                type="number"
                                value={minPrice}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setMinPrice(Number(e.target.value))}
                                onBlur={handlePriceChange}
                                className="h-8 text-sm"
                            />
                        </div>
                        <div className="flex items-center">
                            <label
                                htmlFor="maxPrice"
                                className="mr-2 text-sm w-8"
                            >
                                Max:
                            </label>
                            <Input
                                id="maxPrice"
                                type="number"
                                value={maxPrice}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setMaxPrice(Number(e.target.value))}
                                onBlur={handlePriceChange}
                                className="h-8 text-sm"
                            />
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <Button
                            onClick={onClearFilters}
                            variant="outline"
                            className="w-full"
                        >
                            Clear Filters
                        </Button>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarShop;
