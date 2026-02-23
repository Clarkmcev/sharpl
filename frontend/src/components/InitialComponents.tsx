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
      <div className="text-center flex flex-col my-auto h-full items-center justify-center text-light-text-secondary dark:text-dark-text-secondary text-transparent-200 dark:text-transparent-100">
        {icon}
        {component}
      </div>
    </Tile>
  );
}
