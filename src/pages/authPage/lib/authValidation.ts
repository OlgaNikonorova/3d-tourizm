import { z } from "zod";
import { UserRole } from "../../../entities/user/models/userRole";
import { AuthMode } from "../model/authMode";

export const loginSchema = z.object({
  login: z.string().min(3, "Псевдоним должен быть не менее 3 символов"),
  password: z
    .string()
    .min(8, "Пароль должен содержать не менее 8 символов")
    .regex(/[a-zA-Z]/, "Пароль должен содержать хотя бы одну букву A-Z"),
});

export const registerSchema = loginSchema.extend({
  email: z
    .string()
    .regex(/^\S+@\S+\.\S+$/, "Введите корректную электронную почту"),
  firstName: z
    .string()
    .min(3, "Имя должно иметь не менее 2 символов")
    .regex(
      /^[A-ZА-ЯЁ][a-zа-яё]/,
      "Имя должно начинаться с заглавной буквы"
    ),
  lastName: z
    .string()
    .min(3, "Фамилия должна иметь не менее 2 символов")
    .regex(
      /^[A-ZА-ЯЁ][a-zа-яё]/,
      "Фамилия должна начинаться с заглавной буквы"
    ),
  login: z.string().min(3, "Псевдоним должен быть не менее 3 символов"),
  phone: z
    .string()
    .regex(
      /^((8|\+374|\+994|\+995|\+375|\+7|\+380|\+38|\+996|\+998|\+993)[ ]?)?\(?\d{3,5}\)?[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}[ ]?\d{1}(([ ]?\d{1})?[ ]?\d{1})?$/,
      "Введите корректный номер телефона"
    ),
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Выберите корректную роль" }),
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type FormData =
  | LoginFormData
  | RegisterFormData

export const getSchema = (mode: AuthMode) => {
  switch (mode) {
    case AuthMode.Login:
      return loginSchema;
    case AuthMode.Register:
      return registerSchema;
    default:
      return loginSchema;
  }
};
