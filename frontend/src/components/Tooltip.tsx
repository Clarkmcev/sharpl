interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  disabled?: boolean;
}

const sideClasses: Record<NonNullable<TooltipProps["side"]>, string> = {
  right: "left-full ml-2 top-1/2 -translate-y-1/2",
  left: "right-full mr-2 top-1/2 -translate-y-1/2",
  top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
  bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
};

export default function Tooltip({
  content,
  children,
  side = "right",
  disabled = false,
}: TooltipProps) {
  if (disabled) return <>{children}</>;

  return (
    <div className="relative group/tooltip">
      {children}
      <div
        className={`pointer-events-none absolute z-50 ${sideClasses[side]} whitespace-nowrap rounded-md surface px-2 py-1 text-xs text-white shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150`}
      >
        {content}
      </div>
    </div>
  );
}
