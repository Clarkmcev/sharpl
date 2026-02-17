import React from "react";

interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
  return (
    <div className="flex items-stretch">
      <div className="w-2 rounded-full background border-none" />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Section;
