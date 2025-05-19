import { useSpringContext } from "@/src/contexts/SpringContext";
import ListItem from "./atoms/ListItem";
import formatted from "./atoms/formatted";

// Remove the props interface as we're using context
const SpringsList: React.FC = () => {
  const { filteredSprings, hoveredId, setHoveredId, setActiveId } = useSpringContext();

  return (
    <div>
      <div>
        {filteredSprings.map((spring) => {
          // compute three‑digit ID

          return (
            <div 
            key={spring._id} 
            onMouseEnter={() => setHoveredId(spring._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveId(spring._id)}
            >
              <ListItem
                href={`/springs/${spring.slug}`}
                id={formatted(spring.id)}
                content={spring.name}
                isHovered={hoveredId === spring._id}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SpringsList;
