"use client";

import * as React from "react";
import {
    ShoppingBag,
    Shirt,
    Footprints,
    Watch,
    Smartphone,
    Search,
    Sparkles,
    Percent,
    ChevronDown,
    X,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuBadge,
    useSidebar,
} from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useEffect } from "react";
import useRealProducts from "../data/fetchProduct";
// Categories reverted to original but with icons

const secondarySections = [
    { name: "New Arrival", icon: Search },
    { name: "Best Seller", icon: Sparkles },
    { name: "On Discount", icon: Percent },
];

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
    const { data: products, loading, error } = useRealProducts();

    // Taking the first 4 products to display in the grid
    useEffect(() => {
        console.log("Fetched Products:", products);
    }, [products]);
    const categories = [
        ...Array.from(new Set(products.map((p) => p.categoryName))),
    ];
    const { isMobile } = useSidebar();
    const [isAllProductsOpen, setIsAllProductsOpen] = React.useState(true);

    const handleCategoryToggle = (category: string) => {
        // Toggle category selection:
        // If it's already selected, remove it. If not, add it.
        const isSelected = selectedCategories.includes(category);

        // is isSelected true then filter it out else add it to the array
        const newCategories = isSelected
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

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
            <SidebarHeader className="pt-6 px-4 pb-2">
                <h2 className="text-xl font-bold text-gray-900">Category</h2>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Main Collapsible Section */}
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() =>
                                        setIsAllProductsOpen(!isAllProductsOpen)
                                    }
                                    isActive={true}
                                    className="font-medium text-gray-700 bg-gray-100 hover:bg-gray-200/80 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>All Product</span>
                                    <SidebarMenuBadge className="bg-red-500 text-white hover:bg-red-600 font-semibold rounded-md h-5 min-w-5 px-1 flex items-center justify-center">
                                        32
                                    </SidebarMenuBadge>
                                    <ChevronDown
                                        className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                                            isAllProductsOpen
                                                ? ""
                                                : "-rotate-90"
                                        }`}
                                    />
                                </SidebarMenuButton>

                                {isAllProductsOpen && (
                                    <SidebarMenuSub>
                                        {categories.map((item, index) => {
                                            const isSelected =
                                                selectedCategories.includes(
                                                    item,
                                                );
                                            return (
                                                <SidebarMenuSubItem key={index}>
                                                    <SidebarMenuSubButton
                                                        onClick={() =>
                                                            handleCategoryToggle(
                                                                item,
                                                            )
                                                        }
                                                        isActive={isSelected}
                                                        className={`cursor-pointer transition-colors ${
                                                            isSelected
                                                                ? "text-gray-900 font-semibold bg-gray-100/50"
                                                                : "text-gray-500 hover:text-gray-900"
                                                        }`}
                                                    >
                                                        <span>{item}</span>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>

                            {/* Secondary Sections */}
                            {secondarySections.map((section) => (
                                <SidebarMenuItem key={section.name}>
                                    <SidebarMenuButton className="text-gray-500 hover:text-gray-900 mt-1">
                                        <section.icon className="w-4 h-4" />
                                        <span>{section.name}</span>
                                        <ChevronDown className="ml-auto w-4 h-4 opacity-30" />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-gray-900 font-semibold text-sm">
                        Price Range
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="space-y-4 pt-2 px-1">
                            <div className="flex items-center space-x-2">
                                <div className="relative flex-1">
                                    <span className="absolute left-2.5 top-1.5 text-xs text-gray-500 font-medium">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        value={minPrice}
                                        onChange={(e) =>
                                            setMinPrice(Number(e.target.value))
                                        }
                                        onBlur={handlePriceChange}
                                        className="pl-6 h-8 text-sm bg-white"
                                        placeholder="Min"
                                    />
                                </div>
                                <span className="text-gray-400 font-light">
                                    -
                                </span>
                                <div className="relative flex-1">
                                    <span className="absolute left-2.5 top-1.5 text-xs text-gray-500 font-medium">
                                        $
                                    </span>
                                    <Input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) =>
                                            setMaxPrice(Number(e.target.value))
                                        }
                                        onBlur={handlePriceChange}
                                        className="pl-6 h-8 text-sm bg-white"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={onClearFilters}
                                variant="outline"
                                size="sm"
                                className="w-full text-xs h-8 text-gray-600 border-gray-200 hover:bg-gray-100"
                            >
                                <X className="w-3 h-3 mr-2" />
                                Clear Filters
                            </Button>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default SidebarShop;
