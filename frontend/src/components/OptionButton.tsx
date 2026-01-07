interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function OptionButton({
  label,
  selected,
  onClick,
  fullWidth = false,
  icon,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        fullWidth ? "w-full" : ""
      }  cursor-pointer p-4 rounded-lg border border-light-elevated/20  dark:border-dark-elevated/80 text-left transition-all flex items-center gap-3 ${
        selected
          ? "bg-dark-elevated/40 text-white"
          : "hover:bg-dark-bg/10 hover:text-white"
      }`}
    >
      {icon && <span className="">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
