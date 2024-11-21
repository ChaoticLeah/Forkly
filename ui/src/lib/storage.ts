let storage = window.localStorage;

export const STORAGE_KEYS = {
    SHOPPING_LIST: 'shoppingList',
}

type StorageKeys = keyof typeof STORAGE_KEYS;

export function read<T>(key: StorageKeys): T | null {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

function write<T>(key: StorageKeys, value: T) {
    storage.setItem(key, JSON.stringify(value));
}