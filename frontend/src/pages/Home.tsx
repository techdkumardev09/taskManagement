import React, { useEffect, useState } from "react";
import TaskListCard from "../components/Task/TaskListCard";
import DeleteModal from "../components/DeleteModal";
import AddTaskModal from "../components/AddTaskModal";
import {
  addTaskFields,
  addTaskValidationSchema,
} from "../components/Auth/constants";
import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  deleteTask,
  deleteTaskFailure,
  deleteTaskSuccess,
  getTasks,
} from "../redux/actions/taskActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { taskService } from "../services/apiService";
import { toast } from "react-toastify";
import Heading from "../components/Heading";
import NodataFound from "../components/NodataFound";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Home = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [onEditState, setOnEditState] = useState(false);
  const [taskId, setOnTaskId] = useState<number>();
  const [editTaskForm, setEditTaskForm] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formValues = {
    title: "",
    description: "",
  };

  useEffect(() => {
    getTaskApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTaskApi = async () => {
    dispatch(getTasks());
    const response = await taskService.getTasksApi();
    setTaskList(response?.data?.tasks);
    dispatch(deleteTaskSuccess(response));
    navigate("/");
  };

  const handleDelete = async (id: number) => {
    dispatch(deleteTask());
    try {
      const response = await taskService.deleteTaskApi(id);
      dispatch(deleteTaskSuccess(response));
      getTaskApi();
      setIsOpenDeleteModal(false);
      navigate("/");
    } catch (error: any) {
      dispatch(deleteTaskFailure(error.message));
    }
  };

  const openisOpenDeleteModal = (id: number) => {
    setIsOpenDeleteModal(true);
    setOnTaskId(id);
  };

  const showTaskModal = async (isEdit: boolean, id?: number) => {
    setOnTaskId(id);
    setOnEditState(isEdit);

    if (isEdit && id !== undefined) {
      const res = await taskService.getTaskDetails(id);
      setEditTaskForm({
        title: res?.data?.task?.title,
        description: res?.data?.task?.description,
      });
    }

    setIsOpenTaskModal(true);
  };

  const onSubmitForm = async (
    values: { [key: string]: string },
    { resetForm }: any
  ) => {
    dispatch(addTask());
    const task = {
      title: values.title,
      description: values.description,
    };
    try {
      if (onEditState) {
        const response = await taskService.editTask({ ...task, id: taskId });
        if (response.success) {
          dispatch(addTaskSuccess(response.data));
          getTaskApi();
          toast.success(`${response.data.message}`);
          navigate("/");
          setIsOpenTaskModal(false);
          resetForm();
        }
        return;
      }
      const response = await taskService.addTaskApi(task);
      if (response.success) {
        dispatch(addTaskSuccess(response.data));
        getTaskApi();
        toast.success(`${response.data.message}`);
        navigate("/");
        setIsOpenTaskModal(false);
        resetForm();
      }
    } catch (error: any) {
      dispatch(addTaskFailure(error.message));
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center w-full py-5  px-4">
        <Heading title="All tasks" className="" />
        <button
          className=" px-4 py-2 text-white bg-[#01172c] rounded-md"
          onClick={() => showTaskModal(false)}
        >
          + Add task
        </button>
      </div>
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-wrap items-center">
          {taskList?.length === 0 ? (
            <NodataFound />
          ) : (
            taskList?.length > 0 &&
            taskList?.map((task) => (
              <TaskListCard
                id={task?.id}
                key={task?.id}
                title={task?.title}
                description={task?.description}
                dueDate={task?.created_at}
                isOpenDeleteModal={openisOpenDeleteModal}
                showTaskModal={showTaskModal}
              />
            ))
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onDelete={handleDelete}
        taskId={taskId}
      />
      <AddTaskModal
        isOpen={isOpenTaskModal}
        onCancel={() => setIsOpenTaskModal(false)}
        onSubmitForm={onSubmitForm}
        formValues={!onEditState ? formValues : editTaskForm}
        addTaskValidationSchema={addTaskValidationSchema}
        addTaskFields={addTaskFields}
        onEdit={onEditState}
      />
    </div>
  );
};

export default Home;
