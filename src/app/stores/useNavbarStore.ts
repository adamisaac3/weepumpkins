import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import {create} from 'zustand'
import { NavState } from "../types/types";
import {CategoryMap} from '../types/types'

const zustandSessionStorage: PersistStorage<NavState> = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        const value = window.sessionStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as StorageValue<NavState>;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: StorageValue<NavState>) => {
        if (typeof window === 'undefined') return;
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        window.sessionStorage.removeItem(key);
    },
};

export const useNavbarStore = create(persist<NavState>((set) => ({
    categoryMap: {},
    socialsDelay: 0,
    fetched: false,
    fetchNavState: () => {
        const fetchCats = async () => {
            const response = await fetch('/api/get-cats-subcats')
            const data = await response.json();
            const fetched_categoryMap: Record<number, CategoryMap> = {};
            
            if(response.ok){        
                data.forEach((i: {categoryname: string, subcategoryname: string, category_id: number, subcategory_id: number, category_desc: string, subcategory_desc: string, category_dimensions: string, subcategory_dimensions: string}) => {
                    if(!fetched_categoryMap[i.category_id]){
                        const cat_url = '/collections/' + i.categoryname.replace(' ', '-').toLowerCase();
                        
                        fetched_categoryMap[i.category_id] = {category_name: i.categoryname, category_url: cat_url, subcategories: []}
                    }
                
                    if(i.subcategory_id){
                        fetched_categoryMap[i.category_id].subcategories.push(i.subcategoryname);
                    }
                })
            }
            
            return fetched_categoryMap;
        }
        return fetchCats();
    }
}), {
    name: 'navbar-store',
    storage: zustandSessionStorage
}))