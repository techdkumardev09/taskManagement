import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "../Button/Button";

interface InputField {
  label: string;
  name: string;
  type: string;
}

interface FormProps {
  initialValues: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
  inputFields: InputField[];
  formStyle?: string;
  buttonText?: string;
  buttonStyle?: string;
  validationSchema?: any;
}

const CommonForm = ({
  initialValues,
  onSubmit,
  inputFields,
  formStyle,
  buttonText,
  buttonStyle,
  validationSchema,
}: FormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched }) => (
        <Form className={formStyle}>
          {inputFields?.map((field) => (
            <div key={field.name} className="flex flex-col mt-5">
              <label
                className="text-md text-gray-600 font-semibold mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <Field
                type={field.type}
                id={field.name}
                className={`border rounded-md p-2 ${
                  errors[field.name] && touched[field.name]
                    ? "border-red-500"
                    : ""
                }`}
                name={field.name}
              />
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-600"
              />
            </div>
          ))}
          <Button
            type="submit"
            className={`mt-6 bg-[#01172c] text-white ${buttonStyle}`}
          >
            {buttonText}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CommonForm;
