import Tile from "./Tile";

interface InitialComponentsProps {
  icon: React.ReactElement;
  component: React.ReactElement;
}

export default function InitialComponents({
  icon,
  component,
}: InitialComponentsProps) {
  return (
    <Tile>
      <div className="text-center py-12 text-light-text-secondary dark:text-dark-text-secondary">
        {icon}
        {component}
      </div>
    </Tile>
  );
}
