import React, { useEffect } from "react";
import CommonForm from "../Form/Form";
import { loginFields, loginValidationSchema } from "./constants";
import Heading from "../Heading";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../../redux/actions/userActions";

import { authService } from "../../services/apiService";
import { toast } from "react-toastify";
import { buttonType } from "../../utils/constants";
import { getUserProfileRequest } from "../../redux/actions/taskActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const isUserAuthenticated = localStorage.getItem("user") !== null;

  const formValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isAuthenticated || isUserAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isUserAuthenticated, navigate]);

  const onSubmitForm = async (values: { [key: string]: string }) => {
    dispatch(loginRequest());
    try {
      const response = await authService.login(values.email, values.password);
      if (response.success) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem(
          "jwtToken",
          JSON.stringify(`Bearer ${response.data.token}`)
        );
        toast.success(`${response.data.message}`);
        getUserProfile();
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

  const getUserProfile = async () =>{
    try {
      const response = await authService.getUserProfile();
      if (response.success) {
        dispatch(getUserProfileRequest(response?.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      }
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  }

  return (
    <div className="flex items-center justify-center py-6 mt-10">
      <div className="bg-gray-50 rounded-md p-6 shadow-md md:w-1/3 sm:2/3 w-full mx-3">
        <Heading title="Sign in" className="text-center mb-5" />
        <CommonForm
          initialValues={formValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmitForm}
          inputFields={loginFields}
          formStyle="flex flex-col"
          buttonText="Sign in"
          buttonStyle={buttonType.primary}
        />
      </div>
    </div>
  );
};

export default LoginPage;
