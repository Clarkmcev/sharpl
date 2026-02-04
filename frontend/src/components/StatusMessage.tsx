import React from "react";

type StatusType = "error" | "success" | "info" | "warning";

interface StatusMessageProps {
  type: StatusType;
  message?: string;
  messages?: string[];
  title?: string;
}

function StatusMessage({
  type,
  message,
  messages = [],
  title,
}: StatusMessageProps) {
  const messageList = messages.length > 0 ? messages : message ? [message] : [];

  if (messageList.length === 0) return null;

  const config = {
    error: {
      bgClass: "bg-red-50 dark:bg-red-900/20",
      iconClass: "text-red-600 dark:text-red-400",
      titleClass: "text-red-800 dark:text-red-300",
      messageClass: "text-red-700 dark:text-red-400",
      icon: (
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      ),
    },
    success: {
      bgClass: "bg-green-50 dark:bg-green-900/20",
      iconClass: "text-green-600 dark:text-green-400",
      titleClass: "text-green-800 dark:text-green-300",
      messageClass: "text-green-700 dark:text-green-400",
      icon: (
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      ),
    },
    warning: {
      bgClass: "bg-yellow-50 dark:bg-yellow-900/20",
      iconClass: "text-yellow-600 dark:text-yellow-400",
      titleClass: "text-yellow-800 dark:text-yellow-300",
      messageClass: "text-yellow-700 dark:text-yellow-400",
      icon: (
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      ),
    },
    info: {
      bgClass: "bg-blue-50 dark:bg-blue-900/20",
      iconClass: "text-blue-600 dark:text-blue-400",
      titleClass: "text-blue-800 dark:text-blue-300",
      messageClass: "text-blue-700 dark:text-blue-400",
      icon: (
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      ),
    },
  };

  const { bgClass, iconClass, titleClass, messageClass, icon } = config[type];

  return (
    <div className={`mb-4 p-4 ${bgClass} rounded-lg`}>
      <div className="flex items-start gap-2">
        <svg
          className={`w-5 h-5 ${iconClass} mt-0.5`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {icon}
        </svg>
        <div className="flex-1">
          {title && (
            <h3 className={`text-sm font-semibold ${titleClass} mb-1`}>
              {title}
            </h3>
          )}
          {messageList.length === 1 ? (
            <p className={`text-sm ${messageClass}`}>{messageList[0]}</p>
          ) : (
            <ul className={`text-sm ${messageClass} space-y-1`}>
              {messageList.map((msg, index) => (
                <li key={index}>• {msg}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatusMessage;
