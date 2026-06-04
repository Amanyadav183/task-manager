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
      if (filter === "active") {
        return !task.completed;
      }

      if (filter === "completed") {
        return task.completed;
      }

      return true;
    })
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const activeCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">
          Personal Task Manager
        </h1>

        <div className="bg-white shadow-md rounded-xl p-4 mb-6">
          <div className="flex justify-center gap-8">
            <div>
              <p className="text-sm text-gray-500">
                Active Tasks
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {activeCount}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Completed Tasks
              </p>
              <p className="text-2xl font-bold text-green-600">
                {completedCount}
              </p>
            </div>
          </div>
        </div>

        <TaskForm
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
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
        />

        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              No Tasks Found
            </h3>

            <p className="text-gray-500">
              Create a task to get started.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={setEditingTask}
            />
          ))
        )}
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
  Built with React, Express and Tailwind CSS
</div>
    </div>
  );
}

export default App;