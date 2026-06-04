function FilterBar({ filter, setFilter }) {
    return (
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All
        </button>
  
        <button
          onClick={() => setFilter("active")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Active
        </button>
  
        <button
          onClick={() => setFilter("completed")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
      </div>
    );
  }
  
  export default FilterBar;