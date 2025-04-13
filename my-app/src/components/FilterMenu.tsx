interface FilterMenuProps {
  activeFilters: string[];
  allFilters: readonly string[];
  onToggleFilter: (filter: string) => void;
}

export default function FilterMenu({ activeFilters, allFilters, onToggleFilter }: FilterMenuProps) {
  const orderedFilters = [...activeFilters, ...allFilters.filter((filter) => !activeFilters.includes(filter))];

  return (
    <div className="absolute top-6 left-6 z-10 w-64">
      <div className="mb-2">
        <div className="flex flex-wrap gap-[1px]">
          {orderedFilters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 bg-white border border-black flex items-center
                ${activeFilters.includes(filter) ? "bg-yellow-200" : ""}`}
              onClick={() => onToggleFilter(filter)}
            >
              {filter}
              {activeFilters.includes(filter) ? (
                <span className="ml-2 text-lg leading-none">&times;</span>
              ) : (
                <span className="ml-2 text-lg leading-none">+</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
