import { Spring } from "@/src/types/spring";
import Link from "next/link";
interface SpringsListProps {
  springs: Spring[];
}

const SpringsList: React.FC<SpringsListProps> = ({ springs }) => {
  return (
    <div className="absolute top-24 left-6 w-64 bg-white border border-black">
      <div className="max-h-64 overflow-y-auto">
        {springs.map((spring) => {
          // compute three‑digit ID
          const formattedId =
            spring?.id < 10
              ? `00${spring?.id}`
              : spring?.id < 100
              ? `0${spring?.id}`
              : `${spring?.id}`

          return (
            <div key={spring._id} className="px-4 py-2 border-b border-black last:border-b-0">
              <Link href={`/springs/${spring.slug}`}>
                {formattedId} {spring.name}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default SpringsList;
