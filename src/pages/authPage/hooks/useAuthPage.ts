import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateUserByIdMutation } from "../../../entities/user/api/userApi";
import { useLoginUserMutation } from "../../../features/auth/api/authApi";
import { useState } from "react";
import { login } from "../../../entities/user/store/userSlice";
import {
  FormData,
  LoginFormData,
  RegisterFormData,
} from "../lib/authValidation";
import { AuthMode } from "../model/authMode";
import { v4 as uuidv4 } from "uuid";

export const useAuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetchRegister] = useCreateUserByIdMutation();
  const [fetchLogin] = useLoginUserMutation();
  const [mode, setMode] = useState<AuthMode>(AuthMode.Login);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await fetchLogin(data).unwrap();

      if (!response.token) throw new Error();

      dispatch(
        login({
          token: response.token,
          role: response.role,
          userId: response.userId,
        })
      );
      navigate("/home");
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const userId = uuidv4();

      const userData = {
        id: userId,
        firstName: data.firstName,
        lastName: data.lastName,
        login: data.login,
        email: data.email,
        phone: data.phone,
        passwordHash: data.password,
        profilePictureId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        role: "user",
      };

      const response = await fetchRegister(userData).unwrap();

      await handleLogin({
        login: data.login,
        password: data.password,
      });
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error: any) => {
    switch (error.status) {
      case 400:
        setError(
          mode === AuthMode.Register
            ? "Пользователь с такими данными уже существует"
            : "Неверные данные"
        );
        break;
      case 401:
        setError("Неверный логин или пароль");
        break;
      case 404:
        setError("Пользователь не найден");
        break;
      case 500:
        setError("Ошибка сервера. Пожалуйста, попробуйте позже");
        break;
      default:
        setError("Произошла непредвиденная ошибка");
    }
  };

  const onSubmit = async (data: FormData) => {
    setError(null);

    if (mode === AuthMode.Login) {
      await handleLogin(data as LoginFormData);
    } else if (mode === AuthMode.Register) {
      await handleRegister(data as RegisterFormData);
    }
  };

  const toggleMode = () => {
    setMode(mode === AuthMode.Login ? AuthMode.Register : AuthMode.Login);
    setError(null);
  };

  const setForgotPasswordMode = () => {
    setMode(AuthMode.ForgotPassword);
    setError(null);
  };

  return {
    mode,
    error,
    onSubmit,
    toggleMode,
    setForgotPasswordMode,
  };
};
