/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import EditTaskModal from "./EditTaskModal";

const Categories = ({ allTask, isLoading, handleDelete, refetch }) => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(allTask);
  }, [allTask]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isLoading)
    return <p className="text-center text-gray-500">Loading tasks...</p>;

  const categorizedTasks = {
    toDo: tasks.filter((task) => task.category === "To-Do"),
    inProgress: tasks.filter((task) => task.category === "In Progress"),
    done: tasks.filter((task) => task.category === "Done"),
  };

  const openModal = (id) => {
    setSelectedTaskId(id);
    setStatusModalOpen(true);
  };

  const getTaskPos = (id) => tasks.findIndex((task) => task._id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {Object.entries(categorizedTasks).map(([category, taskList]) => (
          <div
            key={category}
            className="border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-4 text-center capitalize">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <SortableContext
              items={taskList.map((task) => task._id)}
              strategy={verticalListSortingStrategy}
            >
              {taskList.length > 0 ? (
                taskList.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    openModal={openModal}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No tasks available</p>
              )}
            </SortableContext>
          </div>
        ))}

        {statusModalOpen && selectedTaskId && (
          <EditTaskModal
            taskId={selectedTaskId}
            setStatusModalOpen={setStatusModalOpen}
            statusModalOpen={statusModalOpen}
            refetch={refetch}
          />
        )}
      </div>
    </DndContext>
  );
};

export default Categories;
