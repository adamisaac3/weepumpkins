import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import {create} from 'zustand'
import { CartState } from "../types/types";



const zustandSessionStorage: PersistStorage<CartState> = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        const value = window.localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as StorageValue<CartState>;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: StorageValue<CartState>) => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    },
};



export const useCartStore = create(persist<CartState>((set) => ({
    items: [],
    addCartItem: (item) => set((state) => {
        const exists = state.items.some((it) => it.product_id === item.product_id);

        if (exists) {
            return { items: [...state.items] };
        } else {
            return { items: [...state.items, item] };
        }
    }),
    removeCartItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.product_id !== id)
    }))
}), {
    name: 'cart',
    storage: zustandSessionStorage,
}))