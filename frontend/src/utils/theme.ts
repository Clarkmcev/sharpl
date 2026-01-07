import type { ThemeColor } from "../store/slices/themeSlice";

export const themeConfig = {
  colors: {
    purple: {
      primary: "bg-purple-600 hover:bg-purple-700",
      light: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-600 dark:border-purple-500",
      gradient:
        "from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500",
      ring: "ring-purple-500",
    },
    blue: {
      primary: "bg-primary-500 hover:bg-primary-600",
      light: "bg-primary-50 dark:bg-primary-900/20",
      text: "text-primary-600 dark:text-primary-400",
      border: "border-primary-600 dark:border-primary-500",
      gradient:
        "from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500",
      ring: "ring-primary-500",
    },
    green: {
      primary: "bg-accent-500 hover:bg-accent-600",
      light: "bg-accent-50 dark:bg-accent-900/20",
      text: "text-accent-600 dark:text-accent-400",
      border: "border-accent-600 dark:border-accent-500",
      gradient:
        "from-accent-500 to-accent-600 dark:from-accent-400 dark:to-accent-500",
      ring: "ring-accent-500",
    },
    orange: {
      primary: "bg-orange-600 hover:bg-orange-700",
      light: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-600 dark:border-orange-500",
      gradient:
        "from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500",
      ring: "ring-orange-500",
    },
    pink: {
      primary: "bg-secondary-500 hover:bg-secondary-600",
      light: "bg-secondary-50 dark:bg-secondary-900/20",
      text: "text-secondary-600 dark:text-secondary-400",
      border: "border-secondary-600 dark:border-secondary-500",
      gradient:
        "from-secondary-500 to-secondary-600 dark:from-secondary-400 dark:to-secondary-500",
      ring: "ring-secondary-500",
    },
    indigo: {
      primary: "bg-indigo-600 hover:bg-indigo-700",
      light: "bg-indigo-50 dark:bg-indigo-900/20",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-600 dark:border-indigo-500",
      gradient:
        "from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500",
      ring: "ring-indigo-500",
    },
    red: {
      primary: "bg-red-600 hover:bg-red-700",
      light: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-600 dark:border-red-500",
      gradient: "from-red-600 to-pink-600 dark:from-red-500 dark:to-pink-500",
      ring: "ring-red-500",
    },
    teal: {
      primary: "bg-teal-600 hover:bg-teal-700",
      light: "bg-teal-50 dark:bg-teal-900/20",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-600 dark:border-teal-500",
      gradient: "from-teal-600 to-cyan-600 dark:from-teal-500 dark:to-cyan-500",
      ring: "ring-teal-500",
    },
  },
};

export function getThemeClasses(color: ThemeColor) {
  return themeConfig.colors[color];
}

export function getButtonClass(color: ThemeColor) {
  const theme = themeConfig.colors[color];
  return `${theme.primary} text-white font-medium rounded-lg px-6 py-2 transition shadow-lg`;
}

export function getGradientClass(color: ThemeColor) {
  const theme = themeConfig.colors[color];
  return `bg-gradient-to-r ${theme.gradient}`;
}

export function getLightBgClass(color: ThemeColor) {
  return themeConfig.colors[color].light;
}

export function getTextClass(color: ThemeColor) {
  return themeConfig.colors[color].text;
}

export function getBorderClass(color: ThemeColor) {
  return themeConfig.colors[color].border;
}

export function getRingClass(color: ThemeColor) {
  return themeConfig.colors[color].ring;
}
