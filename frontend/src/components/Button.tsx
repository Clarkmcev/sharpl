interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e: React.FormEvent) => void;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
}: ButtonProps) {
  const baseClasses =
    "cursor-pointer py-2 px-4 rounded-lg font-semibold transition duration-200 shadow-lg";

  const variantClasses = {
    primary: "bg-light-CTA-bg dark:bg-dark-CTA-bg text-white",
    secondary:
      "text-light-CTA-bg dark:text-dark-CTA-bg brightness-150 shadow-none",
    danger:
      "text-red-500/80 shadow-none hover:text-red-500 bg-red-600/10 hover:bg-red-600/20",
    disabled: "text-gray-400/20 shadow-none cursor-auto!",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${
        variantClasses[disabled || loading ? "disabled" : variant]
      } ${widthClass}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
