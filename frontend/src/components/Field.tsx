import React from "react";
import Label from "./Label";

interface FieldProps {
  name: string;
  value: string;
}

function Field({ name, value }: FieldProps) {
  return (
    <div>
      <Label text={name} />
      <p className="text-white font-medium">{value ? value : "/"}</p>
    </div>
  );
}

export default Field;
