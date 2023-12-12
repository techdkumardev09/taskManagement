import * as Yup from "yup";

export const loginFields = [
  { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: " Enter password",
  },
];

export const signUpFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "Enter name",
  },
  { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
  {
    label: "Password",
    name: "password",
    type: "text",
    placeholder: " Enter password",
  },
  {
    label: "Confirm password",
    name: "confirmPassword",
    type: "password",
    placeholder: " Enter password",
  },
];

export const signupValidationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const addTaskFields = [
  {
    label: "Task title",
    name: "title",
    type: "text",
    placeholder: "Enter your title",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    placeholder: "Enter description",
  },
];

export const addTaskValidationSchema = Yup.object({
  title: Yup.string().required("Title is required").max(225, "Title must be at most 255 characters"),
  description: Yup.string().required("Description is required"),
});
