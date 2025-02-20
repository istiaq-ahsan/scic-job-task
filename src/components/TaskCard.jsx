import { useSortable } from "@dnd-kit/sortable";
import { CiEdit } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, openModal, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-3 rounded-lg shadow-sm mb-3"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-400">
            {new Date(task.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-3">
          {/* ✅ Fix: Stop event propagation to allow clicks */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal(task._id);
            }}
            className="btn"
          >
            <CiEdit size={20} />
          </button>

          <button
            className="btn"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(task._id);
            }}
            size={20}
          >
            <IoTrashBin />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
