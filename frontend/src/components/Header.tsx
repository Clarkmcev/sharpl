import React from "react";

interface HeaderProps {
  icon: React.ReactElement;
  header: string;
}

function Header({ icon, header }: HeaderProps) {
  return (
    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
      <span className="mr-2">{icon}</span>
      {header}
    </h3>
  );
}

export default Header;
