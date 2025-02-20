/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import { CSS } from "@dnd-kit/utilities";

const AddTaskModal = ({ refetch }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const axiosPublic = UseAxiosPublic();

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
      timestamp: new Date().toISOString(),
    };

    try {
      // Post request
      await axiosPublic.post(`/add-task`, newTask);
      toast.success("Task Added Successfully!");

      refetch();

      // Reset form fields only after a successful request
      setTitle("");
      setDescription("");
      setCategory("To-Do");

      // Close the modal
      document.getElementById("my_modal_1").close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Add New Task
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Task</h3>
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
                Add Task
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddTaskModal;
