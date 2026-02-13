import { useAnimateOnRender } from "../hooks/transitions";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  children: React.ReactNode;
  isEditable?: boolean;
}

function Tile({ children, isEditable }: Props) {
  const { ref, style } = useAnimateOnRender({
    delay: 20,
    duration: 100,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      style={style}
      className="p-4 h-full surface-light rounded-md"
    >
      {children}
      {isEditable && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <EditIcon fontSize="small" className="text-light-text-secondary" />
        </div>
      )}
    </div>
  );
}

export default Tile;
