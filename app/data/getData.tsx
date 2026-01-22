import { products } from "./products";

export const GetData = (id: string) => {
    //we pass the id by props and try to find in the product the on item that has the same id convert the id to integer with Number(id)
    const product = products.find((item) => item.id === Number(id));
    return product;
};
export const GetCategory = (category: string) => {
    const realCategory = category.toLowerCase();
    const categoryProduct = products.filter(
        (item) => item.category.toLowerCase() === realCategory,
    );
    return categoryProduct;
};
