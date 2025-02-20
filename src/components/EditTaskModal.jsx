/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const EditTaskModal = ({
  taskId,
  setStatusModalOpen,
  statusModalOpen,
  refetch,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const axiosPublic = UseAxiosPublic();

  const { data: taskData, isLoading } = useQuery({
    queryKey: ["task-data", taskId],
    queryFn: async () => {
      if (taskId) {
        const { data } = await axiosPublic.get(`/task/${taskId}`);
        return data;
      }
    },
    enabled: !!taskId, // Only fetch data if taskId is available
  });

  // Set form fields when task data is available
  useEffect(() => {
    if (taskData && taskData[0]) {
      const { title, description, category } = taskData[0];
      setTitle(title);
      setDescription(description);
      setCategory(category);
    }
  }, [taskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || title.length > 50) {
      toast.error("Title is required and must be under 50 characters.");
      return;
    }

    if (description.length > 200) {
      toast.error("Description must be under 200 characters.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
    };

    try {
      // Update task request
      await axiosPublic.put(`/edit-task/${taskId}`, newTask);
      toast.success("Task Updated Successfully!");
      refetch();

      // Close the modal after successful update
      setStatusModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal" open={statusModalOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength="50"
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="200"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option>To-Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update Task
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setStatusModalOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditTaskModal;
