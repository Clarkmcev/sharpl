import React from "react";

interface LabelProps {
  text: string;
}

function Label({ text }: LabelProps) {
  return (
    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
      {text}
    </div>
  );
}

export default Label;
