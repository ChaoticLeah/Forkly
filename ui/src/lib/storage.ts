let storage = window.localStorage;

export enum STORAGE_KEYS {
    SHOPPING_LIST = 'shoppingList',
    HAS_LIST = 'hasList',
}

export function read<T>(key: STORAGE_KEYS): T | null {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}

export function write<T>(key: STORAGE_KEYS, value: T) {
    storage.setItem(key, JSON.stringify(value));
}

export function addToStorage<T>(key: STORAGE_KEYS, value: T) {
    const items = read<T[]>(key) || [];
    items.push(value);
    write(key, items);
}

export function removeFromStorage<T>(key: STORAGE_KEYS, value: T) {
    const items = read<T[]>(key) || [];
    const index = items.indexOf(value);
    if (index !== -1) {
        items.splice(index, 1);
        write(key, items);
    }
}

export function isItemInStorage<T>(key: STORAGE_KEYS, value: T): boolean {
    const items = read<T[]>(key) || [];
    return items.includes(value);
}

export function clearStorage(key: STORAGE_KEYS) {
    storage.removeItem(key);
}

export function clearAllStorage() {
    storage.clear();
}