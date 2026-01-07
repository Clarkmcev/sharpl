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
      className="bg-light-bg dark:bg-dark-bg p-4 h-full"
    >
      {children}
    </div>
  );
}

export default Tile;
