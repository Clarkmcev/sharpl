import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  helperText?: string;
  error?: boolean;
}

export default function Select({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  helperText,
  error = false,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-md text-body mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-4 pr-12 h-14 py-3 rounded-lg border appearance-none ${
            error ? "border-red-500 dark:border-red-700" : "border-transparent"
          } bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition cursor-pointer`}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-light-text-secondary dark:text-dark-text-secondary">
          <KeyboardArrowDownIcon />
        </div>
      </div>
      {helperText && (
        <p
          className={`mt-1 text-sm ${
            error
              ? "text-red-600 dark:text-red-400"
              : "text-light-text-tertiary dark:text-dark-text-tertiary"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
