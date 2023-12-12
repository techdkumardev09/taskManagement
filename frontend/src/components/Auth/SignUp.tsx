import React, { useEffect } from "react";
import Heading from "../Heading";
import CommonForm from "../Form/Form";
import { signUpFields, signupValidationSchema } from "./constants";
import { authService } from "../../services/apiService";
import {
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { buttonType } from "../../utils/constants";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const isUserAuthenticated = localStorage.getItem("user") !== null;

  const formValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    if (isAuthenticated || isUserAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isUserAuthenticated, navigate]);

  const onSubmitForm = async (values: { [key: string]: string }) => {

    dispatch(signupRequest());
    try {
      const response = await authService.signup(values.name, values.email, values.password);

      if (response.success) {
        dispatch(signupSuccess(response.data));
        toast.success(`${response.data.message}`);
        navigate("/signin");
      }

    } catch (error: any) {
      dispatch(signupFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center py-6 mt-10">
      <div className="bg-gray-50 rounded-md p-6 shadow-md md:w-1/3 sm:2/3 w-full mx-3">
        <Heading title="Sign up" className="text-center text-[#01172c] mb-5" />
        <CommonForm
          initialValues={formValues}
          validationSchema={signupValidationSchema}
          onSubmit={onSubmitForm}
          inputFields={signUpFields}
          formStyle="flex flex-col"
          buttonText="Sign up"
          buttonStyle={buttonType.primary}
        />
      </div>
    </div>
  );
};

export default SignUp;
