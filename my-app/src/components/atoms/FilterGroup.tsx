// components/filters/FilterGroup.tsx
import Button from "./Button" // Adjust path if needed

type FilterGroupProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
};

export default function FilterGroup({
  label,
  options,
  selected,
  onToggle,
}: FilterGroupProps) {
  // Check if no filters are selected or if "All" should be active
  const isAllActive = selected.length === 0;
  
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h4>{label}</h4>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onToggle(option)}
            variant="primary"
            isActive={option === "All" ? isAllActive : selected.includes(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}