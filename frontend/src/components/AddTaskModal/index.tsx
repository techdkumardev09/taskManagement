import React from "react";
import CommonForm from "../Form/Form";
import Heading from "../Heading";
import { buttonType } from "../../utils/constants";

interface AddTaskModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmitForm: any;
  formValues: {};
  addTaskValidationSchema?: any;
  addTaskFields: any;
  onEdit: boolean;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onCancel,
  formValues,
  addTaskValidationSchema,
  addTaskFields,
  onSubmitForm,
  onEdit,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 w-96">
        <div className="flex justify-between relative">
          <Heading title={!onEdit ? "Add Task" : "Edit task"} />
          <img
            src="https://cdn-icons-png.flaticon.com/128/6559/6559068.png"
            onClick={onCancel}
            alt="cancel"
            className="w-8 absolute right-[-20px] top-[-20px] cursor-pointer"
          ></img>
        </div>
        <CommonForm
          initialValues={formValues}
          validationSchema={addTaskValidationSchema}
          onSubmit={onSubmitForm}
          inputFields={addTaskFields}
          formStyle="flex flex-col"
          buttonText={onEdit ? "Update task" : "Add task"}
          buttonStyle={buttonType.primary}
        />
      </div>
    </div>
  );
};

export default AddTaskModal;
