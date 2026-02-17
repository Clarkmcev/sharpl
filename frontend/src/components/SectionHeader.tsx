import React from "react";

interface HeaderProps {
  icon?: React.ReactNode;
  header: string;
}

function SectionHeader({ icon, header }: HeaderProps) {
  return (
    <h3 className="text-white ml-2 mb-4 flex items-center">
      {icon}
      <div className="ml-2 text-md font-light">{header}</div>
    </h3>
  );
}

export default SectionHeader;
