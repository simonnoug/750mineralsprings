// components/context/SpringContext.tsx
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Spring } from "../types/sanity.types";

type FilterValues = {
  region: string[];
  ownership: string[];
  access: string[];
  properties: string[];
  treatment: string[];
};

// Remove the Spring type definition here and use the imported one instead

type SpringContextType = {
  allSprings: Spring[];
  filteredSprings: Spring[];
  filters: FilterValues;
  hoveredId: string | null;
  activeId: string | null;
  setFilters: (update: Partial<FilterValues>) => void;
  setHoveredId: (id: string | null) => void;
  setActiveId: (id: string | null) => void;
  resetFilters: () => void;
};

type SpringProviderProps = {
    children: ReactNode;
    springs:  Spring[];
  };

const SpringContext = createContext<SpringContextType | undefined>(undefined);

export function useSpringContext() {
  const ctx = useContext(SpringContext);
  if (!ctx) throw new Error("useSpringContext must be used within SpringProvider");
  return ctx;
}

export function SpringProvider({children,springs}: SpringProviderProps) {
    // Implementation of the SpringProvider
    const [filters, setFiltersState] = useState<FilterValues>({
    region: [],
    ownership: [],
    access: [],
    properties: [],
    treatment: [],
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Fiew helpers to manage the filters
  const setFilters = (update: Partial<FilterValues>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...update,
    }));
  };

  const resetFilters = () => {
    setFiltersState({
      region: [],
      ownership: [],
      access: [],
      properties: [],
      treatment: [],
    });
  };

 // Filter the springs based on the selected filters
  const filteredSprings = useMemo(() => {
    return springs.filter((spring) => {
      const matches = (field: keyof FilterValues, value) =>
        filters[field].length === 0 || filters[field].includes(value);

      return (
        matches("region", spring.region) &&
        matches("ownership", spring.ownership) &&
        matches("access", spring.access) &&
        (filters.properties.length === 0 ||
            filters.properties.some((val) => (spring.properties ?? []).includes(val))) &&
            (filters.treatment.length === 0 ||
                filters.treatment.some((val) => (spring.treatment ?? []).includes(val)))
      );
    });
  }, [springs, filters]);
 
  return (
    <SpringContext.Provider
      value={{
        allSprings: springs,
        filteredSprings,
        filters,
        hoveredId,
        activeId,
        setFilters,
        setHoveredId,
        setActiveId,
        resetFilters,
      }}
    >
      {children}
    </SpringContext.Provider>
  );
}