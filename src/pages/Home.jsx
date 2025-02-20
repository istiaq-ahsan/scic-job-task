import AddTaskModal from "../components/AddTaskModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../hooks/UseAxiosPublic";
import Categories from "../components/Categories";
import { toast } from "react-toastify";

const Home = () => {
  const axiosPublic = UseAxiosPublic();

  const {
    data: allTask = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-task");
      return data;
    },
  });
  console.log(allTask);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const { data } = await axiosPublic.delete(`/task-delete/${id}`);
      toast.success("Task Deleted Successfully");
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center py-5">
        <AddTaskModal refetch={refetch}></AddTaskModal>
      </div>
      <Categories
        allTask={allTask}
        isLoading={isLoading}
        handleDelete={handleDelete}
        refetch={refetch}
      ></Categories>
    </div>
  );
};

export default Home;
