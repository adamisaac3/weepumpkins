export type CartItem = {
    product_name: string;
    product_id: number,
    price: number;
    quantity: number;
    category_name: string;
    image_path: string;
    category_id: number;
};

export type CategoryMap = {
    category_name: string,
    category_url: string,
    subcategories: string[],
}

export type NavState = {
    categoryMap: Record<number, CategoryMap> | undefined,
    socialsDelay: number,
    fetched: boolean,
    fetchNavState: () => Promise<Record<number, CategoryMap>>
}

export type CheckoutState = {
    email: string,
    country: string,
    first_name: string,
    last_name: string,
    company: string,
    address: string,
    apartment: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    setCheckoutInfo: (info: Partial<CheckoutState>) => void
}

export type CartState = {
    items: CartItem[]
    addCartItem: (item: CartItem) => void
    removeCartItem: (item_id: number) => void
}