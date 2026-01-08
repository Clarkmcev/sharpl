interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  helperText?: string;
  error?: boolean;
}

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  minLength,
  helperText,
  error = false,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-md text-body mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-4 rounded-lg border ${
          error ? "border-red-500 dark:border-red-700" : "border-transparent"
        } bg-light-bg dark:bg-dark-bg text-white focus:border-transparent outline-none transition`}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
      />
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
