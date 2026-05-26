import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { loginApi, registerApi } from "../api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../state/auth/authSlice";

export let useAuth = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onLogin = async (data) => {
    let res = await loginApi(data);
    dispatch(addUser(res));
  };

  const onRegister = async (data) => {
    let res = await registerApi(data);
  };

  return {
    register,
    handleSubmit,
    onLogin,
    onRegister,
    errors,
    navigate,
  };
};