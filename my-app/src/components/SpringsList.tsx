import { Spring } from "@/src/types/spring";
import Link from "next/link";
import ListItem from "./atoms/ListItem";
interface SpringsListProps {
  springs: Spring[];
}

const SpringsList: React.FC<SpringsListProps> = ({ springs }) => {
  return (
    <div>
      <div>
        {springs.map((spring) => {
          // compute three‑digit ID
          const formattedId =
            spring?.id < 10
              ? `00${spring?.id}`
              : spring?.id < 100
              ? `0${spring?.id}`
              : `${spring?.id}`

          return (
            <div key={spring._id}>
              <ListItem
                href={`/springs/${spring.slug}`}
                id={formattedId}
                content={spring.name}
              />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SpringsList;
