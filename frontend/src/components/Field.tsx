import React from "react";

interface FieldProps {
  name: string;
  value: string;
}

function Field({ name, value }: FieldProps) {
  return (
    <div>
      <label className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
        {name}
      </label>
      <p className="text-white font-medium">{value ? value : "/"}</p>
    </div>
  );
}

export default Field;
