// src/utils/storage.js
const seed = [];

const KEY = 'pp_properties';

/**
 * Safely parse JSON
 */
const safeParse = (str, fallback = []) => {
  try {
    const v = JSON.parse(str);
    return Array.isArray(v) ? v : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Get all properties from LS, or seed if empty/bad
 */
export const getProperties = () => {
  if (typeof window === 'undefined') return []; // SSR safety
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    // first time -> seed
    localStorage.setItem(KEY, JSON.stringify(seed));
    return [...seed];
  }
  return safeParse(raw, [...seed]);
};

export const saveProperties = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const getNextId = () => {
  const list = getProperties();
  return list.length ? Math.max(...list.map(p => Number(p.id))) + 1 : 1;
};

export const addProperty = (prop) => {
  const list = getProperties();
  const withId = { ...prop, id: getNextId() };
  list.push(withId);
  saveProperties(list);
  return withId;
};

export const updateProperty = (id, updated) => {
  id = Number(id);
  const list = getProperties().map(p => (Number(p.id) === id ? { ...p, ...updated } : p));
  saveProperties(list);
  return list;
};

export const deleteProperty = (id) => {
  id = Number(id);
  const list = getProperties().filter(p => Number(p.id) !== id);
  saveProperties(list);
  return list;
};

export const getPropertyById = (id) => {
  id = Number(id);
  return getProperties().find(p => Number(p.id) === id);
};
