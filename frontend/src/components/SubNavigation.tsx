interface SubNavigationItem {
  label: string;
  path: string;
}

interface SubNavigationProps {
  items: SubNavigationItem[];
  subNav: string;
  setSubNav: (path: string) => void;
}

export default function SubNavigation({
  items,
  subNav,
  setSubNav,
}: SubNavigationProps) {
  return (
    <div className="border-b border-light ">
      <nav className="flex gap-4">
        {items.map((item) => {
          return (
            <button
              onClick={() => setSubNav(item.path)}
              key={item.path}
              className={`pb-3 cursor-pointer text-sm font-medium border-b-2 transition-colors ${
                subNav === item.path
                  ? "border-light-primary-500 dark:border-dark-primary-500 text-light-primary-500 dark:text-dark-primary-500"
                  : "border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary hover:border-light-text-secondary dark:hover:border-dark-text-secondary"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
