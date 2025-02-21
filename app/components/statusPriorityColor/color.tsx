export const getStatusClassNames = (status: string) => {
  switch (status) {
    case "Cancelled":
      return "bg-red-100 dark:bg-gray-800 text-red-600";
    case "Not Started":
      return "bg-red-100 dark:bg-gray-800 text-red-600";
    case "Ongoing":
      return "bg-yellow-100 dark:bg-gray-800 text-yellow-600";
    case "Pending":
      return "bg-blue-100 dark:bg-gray-800 text-blue-600";
    case "Completed":
      return "bg-green-100 dark:bg-gray-800 text-green-600";
    case "On Hold":
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
    default:
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
  }
};

export const getpriorityClassNames = (priority: string) => {
  switch (priority) {
    case "Low":
      return "bg-red-100 dark:bg-gray-800 text-red-600";
    case "Meduim":
      return "bg-blue-100 dark:bg-gray-800 text-blue-600";
    case "High":
      return "bg-green-100 dark:bg-gray-800 text-green-600";
    default:
      return "bg-purple-100 dark:bg-gray-800 text-purple-600";
  }
};
