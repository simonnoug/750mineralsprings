// components/filters/FilterUI.tsx
import FilterGroup from "./atoms/FilterGroup";
import { useSpringContext } from "../contexts/SpringContext";

const FILTER_OPTIONS = {
  region: [
    "Attica", "Central Greece", "Central Macedonia", "Crete",
    "Eastern Macedonia and Thrace", "Epirus", "Ionian Islands",
    "North Aegean", "Peloponnese", "South Aegean", "Thessaly",
    "Western Greece", "Western Macedonia"
  ],
  ownership: ["Private", "Public", "Unknown"],
  access: ["Open", "No access", "Unknown"],
  properties: ["Radon"],
  treatment: ["Arthritis"],
};

export default function FilterUI() {
  const { filters, setFilters } = useSpringContext();

  const handleToggle = (key: keyof typeof filters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ [key]: updated });
  };

  return (
    <div>
      <FilterGroup
        label="REGIONS"
        options={["All", ...FILTER_OPTIONS.region]}
        selected={filters.region}
        onToggle={(val) =>
          val === "All" ? setFilters({ region: [] }) : handleToggle("region", val)
        }
      />

      <FilterGroup
        label="OWNERSHIP"
        options={["All", ...FILTER_OPTIONS.ownership]}
        selected={filters.ownership}
        onToggle={(val) =>
          val === "All" ? setFilters({ ownership: [] }) : handleToggle("ownership", val)
        }
      />

      <FilterGroup
        label="ACCESS"
        options={["All", ...FILTER_OPTIONS.access]}
        selected={filters.access}
        onToggle={(val) =>
          val === "All" ? setFilters({ access: [] }) : handleToggle("access", val)
        }
      />

      <FilterGroup
        label="PROPERTIES"
        options={["All", ...FILTER_OPTIONS.properties]}
        selected={filters.properties}
        onToggle={(val) =>
          val === "All" ? setFilters({ properties: [] }) : handleToggle("properties", val)
        }
      />

      <FilterGroup
        label="TREATMENT"
        options={["All", ...FILTER_OPTIONS.treatment]}
        selected={filters.treatment}
        onToggle={(val) =>
          val === "All" ? setFilters({ treatment: [] }) : handleToggle("treatment", val)
        }
      />
    </div>
  );
}