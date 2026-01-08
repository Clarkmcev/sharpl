interface TextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  helperText?: string;
  error?: boolean;
}

export default function Textarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 3,
  helperText,
  error = false,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-md text-body mb-2">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          error ? "border-red-500 dark:border-red-700" : "border-transparent"
        } bg-light-bg dark:bg-dark-bg text-white focus:border-transparent outline-none transition resize-none`}
        placeholder={placeholder}
        required={required}
        rows={rows}
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
