/* eslint-disable react/prop-types */
const Categories = ({ allTask, isLoading }) => {
  if (isLoading)
    return <p className="text-center text-gray-500">Loading tasks...</p>;

  const categorizedTasks = {
    toDo: allTask.filter((task) => task.category === "To-Do"),
    inProgress: allTask.filter((task) => task.category === "In Progress"),
    done: allTask.filter((task) => task.category === "Done"),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {Object.entries(categorizedTasks).map(([category, taskList]) => (
        <div
          key={category}
          className="border border-gray-300 p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center capitalize">
            {category.replace(/([A-Z])/g, " $1").trim()}
          </h2>
          {taskList.length > 0 ? (
            taskList.map((task) => (
              <div
                key={task._id}
                className="bg-white p-3 rounded-lg shadow-sm mb-3"
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-400">
                  {new Date(task.timestamp).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No tasks available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
