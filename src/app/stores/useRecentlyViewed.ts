import {persist, PersistStorage, StorageValue} from 'zustand/middleware'
import {create} from 'zustand'

export type RecentItem = {
    product_name: string,
    product_id: number,
    price: number,
    category_name: string,
    images: {image_path: string, image_type: string}[],
    category_id: number,
    subcategory: string
}

type RecentState = {
    items: RecentItem[]
    addRecentItem: (item: RecentItem) => void
    removeRecentItem: (id: number) => void
}


const zustandSessionStorage: PersistStorage<RecentState> = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        const value = window.localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as StorageValue<RecentState>;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: StorageValue<RecentState>) => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    },
};


export const useRecentStore = create(persist<RecentState>((set) => ({
    items: [],
    addRecentItem: (item: RecentItem) => set((state) => {
        const exists = state.items.some((it) => it.product_id === item.product_id);

        if (exists) {
            return { items: [...state.items] };
        } else {
            return { items: [...state.items, item].slice(-10) };
        }
    }),
    removeRecentItem: (id: number) => set((state) => ({
        items: state.items.filter((item) => item.product_id !== id)
    }))
}), {
    name: 'cart',
    storage: zustandSessionStorage,
}))