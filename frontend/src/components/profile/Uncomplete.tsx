import React from "react";
import Tile from "../Tile";

interface UncompleteProps {
  title: string;
  message?: string | React.ReactNode;
}

function Uncomplete({ title, message }: UncompleteProps) {
  return (
    <Tile>
      <p className="font-light text-md text-white">{title}</p>
      {message && (
        <p className="text-sm mt-1 text-light-text-secondary dark:text-dark-text-secondary">
          {message}
        </p>
      )}
    </Tile>
  );
}

export default Uncomplete;
