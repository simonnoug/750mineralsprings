import { Spring } from "@/src/types/spring";

interface SpringsListProps {
  springs: Spring[];
}

const SpringsList: React.FC<SpringsListProps> = ({ springs }) => {
  return (
    <div className="absolute top-24 left-6 w-64 bg-white border border-black">
      <div className="max-h-64 overflow-y-auto">
        {springs.map((spring) => (
          <div key={spring._id} className="px-4 py-2 border-b border-black last:border-b-0">
            {spring.name}

          </div>
        ))}
      </div>
    </div>
  );
};

export default SpringsList;
