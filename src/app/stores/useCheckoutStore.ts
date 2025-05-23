import {create} from 'zustand'

type CheckoutState = {
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

export const useCheckoutStore = create<CheckoutState>((set) => ({
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
    setCheckoutInfo: (info) => set((state) => ({...state, ...info}))
}))