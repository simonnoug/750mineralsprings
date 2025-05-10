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
  return (
    <div>
      <h4>{label}</h4>
      <div>
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onToggle(option)}
            variant="primary"
            isActive={selected.includes(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}