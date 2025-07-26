// src/context/PropertyContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  getProperties,
  addProperty as storageAdd,
  updateProperty as storageUpdate,
  deleteProperty as storageDelete,
  getPropertyById
} from '../utils/storage';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const refresh = useCallback(() => {
    setProperties(getProperties());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = (data) => {
    storageAdd(data);
    refresh();
  };

  const update = (id, data) => {
    storageUpdate(id, data);
    refresh();
  };

  const remove = (id) => {
    storageDelete(id);
    refresh();
  };

  const getById = (id) => getPropertyById(id);

  return (
    <PropertyContext.Provider value={{ properties, refresh, add, update, remove, getById }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => useContext(PropertyContext);
