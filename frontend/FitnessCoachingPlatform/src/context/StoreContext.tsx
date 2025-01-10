// src/context/StoreContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Location {
  address: string;
  city: string;
}

interface Store {
  id: string;
  name: string;
  location: Location;
  email: string;
  ownerId: string;
  image: string;
  category: "supplements" | "clothes" | "equipments";
}

interface StoreContextType {
  stores: Store[] | null;
  loading: boolean;
  error: string | null;
  fetchStores: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Custom Hook
export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};

// Store Provider Component
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<Store[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = async () => {
    setLoading(true);
    try {
      // Fetch data from local API
      const response = await axios.get<Store[]>(
        "http://localhost:5000/api/stores/getStores"
      );

       // Transform each store so that `id` is assigned from `_id`
       const transformed = response.data.map((store) => ({
      ...store,
      id: (store as any)._id,  //to make sure id in front as in the backend
      }));

      setStores(transformed);
      setError(null);
    } catch (err: any) {
      setError("Failed to fetch stores.");
      setStores([]); // Reset stores on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch stores on component mount
  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <StoreContext.Provider value={{ stores, loading, error, fetchStores }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
