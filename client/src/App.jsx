import { useEffect, useState } from "react";
import API from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import FilterBar from "./components/FilterBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (taskData) => {
    try {
      await API.post("/", taskData);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await API.patch(`/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalCount = tasks.length;
  const activeCount = tasks.filter(
    (task) => !task.completed
  ).length;
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
          : "bg-gradient-to-br from-cyan-100 via-indigo-100 to-fuchsia-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-5xl font-extrabold text-center mb-3">
          Personal Task Manager
        </h1>

        <p
          className={`text-center mb-6 ${
            darkMode
              ? "text-slate-300"
              : "text-gray-600"
          }`}
        >
          Organize your daily tasks efficiently
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className={`px-5 py-2 rounded-xl font-medium shadow-md transition ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
          >
            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className={`rounded-xl shadow-md p-5 border-l-4 border-purple-500 ${
                darkMode
                ? "bg-slate-800/80"
                : "bg-gradient-to-br from-sky-100/80 via-blue-50/80 to-violet-100/80 backdrop-blur-md border border-white/30"
            }`}
          >
            <p className="text-sm opacity-70">
              Total Tasks
            </p>
            <h2 className="text-3xl font-bold text-purple-500 mt-2">
              {totalCount}
            </h2>
          </div>

          <div
            className={`rounded-xl shadow-md p-5 border-l-4 border-blue-500 ${
                darkMode
                ? "bg-slate-800/80"
                : "bg-gradient-to-br from-sky-100/80 via-blue-50/80 to-violet-100/80 backdrop-blur-md border border-white/30"
            }`}
          >
            <p className="text-sm opacity-70">
              Active Tasks
            </p>
            <h2 className="text-3xl font-bold text-blue-500 mt-2">
              {activeCount}
            </h2>
          </div>

          <div
            className={`rounded-xl shadow-md p-5 border-l-4 border-green-500 ${
                darkMode
                ? "bg-slate-800/80"
                : "bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-md border border-white/30"
            }`}
          >
            <p className="text-sm opacity-70">
              Completed Tasks
            </p>
            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {completedCount}
            </h2>
          </div>
        </div>

        <TaskForm
          darkMode={darkMode}
          onAddTask={addTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          fetchTasks={fetchTasks}
        />

        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className={`w-full p-4 rounded-xl mb-6 shadow-sm border focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
            darkMode
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white/70 backdrop-blur-md border border-white/30 border-blue-100"
          }`}
        />

        <FilterBar
          darkMode={darkMode}
          filter={filter}
          setFilter={setFilter}
        />

        {filteredTasks.length === 0 ? (
          <div
            className={`rounded-xl shadow-md p-10 text-center ${
                darkMode
                ? "bg-slate-800/80"
                : "bg-gradient-to-br from-white/70 to-purple-50/70 backdrop-blur-md border border-white/30"
            }`}
          >
            <div className="text-5xl mb-3">
              📋
            </div>

            <h3 className="text-xl font-semibold mb-2">
              No Tasks Found
            </h3>

            <p className="opacity-70">
              Create your first task or adjust
              the filters.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              darkMode={darkMode}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={setEditingTask}
            />
          ))
        )}
      </div>

      <footer
        className={`text-center text-sm py-6 ${
          darkMode
            ? "text-slate-400"
            : "text-gray-500"
        }`}
      >
        Built with React, Node.js, Express and
        Tailwind CSS
      </footer>
    </div>
  );
}

export default App;