import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;
