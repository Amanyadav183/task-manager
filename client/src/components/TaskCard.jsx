function TaskCard({
    task,
    toggleTask,
    deleteTask,
    editTask,
  }) {
    const isOverdue =
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      !task.completed;
  
    return (
      <div
        className={`rounded-xl shadow-md p-5 mb-4 border-l-4 transition-all hover:shadow-lg ${
          task.completed
            ? "border-green-500 bg-green-50"
            : isOverdue
            ? "border-red-500 bg-red-50"
            : "border-blue-500 bg-white"
        }`}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>
  
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.completed
                ? "bg-green-200 text-green-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {task.completed
              ? "Completed"
              : "Active"}
          </span>
        </div>
  
        <p className="text-gray-700 mt-2">
          {task.description ||
            "No description provided"}
        </p>
  
        <p className="text-sm text-gray-500 mt-2">
          Due Date:{" "}
          {task.dueDate || "No due date"}
        </p>
  
        {isOverdue && (
          <p className="text-red-600 font-medium mt-2">
            ⚠ Overdue Task
          </p>
        )}
  
        <div className="flex gap-2 mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
            onClick={() => toggleTask(task.id)}
          >
            {task.completed
              ? "Mark Active"
              : "Mark Complete"}
          </button>
  
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
            onClick={() => editTask(task)}
          >
            Edit
          </button>
  
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this task?"
                )
              ) {
                deleteTask(task.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskCard;