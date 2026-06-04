function FilterBar({
    filter,
    setFilter,
    darkMode,
  }) {
    const activeButton =
      "bg-blue-500 text-white shadow-md";
  
    const inactiveButton = darkMode
      ? "bg-slate-700 text-white hover:bg-slate-600"
      : "bg-blue-50 hover:bg-blue-100 text-gray-800"
  
    return (
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? activeButton
              : inactiveButton
          }`}
        >
          All
        </button>
  
        <button
          onClick={() => setFilter("active")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "active"
              ? activeButton
              : inactiveButton
          }`}
        >
          Active
        </button>
  
        <button
          onClick={() => setFilter("completed")}
          className={`min-w-[110px] px-4 py-2 rounded-lg font-medium transition ${
            filter === "completed"
              ? activeButton
              : inactiveButton
          }`}
        >
          Completed
        </button>
      </div>
    );
  }
  
  export default FilterBar;