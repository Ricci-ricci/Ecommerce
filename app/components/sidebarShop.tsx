"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const categories = ["Clothing", "Footwear", "Accessories", "Electronics"];

const SidebarShop = ({
    selectedCategories,
    setSelectedCategories,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    onApplyFilters,
    onClearFilters,
}: {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    minPrice: number;
    setMinPrice: (price: number) => void;
    maxPrice: number;
    setMaxPrice: (price: number) => void;
    onApplyFilters: (categories: string[], min: number, max: number) => void;
    onClearFilters: () => void;
}) => {
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
        <Sidebar>
            <SidebarHeader>
                <h2 className="text-lg font-semibold">Filters</h2>
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
                                    className="mr-2"
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        ))}
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Price Range</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="flex items-center mb-2">
                            <label htmlFor="minPrice" className="mr-2">
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
                                className="w-20"
                            />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="maxPrice" className="mr-2">
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
                                className="w-20"
                            />
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <Button onClick={onClearFilters} variant="outline">
                            Clear Filters
                        </Button>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarShop;
