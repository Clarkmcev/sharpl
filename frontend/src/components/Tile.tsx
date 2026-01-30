import { useAnimateOnRender } from "../hooks/transitions";

interface Props {
  children: React.ReactNode;
}

function Tile({ children }: Props) {
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
    </div>
  );
}

export default Tile;
