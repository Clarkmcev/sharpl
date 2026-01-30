import React from "react";

interface FieldProps {
  name: string;
  value: string;
}

function Field({ name, value }: FieldProps) {
  return (
    <div>
      <label className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
        {name}
      </label>
      <p className="text-light-text-primary dark:text-dark-text-primary font-medium">
        {value}
      </p>
    </div>
  );
}

export default Field;
