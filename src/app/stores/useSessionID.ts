import {persist, PersistStorage, StorageValue} from 'zustand/middleware'
import {create} from 'zustand'

type SessionState = {
    sessionID: string | null
    generateSessionID: () => void
}

const zustandSessionStorage: PersistStorage<SessionState> = {
    getItem: (key: string) => {
        if (typeof window === 'undefined') return null;
        const value = window.localStorage.getItem(key);
        if (!value) return null;
        try {
            return JSON.parse(value) as StorageValue<SessionState>;
        } catch {
            return null;
        }
    },
    setItem: (key: string, value: StorageValue<SessionState>) => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem(key);
    },
};

export const useSessionStore = create(persist<SessionState>((set) => ({
    sessionID: null,
    generateSessionID: () => set((state) => {
        if (!state.sessionID) {
            return { sessionID: crypto.randomUUID() };
        }
        return {};
    }),
}), {
    name: 'sessionID',
    storage: zustandSessionStorage,
}))

