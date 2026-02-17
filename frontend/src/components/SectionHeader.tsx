import React from "react";

interface HeaderProps {
  icon: React.ReactElement;
  header: string;
}

function SectionHeader({ icon, header }: HeaderProps) {
  return (
    <h3 className="text-lg font-semibold text-white ml-4 mb-4 flex items-center">
      {icon}
      <div className="ml-2 text-lg font-light">{header}</div>
    </h3>
  );
}

export default SectionHeader;
