import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import type { PersistStorage, StorageValue } from 'zustand/middleware';
import { CheckoutState } from '../types/types';

const zustandSessionStorage: PersistStorage<CheckoutState> = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        const value = window.sessionStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as StorageValue<CheckoutState>;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: StorageValue<CheckoutState>) => {
        if (typeof window === 'undefined') return;
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        window.sessionStorage.removeItem(key);
    },
};

export const useCheckoutStore = create(persist<CheckoutState>((set) => ({
    email: '',
    country: '',
    first_name: '',
    last_name: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    setCheckoutInfo: (info) => set((state) => ({...state, ...info})),
}),
{
    name: 'checkout-info',
    storage: zustandSessionStorage,
}))