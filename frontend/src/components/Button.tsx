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
    "cursor-pointer py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-lg";

  const variantClasses = {
    primary: "bg-light-CTA-bg dark:bg-dark-CTA-bg text-white",
    secondary:
      "bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary shadow-none",
    danger:
      "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-600",
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
