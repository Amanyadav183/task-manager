import { useEffect, useState } from "react";
import API from "../services/api";

function TaskForm({
  onAddTask,
  editingTask,
  setEditingTask,
  fetchTasks,
  darkMode,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(
        editingTask.description || ""
      );
      setDueDate(
        editingTask.dueDate || ""
      );
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await API.put(
          `/${editingTask.id}`,
          {
            title,
            description,
            dueDate,
          }
        );

        fetchTasks();
        setEditingTask(null);
      } else {
        await onAddTask({
          title,
          description,
          dueDate,
        });
      }

      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`shadow-md rounded-xl p-6 mb-6 transition-all ${
        darkMode
        ? "bg-slate-800/80 text-white"
        : "bg-gradient-to-br from-white/70 to-blue-50/70 backdrop-blur-sm"
      }`}
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">
          {editingTask
            ? "Edit Task"
            : "Add Task"}
        </h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={`w-full rounded-lg p-3 mb-3 border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              : "bg-white border-gray-300"
          }`}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className={`w-full rounded-lg p-3 mb-3 border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              : "bg-white border-gray-300"
          }`}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
          className={`w-full rounded-lg p-3 mb-4 border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            {editingTask
              ? "Update Task"
              : "Add Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setTitle("");
                setDescription("");
                setDueDate("");
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;