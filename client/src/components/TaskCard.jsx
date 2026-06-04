function TaskCard({
    task,
    toggleTask,
    deleteTask,
    editTask,
    darkMode,
  }) {
    const isOverdue =
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      !task.completed;
  
    return (
      <div
        className={`rounded-xl shadow-md p-5 mb-4 border-l-4
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        ${
            darkMode
            ? "bg-slate-800 text-white"
            : task.completed
            ? "bg-gradient-to-br from-green-50 to-emerald-50"
            : isOverdue
            ? "bg-gradient-to-br from-red-50 to-rose-50"
            : "bg-gradient-to-br from-sky-50 to-indigo-50"
        }
        ${
          task.completed
            ? "border-green-500"
            : isOverdue
            ? "border-red-500"
            : "border-blue-500"
        }`}
      >
        <div className="flex justify-between items-start">
          <h3
            className={`text-xl font-semibold ${
              task.completed
                ? darkMode
                  ? "line-through text-slate-400"
                  : "line-through text-gray-500"
                : darkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {task.title}
          </h3>
  
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              task.completed
                ? "bg-green-200 text-green-800"
                : "bg-blue-200 text-blue-800"
            }`}
          >
            {task.completed ? "Completed" : "Active"}
          </span>
        </div>
  
        <p
          className={`mt-2 ${
            darkMode
              ? "text-slate-300"
              : "text-gray-700"
          }`}
        >
          {task.description ||
            "No description provided"}
        </p>
  
        <p
          className={`text-sm mt-2 ${
            darkMode
              ? "text-slate-400"
              : "text-gray-500"
          }`}
        >
          Due Date:{" "}
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "No due date"}
        </p>
  
        {isOverdue && (
          <p className="text-red-500 font-medium mt-2">
            ⚠ Overdue Task
          </p>
        )}
  
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition"
            onClick={() => toggleTask(task.id)}
          >
            {task.completed
              ? "Mark Active"
              : "Mark Complete"}
          </button>
  
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition"
            onClick={() => editTask(task)}
          >
            Edit
          </button>
  
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
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