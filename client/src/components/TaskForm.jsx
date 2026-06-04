import { useEffect, useState } from "react";
import API from "../services/api";

function TaskForm({
  onAddTask,
  editingTask,
  setEditingTask,
  fetchTasks,
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
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>
  
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3"
        />
  
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg p-3 mb-3"
        />
  
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />
  
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {editingTask ? "Update Task" : "Add Task"}
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
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
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