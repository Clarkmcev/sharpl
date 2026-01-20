import { useState } from "react";

interface InputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  value: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  helperText?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="block text-md text-body mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-4 ${isPassword ? "pr-12" : ""} rounded-lg border ${
            error ? "border-red-500 dark:border-red-700" : "border-transparent"
          } bg-light-bg dark:bg-dark-bg text-white focus:border-transparent outline-none transition`}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
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
