import React from "react";
import { timeConverter, toTitleCase, truncateText } from "../../utils";
import { allImages } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

interface TaskListCardProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  isOpenDeleteModal: any;
  showTaskModal: (isEdit: boolean, id: number) => void;
}

const TaskListCard: React.FC<TaskListCardProps> = ({
  id,
  title,
  description,
  dueDate,
  isOpenDeleteModal,
  showTaskModal,
}) => {
  const navigate = useNavigate();
  return (
    <div className="px-4 mb-4 xl:w-3/12 lg:w-4/12 sm:w-6/12 w-full">
      <div className="bg-white relative w-full h-[200px] p-4 shadow-lg  rounded-lg border border-gray-100 mb-4">
        <h3 className="text-lg font-semibold mb-2">
          {truncateText(toTitleCase(title), 20)}
        </h3>
        <p className="text-gray-600 text-md mb-2">
          {truncateText(description, 100)}
        </p>
        <p className="text-sm text-gray-400 absolute bottom-4 left-3">
          <span className="font-semibold text-black">Created : </span>
          {timeConverter(dueDate)}
        </p>
        <div className="absolute bottom-4 flex justify-center item-center right-5 gap-2">
          <img
            onClick={() => navigate(`/view-task/${id}`)}
            className="w-7 h-6 cursor-pointer"
            alt="delete"
            src={allImages.viewTask}
          />
          <img
            onClick={() => isOpenDeleteModal(id)}
            className="w-6 h-6 cursor-pointer"
            alt="delete"
            src={allImages.deleteIcon}
          />
          <img
            onClick={() => showTaskModal(true, id)}
            className="w-7 cursor-pointer"
            alt="edit"
            src={allImages.editIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
