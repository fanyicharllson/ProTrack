export const getStatusClassNames = (status: string) => {
  switch (status) {
    case "cancelled":
      return "bg-red-100 dark:bg-gray-800 text-red-600";
    case "not started":
      return "bg-gray-100 dark:bg-gray-800 text-gray-600";
    case "ongoing":
      return "bg-yellow-100 dark:bg-gray-800 text-yellow-600";
    case "pending":
      return "bg-blue-100 dark:bg-gray-800 text-blue-600";
    case "completed":
      return "bg-green-100 dark:bg-gray-800 text-green-600";
    case "On Hold":
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
    default:
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
  }
};

export const getpriorityClassNames = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-red-100 dark:bg-gray-800 text-red-600";
    case "meduim":
      return "bg-blue-100 dark:bg-gray-800 text-blue-600";
    case "high":
      return "bg-green-100 dark:bg-gray-800 text-green-600";
    default:
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
  }
};
