import { Spring } from "@/src/types/spring";
import { useSpringContext } from "@/src/contexts/SpringContext";
import Link from "next/link";
import ListItem from "./atoms/ListItem";

// Remove the props interface as we're using context
const SpringsList: React.FC = () => {
  const { filteredSprings, hoveredId, setHoveredId, setActiveId } = useSpringContext();

  return (
    <div>
      <div>
        {filteredSprings.map((spring) => {
          // compute three‑digit ID
          const formattedId =
            spring?.id < 10
              ? `00${spring?.id}`
              : spring?.id < 100
              ? `0${spring?.id}`
              : `${spring?.id}`

          return (
            <div 
            key={spring._id} 
            onMouseEnter={() => setHoveredId(spring._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setActiveId(spring._id)}
            >
              <ListItem
                href={`/springs/${spring.slug}`}
                id={formattedId}
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
